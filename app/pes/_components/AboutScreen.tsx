'use client';

import type { PesProject } from './PesApp';
import type { PesSite } from '../types';
import { useLocale, useT } from './PesLocale';
import ScreenShell from './ScreenShell';

const STACK = ['Next.js', 'TypeScript', 'ASP.NET Core', 'Supabase', 'Kotlin', 'Tailwind CSS'];

export default function AboutScreen({
  site,
  projects,
  onBack,
}: {
  site: PesSite;
  projects: PesProject[];
  onBack: () => void;
}) {
  const tr = useT();
  const locale = useLocale();
  const live = projects.filter((p) => p.status === 'active').length;
  const building = projects.filter((p) => p.status === 'in-progress').length;
  const featured = projects.filter((p) => p.featured && p.status !== 'archived').length;

  const stats: [string, number][] = [
    [tr.about.stats.projects, projects.filter((p) => p.status !== 'archived').length],
    [tr.about.stats.live, live],
    [tr.about.stats.building, building],
    [tr.about.stats.featured, featured],
  ];

  return (
    <ScreenShell title={tr.menu.about.title} onBack={onBack} hints={[]}>
      <div className="pes-full-body pes-about">
        <div className="pes-profile">
          <div className="pes-profile-badge" aria-hidden="true">
            {site.name
              .split(/\s+/)
              .map((w) => w[0])
              .join('')
              .slice(0, 2)}
          </div>
          <h3 className="pes-detail-name">{site.name}</h3>
          <p className="pes-detail-tag">{locale === 'ms' ? tr.about.role : site.role}</p>
          <p className="pes-profile-line">{site.location}</p>
          <p className="pes-profile-line">{locale === 'ms' ? tr.about.availability : site.availability}</p>
        </div>

        <article className="pes-detail">
          <p className="pes-detail-desc">{tr.about.p1(site.location)}</p>
          <p className="pes-detail-desc">{tr.about.p2}</p>

          <div className="pes-statgrid">
            {stats.map(([label, value]) => (
              <div key={label} className="pes-statbox">
                <b>{value}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <ul className="pes-chips" aria-label="Stack">
            {STACK.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </article>
      </div>
    </ScreenShell>
  );
}
