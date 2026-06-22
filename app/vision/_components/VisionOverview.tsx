import Link from 'next/link';
import { ThemeToggle } from '../../_components/theme-toggle';
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
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            {t.portfolio}
          </Link>
          <div className="flex items-center gap-4">
            <Link href={`${otherPrefix}/vision`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors border border-gray-200 dark:border-gray-800 rounded-md px-2 py-1">
              {t.langLabel}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.visionTitle}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl text-balance">{t.visionIntro}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">{t.ministries}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((m) => (
              <Link
                key={m.id}
                href={`${prefix}/vision/${m.slug}`}
                className="block border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <h3 className="font-semibold mb-1">{m.name}</h3>
                {m.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{m.description}</p>
                )}
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  {m.initiative_count > 0 ? t.initiativesSuffix(m.initiative_count) : t.beFirst}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-gray-600 dark:text-gray-400">
          Built with Next.js &amp; Tailwind CSS. &copy; {new Date().getFullYear()} Muhammad Taufik Bin Hamid.
        </div>
      </footer>
    </div>
  );
}
