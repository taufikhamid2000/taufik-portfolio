'use client';

import { useEffect, useMemo, useState } from 'react';
import type { PesCommit, PesSprint } from '../types';
import { useLocale, useT } from './PesLocale';

const DAY = 86_400_000;
const ITERATIONS = 4;
const SPRINTS = 4;
const SPRINT_WEEKS = 3;

export interface Slot {
  key: string;
  label: string;
  from: number;
  to: number;
  buffer: boolean;
  sprints: PesSprint[];
  commits: PesCommit[];
}

const utc = (d: string) => {
  const [y, m, day] = d.split('-').map(Number);
  return Date.UTC(y, m - 1, day);
};

// Each iteration = 4 sprints x 3 weeks + 1 buffer week = 13 weeks; 4 x 13 = 52.
// A database sprint lands in the slot its start_date falls in.
export function buildYear(year: number, sprints: PesSprint[], commits: PesCommit[], bufferLabel: string) {
  const start = Date.UTC(year, 0, 1);
  const iterations = Array.from({ length: ITERATIONS }, (_, i) => {
    const iterStart = start + i * 13 * 7 * DAY;
    const mk = (n: number, from: number, weeks: number, buffer: boolean): Slot => {
      const to = from + weeks * 7 * DAY - DAY;
      const inSlot = sprints.filter((s) => s.start_date && utc(s.start_date) >= from && utc(s.start_date) <= to);
      const inRange = commits.filter((c) => {
        const t = new Date(c.at).getTime();
        return t >= from && t < to + DAY;
      });
      return { key: `${i}-${n}`, label: buffer ? bufferLabel : `S${i * SPRINTS + n + 1}`, from, to, buffer, sprints: inSlot, commits: inRange };
    };
    const slots = Array.from({ length: SPRINTS }, (_, n) => mk(n, iterStart + n * SPRINT_WEEKS * 7 * DAY, SPRINT_WEEKS, false));
    slots.push(mk(SPRINTS, iterStart + SPRINTS * SPRINT_WEEKS * 7 * DAY, 1, true));
    return slots;
  });
  return { iterations, other: sprints.filter((s) => !s.start_date) };
}

export default function YearCalendar({
  sprints,
  commits,
  onOpen,
}: {
  sprints: PesSprint[];
  commits: PesCommit[];
  onOpen: (slot: Slot) => void;
}) {
  const tr = useT();
  const locale = useLocale();
  const now = new Date();
  const thisYear = now.getFullYear();
  const [year, setYear] = useState(thisYear);
  const firstYear = Math.min(thisYear, ...sprints.filter((s) => s.start_date).map((s) => Number(s.start_date!.slice(0, 4))));
  const today = Date.UTC(thisYear, now.getMonth(), now.getDate());
  const { iterations, other } = useMemo(() => buildYear(year, sprints, commits, tr.sprints.buffer), [year, sprints, commits, tr]);
  const otherSlots = useMemo<Slot[]>(
    () => other.map((s) => ({ key: s.id, label: s.name, from: 0, to: 0, buffer: false, sprints: [s], commits: [] })),
    [other],
  );
  const cells = useMemo(() => [...iterations.flat(), ...otherSlots], [iterations, otherSlots]);
  const [sel, setSel] = useState(0);
  const cur = Math.min(sel, cells.length - 1);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t?.closest('.pes-sync, .pes-year-nav')) return;
      const move = (d: number) => {
        e.preventDefault();
        setSel((i) => Math.min(Math.max(Math.min(i, cells.length - 1) + d, 0), cells.length - 1));
      };
      if (e.key === 'ArrowRight') move(1);
      else if (e.key === 'ArrowLeft') move(-1);
      else if (e.key === 'ArrowDown') move(5);
      else if (e.key === 'ArrowUp') move(-5);
      else if (e.key === 'PageDown' && year < thisYear) {
        e.preventDefault();
        setYear(year + 1);
      } else if (e.key === 'PageUp' && year > firstYear) {
        e.preventDefault();
        setYear(year - 1);
      } else if (e.key === 'Enter' && cells[cur]) {
        e.preventDefault();
        onOpen(cells[cur]);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cells, cur, year, thisYear, firstYear, onOpen]);

  // Keep the highlighted cell visible by scrolling only its scroll container.
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('.pes-sprint-cell[data-selected="true"]');
    let p = el?.parentElement ?? null;
    while (p && !/(auto|scroll)/.test(getComputedStyle(p).overflowY)) p = p.parentElement;
    if (!el || !p) return;
    const c = p.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (r.top < c.top) p.scrollBy({ top: r.top - c.top - 8, behavior: 'smooth' });
    else if (r.bottom > c.bottom) p.scrollBy({ top: r.bottom - c.bottom + 8, behavior: 'smooth' });
  }, [cur, year]);

  const fmt = new Intl.DateTimeFormat(locale === 'ms' ? 'ms-MY' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const range = (r: { from: number; to: number }) => `${fmt.format(r.from)} – ${fmt.format(r.to)}`;

  return (
    <div className="pes-year">
      <div className="pes-year-nav">
        <button type="button" className="pes-btn pes-btn--ghost" disabled={year <= firstYear} onClick={() => setYear(year - 1)} aria-label={String(year - 1)}>
          &larr;
        </button>
        <b>{year}</b>
        <button type="button" className="pes-btn pes-btn--ghost" disabled={year >= thisYear} onClick={() => setYear(year + 1)} aria-label={String(year + 1)}>
          &rarr;
        </button>
      </div>
      <p className="pes-detail-tag pes-contact-intro">{tr.sprints.yearIntro(year)}</p>
      {iterations.map((slots, i) => (
        <section key={i} className="pes-iter" aria-label={`${tr.sprints.iteration} ${i + 1}`}>
          <h4 className="pes-iter-title">
            {tr.sprints.iteration} {i + 1}
            <span>{range({ from: slots[0].from, to: slots[slots.length - 1].to })}</span>
          </h4>
          <div className="pes-iter-grid">
            {slots.map((s, n) => {
              const idx = i * 5 + n;
              const count = s.sprints.reduce((n, x) => n + x.task_count, 0);
              return (
                <button
                  key={s.key}
                  type="button"
                  className={`pes-sprint-cell${s.buffer ? ' pes-sprint-cell--buffer' : ''}`}
                  aria-current={today >= s.from && today <= s.to ? 'date' : undefined}
                  data-selected={idx === cur}
                  onClick={() => onOpen(s)}
                >
                  <b>{s.label}</b>
                  <span>{range(s)}</span>
                  <em>{count > 0 ? `${count} ${tr.sprints.tasks}` : '—'}</em>
                  {s.commits.length > 0 && (
                    <em>
                      {s.commits.length} {tr.sprints.commits}
                    </em>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      ))}
      {other.length > 0 && (
        <section className="pes-iter" aria-label={tr.sprints.other}>
          <h4 className="pes-iter-title">{tr.sprints.other}</h4>
          <div className="pes-iter-grid">
            {other.map((s, k) => (
              <button
                key={s.id}
                type="button"
                className="pes-sprint-cell"
                data-selected={iterations.flat().length + k === cur}
                onClick={() => onOpen(otherSlots[k])}
              >
                <b>{s.name}</b>
                <em>
                  {s.task_count} {tr.sprints.tasks}
                </em>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
