'use client';

import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, summary, [role="button"], .project-card, input, textarea';

/**
 * Replaces the system cursor with a dot + trailing ring (mix-blend
 * "difference" so it reads on any background) that grows over
 * interactive elements. Dark mode, fine-pointer, motion-safe only —
 * everywhere else the native cursor is left alone.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('custom-cursor-active');

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let ringScale = 1;
    let frameId = 0;

    function onPointerMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dot) dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      const el = (e.target as Element | null)?.closest(INTERACTIVE_SELECTOR);
      ringScale = el ? 1.8 : 1;
      ring?.classList.toggle('bg-white/10', !!el);
    }

    function tick() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }
      frameId = requestAnimationFrame(tick);
    }

    window.addEventListener('pointermove', onPointerMove);
    frameId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-cyan-300 mix-blend-difference dark:motion-safe:block"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 rounded-full border border-white/50 mix-blend-difference transition-colors duration-200 ease-out dark:motion-safe:block"
      />
    </>
  );
}
