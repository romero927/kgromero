// 3D business card. Only loaded when the card modal opens.
// Renders on demand: the loop runs while the card moves, then stops.
import {
  CanvasTexture,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  PerspectiveCamera,
  Scene,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  WebGLRenderer
} from '$lib/three.js';

const W = 3.5;
const H = 2;
const DEPTH = 0.035;
const RADIUS = 0.12;
const FOV = 30;

// Camera framing: how much room the view leaves around the card
const FRAME_H = 0.62;
const FRAME_W = 0.6;

/** Width in CSS pixels the card face takes up in a w x h view. */
export function cardScreenWidth(w, h) {
  return Math.min(w / (FRAME_W * 2), (h / (FRAME_H * 2)) * (W / H));
}

function roundedRect(w, h, r) {
  const s = new Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/**
 * @param {HTMLElement} container
 * @param {{ front: HTMLCanvasElement, back: HTMLCanvasElement, reducedMotion?: boolean, onFaceChange?: (back: boolean) => void }} opts
 */
export function createCardScene(container, { front, back, reducedMotion = false, onFaceChange }) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.touchAction = 'none';
  renderer.domElement.style.cursor = 'grab';
  renderer.domElement.style.userSelect = 'none';
  renderer.domElement.style.webkitUserSelect = 'none';
  renderer.domElement.style.webkitTouchCallout = 'none';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);

  scene.add(new HemisphereLight(0xffffff, 0xd9d9d9, 2.7));
  const key = new DirectionalLight(0xffffff, 1.1);
  key.position.set(-2, 3, 5);
  scene.add(key);

  const shape = roundedRect(W, H, RADIUS);

  const bodyGeo = new ExtrudeGeometry(shape, { depth: DEPTH, bevelEnabled: false, curveSegments: 8 });
  bodyGeo.translate(0, 0, -DEPTH / 2);
  const edgeMat = new MeshStandardMaterial({ color: 0xeeeae2, roughness: 0.8 });

  // Face geometry with UVs mapped 0..1 across the card
  const faceGeo = new ShapeGeometry(shape, 8);
  const pos = faceGeo.attributes.position;
  const uv = faceGeo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, pos.getX(i) / W + 0.5, pos.getY(i) / H + 0.5);
  }

  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const makeTexture = (canvas) => {
    const tex = new CanvasTexture(canvas);
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = Math.min(8, maxAniso);
    // The face is drawn at its on-screen size, so sample it directly.
    // Mipmaps would blend in a half-size copy and soften the text.
    tex.generateMipmaps = false;
    tex.minFilter = LinearFilter;
    return tex;
  };
  const frontTex = makeTexture(front);
  const backTex = makeTexture(back);
  const frontMat = new MeshStandardMaterial({ map: frontTex, roughness: 0.55 });
  const backMat = new MeshStandardMaterial({ map: backTex, roughness: 0.55 });

  const card = new Group();
  card.add(new Mesh(bodyGeo, edgeMat));
  const frontMesh = new Mesh(faceGeo, frontMat);
  frontMesh.position.z = DEPTH / 2 + 0.0005;
  card.add(frontMesh);
  const backMesh = new Mesh(faceGeo, backMat);
  backMesh.rotation.y = Math.PI;
  backMesh.position.z = -DEPTH / 2 - 0.0005;
  card.add(backMesh);
  scene.add(card);

  // Soft shadow behind the card (stays put while the card turns)
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 160;
  const sctx = shadowCanvas.getContext('2d');
  // Draw the rectangle off-canvas and keep only its blurred shadow.
  // (shadowBlur instead of ctx.filter, which mobile Safari ignores.)
  sctx.shadowColor = 'rgba(0,0,0,0.45)';
  sctx.shadowBlur = 28;
  sctx.shadowOffsetX = 1000;
  sctx.fillStyle = '#000';
  sctx.fillRect(40 - 1000, 36, 176, 88);
  const shadowTex = new CanvasTexture(shadowCanvas);
  const shadowGeo = new PlaneGeometry(W * 1.45, H * 1.6);
  const shadowMat = new MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
  const shadow = new Mesh(shadowGeo, shadowMat);
  shadow.position.set(0.08, -0.14, -0.5);
  scene.add(shadow);

  // Motion state. `base` is the face angle (0 = front, PI = back).
  let base = 0;
  // Opening: a gentle tilt that settles slowly, not a spin
  let yaw = reducedMotion ? 0 : -0.45;
  let pitch = reducedMotion ? 0 : 0.18;
  let settleRate = reducedMotion ? 30 : 2.5; // speeds up to 7 after the opening
  let tiltX = 0; // hover tilt targets
  let tiltY = 0;
  let dragging = false;
  let dragYaw = 0;
  let dragPitch = 0;
  let startX = 0;
  let startY = 0;
  let startYaw = 0;
  let startPitch = 0;
  let lastX = 0;
  let lastT = 0;
  let velocity = 0;
  let moved = 0;
  let showingBack = false;

  function setFace(nextBase) {
    base = nextBase;
    const isBack = Math.round(base / Math.PI) % 2 !== 0;
    if (isBack !== showingBack) {
      showingBack = isBack;
      onFaceChange?.(isBack);
    }
  }

  function fit() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = `${w}px`;
    renderer.domElement.style.height = `${h}px`;
    camera.aspect = w / h;
    // Leave room around the card for tilting
    const halfV = Math.tan((FOV * Math.PI) / 360);
    const distH = (H * FRAME_H) / halfV;
    const distW = (W * FRAME_W) / (halfV * camera.aspect);
    camera.position.set(0, 0, Math.max(distH, distW));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    requestFrame();
  }

  let frame = 0;
  let lastFrame = 0;
  function requestFrame() {
    if (!frame) {
      lastFrame = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }

  function tick(now) {
    frame = 0;
    const dt = Math.min(0.05, (now - lastFrame) / 1000);
    lastFrame = now;

    let targetYaw;
    let targetPitch;
    if (dragging) {
      targetYaw = dragYaw;
      targetPitch = dragPitch;
    } else {
      targetYaw = base + tiltX * 0.28;
      targetPitch = -tiltY * 0.2;
    }
    const k = dragging ? 1 - Math.exp(-dt * 30) : 1 - Math.exp(-dt * settleRate);
    yaw += (targetYaw - yaw) * k;
    pitch += (targetPitch - pitch) * k;

    card.rotation.set(pitch, yaw, 0);
    renderer.render(scene, camera);

    const settled = Math.abs(targetYaw - yaw) < 1e-4 && Math.abs(targetPitch - pitch) < 1e-4;
    if (settled && !reducedMotion) settleRate = 7;
    if (!settled || dragging) requestFrame();
  }

  // ---- Input ----
  const el = renderer.domElement;

  function onPointerDown(e) {
    if (!reducedMotion) settleRate = 7;
    dragging = true;
    moved = 0;
    startX = lastX = e.clientX;
    startY = e.clientY;
    lastT = performance.now();
    velocity = 0;
    startYaw = dragYaw = yaw;
    startPitch = dragPitch = pitch;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
    requestFrame();
  }

  function onPointerMove(e) {
    const rect = el.getBoundingClientRect();
    if (dragging) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      moved = Math.max(moved, Math.hypot(dx, dy));
      const scale = 3.2 / rect.width; // full width drag ≈ half a turn+
      dragYaw = startYaw + dx * scale;
      dragPitch = Math.max(-0.6, Math.min(0.6, startPitch + dy * scale));
      const now = performance.now();
      const ms = now - lastT;
      if (ms > 0) velocity = ((e.clientX - lastX) * scale) / (ms / 1000);
      lastX = e.clientX;
      lastT = now;
    } else if (e.pointerType === 'mouse') {
      tiltX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      tiltY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }
    requestFrame();
  }

  function onPointerUp(e) {
    if (!dragging) return;
    dragging = false;
    el.style.cursor = 'grab';
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    if (moved < 6) {
      flip();
      return;
    }
    // Snap to the nearest face, carrying a quick flick on to the next one
    const fling = Math.max(-1, Math.min(1, velocity / 6)) * (Math.PI / 2);
    setFace(Math.round((yaw + fling) / Math.PI) * Math.PI);
    tiltX = tiltY = 0;
    requestFrame();
  }

  function onPointerLeave(e) {
    if (e.pointerType !== 'mouse' || dragging) return;
    tiltX = tiltY = 0;
    requestFrame();
  }

  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointermove', onPointerMove);
  el.addEventListener('pointerup', onPointerUp);
  el.addEventListener('pointercancel', onPointerUp);
  el.addEventListener('pointerleave', onPointerLeave);

  const resizeObserver = new ResizeObserver(fit);
  resizeObserver.observe(container);
  fit();

  function flip() {
    if (!reducedMotion) settleRate = 7;
    setFace(base + Math.PI);
    requestFrame();
  }

  return {
    flip,
    dispose() {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('pointerleave', onPointerLeave);
      bodyGeo.dispose();
      faceGeo.dispose();
      edgeMat.dispose();
      frontMat.dispose();
      backMat.dispose();
      frontTex.dispose();
      backTex.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      renderer.dispose();
      el.remove();
    }
  };
}
