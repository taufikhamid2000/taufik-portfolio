import Link from 'next/link';
import Reveal from '../../_components/Reveal';
import TiltWrapper from '../../_components/TiltWrapper';
import { dict, localePrefix, type Locale } from '../../../lib/i18n';
import type { MinistryWithCounts } from '../../../lib/vision';

export function VisionOverview({
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

  const totalInitiatives = ministries.reduce((sum, m) => sum + m.initiative_count, 0);
  const mostActive = [...ministries].sort((a, b) => b.initiative_count - a.initiative_count).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.visionTitle,
    url: `${siteUrl}${prefix}/vision`,
  };

  return (
    <div className="animate-page-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Reveal>
        <section className="mb-10 dark:rounded-3xl dark:border dark:border-white/10 dark:bg-white/[0.03] dark:p-10 dark:backdrop-blur-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.visionTitle}</h1>
          <p className="text-lg text-foreground/70 max-w-2xl text-balance mb-6">{t.visionIntro}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-foreground/50">
            <span>
              <span className="font-semibold text-foreground">{ministries.length}</span> {t.statLabelMinistries}
            </span>
            <span>
              <span className="font-semibold text-foreground">{totalInitiatives}</span> {t.statLabelInitiatives}
            </span>
          </div>
        </section>
      </Reveal>

      <Reveal delay={80}>
        <div className="grid gap-4 sm:grid-cols-2 mb-12">
          <Link
            href={`${prefix}/vision/ministries`}
            className="block border border-border bg-muted/40 rounded-lg dark:rounded-2xl p-5 hover:border-foreground/20 dark:hover:border-indigo-400/50 transition-colors"
          >
            <h2 className="font-semibold mb-1">{t.ministries}</h2>
            <p className="text-sm text-foreground/50">{t.browseMinistries}</p>
          </Link>
          <Link
            href={`${prefix}/vision/initiatives`}
            className="block border border-border bg-muted/40 rounded-lg dark:rounded-2xl p-5 hover:border-foreground/20 dark:hover:border-indigo-400/50 transition-colors"
          >
            <h2 className="font-semibold mb-1">{t.initiativesNav}</h2>
            <p className="text-sm text-foreground/50">{t.browseInitiatives}</p>
          </Link>
        </div>
      </Reveal>

      {mostActive.some((m) => m.initiative_count > 0) && (
        <section>
          <Reveal>
            <h2 className="text-2xl font-semibold mb-6">{t.ministries}</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {mostActive.map((m, i) => (
              <Reveal key={m.id} delay={i * 80}>
                <TiltWrapper className="rounded-lg dark:rounded-2xl">
                  <Link
                    href={`${prefix}/vision/${m.slug}`}
                    className="block border border-border rounded-lg dark:rounded-2xl dark:bg-white/[0.03] dark:backdrop-blur-xl p-5 hover:border-foreground/20 dark:hover:border-indigo-400/50 transition-colors"
                  >
                    <h3 className="font-semibold mb-1">{m.name}</h3>
                    {m.description && (
                      <p className="text-sm text-foreground/50 mb-3 line-clamp-2">{m.description}</p>
                    )}
                    <span className="text-xs text-primary dark:text-cyan-300">
                      {m.initiative_count > 0 ? t.initiativesSuffix(m.initiative_count) : t.beFirst}
                    </span>
                  </Link>
                </TiltWrapper>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
