'use client';

import { useRef } from 'react';
import Link from 'next/link';
import type { Project, ProjectStatus } from '../../lib/projects';

const statusStyles: Record<ProjectStatus, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-300',
  'in-portfolio': 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-300',
  concept: 'bg-gray-100 text-gray-800 dark:bg-white/5 dark:text-gray-300',
  archived: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400',
};

const statusLabels: Record<ProjectStatus, string> = {
  active: 'Active',
  'in-progress': 'In Progress',
  'in-portfolio': 'In Portfolio',
  concept: 'Concept',
  archived: 'Archived',
};

// Deterministic gradient per card (no project imagery in the data model
// yet), so each card gets a distinct visual header instead of a flat box.
const cardGradients = [
  'from-indigo-500 to-cyan-400',
  'from-fuchsia-500 to-orange-400',
  'from-emerald-500 to-teal-400',
  'from-violet-500 to-pink-400',
  'from-amber-500 to-rose-400',
  'from-sky-500 to-indigo-400',
];

function gradientForProject(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return cardGradients[hash % cardGradients.length];
}

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
      className="project-card project-card-spotlight relative overflow-hidden border border-gray-200 dark:border-white/10 rounded-lg dark:rounded-2xl transition-[opacity,border-color] duration-300 ease-out hover:border-gray-300 dark:bg-white/[0.03] dark:backdrop-blur-xl dark:hover:border-indigo-400/50 flex flex-col"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[var(--spotlight-opacity,0)] transition-opacity duration-300 dark:opacity-[var(--spotlight-opacity,0)]"
        style={{
          background:
            'radial-gradient(320px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(129, 140, 248, 0.12), transparent 65%)',
        }}
      />
      <div className={`h-20 bg-gradient-to-br ${gradientForProject(project.id)} opacity-80 dark:opacity-70`} aria-hidden="true" />
      <div className="relative z-0 p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-semibold">{project.name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[project.status]}`}
          >
            {statusLabels[project.status]}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{project.tagline}</p>
        <p className="text-sm mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 text-sm">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-cyan-300 hover:underline"
            >
              GitHub &rarr;
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-cyan-300 hover:underline"
            >
              Live Demo &rarr;
            </a>
          )}
          {!project.github_url && !project.demo_url && (
            <Link
              href={`/projects/${project.name}`}
              className="text-blue-600 dark:text-cyan-300 hover:underline"
            >
              View in Portfolio &rarr;
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
