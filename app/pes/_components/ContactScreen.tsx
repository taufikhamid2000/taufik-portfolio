'use client';

import { useMemo } from 'react';
import type { PesLocale, PesSite } from '../types';
import { useT } from './PesLocale';
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
  const tr = useT();

  const rows = useMemo<Row[]>(() => {
    const c = tr.contact;
    const list: Row[] = [
      { label: c.email, value: site.email, href: `mailto:${site.email}`, external: false },
      { label: c.github, value: site.github.replace('https://', ''), href: site.github, external: true },
    ];
    if (site.linkedin) list.push({ label: c.linkedin, value: site.linkedin.replace('https://', ''), href: site.linkedin, external: true });
    if (site.resumeUrl) list.push({ label: c.resume, value: c.viewPdf, href: site.resumeUrl, external: true });
    list.push({
      label: c.ideas,
      value: c.ideasText,
      href: `${locale === 'ms' ? '/ms' : ''}/vision`,
      external: false,
    });
    return list;
  }, [site, locale, tr]);

  const open = (i: number) => {
    const r = rows[i];
    if (!r) return;
    if (r.external) window.open(r.href, '_blank', 'noopener,noreferrer');
    else window.location.href = r.href;
  };

  const { index, setIndex, listRef } = useListNav(rows.length, open);

  return (
    <ScreenShell
      title={tr.menu.contact.title}
      onBack={onBack}
      hints={[
        { keys: '↑↓', label: tr.hints.select, kind: 'arrows' },
        { keys: '↵', label: tr.hints.open, kind: 'confirm' },
      ]}
    >
      <p className="pes-detail-tag pes-contact-intro">{tr.contact.intro}</p>
      <div className="pes-list pes-contact-list" role="listbox" aria-label={tr.menu.contact.label} ref={listRef}>
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
