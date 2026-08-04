import Link from 'next/link';
import { ThemeToggle } from '../../_components/theme-toggle';
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
  const otherPrefix = locale === 'ms' ? '' : '/ms';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.visionTitle,
    url: `${siteUrl}${prefix}/vision`,
    hasPart: ministries.map((m) => ({
      '@type': 'WebPage',
      name: m.name,
      url: `${siteUrl}${prefix}/vision/${m.slug}`,
    })),
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900 dark:bg-[#0a0a0f] dark:text-gray-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 hidden h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px] dark:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[20%] hidden h-96 w-96 rounded-full bg-cyan-400/10 blur-[110px] dark:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-10%] left-[-10%] hidden h-96 w-96 rounded-full bg-emerald-400/10 blur-[110px] dark:block"
      />

      <header className="relative z-10 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold dark:bg-gradient-to-r dark:from-indigo-300 dark:to-cyan-300 dark:bg-clip-text dark:text-transparent"
          >
            {t.portfolio}
          </Link>
          <div className="flex items-center gap-4">
            <Link href={`${otherPrefix}/vision`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cyan-300 transition-colors border border-gray-200 dark:border-white/10 rounded-md px-2 py-1">
              {t.langLabel}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <Reveal>
          <section className="mb-12 dark:rounded-3xl dark:border dark:border-white/10 dark:bg-white/[0.03] dark:p-10 dark:backdrop-blur-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.visionTitle}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl text-balance">{t.visionIntro}</p>
          </section>
        </Reveal>

        <section>
          <Reveal>
            <h2 className="text-2xl font-semibold mb-6">{t.ministries}</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((m, i) => (
              <Reveal key={m.id} delay={i * 80}>
                <TiltWrapper className="rounded-lg dark:rounded-2xl">
                  <Link
                    href={`${prefix}/vision/${m.slug}`}
                    className="block border border-gray-200 dark:border-white/10 rounded-lg dark:rounded-2xl dark:bg-white/[0.03] dark:backdrop-blur-xl p-5 hover:border-gray-300 dark:hover:border-indigo-400/50 transition-colors"
                  >
                    <h3 className="font-semibold mb-1">{m.name}</h3>
                    {m.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{m.description}</p>
                    )}
                    <span className="text-xs text-blue-600 dark:text-cyan-300">
                      {m.initiative_count > 0 ? t.initiativesSuffix(m.initiative_count) : t.beFirst}
                    </span>
                  </Link>
                </TiltWrapper>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-gray-200 dark:border-white/10 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-gray-600 dark:text-gray-400">
          Built with Next.js &amp; Tailwind CSS. &copy; {new Date().getFullYear()} Muhammad Taufik Bin Hamid.
        </div>
      </footer>
    </div>
  );
}
