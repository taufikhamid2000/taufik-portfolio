'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { syncCommitsAction } from '../sync-action';
import type { PesCommit, PesSprint } from '../types';
import { go, readSub } from './nav';
import YearCalendar, { buildYear, type Slot } from './YearCalendar';
import ScreenShell from './ScreenShell';
import { useT } from './PesLocale';


const TASK_COLOR: Record<string, string> = { todo: '#6b7280', 'in-progress': '#3b82f6', blocked: '#ef4444', done: '#22c55e' };

export default function SprintsScreen({
  sprints,
  commits,
  isOwner,
  onBack,
}: {
  sprints: PesSprint[];
  commits: PesCommit[];
  isOwner: boolean;
  onBack: () => void;
}) {
  const tr = useT();
  // Restore the open sprint slot from the URL hash: '#sprints/<year>/<slot key>'.
  const [nav, setNav] = useState<{ cells: Slot[]; pos: number; year: number } | null>(() => {
    const [y, key] = readSub('sprints').split('/');
    const year = Number(y);
    if (!year || !key) return null;
    const { iterations, other } = buildYear(year, sprints, commits, tr.sprints.buffer);
    const cells = [...iterations.flat(), ...other.map((s) => ({ key: s.id, label: s.name, from: 0, to: 0, buffer: false, sprints: [s], commits: [] }))];
    const pos = cells.findIndex((c) => c.key === key);
    return pos < 0 ? null : { cells, pos, year };
  });
  const [initialYear] = useState(nav?.year);
  const slot = nav ? nav.cells[nav.pos] : null;
  const navKey = nav ? `${nav.year}/${nav.cells[nav.pos].key}` : '';
  useEffect(() => {
    go(navKey ? `#sprints/${navKey}` : '#sprints', 'replace');
  }, [navKey]);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const step = (d: number) => setNav((n) => (n ? { ...n, pos: Math.min(Math.max(n.pos + d, 0), n.cells.length - 1) } : n));
  const router = useRouter();
  const [pending, startSync] = useTransition();
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (!nav) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setNav(null);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopImmediatePropagation();
        const d = e.key === 'ArrowRight' ? 1 : -1;
        setNav((n) => (n ? { ...n, pos: Math.min(Math.max(n.pos + d, 0), n.cells.length - 1) } : n));
      }
    }
    // Capture phase so this runs before PesApp's window listener closes the screen.
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [nav]);

  const commitsByTask = new Map<string, PesCommit[]>();
  for (const c of commits) {
    if (!c.task_id) continue;
    const list = commitsByTask.get(c.task_id) ?? [];
    list.push(c);
    commitsByTask.set(c.task_id, list);
  }
  // Untagged commits: group by repo and day (auto-grouping), newest first.
  const groups = new Map<string, { key: string; repo: string; day: string; items: PesCommit[] }>();
  for (const c of slot?.commits ?? []) {
    if (c.task_id) continue;
    const day = c.at.slice(0, 10);
    const key = c.repo + '|' + day;
    const g = groups.get(key) ?? { key, repo: c.repo, day, items: [] };
    g.items.push(c);
    groups.set(key, g);
  }
  const unlinked = [...groups.values()].sort((a, b) => (a.day < b.day ? 1 : a.day > b.day ? -1 : a.repo.localeCompare(b.repo)));

  return (
    <ScreenShell
      title={tr.menu.sprints.title}
      onBack={slot ? () => setNav(null) : onBack}
      hints={
        slot
          ? [{ keys: '←→', label: tr.hints.sprint, kind: 'arrows' }]
          : [
              { keys: '↑↓←→', label: tr.hints.select, kind: 'arrows' },
              { keys: '↵', label: tr.hints.open, kind: 'confirm' },
              { keys: 'PgUp/Dn', label: tr.hints.year, kind: 'arrows' },
            ]
      }
    >
      {slot ? (
        <div
          className="pes-slot"
          onTouchStart={(e) => {
            touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }}
          onTouchEnd={(e) => {
            const t = touch.current;
            touch.current = null;
            if (!t) return;
            const dx = e.changedTouches[0].clientX - t.x;
            const dy = e.changedTouches[0].clientY - t.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="pes-detail-pager">
            <button type="button" className="pes-btn pes-btn--ghost" disabled={nav!.pos <= 0} onClick={() => step(-1)}>
              &larr; {tr.projects.prev}
            </button>
            <span>
              {nav!.pos + 1}/{nav!.cells.length}
            </span>
            <button type="button" className="pes-btn pes-btn--ghost" disabled={nav!.pos >= nav!.cells.length - 1} onClick={() => step(1)}>
              {tr.projects.next} &rarr;
            </button>
          </div>
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
                          T-{t.ticket_no} · {t.priority}
                          {t.effort != null ? ` · ${t.effort}` : ''}
                        </span>
                        {commitsByTask.get(t.id)?.map((c) => (
                          <span key={c.repo + c.at + c.message} className="pes-commit">
                            {c.sha && <code>{c.sha}</code>} {c.repo} — {c.message}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
          {unlinked.length > 0 && (
            <article className="pes-detail">
              <h4 className="pes-detail-name">{tr.sprints.unlinked}</h4>
              <p className="pes-detail-tag">{tr.sprints.tagHint}</p>
              {unlinked.map((g) => (
                <div key={g.key} className="pes-commit-group">
                  <b>
                    {g.repo} · {g.day} · {g.items.length}
                  </b>
                  {g.items.map((c) => (
                    <span key={c.at + c.message} className="pes-commit">
                      {c.sha && <code>{c.sha}</code>} {c.message}
                    </span>
                  ))}
                </div>
              ))}
            </article>
          )}
        </div>
      ) : (
        <>
          {isOwner && (
          <div className="pes-sync">
            <button
              type="button"
              className="pes-btn pes-btn--ghost"
              disabled={pending}
              onClick={() =>
                startSync(async () => {
                  const r = await syncCommitsAction();
                  setNote(r.error ?? tr.sprints.synced(r.added));
                  if (r.added > 0) router.refresh();
                })
              }
            >
              {pending ? tr.sprints.syncing : tr.sprints.sync}
            </button>
            {note && <span role="status">{note}</span>}
          </div>
          )}
          <YearCalendar sprints={sprints} commits={commits} initialYear={initialYear}
            onOpen={(s, all, year) => setNav({ cells: all, pos: all.indexOf(s), year })} />
        </>
      )}
    </ScreenShell>
  );
}
