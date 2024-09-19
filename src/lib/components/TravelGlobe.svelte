<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { faGlobe } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  let showModal = false;
  let container;
  let status = 'Loading...';
  let fallbackMode = false;
  let hoverLabel = '';
  let mouseX = 0;
  let mouseY = 0;

  const travelLocations = [
    { lat: 29.7604, lng: -95.3698, label: 'Houston', lived: true },
    { lat: 33.5779, lng: -101.8552, label: 'Lubbock', lived: true },
    { lat: 29.3013, lng: -94.7977, label: 'Galveston', lived: true },
    { lat: 40.7178, lng: -74.0431, label: 'Jersey City', lived: true },
    { lat: 40.7128, lng: -74.0060, label: 'New York City', lived: false },
    { lat: 47.6062, lng: -122.3321, label: 'Seattle', lived: false },
    { lat: 37.7749, lng: -122.4194, label: 'San Francisco', lived: false },
    { lat: 34.0522, lng: -118.2437, label: 'Los Angeles', lived: false },
    { lat: 39.7392, lng: -104.9903, label: 'Denver', lived: false },
    { lat: 33.4484, lng: -112.0740, label: 'Phoenix', lived: false },
    { lat: 29.9511, lng: -90.0715, label: 'New Orleans', lived: false },
    { lat: 43.6591, lng: -70.2568, label: 'Portland', lived: false },
    { lat: 36.1699, lng: -115.1398, label: 'Las Vegas', lived: false },
    { lat: 58.3019, lng: -134.4197, label: 'Juneau', lived: false },
    { lat: 48.4284, lng: -123.3656, label: 'Victoria', lived: false },
    { lat: 39.0997, lng: -94.5786, label: 'Kansas City', lived: false },
    { lat: 25.7617, lng: -80.1918, label: 'Miami', lived: false },
    { lat: 28.5383, lng: -81.3792, label: 'Orlando', lived: false },
    { lat: 35.2271, lng: -80.8431, label: 'Charlotte', lived: false },
    { lat: 36.8508, lng: -76.2859, label: 'Norfolk', lived: false },
    { lat: 37.2707, lng: -76.7075, label: 'Colonial Williamsburg', lived: false },
    { lat: 38.9072, lng: -77.0369, label: 'Washington D.C.', lived: false },
    { lat: 42.3314, lng: -83.0458, label: 'Detroit', lived: false },
    { lat: 41.8781, lng: -87.6298, label: 'Chicago', lived: false },
    { lat: 43.0962, lng: -79.0377, label: 'Niagara Falls', lived: false },
    { lat: 43.6532, lng: -79.3832, label: 'Toronto', lived: false },
    { lat: 39.9526, lng: -75.1652, label: 'Philadelphia', lived: false },
    { lat: 44.3876, lng: -68.2039, label: 'Acadia N.P.', lived: false },
    { lat: 32.3078, lng: -64.7505, label: 'Bermuda', lived: false },
    { lat: 19.7934, lng: -70.6884, label: 'Puerto Plata', lived: false },
    { lat: 13.9094, lng: -60.9789, label: 'Saint Lucia', lived: false },
    { lat: 17.5046, lng: -88.1962, label: 'Belize City', lived: false },
    { lat: 20.4230, lng: -86.9223, label: 'Cozumel', lived: false },
    { lat: 16.3067, lng: -86.5496, label: 'Roatan', lived: false },
    { lat: 53.3498, lng: -6.2603, label: 'Dublin', lived: false },
    { lat: 51.5074, lng: -0.1278, label: 'London', lived: false },
    { lat: 41.3851, lng: 2.1734, label: 'Barcelona', lived: false },
    { lat: 43.2965, lng: 5.3698, label: 'Marseille', lived: false },
    { lat: 43.5528, lng: 7.0174, label: 'Cannes', lived: false },
    { lat: 39.5696, lng: 2.6502, label: 'Palma de Mallorca', lived: false },
    { lat: 38.9067, lng: 1.4206, label: 'Ibiza', lived: false },
    { lat: 21.3069, lng: -157.8583, label: 'Honolulu', lived: false },
    { lat: 32.7767, lng: -96.7970, label: 'Dallas', lived: false },
    { lat: 30.2672, lng: -97.7431, label: 'Austin', lived: false },
    { lat: 31.5493, lng: -97.1467, label: 'Waco', lived: false },
    { lat: 35.1495, lng: -90.0490, label: 'Memphis', lived: false },
    { lat: 30.3935, lng: -86.4958, label: 'Destin', lived: false },
    { lat: 55.3422, lng: -131.6461, label: 'Ketchikan', lived: false },
    { lat: 59.4583, lng: -135.3139, label: 'Skagway', lived: false },
    { lat: 29.9749, lng: -92.1344, label: 'Abbeville', lived: false },
    { lat: 33.7490, lng: -84.3880, label: 'Atlanta', lived: false },
    { lat: 36.0544, lng: -112.1401, label: 'Grand Canyon', lived: false },
    { lat: 34.8697, lng: -111.7610, label: 'Sedona', lived: false },
    { lat: 36.9981, lng: -110.0953, label: 'Monument Valley', lived: false },
    { lat: 39.6433, lng: -106.3781, label: 'Vail', lived: false },
    { lat: 20.7984, lng: -156.3319, label: 'Maui', lived: false },
    { lat: 40.3428, lng: -105.6836, label: 'Rocky Mountain N.P.', lived: false },
    { lat: 29.1275, lng: -103.2425, label: 'Big Bend N.P.', lived: false },
  ];

  let cleanupGlobe = () => {};
  let controls;
  let autoRotate = true;

  function toggleModal() {
    if (showModal) {
      cleanupGlobe();
      status = 'Loading...';
      fallbackMode = false;
    } else {
      setTimeout(createGlobe, 0);
    }
    showModal = !showModal;
  }

  function toggleSpin() {
    autoRotate = !autoRotate;
    if (controls) {
      controls.autoRotate = autoRotate;
    }
  }

  function createGlobe() {
    const timeoutId = setTimeout(() => {
      fallbackMode = true;
    }, 10000); // 10 seconds timeout

    try {
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
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      // Create Earth
      const geometry = new THREE.SphereGeometry(1, 64, 64);
      const texture = new THREE.TextureLoader().load(
        'https://threejsfundamentals.org/threejs/resources/images/world.jpg',
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

      // Add travel pins
      const pins = [];
      travelLocations.forEach((location) => {
        const pinGeometry = new THREE.SphereGeometry(0.01, 32, 32);
        const pinMaterial = new THREE.MeshBasicMaterial({
          color: location.lived ? 0xffff00 : 0xff0000,
        });
        const pin = new THREE.Mesh(pinGeometry, pinMaterial);

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

      // Function to create border lines
      function createBorderLine(polygon, color = 0xffffff) {
        const lineMaterial = new THREE.LineBasicMaterial({ color: color });
        const lineGeometry = new THREE.BufferGeometry();
        const points = [];

        const globeRadius = 1; // Radius of the globe
        const altitude = 0.001; // Slightly above the globe surface

        polygon.forEach(([lng, lat]) => {
          const phi = ((90 - lat) * Math.PI) / 180;
          const theta = ((lng + 180) * Math.PI) / 180;

          const x = -(globeRadius + altitude) * Math.sin(phi) * Math.cos(theta);
          const y = (globeRadius + altitude) * Math.cos(phi);
          const z = (globeRadius + altitude) * Math.sin(phi) * Math.sin(theta);

          points.push(new THREE.Vector3(x, y, z));
        });

        // Close the loop
        if (points.length > 0) {
          points.push(points[0]);
        }

        lineGeometry.setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        return line;
      }

      // Add Country Borders
      fetch('/country_borders.geojson')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const borderLines = new THREE.Group();

          data.features.forEach((feature) => {
            const coordinates = feature.geometry.coordinates;
            const type = feature.geometry.type;

            if (type === 'Polygon') {
              coordinates.forEach((polygon) => {
                const line = createBorderLine(polygon, 0x414a4c); // White color
                borderLines.add(line);
              });
            } else if (type === 'MultiPolygon') {
              coordinates.forEach((multiPolygon) => {
                multiPolygon.forEach((polygon) => {
                  const line = createBorderLine(polygon, 0x414a4c); // White color
                  borderLines.add(line);
                });
              });
            }
          });

          earth.add(borderLines);
        })
        .catch((error) => {
          console.error('Error fetching country borders:', error);
        });

      // Add State Borders
      fetch('/state_borders.geojson')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const stateBorderLines = new THREE.Group();

          data.features.forEach((feature) => {
            const coordinates = feature.geometry.coordinates;
            const type = feature.geometry.type;

            if (type === 'Polygon') {
              coordinates.forEach((polygon) => {
                const line = createBorderLine(polygon, 0x414a4c); // Green color for states
                stateBorderLines.add(line);
              });
            } else if (type === 'MultiPolygon') {
              coordinates.forEach((multiPolygon) => {
                multiPolygon.forEach((polygon) => {
                  const line = createBorderLine(polygon, 0x414a4c); // Green color for states
                  stateBorderLines.add(line);
                });
              });
            }
          });

          earth.add(stateBorderLines);
        })
        .catch((error) => {
          console.error('Error fetching state borders:', error);
        });

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

      // Raycaster for mouse interaction
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      function onMouseMove(event) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(pins);

        if (intersects.length > 0) {
          hoverLabel = intersects[0].object.userData.label;
          mouseX = event.clientX;
          mouseY = event.clientY;
        } else {
          hoverLabel = '';
        }
      }

      container.addEventListener('mousemove', onMouseMove);

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
        container.removeEventListener('mousemove', onMouseMove);
        controls.dispose();
        renderer.dispose();
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        texture.dispose();
      };

      clearTimeout(timeoutId);
      status = ''; // Clear the loading text
    } catch (error) {
      clearTimeout(timeoutId);
      fallbackMode = true;
      console.error('Error creating globe:', error);
    }
  }

  onMount(() => {
    return () => {
      cleanupGlobe();
    };
  });
</script>

<button on:click={toggleModal}>
  <Fa icon={faGlobe} />
</button>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if showModal}
  <div class="modal" on:click={toggleModal}>
    <div class="modal-content" on:click|stopPropagation>
      <h2 class="modal-title">My Travels</h2>
      <button class="toggle-spin" on:click={toggleSpin}>
        {autoRotate ? 'Stop Spin' : 'Start Spin'}
      </button>
      <span class="close" on:click={toggleModal}>&times;</span>
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
          <p>{status}</p>
        {/if}
        {#if hoverLabel}
          <div class="hover-label" style="left: {mouseX}px; top: {mouseY}px;">
            {hoverLabel}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: #121212;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 800px;
    height: 90%;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .modal-title {
    color: #ffffff;
    text-align: center;
    margin-top: 0;
    margin-bottom: 10px;
  }

  .close {
    color: #aaa;
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }

  .toggle-spin {
    position: absolute;
    top: 10px;
    right: 60px;
    font-size: 16px;
    background-color: #333;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }

  .toggle-spin:hover {
    background-color: #444;
  }

  .globe-container {
    width: 100%;
    height: calc(100% - 40px); /* Adjust for title */
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
</style>
