import Link from 'next/link';
import type { Metadata } from 'next';
import { getMinistries } from '../../lib/vision';
import { getSiteUrl } from '../../lib/site-url';
import { ThemeToggle } from '../_components/theme-toggle';

export const revalidate = 300; // re-fetch at most every 5 minutes

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Vision for Malaysia — Software for Every Ministry',
  description:
    'A planning board mapping Malaysian government ministries to software that can solve real problems — from education to housing to public services. Submit your own problem and idea.',
  alternates: { canonical: `${SITE_URL}/vision` },
  openGraph: {
    title: 'Vision for Malaysia — Software for Every Ministry',
    description:
      'Mapping Malaysian government ministries to software that can solve real problems. Submit your own problem and idea.',
    url: `${SITE_URL}/vision`,
    type: 'website',
  },
};

export default async function VisionPage() {
  const ministries = await getMinistries();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Vision for Malaysia — Software for Every Ministry',
    description:
      'Mapping Malaysian government ministries to software that can solve real problems.',
    url: `${SITE_URL}/vision`,
    hasPart: ministries.map((m) => ({
      '@type': 'WebPage',
      name: m.name,
      url: `${SITE_URL}/vision/${m.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            Taufik&apos;s Portfolio
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Improving Malaysia through software
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl text-balance">
            Every government ministry faces problems software can help solve. This is a
            living plan — each ministry maps to real problems and the software that could
            address them. Have an idea? Pick a ministry and submit it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Ministries</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((m) => (
              <Link
                key={m.id}
                href={`/vision/${m.slug}`}
                className="block border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <h3 className="font-semibold mb-1">{m.name}</h3>
                {m.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                    {m.description}
                  </p>
                )}
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  {m.initiative_count > 0
                    ? `${m.initiative_count} initiative${m.initiative_count > 1 ? 's' : ''} →`
                    : 'Be the first to suggest →'}
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
