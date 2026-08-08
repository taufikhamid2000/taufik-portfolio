import Link from 'next/link';
import Reveal from '../../_components/Reveal';
import TiltWrapper from '../../_components/TiltWrapper';
import { dict, localePrefix, type Locale } from '../../../lib/i18n';
import type { InitiativeStatus, InitiativeWithMinistry } from '../../../lib/vision';

const STATUS_ORDER: InitiativeStatus[] = ['active', 'planned', 'concept'];

const STATUS_BADGE_CLASS: Record<InitiativeStatus, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  planned: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  concept: 'bg-muted text-foreground/70',
};

export function InitiativesList({
  locale,
  initiatives,
  siteUrl,
}: {
  locale: Locale;
  initiatives: InitiativeWithMinistry[];
  siteUrl: string;
}) {
  const t = dict[locale];
  const prefix = localePrefix(locale);
  const statusLabel: Record<InitiativeStatus, string> = {
    active: t.statusActive,
    planned: t.statusPlanned,
    concept: t.statusConcept,
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.allInitiativesTitle,
    url: `${siteUrl}${prefix}/vision/initiatives`,
  };

  return (
    <div className="animate-page-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Reveal>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">{t.allInitiativesTitle}</h1>
        <p className="text-foreground/60 mb-10">{t.allInitiativesIntro}</p>
      </Reveal>

      {initiatives.length === 0 ? (
        <p className="text-sm text-foreground/50 border border-dashed border-border rounded-lg dark:rounded-2xl bg-muted/40 p-6">
          {t.noInitiativesGlobal}
        </p>
      ) : (
        STATUS_ORDER.map((status) => {
          const group = initiatives.filter((i) => i.status === status);
          if (group.length === 0) return null;

          return (
            <section key={status} className="mb-12">
              <Reveal>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {statusLabel[status]}
                  <span className="text-sm font-normal text-foreground/40">({group.length})</span>
                </h2>
              </Reveal>
              <div className="columns-1 gap-4 lg:columns-2">
                {group.map((initiative, i) => {
                  const featured = Boolean(initiative.project);
                  return (
                    <div key={initiative.id} className="mb-4 break-inside-avoid">
                      <Reveal delay={i * 60}>
                        <TiltWrapper className="rounded-lg dark:rounded-2xl">
                          <article
                            className={`border border-border bg-muted/40 rounded-lg dark:rounded-2xl dark:bg-white/[0.03] dark:backdrop-blur-xl ${
                              featured ? 'p-6' : 'p-4'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <Link
                                href={`${prefix}/vision/${initiative.ministry.slug}`}
                                className="text-xs text-primary dark:text-cyan-300 hover:underline"
                              >
                                {initiative.ministry.name}
                              </Link>
                              <span
                                className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${STATUS_BADGE_CLASS[status]}`}
                              >
                                {statusLabel[status]}
                              </span>
                            </div>
                            <p className={`${featured ? 'text-sm' : 'text-xs'} mb-2 text-foreground/80`}>
                              {initiative.problem}
                            </p>
                            <p className={`${featured ? 'text-sm' : 'text-xs'} text-foreground/60`}>
                              {initiative.idea}
                            </p>
                            {initiative.project && (
                              <div className="flex flex-wrap items-center gap-3 text-sm pt-3 mt-3 border-t border-border">
                                <span className="text-foreground/50">
                                  {t.poweredBy} <span className="font-medium text-foreground/70">{initiative.project.name}</span>
                                </span>
                                {initiative.project.github_url && (
                                  <a
                                    href={initiative.project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary dark:text-cyan-300 hover:underline"
                                  >
                                    GitHub →
                                  </a>
                                )}
                                {initiative.project.demo_url && (
                                  <a
                                    href={initiative.project.demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary dark:text-cyan-300 hover:underline"
                                  >
                                    Demo →
                                  </a>
                                )}
                              </div>
                            )}
                          </article>
                        </TiltWrapper>
                      </Reveal>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
