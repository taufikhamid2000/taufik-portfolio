'use client';

import { useEffect, useState } from 'react';
import type { PesSprint } from '../types';
import YearCalendar, { type Slot } from './YearCalendar';
import ScreenShell from './ScreenShell';
import { useT } from './PesLocale';


const TASK_COLOR: Record<string, string> = { todo: '#6b7280', 'in-progress': '#3b82f6', blocked: '#ef4444', done: '#22c55e' };

export default function SprintsScreen({
  sprints,
  isOwner,
  onBack,
}: {
  sprints: PesSprint[];
  isOwner: boolean;
  onBack: () => void;
}) {
  const tr = useT();
  const [slot, setSlot] = useState<Slot | null>(null);

  useEffect(() => {
    if (!slot) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setSlot(null);
      }
    }
    // Capture phase so this runs before PesApp's window listener closes the screen.
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [slot]);

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

  return (
    <ScreenShell
      title={tr.menu.sprints.title}
      onBack={slot ? () => setSlot(null) : onBack}
      hints={[]}
    >
      {slot ? (
        <div className="pes-slot">
          <h3 className="pes-detail-name">{slot.label}</h3>
          {slot.sprints.length === 0 && <p className="pes-empty">{tr.sprints.noItems}</p>}
          {slot.sprints.map((sp) => {
            const ended = !!sp.end_date && sp.end_date < new Date().toISOString().slice(0, 10);
            const pct = sp.task_count > 0 ? Math.round((sp.done_count / sp.task_count) * 100) : 0;
            return (
              <article key={sp.id} className="pes-detail">
                <h4 className="pes-detail-name">{sp.name}</h4>
                {sp.goal && <p className="pes-detail-tag">{sp.goal}</p>}
                <div className="pes-stat">
                  <span>{tr.sprints.progress}</span>
                  <div className="pes-bar-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                    <div className="pes-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <b>{pct}%</b>
                </div>
                <div className="pes-list pes-items" aria-label={tr.sprints.items}>
                  {sp.tasks.length === 0 && <p className="pes-empty">{tr.sprints.noItems}</p>}
                  {sp.tasks.map((t) => (
                    <div key={t.id} className="pes-card">
                      <span className="pes-card-tag" style={{ background: TASK_COLOR[t.status] ?? '#6b7280' }}>
                        {tr.sprints.taskStatus[t.status] ?? t.status}
                      </span>
                      <span className="pes-card-main">
                        <span className="pes-card-name">
                          {t.title}
                          {ended && t.status !== 'done' && <span className="pes-carried">{tr.sprints.carriedOver}</span>}
                        </span>
                        <span className="pes-card-sub">
                          {t.priority}
                          {t.effort != null ? ` · ${t.effort}` : ''}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <YearCalendar sprints={sprints} onOpen={setSlot} />
      )}
    </ScreenShell>
  );
}
