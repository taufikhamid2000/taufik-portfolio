'use client';

import { useRef } from 'react';
import type { Project } from '../../lib/projects';
import ProjectDetail from './ProjectDetail';

const MAX_TILT_DEG = 8;

export default function ProjectCardTilt({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);
  const frameRef = useRef(0);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
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
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ transitionProperty: 'transform, opacity, border-color', willChange: 'transform' }}
      className="project-card project-card-spotlight relative overflow-hidden border border-border bg-muted/40 rounded-lg dark:rounded-2xl transition-[opacity,border-color] duration-300 ease-out hover:border-foreground/20 dark:backdrop-blur-xl dark:hover:border-indigo-400/50 flex flex-col"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[var(--spotlight-opacity,0)] transition-opacity duration-300 dark:opacity-[var(--spotlight-opacity,0)]"
        style={{
          background:
            'radial-gradient(320px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(129, 140, 248, 0.12), transparent 65%)',
        }}
      />
      <ProjectDetail project={project} />
    </article>
  );
}
