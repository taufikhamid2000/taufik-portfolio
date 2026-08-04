'use client';

import { useEffect, useRef } from 'react';

// Deterministic PRNG (mulberry32) so the initial layout is stable
// across renders instead of relying on Math.random in render.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const PARTICLE_COUNT = 70;
const LINK_DISTANCE = 130;
const CURSOR_RADIUS = 140;

/**
 * Plain-canvas interactive particle constellation for the hero — nodes
 * drift, link to nearby neighbors, and get pushed away from the pointer.
 * Deliberately built without a WebGL/React-reconciler library: see
 * commit history for why (a react-reconciler/React-internals
 * incompatibility that kept crashing the page in production).
 */
export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };
    const rand = mulberry32(1337);

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(),
      y: rand(),
      vx: (rand() - 0.5) * 0.0006,
      vy: (rand() - 0.5) * 0.0006,
    }));

    function resize() {
      const el = canvas;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      el.width = width * dpr;
      el.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
    }

    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    let frameId = 0;
    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Update + draw nodes in normalized [0,1] space, scaled to pixels.
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        p.x = Math.min(1, Math.max(0, p.x));
        p.y = Math.min(1, Math.max(0, p.y));

        // Push away from the pointer.
        const dx = (p.x - pointer.x) * width;
        const dy = (p.y - pointer.y) * height;
        const dist = Math.hypot(dx, dy);
        if (dist < CURSOR_RADIUS && dist > 0.001) {
          const force = ((CURSOR_RADIUS - dist) / CURSOR_RADIUS) * 0.0025;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        // Gentle drag so pointer pushes decay instead of accumulating.
        p.vx *= 0.985;
        p.vy *= 0.985;
      }

      // Links between nearby nodes.
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = (a.x - b.x) * width;
          const dy = (a.y - b.y) * height;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.35;
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x * width, a.y * height);
            ctx.lineTo(b.x * width, b.y * height);
            ctx.stroke();
          }
        }
      }

      // Nodes on top.
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(94, 234, 212, 0.8)';
        ctx.fill();
      }

      if (!prefersReducedMotion) frameId = requestAnimationFrame(tick);
    }

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
