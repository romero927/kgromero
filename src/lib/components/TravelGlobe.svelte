<script>
  import { travelLocations } from "$lib/travel.js";
  import { untrack } from 'svelte';
  import { Globe } from '@lucide/svelte';
  import Modal from './Modal.svelte';

  let showModal = $state(false);
  let container = $state();
  let status = $state('Loading...');
  let fallbackMode = $state(false);
  let hoverLabel = $state('');
  let mouseX = $state(0);
  let mouseY = $state(0);
  let labelAbove = $state(false); // touch: show the label above the finger


  // Border vertex pairs per file, kept so reopening the globe skips the fetch and parse
  const borderCache = new Map();
  function loadBorderPositions(url) {
    if (!borderCache.has(url)) {
      const promise = fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then((data) => {
          const out = [];
          const r = 1.001; // slightly above the globe surface
          const toXYZ = ([lng, lat]) => {
            const phi = ((90 - lat) * Math.PI) / 180;
            const theta = ((lng + 180) * Math.PI) / 180;
            return [-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)];
          };
          for (const { geometry } of data.features) {
            if (!geometry) continue;
            const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
            for (const rings of polygons) {
              for (const ring of rings) {
                if (ring.length < 2) continue;
                const pts = ring.map(toXYZ);
                // Each edge (including the closing one) becomes one segment
                for (let i = 0; i < pts.length; i++) {
                  out.push(...pts[i], ...pts[(i + 1) % pts.length]);
                }
              }
            }
          }
          return new Float32Array(out);
        });
      promise.catch(() => borderCache.delete(url)); // allow a retry after a failure
      borderCache.set(url, promise);
    }
    return borderCache.get(url);
  }
  let cleanupGlobe = () => {};
  let controls;
  let autoRotate = $state(true);
  // Bumped on every open/close so a slow three.js load can't attach to a closed modal
  let globeSession = 0;

  // Build the globe once the modal's container exists; tear it down when the modal closes.
  $effect(() => {
    if (!showModal || !container) return;
    const session = ++globeSession;
    untrack(() => createGlobe(session));
    return () => {
      globeSession++;
      cleanupGlobe();
      cleanupGlobe = () => {};
      status = 'Loading...';
      fallbackMode = false;
      hoverLabel = '';
    };
  });

  function toggleSpin() {
    autoRotate = !autoRotate;
    if (controls) {
      controls.autoRotate = autoRotate;
    }
  }

  async function createGlobe(session) {
    const timeoutId = setTimeout(() => {
      fallbackMode = true;
    }, 10000); // 10 seconds timeout

    try {
      // three.js is only needed once the globe is opened, so keep it out of the initial bundle
      const [THREE, { OrbitControls }] = await Promise.all([
        import('$lib/three.js'),
        import('three/examples/jsm/controls/OrbitControls.js'),
      ]);
      if (session !== globeSession) {
        clearTimeout(timeoutId);
        return;
      }

      if (!container) {
        throw new Error('Container not found');
      }

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x121212); // Dark background

      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Create Earth
      const geometry = new THREE.SphereGeometry(1, 64, 64);
      const texture = new THREE.TextureLoader().load(
        '/images/world.jpg',
        () => {},
        undefined,
        (err) => {}
      );
      const material = new THREE.MeshPhongMaterial({ map: texture });
      const earth = new THREE.Mesh(geometry, material);
      scene.add(earth);

      // Center on New York City
      const nyc = { lat: 40.7128, lng: -74.0060 };
      const phi = ((90 - nyc.lat) * Math.PI) / 180;
      const theta = ((nyc.lng + 180) * Math.PI) / 180; // Longitude in radians

      // Set initial globe rotation
      earth.rotation.y = theta - Math.PI + 1;

      // Position camera
      const radius = 2.5;
      camera.position.x = radius * Math.sin(phi) * Math.cos(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(earth.position);

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);

      // Add travel pins. They all share one tiny sphere and two materials.
      const pinGeometry = new THREE.SphereGeometry(0.01, 12, 8);
      const livedMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const visitedMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const pins = [];
      travelLocations.forEach((location) => {
        const pin = new THREE.Mesh(pinGeometry, location.lived ? livedMaterial : visitedMaterial);

        const pinPhi = ((90 - location.lat) * Math.PI) / 180;
        const pinTheta = ((location.lng + 180) * Math.PI) / 180;
        const radius = 1 + 0.01; // Slightly above the globe surface
        pin.position.x = -radius * Math.sin(pinPhi) * Math.cos(pinTheta);
        pin.position.z = radius * Math.sin(pinPhi) * Math.sin(pinTheta);
        pin.position.y = radius * Math.cos(pinPhi);

        pin.userData = { label: location.label };
        earth.add(pin);
        pins.push(pin);
      });

      // Country and US state borders, drawn as one set of line segments
      // (a single draw call instead of one per border ring).
      const borderMaterial = new THREE.LineBasicMaterial({ color: 0x414a4c });
      const borderGeometries = [];
      function addBorders(url) {
        loadBorderPositions(url)
          .then((positions) => {
            if (session !== globeSession) return; // globe was closed meanwhile
            const borderGeometry = new THREE.BufferGeometry();
            borderGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            borderGeometries.push(borderGeometry);
            earth.add(new THREE.LineSegments(borderGeometry, borderMaterial));
          })
          .catch((error) => {
            console.error(`Error loading ${url}:`, error);
          });
      }
      addBorders('/country_borders.geojson');
      addBorders('/state_borders.geojson');

      // Add OrbitControls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.minDistance = 1.5;
      controls.maxDistance = 5.0;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 0.5; // Slowed down rotation speed
      controls.rotateSpeed = 0.3; // Slower dragging rotation
      controls.target.set(0, 0, 0);
      controls.update();

      // Mouse: show a pin's name on hover. Touch: show it on tap, since
      // there's no hover and dragging spins the globe.
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const TAP_RADIUS = 24; // px; pins are too small to hit exactly with a finger
      const TAP_SLOP = 8; // px a finger can move and still count as a tap
      let downX = 0;
      let downY = 0;

      function pinUnderMouse(event) {
        const rect = container.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(pins);
        return hits.length > 0 ? hits[0].object : null;
      }

      // Closest visible pin to the tap point, within TAP_RADIUS.
      const pinPos = new THREE.Vector3();
      const toCamera = new THREE.Vector3();
      function pinNearTap(event) {
        const rect = container.getBoundingClientRect();
        let best = null;
        let bestDist = TAP_RADIUS;
        for (const pin of pins) {
          pin.getWorldPosition(pinPos);
          // Skip pins on the far side of the globe.
          toCamera.subVectors(camera.position, pinPos);
          if (pinPos.dot(toCamera) <= 0) continue;
          pinPos.project(camera);
          const x = rect.left + ((pinPos.x + 1) / 2) * rect.width;
          const y = rect.top + ((1 - pinPos.y) / 2) * rect.height;
          const dist = Math.hypot(x - event.clientX, y - event.clientY);
          if (dist < bestDist) {
            bestDist = dist;
            best = pin;
          }
        }
        return best;
      }

      function showLabel(pin, event, above) {
        if (pin) {
          hoverLabel = pin.userData.label;
          mouseX = event.clientX;
          mouseY = event.clientY;
          labelAbove = above;
        } else {
          hoverLabel = '';
        }
      }

      function onPointerMove(event) {
        if (event.pointerType === 'mouse') showLabel(pinUnderMouse(event), event, false);
      }

      function onPointerDown(event) {
        downX = event.clientX;
        downY = event.clientY;
      }

      function onPointerUp(event) {
        if (event.pointerType === 'mouse') return;
        const moved = Math.hypot(event.clientX - downX, event.clientY - downY);
        if (moved > TAP_SLOP) return; // a drag, not a tap
        showLabel(pinNearTap(event), event, true);
      }

      container.addEventListener('pointermove', onPointerMove);
      container.addEventListener('pointerdown', onPointerDown);
      container.addEventListener('pointerup', onPointerUp);

      let animationFrameId;
      function animate() {
        animationFrameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      function onWindowResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
      window.addEventListener('resize', onWindowResize);
      onWindowResize(); // Call once to ensure proper initial sizing

      cleanupGlobe = () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', onWindowResize);
        container.removeEventListener('pointermove', onPointerMove);
        container.removeEventListener('pointerdown', onPointerDown);
        container.removeEventListener('pointerup', onPointerUp);
        controls.dispose();
        renderer.dispose();
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        texture.dispose();
        pinGeometry.dispose();
        livedMaterial.dispose();
        visitedMaterial.dispose();
        borderMaterial.dispose();
        borderGeometries.forEach((g) => g.dispose());
      };

      clearTimeout(timeoutId);
      status = ''; // Clear the loading text
    } catch (error) {
      clearTimeout(timeoutId);
      fallbackMode = true;
      console.error('Error creating globe:', error);
    }
  }

