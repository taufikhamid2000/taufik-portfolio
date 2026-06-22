import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMinistryBySlug, getMinistrySlugs } from '../../../lib/vision';
import { getSiteUrl } from '../../../lib/site-url';
import { ThemeToggle } from '../../_components/theme-toggle';
import { submitIdea } from '../actions';

export const revalidate = 300;

const SITE_URL = getSiteUrl();

const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  planned: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  concept: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
};

export async function generateStaticParams() {
  const slugs = await getMinistrySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getMinistryBySlug(slug);
  if (!data) return { title: 'Ministry not found' };

  const title = `${data.ministry.name} — Software Solutions | Vision for Malaysia`;
  const description =
    data.ministry.description ??
    `Problems and software ideas for the ${data.ministry.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/vision/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/vision/${slug}`,
      type: 'article',
    },
  };
}

export default async function MinistryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ submitted?: string; error?: string }>;
}) {
  const { slug } = await params;
  const { submitted, error } = await searchParams;
  const data = await getMinistryBySlug(slug);
  if (!data) notFound();

  const { ministry, initiatives, submissions } = data;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: ministry.name,
    description: ministry.description ?? undefined,
    url: `${SITE_URL}/vision/${slug}`,
    isPartOf: { '@type': 'CollectionPage', url: `${SITE_URL}/vision` },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/vision" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            &larr; All ministries
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">{ministry.name}</h1>
          {ministry.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 text-balance">
              {ministry.description}
            </p>
          )}
        </section>

        {/* Curated initiatives */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Problems &amp; software ideas</h2>
          {initiatives.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
              No initiatives mapped yet. Be the first to suggest one below.
            </p>
          ) : (
            <div className="space-y-4">
              {initiatives.map((i) => (
                <article key={i.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold">Problem</h3>
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[i.status]}`}>
                      {i.status}
                    </span>
                  </div>
                  <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">{i.problem}</p>
                  <h3 className="font-semibold mb-1">Idea</h3>
                  <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">{i.idea}</p>
                  {i.project && (
                    <div className="flex flex-wrap items-center gap-3 text-sm pt-2 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-gray-500 dark:text-gray-400">Powered by <span className="font-medium text-gray-700 dark:text-gray-300">{i.project.name}</span></span>
                      {i.project.github_url && (
                        <a href={i.project.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub →</a>
                      )}
                      {i.project.demo_url && (
                        <a href={i.project.demo_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Demo →</a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Approved community submissions */}
        {submissions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">From the community</h2>
            <div className="space-y-4">
              {submissions.map((s) => (
                <article key={s.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 bg-gray-50 dark:bg-gray-900/40">
                  <p className="text-sm mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Problem:</span> {s.problem}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold">Idea:</span> {s.idea}</p>
                  {s.submitter_name && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">— {s.submitter_name}</p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Submission form */}
        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-semibold mb-2">Have an idea for this ministry?</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
            Submit a problem and how software could solve it. Submissions are reviewed before they appear publicly.
          </p>

          {submitted && (
            <div className="mb-5 p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-900/40 text-sm text-green-800 dark:text-green-300">
              Thanks! Your idea was submitted and will appear here once reviewed.
            </div>
          )}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40 text-sm text-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          <form action={submitIdea} className="space-y-4">
            <input type="hidden" name="ministry_slug" value={slug} />
            {/* Honeypot — hidden from humans, bots fill it */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div>
              <label htmlFor="problem" className="block text-sm font-medium mb-1.5">The problem *</label>
              <textarea id="problem" name="problem" required minLength={10} maxLength={2000} rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What problem in this ministry could software help with?" />
            </div>
            <div>
              <label htmlFor="idea" className="block text-sm font-medium mb-1.5">Your idea *</label>
              <textarea id="idea" name="idea" required minLength={10} maxLength={2000} rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="How could software solve it?" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="submitter_name" className="block text-sm font-medium mb-1.5">Your name (optional)</label>
                <input id="submitter_name" name="submitter_name" type="text" maxLength={100}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="submitter_contact" className="block text-sm font-medium mb-1.5">Contact (optional)</label>
                <input id="submitter_contact" name="submitter_contact" type="text" maxLength={200}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email or @handle" />
              </div>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Submit idea
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
