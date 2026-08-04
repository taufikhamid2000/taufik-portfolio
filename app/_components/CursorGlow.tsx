'use client';

import { useEffect, useRef } from 'react';

/**
 * Site-wide cursor-reactive glow — a soft radial light that trails the
 * pointer with easing, dark mode only. Pure transform updates (no layout
 * thrash), disabled under prefers-reduced-motion and on touch devices
 * (no persistent pointer to react to).
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = glowRef.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frameId = 0;

    function onPointerMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function tick() {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frameId = requestAnimationFrame(tick);
    }

    window.addEventListener('pointermove', onPointerMove);
    frameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[420px] w-[420px] rounded-full bg-indigo-500/[0.07] blur-[80px] dark:motion-safe:block"
    />
  );
}
