'use client';

import { useState } from 'react';
import type { PesSprint } from '../types';
import YearCalendar from './YearCalendar';
import ScreenShell from './ScreenShell';
import { useT } from './PesLocale';
import { useDetailView } from './useDetailView';
import { useListNav } from './useListNav';

const STATUS_COLOR: Record<PesSprint['status'], string> = {
  active: '#22c55e',
  planned: '#3b82f6',
  completed: '#9ca3af',
  cancelled: '#6b7280',
};
const STATUS_TAG: Record<PesSprint['status'], string> = {
  active: 'LIVE',
  planned: 'NEXT',
  completed: 'DONE',
  cancelled: 'VOID',
};

function fmt(d: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function SprintsScreen({
  sprints,
  isOwner,
  onBack,
}: {
  sprints: PesSprint[];
  isOwner: boolean;
  onBack: () => void;
}) {
  const { index, setIndex, listRef } = useListNav(sprints.length);
  const dv = useDetailView(onBack);
  const tr = useT();
  const [tab, setTab] = useState<'list' | 'year'>('list');
  const selected = sprints[index];

  if (!isOwner) {
    return (
      <ScreenShell title={tr.menu.sprints.title} onBack={onBack} hints={[]}>
        <div className="pes-locked">
          <div className="pes-locked-icon" aria-hidden="true">
            <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="10" y="24" width="36" height="26" rx="3" />
              <path d="M18 24v-6a10 10 0 0120 0v6" />
            </svg>
          </div>
          <h3>{tr.sprints.lockedTitle}</h3>
          <p>{tr.sprints.lockedText}</p>
          <div className="pes-screen-actions">
            <a className="pes-btn" href="/login">
              {tr.sprints.signIn}
            </a>
          </div>
        </div>
      </ScreenShell>
    );
  }

  const pct = selected && selected.task_count > 0 ? Math.round((selected.done_count / selected.task_count) * 100) : 0;

  return (
    <ScreenShell
      title={tr.menu.sprints.title}
      count={sprints.length}
      onBack={dv.back}
      hints={[{ keys: '↑↓', label: tr.hints.sprint, kind: 'arrows' }]}
    >
      <div className="pes-tabs" role="tablist">
        {(['list', 'year'] as const).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} className="pes-tab" onClick={() => setTab(t)}>
            {t === 'list' ? tr.sprints.tabList : tr.sprints.tabYear}
          </button>
        ))}
      </div>
      {tab === 'year' ? (
        <YearCalendar />
      ) : sprints.length === 0 ? (
        <p className="pes-empty">{tr.sprints.empty}</p>
      ) : (
        <div className="pes-full-body" data-view={dv.view}>
          <div className="pes-list" role="listbox" aria-label="Sprints" ref={listRef}>
            {sprints.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="option"
                aria-selected={i === index}
                data-index={i}
                className="pes-card"
                onClick={() => {
                  setIndex(i);
                  dv.openDetail();
                }}
              >
                <span className="pes-card-tag" style={{ background: STATUS_COLOR[s.status] }}>
                  {STATUS_TAG[s.status]}
                </span>
                <span className="pes-card-main">
                  <span className="pes-card-name">{s.name}</span>
                  <span className="pes-card-sub">
                    {s.done_count}/{s.task_count} {tr.sprints.tasks}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {selected && (
            <article className="pes-detail" key={selected.id}>
              <button type="button" className="pes-btn pes-btn--ghost pes-detail-back" onClick={dv.closeDetail}>
                &larr; {tr.menu.sprints.title}
              </button>
              <h3 className="pes-detail-name">{selected.name}</h3>
              {selected.goal && <p className="pes-detail-tag">{selected.goal}</p>}
              <div className="pes-stat">
                <span>{tr.sprints.progress}</span>
                <div className="pes-bar-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                  <div className="pes-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <b>{pct}%</b>
              </div>
              <dl className="pes-facts">
                <div>
                  <dt>{tr.sprints.status}</dt>
                  <dd>{selected.status}</dd>
                </div>
                <div>
                  <dt>{tr.sprints.start}</dt>
                  <dd>{fmt(selected.start_date)}</dd>
                </div>
                <div>
                  <dt>{tr.sprints.end}</dt>
                  <dd>{fmt(selected.end_date)}</dd>
                </div>
                <div>
                  <dt>{tr.sprints.taskCount}</dt>
                  <dd>
                    {selected.done_count}/{selected.task_count}
                  </dd>
                </div>
              </dl>
            </article>
          )}
        </div>
      )}
    </ScreenShell>
  );
}
