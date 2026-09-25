'use client';

import { dict } from '../../../lib/i18n';
import type { PesLocale, PesVisionData } from '../types';
import ScreenShell from './ScreenShell';
import { useT } from './PesLocale';
import { useDetailView } from './useDetailView';
import { useListNav } from './useListNav';

const STATUS_COLOR = { active: '#22c55e', planned: '#eab308', concept: '#9ca3af' } as const;

export default function VisionScreen({
  data,
  locale,
  onBack,
}: {
  data: PesVisionData;
  locale: PesLocale;
  onBack: () => void;
}) {
  const t = dict[locale];
  const { ministries, initiatives } = data;
  const { index, setIndex, listRef } = useListNav(ministries.length);
  const dv = useDetailView(onBack);
  const tr = useT();
  const selected = ministries[index];
  const items = selected ? initiatives.filter((i) => i.ministry_slug === selected.slug) : [];
  const statusLabel = { active: t.statusActive, planned: t.statusPlanned, concept: t.statusConcept };
  const prefix = locale === 'ms' ? '/ms' : '';

  return (
    <ScreenShell
      title={t.ministries.toUpperCase()}
      count={ministries.length}
      onBack={dv.back}
      hints={[{ keys: '↑↓', label: tr.hints.ministry, kind: 'arrows' }]}
    >
      {ministries.length === 0 ? (
        <p className="pes-empty">{t.noInitiativesGlobal}</p>
      ) : (
        <div className="pes-full-body" data-view={dv.view}>
          <div className="pes-list" role="listbox" aria-label={t.ministries} ref={listRef}>
            {ministries.map((m, i) => (
              <button
                key={m.id}
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
                <span className="pes-card-tag" style={{ background: '#6cb0ff' }}>
                  {m.initiative_count}
                </span>
                <span className="pes-card-main">
                  <span className="pes-card-name">{m.name}</span>
                </span>
              </button>
            ))}
          </div>

          {selected && (
            <article className="pes-detail" key={selected.id}>
              <button type="button" className="pes-btn pes-btn--ghost pes-detail-back" onClick={dv.closeDetail}>
                &larr; {t.ministries.toUpperCase()}
              </button>
              <h3 className="pes-detail-name">{selected.name}</h3>
              {selected.description && <p className="pes-detail-tag">{selected.description}</p>}

              {items.length === 0 ? (
                <p className="pes-detail-desc">{t.noInitiatives}</p>
              ) : (
                <ul className="pes-initiatives">
                  {items.map((i) => (
                    <li key={i.id} className="pes-initiative">
                      <span className="pes-initiative-status" style={{ background: STATUS_COLOR[i.status] }}>
                        {statusLabel[i.status]}
                      </span>
                      <p>
                        <b>{t.problem}:</b> {i.problem}
                      </p>
                      <p>
                        <b>{t.idea}:</b> {i.idea}
                      </p>
                      {i.project_name && (
                        <p className="pes-initiative-project">
                          {t.poweredBy} {i.project_name}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              <div className="pes-screen-actions">
                <a className="pes-btn" href={`${prefix}/vision/${selected.slug}`}>
                  {t.haveIdea.toUpperCase()}
                </a>
              </div>
            </article>
          )}
        </div>
      )}
    </ScreenShell>
  );
}
