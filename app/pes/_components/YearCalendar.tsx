'use client';

import { useMemo } from 'react';
import type { PesSprint } from '../types';
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
}

const utc = (d: string) => {
  const [y, m, day] = d.split('-').map(Number);
  return Date.UTC(y, m - 1, day);
};

// Each iteration = 4 sprints x 3 weeks + 1 buffer week = 13 weeks; 4 x 13 = 52.
// A database sprint lands in the slot its start_date falls in.
export function buildYear(year: number, sprints: PesSprint[], bufferLabel: string) {
  const start = Date.UTC(year, 0, 1);
  const placed = new Set<string>();
  const iterations = Array.from({ length: ITERATIONS }, (_, i) => {
    const iterStart = start + i * 13 * 7 * DAY;
    const mk = (n: number, from: number, weeks: number, buffer: boolean): Slot => {
      const to = from + weeks * 7 * DAY - DAY;
      const inSlot = sprints.filter((s) => s.start_date && utc(s.start_date) >= from && utc(s.start_date) <= to);
      inSlot.forEach((s) => placed.add(s.id));
      return { key: `${i}-${n}`, label: buffer ? bufferLabel : `S${i * SPRINTS + n + 1}`, from, to, buffer, sprints: inSlot };
    };
    const slots = Array.from({ length: SPRINTS }, (_, n) => mk(n, iterStart + n * SPRINT_WEEKS * 7 * DAY, SPRINT_WEEKS, false));
    slots.push(mk(SPRINTS, iterStart + SPRINTS * SPRINT_WEEKS * 7 * DAY, 1, true));
    return slots;
  });
  return { iterations, other: sprints.filter((s) => !placed.has(s.id)) };
}

export default function YearCalendar({
  sprints,
  onOpen,
}: {
  sprints: PesSprint[];
  onOpen: (slot: Slot) => void;
}) {
  const tr = useT();
  const locale = useLocale();
  const now = new Date();
  const year = now.getFullYear();
  const today = Date.UTC(year, now.getMonth(), now.getDate());
  const { iterations, other } = useMemo(() => buildYear(year, sprints, tr.sprints.buffer), [year, sprints, tr]);
  const fmt = new Intl.DateTimeFormat(locale === 'ms' ? 'ms-MY' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const range = (r: { from: number; to: number }) => `${fmt.format(r.from)} – ${fmt.format(r.to)}`;

  return (
    <div className="pes-year">
      <p className="pes-detail-tag pes-contact-intro">{tr.sprints.yearIntro(year)}</p>
      {iterations.map((slots, i) => (
        <section key={i} className="pes-iter" aria-label={`${tr.sprints.iteration} ${i + 1}`}>
          <h4 className="pes-iter-title">
            {tr.sprints.iteration} {i + 1}
            <span>{range({ from: slots[0].from, to: slots[slots.length - 1].to })}</span>
          </h4>
          <div className="pes-iter-grid">
            {slots.map((s) => {
              const count = s.sprints.reduce((n, x) => n + x.task_count, 0);
              return (
                <button
                  key={s.key}
                  type="button"
                  className={`pes-sprint-cell${s.buffer ? ' pes-sprint-cell--buffer' : ''}`}
                  aria-current={today >= s.from && today <= s.to ? 'date' : undefined}
                  onClick={() => onOpen(s)}
                >
                  <b>{s.label}</b>
                  <span>{range(s)}</span>
                  <em>{count > 0 ? `${count} ${tr.sprints.tasks}` : '—'}</em>
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
            {other.map((s) => (
              <button
                key={s.id}
                type="button"
                className="pes-sprint-cell"
                onClick={() => onOpen({ key: s.id, label: s.name, from: 0, to: 0, buffer: false, sprints: [s] })}
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
