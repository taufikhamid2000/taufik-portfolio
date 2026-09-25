'use client';

import { useLocale, useT } from './PesLocale';

const DAY = 86_400_000;
const ITERATIONS = 4;
const SPRINTS = 4;
const SPRINT_WEEKS = 3;

// Each iteration = 4 sprints x 3 weeks + 1 buffer week = 13 weeks; 4 x 13 = 52.
function buildYear(year: number) {
  const start = Date.UTC(year, 0, 1);
  return Array.from({ length: ITERATIONS }, (_, i) => {
    const iterStart = start + i * 13 * 7 * DAY;
    const sprints = Array.from({ length: SPRINTS }, (_, s) => {
      const from = iterStart + s * SPRINT_WEEKS * 7 * DAY;
      return { from, to: from + SPRINT_WEEKS * 7 * DAY - DAY };
    });
    const bufFrom = iterStart + SPRINTS * SPRINT_WEEKS * 7 * DAY;
    return { sprints, buffer: { from: bufFrom, to: bufFrom + 7 * DAY - DAY } };
  });
}

export default function YearCalendar() {
  const tr = useT();
  const locale = useLocale();
  const now = new Date();
  const year = now.getFullYear();
  const today = Date.UTC(year, now.getMonth(), now.getDate());
  const iterations = buildYear(year);
  const fmt = new Intl.DateTimeFormat(locale === 'ms' ? 'ms-MY' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
  const range = (r: { from: number; to: number }) => `${fmt.format(r.from)} – ${fmt.format(r.to)}`;
  const isNow = (r: { from: number; to: number }) => today >= r.from && today <= r.to;

  return (
    <div className="pes-year">
      <p className="pes-detail-tag pes-contact-intro">{tr.sprints.yearIntro(year)}</p>
      {iterations.map((it, i) => (
        <section key={i} className="pes-iter" aria-label={`${tr.sprints.iteration} ${i + 1}`}>
          <h4 className="pes-iter-title">
            {tr.sprints.iteration} {i + 1}
            <span>{range({ from: it.sprints[0].from, to: it.buffer.to })}</span>
          </h4>
          <div className="pes-iter-grid">
            {it.sprints.map((s, n) => (
              <div key={n} className="pes-sprint-cell" aria-current={isNow(s) ? 'date' : undefined}>
                <b>
                  S{i * SPRINTS + n + 1}
                </b>
                <span>{range(s)}</span>
              </div>
            ))}
            <div className="pes-sprint-cell pes-sprint-cell--buffer" aria-current={isNow(it.buffer) ? 'date' : undefined}>
              <b>{tr.sprints.buffer}</b>
              <span>{range(it.buffer)}</span>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
