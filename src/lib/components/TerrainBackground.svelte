<script>
  import { onMount } from 'svelte';
  import { theme, animations } from '$lib/store';

  // Low-poly 3D terrain behind the page: a flat-shaded field of irregular
  // triangles viewed from above at an angle, drawn with WebGL. The terrain
  // holds its shape and only bends very slowly over time, and the surface
  // swells gently under the cursor.
  // If WebGL isn't available, nothing is drawn and the plain page background
  // shows.
  let canvas;

  // Facet colors go from `low` to `high` by how much light they catch;
  // `glint` tints the brightest facets; distant facets fade into `haze`
  // (the page background color). Light mode needs more contrast and less
  // haze to read at all on a pale page.
  const PALETTES = {
    light: {
      low: [178, 178, 174], high: [252, 252, 251], glint: [253, 151, 69], haze: [245, 245, 244],
      line: [26, 26, 26], contrast: 2.0, hazeAmount: 0.55, lineAlpha: 0.14
    },
    dark: {
      low: [28, 29, 31], high: [58, 60, 65], glint: [253, 151, 69], haze: [33, 33, 33],
      line: [253, 151, 69], contrast: 1.5, hazeAmount: 0.85, lineAlpha: 0.22
    }
  };
  const HAZE = [900, 2400]; // distance where the haze starts and where it is strongest
  // Scroll parallax: the background scrolls up at this fraction of the page's
  // speed, so the content seems to float above it. The canvas is made taller
  // than the window by just enough to cover the full scroll.
  const PARALLAX = 0.25;
  const CAMERA_HEIGHT = 400;
  const PITCH = 0.6; // radians the camera looks down
  const GRID_X = [-2000, 2000]; // world-space extent of the surface
  const GRID_Z = [150, 2300];
  const CELL = 132; // world units per grid cell, front to back (bigger = fewer, larger facets)
  const STRETCH = 1.4; // cells are this many times wider than deep, for wider triangles
  const JITTER = 0.35; // random nudge of each grid point (fraction of a cell), for irregular triangles
  const LIGHT = [-0.4, 0.8, -0.45]; // from upper left, toward the viewer

  const VERTEX_SHADER = `#version 300 es
    in vec2 aXZ;
    in vec3 aBary; // (1,0,0)/(0,1,0)/(0,0,1) per triangle corner, for drawing edges
    out vec3 vBary;
    uniform float uTime, uYaw, uPitch, uFocal, uSwell;
    uniform vec2 uRes, uCursor;
    out vec3 vWorld;
    out float vDepth;

    const float CAMERA_HEIGHT = ${CAMERA_HEIGHT.toFixed(1)};
    const float HEIGHT = 30.0;      // terrain height
    const float SWELL = 32.0;       // extra height under the cursor
    const float SWELL_RADIUS = 140.0; // px on screen

    // Camera space: x right, y up, z = distance ahead.
    vec3 toCamera(vec3 p) {
      float cy = cos(uYaw), sy = sin(uYaw);
      float rx = p.x * cy - p.z * sy;
      float rz = p.x * sy + p.z * cy;
      float py = p.y - CAMERA_HEIGHT;
      float cp = cos(uPitch), sp = sin(uPitch);
      return vec3(rx, py * cp + rz * sp, max(1.0, -py * sp + rz * cp));
    }

    void main() {
      float t = uTime; // seconds
      vec3 p = vec3(aXZ.x, 0.0, aXZ.y);
      float z = p.z;
      // Fixed terrain shape, plus two long, slow bends moving through it
      // (roughly 70 and 85 seconds per cycle).
      float shape = sin(p.x * 0.006) + 0.8 * sin(z * 0.009) + 0.5 * sin((p.x + z) * 0.004 + 1.3);
      p.y = HEIGHT * 1.2 * shape
          + HEIGHT * 0.5 * (sin(p.x * 0.003 + t * 0.09) + sin(z * 0.004 - t * 0.072 + 2.0));

      // Swell under the cursor, measured on screen so it sits right under it.
      if (uSwell > 0.01) {
        vec3 c = toCamera(p);
        vec2 screen = vec2(uRes.x * 0.5 + c.x * uFocal / c.z, uRes.y * 0.5 - c.y * uFocal / c.z);
        float d = distance(screen, uCursor) / SWELL_RADIUS;
        p.y += SWELL * uSwell * exp(-d * d);
      }

      vWorld = p;
      vBary = aBary;
      vec3 c = toCamera(p);
      vDepth = c.z;
      float near = 1.0, far = 6000.0;
      gl_Position = vec4(
        c.x * uFocal / (uRes.x * 0.5),
        c.y * uFocal / (uRes.y * 0.5),
        ((c.z - near) / (far - near) * 2.0 - 1.0) * c.z,
        c.z
      );
    }`;

  const FRAGMENT_SHADER = `#version 300 es
    precision highp float;
    in vec3 vWorld;
    in float vDepth;
    in vec3 vBary;
    uniform vec3 uLow, uHigh, uGlint, uLight, uHaze, uLine;
    uniform float uLineAlpha;
    uniform vec2 uHazeRange;
    uniform float uContrast, uHazeAmount;
    out vec4 outColor;

    void main() {
      // Flat shading: the surface normal from screen-space derivatives is
      // constant across each triangle, which gives the faceted look.
      vec3 n = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
      if (n.y < 0.0) n = -n;
      float diffuse = max(dot(n, uLight), 0.0);
      // Most facets face nearly straight up, so stretch the contrast.
      float t = clamp((diffuse - 0.5) * uContrast, 0.0, 1.0);
      float glint = pow(diffuse, 12.0) * 0.15;
      vec3 color = mix(mix(uLow, uHigh, t), uGlint, glint);
      // Thin anti-aliased edge lines: near an edge, one barycentric coordinate
      // approaches 0. fwidth keeps the line about 1px wide at any distance.
      vec3 edge = smoothstep(vec3(0.0), fwidth(vBary) * 1.2, vBary);
      float line = 1.0 - min(min(edge.x, edge.y), edge.z);
      color = mix(color, uLine, line * uLineAlpha);
      // Fade distant facets into the page color, so the far edge stays calm.
      float haze = smoothstep(uHazeRange.x, uHazeRange.y, vDepth) * uHazeAmount;
      outColor = vec4(mix(color, uHaze, haze), 1.0);
    }`;

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  onMount(() => {
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: false });
    if (!gl) return;

    const program = gl.createProgram();
    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Static grid of (x, z) points; heights are computed on the GPU each frame.
    // Points are nudged randomly so the triangles come out irregular.
    const cellX = CELL * STRETCH;
    const cols = Math.ceil((GRID_X[1] - GRID_X[0]) / cellX) + 1;
    const rows = Math.ceil((GRID_Z[1] - GRID_Z[0]) / CELL) + 1;
    const positions = new Float32Array(cols * rows * 2);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = (r * cols + c) * 2;
        positions[i] = GRID_X[0] + (c + (Math.random() - 0.5) * 2 * JITTER) * cellX;
        positions[i + 1] = GRID_Z[0] + (r + (Math.random() - 0.5) * 2 * JITTER) * CELL;
      }
    }
    // Each triangle gets its own three corners (instead of sharing them), so
    // every corner can carry a barycentric coordinate for drawing edge lines.
    const triangleCount = (cols - 1) * (rows - 1) * 2;
    const vertexCount = triangleCount * 3;
    const corners = new Float32Array(vertexCount * 2);
    const bary = new Float32Array(vertexCount * 3);
    let v = 0;
    const addTriangle = (...points) => {
      points.forEach((point, i) => {
        corners[v * 2] = positions[point * 2];
        corners[v * 2 + 1] = positions[point * 2 + 1];
        bary[v * 3 + i] = 1;
        v++;
      });
    };
    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols - 1; c++) {
        const a = r * cols + c;
        const b = a + 1;
        const d = a + cols;
        const e = d + 1;
        // Split each cell along a random diagonal, so it doesn't read as a grid.
        if (Math.random() < 0.5) {
          addTriangle(a, d, b);
          addTriangle(b, d, e);
        } else {
          addTriangle(a, d, e);
          addTriangle(a, e, b);
        }
      }
    }

    const bindAttribute = (name, data, size) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const location = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    };
    bindAttribute('aXZ', corners, 2);
    bindAttribute('aBary', bary, 3);
    gl.enable(gl.DEPTH_TEST);

    const u = Object.fromEntries(
      ['uTime', 'uYaw', 'uPitch', 'uFocal', 'uSwell', 'uRes', 'uCursor', 'uLow', 'uHigh', 'uGlint', 'uHaze', 'uLight', 'uHazeRange', 'uContrast', 'uHazeAmount', 'uLine', 'uLineAlpha'].map(
        (name) => [name, gl.getUniformLocation(program, name)]
      )
    );
    const len = Math.hypot(...LIGHT);
    gl.uniform3f(u.uLight, LIGHT[0] / len, LIGHT[1] / len, LIGHT[2] / len);
    gl.uniform2f(u.uHazeRange, HAZE[0], HAZE[1]);
    // The camera is fixed: straight ahead, looking down at PITCH.
    gl.uniform1f(u.uYaw, 0);
    gl.uniform1f(u.uPitch, PITCH);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationsOn = true;
    // Animate only when the toggle is on and the system doesn't ask for reduced motion.
    const moving = () => animationsOn && !reducedMotion.matches;
    let width = 0;
    let height = 0;
    let frame = null;
    let pointer = null;
    let pointerTimer = null;
    const view = { swell: 0, x: 0, y: 0 };
    let parallaxOn = !reducedMotion.matches; // parallax motion can bother motion-sensitive visitors
    let offset = 0; // px the canvas is currently shifted up
    const startTime = performance.now();

    // Current colors ease toward the theme's palette, so theme switches fade
    // along with the rest of the page instead of snapping.
    const colorKeys = ['low', 'high', 'glint', 'haze', 'line'];
    const uniformFor = { low: 'uLow', high: 'uHigh', glint: 'uGlint', haze: 'uHaze', line: 'uLine' };
    let target = PALETTES.light;
    let colors = null;

    function setPalette(name) {
      target = PALETTES[name];
      gl.uniform1f(u.uContrast, target.contrast);
      gl.uniform1f(u.uHazeAmount, target.hazeAmount);
      gl.uniform1f(u.uLineAlpha, target.lineAlpha);
      if (!colors || frame === null) {
        colors = Object.fromEntries(colorKeys.map((k) => [k, [...target[k]]]));
      }
    }

    function applyColors() {
      for (const k of colorKeys) {
        for (let i = 0; i < 3; i++) colors[k][i] += (target[k][i] - colors[k][i]) * 0.12;
        gl.uniform3f(u[uniformFor[k]], ...colors[k].map((v) => v / 255));
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scrollable = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      width = window.innerWidth;
      height = window.innerHeight + (parallaxOn ? Math.ceil(scrollable * PARALLAX) : 0);
      canvas.style.height = `${height}px`;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.uRes, width, height);
      // Wide screens see more of the surface sideways; tall ones see more depth.
      gl.uniform1f(u.uFocal, Math.max(width * 0.6, window.innerHeight * 1.1));
      onScroll();
      render(performance.now());
    }

    // Moves the canvas up at a fraction of the scroll. This is a cheap
    // transform, so it runs even between animation frames.
    function onScroll() {
      offset = parallaxOn ? window.scrollY * PARALLAX : 0;
      canvas.style.transform = `translate3d(0, ${-offset}px, 0)`;
    }

    function render(now) {
      // Ease the cursor swell toward the pointer.
      view.swell += ((pointer ? 1 : 0) - view.swell) * 0.06;
      if (pointer) {
        view.x += (pointer.x - view.x) * 0.15;
        view.y += (pointer.y - view.y) * 0.15;
      }

      applyColors();
      gl.uniform1f(u.uTime, (now - startTime) / 1000);
      gl.uniform1f(u.uSwell, view.swell);
      // The cursor is in window coordinates; the canvas is shifted up by `offset`.
      gl.uniform2f(u.uCursor, view.x, view.y + offset);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
    }

    function loop(now) {
      render(now);
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (frame === null && moving() && !document.hidden) {
        frame = requestAnimationFrame(loop);
      }
    }

    function stop() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    }

    function onPointerMove(e) {
      if (!moving()) return; // paused: stay completely still
      if (!pointer) {
        view.x = e.clientX;
        view.y = e.clientY;
      }
      pointer = { x: e.clientX, y: e.clientY };
      // Touch has no hover, so release a tap after a moment.
      clearTimeout(pointerTimer);
      if (e.pointerType !== 'mouse') pointerTimer = setTimeout(() => (pointer = null), 1500);
    }

    function onPointerLeave() {
      pointer = null;
    }

    function onVisibility() {
      document.hidden ? stop() : start();
    }

    function onMotionChange() {
      if (!moving()) pointer = null;
      stop();
      start();
      if (frame === null && width) render(performance.now());
    }

    const unsubscribe = theme.subscribe((value) => {
      setPalette(value === 'dark' ? 'dark' : 'light');
      if (frame === null && width) render(performance.now());
    });

    const unsubscribeAnimations = animations.subscribe((value) => {
      animationsOn = value;
      onMotionChange();
    });

    resize();
    start();

    // The page can grow after load (fonts, images), which changes how far it scrolls.
    const pageSize = new ResizeObserver(() => resize());
    pageSize.observe(document.body);

    function onReducedMotionChange() {
      parallaxOn = !reducedMotion.matches;
      resize();
    }

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    reducedMotion.addEventListener('change', onReducedMotionChange);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    reducedMotion.addEventListener('change', onMotionChange);

    return () => {
      stop();
      clearTimeout(pointerTimer);
      unsubscribe();
      unsubscribeAnimations();
      pageSize.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      reducedMotion.removeEventListener('change', onReducedMotionChange);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotion.removeEventListener('change', onMotionChange);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  });
</script>

<canvas bind:this={canvas} class="fixed top-0 left-0 -z-10 w-full pointer-events-none will-change-transform" aria-hidden="true"></canvas>
