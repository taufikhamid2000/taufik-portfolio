'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Project } from '../../lib/projects';
import { statusDotColors, statusLabels } from '../../lib/project-status';
import { projectIcon } from '../../lib/project-icon';
import ProjectDetail from './ProjectDetail';

const SPIN_MS = 1800;
const SPIN_EASING = 'cubic-bezier(0.15,0.85,0.25,1)';
const STEP_MS = 450;
const SPIN_TURNS = 4;
// prefers-reduced-motion should tone the spin down, not delete all feedback —
// a snap-with-no-transition reads as "broken" rather than "instant". Both
// still skip the multi-turn spin (the actual vestibular-trigger motion),
// just with a quick, low-distance transition instead of `transition: none`.
const REDUCED_STEP_MS = 150;
const REDUCED_SHUFFLE_MS = 200;

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Rotation congruent to `canonical` (mod 360) that is closest to `current`. */
function shortestRotationTo(current: number, canonical: number) {
  const diff = (((canonical - current) % 360) + 540) % 360 - 180;
  return current + diff;
}

/** Rotation that spins forward `turns` full turns before landing on `canonical` (mod 360). */
function spinRotationTo(current: number, canonical: number, turns: number) {
  const diff = (((canonical - current) % 360) + 360) % 360;
  return current + turns * 360 + diff;
}

