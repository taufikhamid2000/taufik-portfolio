'use client';

import { useRef, useState } from 'react';

const CONFETTI_COLORS = ['#818cf8', '#5eead4', '#f472b6', '#34d399', '#fbbf24'];
const CONFETTI_COUNT = 28;

interface Particle {
  id: number;
  tx: number;
  ty: number;
  rot: number;
  size: number;
  color: string;
  delay: number;
}

function makeBurst(seed: number): Particle[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, i) => {
    const angle = (Math.PI * 2 * i) / CONFETTI_COUNT + (i % 2 ? 0.15 : -0.15);
    const distance = 60 + ((i * 37 + seed) % 70);
    return {
      id: seed * 1000 + i,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance - 20,
      rot: ((i * 53 + seed) % 360) - 180,
      size: 4 + ((i * 7 + seed) % 5),
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: (i % 6) * 12,
    };
  });
}

/**
 * "View all projects" disclosure — a JS-driven accordion (CSS grid-rows
 * trick) instead of native <details> so it can animate open smoothly,
 * plus a one-shot confetti burst from the button on open. Skips the
 * burst under prefers-reduced-motion but keeps the expand functional.
 */
export default function ExpandProjects({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState<Particle[]>([]);
  const burstSeed = useRef(0);

  function handleToggle() {
    const next = !open;
    setOpen(next);

    if (next && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      burstSeed.current += 1;
      setBurst(makeBurst(burstSeed.current));
      window.setTimeout(() => setBurst([]), 900);
    }
  }

  return (
    <div className="mb-16">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        className="relative cursor-pointer select-none text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors inline-flex items-center gap-1.5"
      >
        <span
          className={`inline-block transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
          aria-hidden="true"
        >
          &rsaquo;
        </span>
        View all projects ({count} more)
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
          {burst.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full motion-safe:animate-[confetti-burst_0.8s_ease-out_forwards]"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                animationDelay: `${p.delay}ms`,
                // @ts-expect-error -- custom properties consumed by the confetti-burst keyframe
                '--tx': `${p.tx}px`,
                '--ty': `${p.ty}px`,
                '--rot': `${p.rot}deg`,
              }}
            />
          ))}
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
