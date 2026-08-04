'use client';

import { useRef } from 'react';

const MAX_TILT_DEG = 8;

/**
 * Generic pointer-tilt + spotlight wrapper, following the same mechanics as
 * ProjectCardTilt but unopinionated about visual styling — callers supply
 * their own `className` for borders/backdrop-blur/etc.
 */
export default function TiltWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch') return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rotateY = (px - 0.5) * MAX_TILT_DEG * 2;
      const rotateX = (0.5 - py) * MAX_TILT_DEG * 2;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.setProperty('--spotlight-x', `${px * 100}%`);
      card.style.setProperty('--spotlight-y', `${py * 100}%`);
      card.style.setProperty('--spotlight-opacity', '1');
    });
  }

  function handlePointerLeave() {
    const card = cardRef.current;
    if (!card) return;
    cancelAnimationFrame(frameRef.current);
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.setProperty('--spotlight-opacity', '0');
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ transitionProperty: 'transform, opacity, border-color', willChange: 'transform' }}
      className={`project-card-spotlight relative overflow-hidden transition-[opacity,border-color] duration-300 ease-out ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[var(--spotlight-opacity,0)] transition-opacity duration-300 dark:opacity-[var(--spotlight-opacity,0)]"
        style={{
          background:
            'radial-gradient(320px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(129, 140, 248, 0.12), transparent 65%)',
        }}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
}