export default function ProjectWheel({ projects }: { projects: Project[] }) {
  const featured = useMemo(
    () => projects.filter((p) => p.featured && p.status !== 'archived'),
    [projects]
  );
  const [mode, setMode] = useState<'featured' | 'all'>(featured.length > 0 ? 'featured' : 'all');
  const list = mode === 'featured' ? featured : projects;

  const [selectedId, setSelectedId] = useState<string | null>(list[0]?.id ?? null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const [containerSize, setContainerSize] = useState(320);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(prefersReducedMotion());
  }, []);

  const wheelWrapRef = useRef<HTMLDivElement>(null);
  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = wheelWrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerSize(width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    };
  }, []);

  // When switching Featured/All, keep the current project selected if it's
  // still in the new list; otherwise default to the first item.
  function handleModeChange(next: 'featured' | 'all') {
    if (next === mode || spinning) return;
    const nextList = next === 'featured' ? featured : projects;
    const stillPresent = nextList.some((p) => p.id === selectedId);
    setMode(next);
    const newIndex = stillPresent ? nextList.findIndex((p) => p.id === selectedId) : 0;
    setNoTransition(true);
    setRotation(-newIndex * (360 / Math.max(nextList.length, 1)));
    if (!stillPresent) setSelectedId(nextList[0]?.id ?? null);
    requestAnimationFrame(() => setNoTransition(false));
  }

  const anglePerDot = 360 / Math.max(list.length, 1);
  const selectedIndex = Math.max(
    0,
    list.findIndex((p) => p.id === selectedId)
  );

  function canonicalRotation(index: number) {
    return -index * anglePerDot;
  }

  function selectIndex(index: number) {
    if (spinning || list.length === 0) return;
    const target = list[index];
    setSelectedId(target.id);
    setRotation((prev) => shortestRotationTo(prev, canonicalRotation(index)));
  }

  function step(direction: 1 | -1) {
    if (list.length === 0) return;
    const nextIndex = (selectedIndex + direction + list.length) % list.length;
    selectIndex(nextIndex);
  }

  function shuffle() {
    if (spinning || list.length < 2) return;
    const candidates = list.map((_, i) => i).filter((i) => i !== selectedIndex);
    const targetIndex = candidates[Math.floor(Math.random() * candidates.length)];
    const target = list[targetIndex];

    // Reduced motion still gets a brief, single-direction transition instead
    // of the full multi-turn spin — "reduced", not "removed", so the change
    // reads as an intentional pick rather than a broken button.
    const turns = reducedMotion ? 0 : SPIN_TURNS;
    const durationMs = reducedMotion ? REDUCED_SHUFFLE_MS : SPIN_MS;

    setSpinning(true);
    setRotation((prev) => spinRotationTo(prev, canonicalRotation(targetIndex), turns));
    spinTimeoutRef.current = setTimeout(() => {
      setSelectedId(target.id);
      setNoTransition(true);
      setRotation(canonicalRotation(targetIndex));
      setSpinning(false);
      requestAnimationFrame(() => setNoTransition(false));
    }, durationMs);
  }

  const selectedProject = list.find((p) => p.id === selectedId) ?? list[0] ?? null;

  // Dot/radius sizing scales down as the list grows so ~19 dots don't
  // overlap; the diameter is also capped relative to viewport so mobile
  // never overflows.
  const idealDiameter = Math.min(360, 240 + list.length * 4);
  const dotSize = Math.max(14, 34 - list.length * 0.9);
  const radius = containerSize / 2 - dotSize / 2 - 6;

  const transitionStyle = noTransition
    ? 'none'
    : spinning
      ? reducedMotion
        ? `transform ${REDUCED_SHUFFLE_MS}ms ease-out`
        : `transform ${SPIN_MS}ms ${SPIN_EASING}`
      : `transform ${reducedMotion ? REDUCED_STEP_MS : STEP_MS}ms ease`;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div
          role="tablist"
          aria-label="Project view"
          className="inline-flex rounded-full border border-border bg-muted/40 p-1 text-sm"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'featured'}
            onClick={() => handleModeChange('featured')}
            disabled={featured.length === 0}
            className={`px-3 py-1.5 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
              mode === 'featured' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            Featured
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'all'}
            onClick={() => handleModeChange('all')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              mode === 'all' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            All projects ({projects.length})
          </button>
        </div>
      </div>

      {list.length === 0 || !selectedProject ? (
        <p className="text-sm text-foreground/60">No projects to show.</p>
      ) : (
        <div className="grid gap-6 md:gap-10 md:grid-cols-[minmax(0,320px)_1fr] items-center">
          <div className="flex flex-col items-center gap-4">
            <div
              ref={wheelWrapRef}
              className="relative"
              style={{ width: `min(${idealDiameter}px, 90vw)`, aspectRatio: '1 / 1' }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-3 rounded-full border border-border/60 bg-muted/20"
              />
              <div
                className="absolute inset-0"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: transitionStyle,
                  pointerEvents: spinning ? 'none' : undefined,
                }}
              >
                {list.map((project, i) => {
                  const baseAngle = i * anglePerDot - 90;
                  const isSelected = project.id === selectedId;
                  return (
                    <div
                      key={project.id}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${baseAngle}deg) translateY(-${radius}px)`,
                      }}
                    >
                      <div
                        style={{
                          transform: `rotate(${-(baseAngle + rotation)}deg)`,
                          transition: transitionStyle,
                        }}
                      >
                        <button
                          type="button"
                          aria-label={project.name}
                          aria-current={isSelected ? 'true' : undefined}
                          aria-disabled={spinning}
                          tabIndex={spinning ? -1 : 0}
                          onClick={() => selectIndex(i)}
                          className="rounded-full flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                          style={{
                            width: dotSize,
                            height: dotSize,
                            pointerEvents: spinning ? 'none' : 'auto',
                            background: statusDotColors[project.status],
                            boxShadow: isSelected
                              ? '0 0 0 3px var(--background, #fff), 0 0 0 5px currentColor'
                              : 'none',
                            color: statusDotColors[project.status],
                          }}
                        >
                          {projectIcon(project.name) && (
                            <span
                              aria-hidden="true"
                              className="text-white [&>svg]:block [&>svg]:w-full [&>svg]:h-full"
                              style={{ width: dotSize * 0.6, height: dotSize * 0.6 }}
                            >
                              {projectIcon(project.name)}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <span className="text-xs text-foreground/50 tabular-nums">
              {selectedIndex + 1} / {list.length}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous project"
                aria-disabled={spinning}
                disabled={spinning}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={shuffle}
                aria-disabled={spinning || list.length < 2}
                disabled={spinning || list.length < 2}
                className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span aria-hidden="true">🔀</span> Surprise me
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next project"
                aria-disabled={spinning}
                disabled={spinning}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &rarr;
              </button>
            </div>
            <p className="text-xs text-foreground/40">
              {statusLabels[selectedProject.status]} &middot; dot color shows status
            </p>
          </div>

          <article className="relative overflow-hidden border border-border bg-muted/40 rounded-lg dark:rounded-2xl dark:backdrop-blur-xl flex flex-col">
            <ProjectDetail
              project={selectedProject}
              headerClassName="aspect-[16/9] md:aspect-[21/9]"
              liveRegion
            />
          </article>
        </div>
      )}
    </div>
  );
}