</script>

<button type="button" onclick={() => (showModal = true)} aria-label="Open travel globe" class="hover:text-neo-accent transition-colors">
  <Globe size="1em" class="inline -mt-0.5" aria-hidden="true" />
</button>

<Modal bind:open={showModal} title="My Travels" theme="night" size="max-w-3xl" bodyClass="p-0 flex">
  {#snippet headerActions()}
    <button type="button" class="neo-button-ghost h-9 px-3 py-0 text-gray-200! border-dark-border! shadow-neo-dark!" onclick={toggleSpin}>
      {autoRotate ? 'Stop Spin' : 'Start Spin'}
    </button>
  {/snippet}
  <div bind:this={container} class="globe-container">
    {#if fallbackMode}
      <div class="fallback-map">
        <h3>Travel Map (Fallback Mode)</h3>
        {#each travelLocations as location}
          <div
            class="location-pin"
            style="left: {(location.lng + 180) / 360 * 100}%; top: {(90 - location.lat) / 180 * 100}%;">
            <span class={location.lived ? 'lived' : ''}>{location.label}</span>
          </div>
        {/each}
      </div>
    {:else if status}
      <p class="text-gray-400">{status}</p>
    {/if}
    {#if hoverLabel}
      <div class="hover-label" class:above={labelAbove} style="left: {mouseX}px; top: {mouseY}px;">
        {hoverLabel}
      </div>
    {/if}
  </div>
</Modal>

<style>
  .globe-container {
    width: 100%;
    height: min(70svh, 640px);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
  }

  .fallback-map {
    width: 100%;
    height: 100%;
    background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/640px-Equirectangular_projection_SW.jpg');
    background-size: cover;
    position: relative;
  }

  .location-pin {
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .location-pin span {
    background-color: red;
    color: white;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 12px;
    user-select: none;
  }

  .location-pin span.lived {
    background-color: yellow;
    color: black;
  }

  .hover-label {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    pointer-events: none;
    z-index: 1000;
    transform: translate(10px, 10px);
    user-select: none;
  }

  /* On touch, keep the label clear of the finger. */
  .hover-label.above {
    transform: translate(-50%, calc(-100% - 16px));
  }
</style>
