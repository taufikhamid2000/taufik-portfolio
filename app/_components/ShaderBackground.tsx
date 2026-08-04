'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Flowing aurora/plasma gradient with a soft ripple that follows the
// pointer. Noise is a cheap inline value-noise (no texture lookups) so
// this stays a single small shader with zero asset loading.
const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    float t = uTime * 0.06;
    float n = fbm(aspectUv * 2.2 + vec2(t, -t * 0.7));
    float n2 = fbm(aspectUv * 3.0 - vec2(-t * 0.5, t));

    // Ripple centered on the pointer.
    vec2 mouseUv = (uMouse - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
    float distToMouse = length(aspectUv - mouseUv);
    float ripple = smoothstep(0.55, 0.0, distToMouse) * 0.35;

    float mixVal = clamp(n * 0.6 + n2 * 0.4 + ripple, 0.0, 1.0);

    vec3 indigo = vec3(0.35, 0.31, 0.86);
    vec3 cyan = vec3(0.26, 0.83, 0.79);
    vec3 pink = vec3(0.93, 0.28, 0.60);
    vec3 ink = vec3(0.02, 0.02, 0.04);

    vec3 color = mix(ink, indigo, smoothstep(0.15, 0.5, mixVal));
    color = mix(color, cyan, smoothstep(0.45, 0.75, mixVal) * 0.7);
    color = mix(color, pink, smoothstep(0.7, 0.95, mixVal) * 0.5);

    // Vignette so the effect fades toward the panel edges.
    float vignette = smoothstep(0.95, 0.2, length(uv - 0.5));
    gl_FragColor = vec4(color, vignette * 0.9);
  }
`;

/**
 * Full-bleed WebGL gradient shader for the hero panel — plain Three.js
 * (no React reconciler / @react-three/fiber) after that combination
 * proved incompatible with this React version and kept crashing the
 * page. This talks to WebGL directly and imperatively, so it has no
 * coupling to React internals at all.
 */
export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const targetMouse = new THREE.Vector2(0.5, 0.5);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      uniforms.uResolution.value.set(rect.width, rect.height);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1 - (e.clientY - rect.top) / rect.height;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (!coarsePointer) canvas.addEventListener('pointermove', onPointerMove);

    let frameId = 0;
    const startTime = performance.now();

    function tick() {
      uniforms.uTime.value = (performance.now() - startTime) / 1000;
      uniforms.uMouse.value.lerp(targetMouse, 0.06);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    if (prefersReducedMotion) {
      // Render a single static frame instead of a continuous loop.
      renderer.render(scene, camera);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
