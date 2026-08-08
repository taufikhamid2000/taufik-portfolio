import Link from 'next/link';
import Reveal from '../../_components/Reveal';
import TiltWrapper from '../../_components/TiltWrapper';
import { dict, localePrefix, type Locale } from '../../../lib/i18n';
import type { MinistryWithCounts } from '../../../lib/vision';

// Weight tier drives how much visual presence a ministry gets — more
// initiatives means a bigger, more detailed card. Combined with CSS
// multi-column flow (not a uniform grid), taller/shorter cards settle
// into a natural masonry instead of everyone getting the same box.
function tierFor(count: number): 'high' | 'mid' | 'low' {
  if (count >= 3) return 'high';
  if (count >= 1) return 'mid';
  return 'low';
}

const TIER_CARD_CLASS: Record<string, string> = {
  high: 'p-6',
  mid: 'p-5',
  low: 'p-4',
};

const TIER_TITLE_CLASS: Record<string, string> = {
  high: 'text-xl font-semibold mb-2',
  mid: 'font-semibold mb-1',
  low: 'text-sm font-semibold mb-1',
};

const TIER_DESC_CLASS: Record<string, string> = {
  high: 'text-sm text-foreground/60 mb-4',
  mid: 'text-sm text-foreground/50 mb-3 line-clamp-2',
  low: 'text-xs text-foreground/50 mb-2 line-clamp-1',
};

export function MinistriesList({
  locale,
  ministries,
  siteUrl,
}: {
  locale: Locale;
  ministries: MinistryWithCounts[];
  siteUrl: string;
}) {
  const t = dict[locale];
  const prefix = localePrefix(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.ministries,
    url: `${siteUrl}${prefix}/vision/ministries`,
    hasPart: ministries.map((m) => ({
      '@type': 'WebPage',
      name: m.name,
      url: `${siteUrl}${prefix}/vision/${m.slug}`,
    })),
  };

  return (
    <div className="animate-page-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Reveal>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">{t.ministries}</h1>
        <p className="text-foreground/60 mb-8">{t.ministriesIntro}</p>
      </Reveal>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {ministries.map((m, i) => {
          const tier = tierFor(m.initiative_count);
          return (
            <div key={m.id} className="mb-4 break-inside-avoid">
              <Reveal delay={i * 60}>
                <TiltWrapper className="rounded-lg dark:rounded-2xl">
                  <Link
                    href={`${prefix}/vision/${m.slug}`}
                    className={`block border border-border bg-muted/40 rounded-lg dark:rounded-2xl dark:bg-white/[0.03] dark:backdrop-blur-xl hover:border-foreground/20 dark:hover:border-indigo-400/50 transition-colors ${TIER_CARD_CLASS[tier]}`}
                  >
                    <h2 className={TIER_TITLE_CLASS[tier]}>{m.name}</h2>
                    {m.description && tier !== 'low' && (
                      <p className={TIER_DESC_CLASS[tier]}>{m.description}</p>
                    )}
                    <span className="text-xs text-primary dark:text-cyan-300">
                      {m.initiative_count > 0 ? t.initiativesSuffix(m.initiative_count) : t.beFirst}
                    </span>
                  </Link>
                </TiltWrapper>
              </Reveal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
