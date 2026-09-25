'use client';

import { useMemo } from 'react';
import type { PesLocale, PesSite } from '../types';
import ScreenShell from './ScreenShell';
import { useListNav } from './useListNav';

interface Row {
  label: string;
  value: string;
  href: string;
  external: boolean;
}

export default function ContactScreen({
  site,
  locale,
  onBack,
}: {
  site: PesSite;
  locale: PesLocale;
  onBack: () => void;
}) {
  const rows = useMemo<Row[]>(() => {
    const list: Row[] = [
      { label: 'EMAIL', value: site.email, href: `mailto:${site.email}`, external: false },
      { label: 'GITHUB', value: site.github.replace('https://', ''), href: site.github, external: true },
    ];
    if (site.linkedin) list.push({ label: 'LINKEDIN', value: site.linkedin.replace('https://', ''), href: site.linkedin, external: true });
    if (site.resumeUrl) list.push({ label: 'RESUME', value: 'View PDF', href: site.resumeUrl, external: true });
    list.push({
      label: 'IDEAS',
      value: 'Suggest a software idea for a ministry',
      href: `${locale === 'ms' ? '/ms' : ''}/vision`,
      external: false,
    });
    return list;
  }, [site, locale]);

  const open = (i: number) => {
    const r = rows[i];
    if (!r) return;
    if (r.external) window.open(r.href, '_blank', 'noopener,noreferrer');
    else window.location.href = r.href;
  };

  const { index, setIndex, listRef } = useListNav(rows.length, open);

  return (
    <ScreenShell
      title="CONTACT"
      onBack={onBack}
      hints={[
        { keys: '↑↓', label: 'Select', kind: 'arrows' },
        { keys: '↵', label: 'Open', kind: 'confirm' },
      ]}
    >
      <p className="pes-detail-tag pes-contact-intro">
        Hiring for a full-stack or backend role, or want to talk through one of these projects? Drop me a line.
      </p>
      <div className="pes-list pes-contact-list" role="listbox" aria-label="Contact" ref={listRef}>
        {rows.map((r, i) => (
          <a
            key={r.label}
            role="option"
            aria-selected={i === index}
            data-index={i}
            className="pes-card pes-contact-row"
            href={r.href}
            {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') setIndex(i);
            }}
          >
            <span className="pes-card-tag" style={{ background: '#6cb0ff' }}>
              {r.label}
            </span>
            <span className="pes-card-main">
              <span className="pes-card-name">{r.value}</span>
            </span>
          </a>
        ))}
      </div>
    </ScreenShell>
  );
}
