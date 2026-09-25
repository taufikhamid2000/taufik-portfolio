'use client';

import Image from 'next/image';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { statusDotColors, statusLabels } from '../../../lib/project-status';
import type { ProjectStatus } from '../../../lib/projects';
import type { PesProject } from './PesApp';
import { useT } from './PesLocale';
import { useAutoFocus } from './useAutoFocus';
import { useDetailView } from './useDetailView';

export type ProjectsMode = 'projects' | 'featured' | 'archive';

const STATUS_ORDER: ProjectStatus[] = ['active', 'in-progress', 'in-portfolio'];

// Short "position" tag shown on each card, like a player's position in PES.
const STATUS_TAG: Record<ProjectStatus, string> = {
  active: 'ACT',
  'in-progress': 'DEV',
  'in-portfolio': 'PRT',
  concept: 'IDEA',
  archived: 'ARC',
};

const asStatus = (s: string) => s as ProjectStatus;

const Card = memo(function Card({
  project,
  selected,
  index,
  onSelect,
}: {
  project: PesProject;
  selected: boolean;
  index: number;
  onSelect: (i: number) => void;
}) {
  const status = asStatus(project.status);
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      data-index={index}
      className="pes-card"
      onClick={() => onSelect(index)}
    >
      <span className="pes-card-tag" style={{ background: statusDotColors[status] }}>
        {STATUS_TAG[status]}
      </span>
      <span className="pes-card-main">
        <span className="pes-card-name">{project.name}</span>
        <span className="pes-card-sub">{project.tech.slice(0, 3).join(' · ') || project.tagline}</span>
      </span>
      <span className="pes-card-dot" style={{ background: statusDotColors[status] }} aria-hidden="true" />
    </button>
  );
});

export default function ProjectsScreen({
  mode,
  projects,
  onBack,
}: {
  mode: ProjectsMode;
  projects: PesProject[];
  onBack: () => void;
}) {
  const base = useMemo(() => {
    if (mode === 'featured') return projects.filter((p) => p.featured && p.status !== 'archived');
    if (mode === 'archive') return projects.filter((p) => p.status === 'archived');
    return projects.filter((p) => p.status !== 'archived');
  }, [mode, projects]);

  // Filter tabs only make sense on the full Projects list.
  const tabs = useMemo<string[]>(() => {
    if (mode !== 'projects') return [];
    const present = STATUS_ORDER.filter((s) => base.some((p) => p.status === s));
    return ['all', ...present];
  }, [mode, base]);

  const [tab, setTab] = useState<string>('all');
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const dv = useDetailView(onBack);
  const tr = useT();
  const focusRef = useAutoFocus<HTMLDivElement>();

  const visible = useMemo(
    () => (tab === 'all' ? base : base.filter((p) => p.status === tab)),
    [base, tab],
  );

  const selected = visible[Math.min(index, Math.max(visible.length - 1, 0))];

  const changeTab = useCallback(
    (delta: number) => {
      if (tabs.length < 2) return;
      const i = tabs.indexOf(tab);
      setTab(tabs[(i + delta + tabs.length) % tabs.length]);
      setIndex(0);
    },
    [tabs, tab],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, visible.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        changeTab(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        changeTab(-1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const url = selected?.demo_url ?? selected?.github_url;
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible.length, changeTab, selected]);

  // Keep the selected card visible by scrolling only the list container.
  useEffect(() => {
    const list = listRef.current;
    const card = list?.querySelector<HTMLElement>(`.pes-card[data-index="${index}"]`);
    if (!list || !card) return;
    const l = list.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    if (c.top < l.top) list.scrollBy({ top: c.top - l.top - 8, behavior: 'smooth' });
    else if (c.bottom > l.bottom) list.scrollBy({ top: c.bottom - l.bottom + 8, behavior: 'smooth' });
  }, [index]);

  const status = selected ? asStatus(selected.status) : null;

  return (
    <div className="pes-full pes-enter" role="dialog" aria-modal="true" aria-label={tr.menu[mode].title} tabIndex={-1} ref={focusRef}>
      <div className="pes-full-head">
        <h2 className="pes-full-title">{tr.menu[mode].title}</h2>
        <span className="pes-full-count">{visible.length}</span>
        {tabs.length > 0 && (
          <div className="pes-tabs" role="tablist">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                className="pes-tab"
                onClick={() => {
                  setTab(t);
                  setIndex(0);
                }}
              >
                {t === 'all' ? tr.projects.all : (tr.projects.statuses[t] ?? statusLabels[asStatus(t)])}
              </button>
            ))}
          </div>
        )}
        <button type="button" className="pes-btn pes-btn--ghost pes-full-back" onClick={dv.back}>
          {tr.backBtn}
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="pes-empty">{tr.projects.empty}</p>
      ) : (
        <div className="pes-full-body" data-view={dv.view}>
          <div className="pes-list" role="listbox" aria-label="Projects" ref={listRef}>
            {visible.map((p, i) => (
              <Card
                key={p.id}
                project={p}
                index={i}
                selected={i === Math.min(index, visible.length - 1)}
                onSelect={(n) => {
                  setIndex(n);
                  dv.openDetail();
                }}
              />
            ))}
          </div>

          {selected && status && (
            <article className="pes-detail" key={selected.id}>
              <button type="button" className="pes-btn pes-btn--ghost pes-detail-back" onClick={dv.closeDetail}>
                &larr; {tr.projects.list}
              </button>
              <div className="pes-detail-shot">
                {!selected.image_url && (
                  <div className="pes-detail-fallback" aria-hidden="true">
                    {selected.name
                      .split(/\s+/)
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 3)
                      .toUpperCase()}
                  </div>
                )}
                {selected.image_url && (
                  <Image
                    src={selected.image_url}
                    alt={`${selected.name} screenshot`}
                    fill
                    sizes="(max-width: 900px) 92vw, 560px"
                    className="pes-detail-img"
                  />
                )}
                <div className="pes-detail-shade" />
                <span className="pes-detail-status" style={{ background: statusDotColors[status] }}>
                  {tr.projects.statuses[status] ?? statusLabels[status]}
                </span>
              </div>
              <h3 className="pes-detail-name">{selected.name}</h3>
              <p className="pes-detail-tag">{selected.tagline}</p>
              <p className="pes-detail-desc">{selected.description}</p>
              {selected.tech.length > 0 && (
                <ul className="pes-chips" aria-label="Tech">
                  {selected.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              <div className="pes-screen-actions">
                {selected.demo_url && (
                  <a className="pes-btn" href={selected.demo_url} target="_blank" rel="noopener noreferrer">
                    {tr.projects.demo}
                  </a>
                )}
                {selected.github_url && (
                  <a className="pes-btn pes-btn--ghost" href={selected.github_url} target="_blank" rel="noopener noreferrer">
                    {tr.projects.github}
                  </a>
                )}
              </div>
            </article>
          )}
        </div>
      )}

      <div className="pes-hints pes-hints--screen" aria-hidden="true">
        <span className="pes-hint">
          <span className="pes-key pes-key--arrows">&uarr;&darr;</span> {tr.hints.player}
        </span>
        {tabs.length > 0 && (
          <span className="pes-hint">
            <span className="pes-key pes-key--arrows">&larr;&rarr;</span> {tr.hints.filter}
          </span>
        )}
        <span className="pes-hint">
          <span className="pes-key">&#8629;</span> {tr.hints.open}
        </span>
        <span className="pes-hint">
          <span className="pes-key pes-key--back">Esc</span> {tr.hints.back}
        </span>
      </div>
    </div>
  );
}
