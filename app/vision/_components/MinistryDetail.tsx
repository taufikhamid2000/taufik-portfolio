import Link from 'next/link';
import { ThemeToggle } from '../../_components/theme-toggle';
import { submitIdea } from '../actions';
import { dict, localePrefix, type Locale } from '../../../lib/i18n';
import type { Ministry, Initiative, Submission } from '../../../lib/vision';

const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  planned: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  concept: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
};

export function MinistryDetail({
  locale,
  slug,
  ministry,
  initiatives,
  submissions,
  submitted,
  error,
}: {
  locale: Locale;
  slug: string;
  ministry: Ministry;
  initiatives: Initiative[];
  submissions: Submission[];
  submitted?: string;
  error?: string;
}) {
  const t = dict[locale];
  const prefix = localePrefix(locale);
  const otherPrefix = locale === 'ms' ? '' : '/ms';

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900 dark:bg-[#0a0a0f] dark:text-gray-100">
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
          <Link href={`${prefix}/vision`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cyan-300 transition-colors">
            &larr; {t.allMinistries}
          </Link>
          <div className="flex items-center gap-4">
            <Link href={`${otherPrefix}/vision/${slug}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cyan-300 transition-colors border border-gray-200 dark:border-white/10 rounded-md px-2 py-1">
              {t.langLabel}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        <section className="mb-10 dark:rounded-3xl dark:border dark:border-white/10 dark:bg-white/[0.03] dark:p-10 dark:backdrop-blur-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">{ministry.name}</h1>
          {ministry.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 text-balance">{ministry.description}</p>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">{t.problemsAndIdeas}</h2>
          {initiatives.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-white/15 rounded-lg dark:rounded-2xl dark:bg-white/[0.02] dark:backdrop-blur-xl p-6">
              {t.noInitiatives}
            </p>
          ) : (
            <div className="space-y-4">
              {initiatives.map((i) => (
                <article key={i.id} className="border border-gray-200 dark:border-white/10 rounded-lg dark:rounded-2xl dark:bg-white/[0.03] dark:backdrop-blur-xl p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold">{t.problem}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[i.status]}`}>{i.status}</span>
                  </div>
                  <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">{i.problem}</p>
                  <h3 className="font-semibold mb-1">{t.idea}</h3>
                  <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">{i.idea}</p>
                  {i.project && (
                    <div className="flex flex-wrap items-center gap-3 text-sm pt-2 border-t border-gray-100 dark:border-white/10">
                      <span className="text-gray-500 dark:text-gray-400">{t.poweredBy} <span className="font-medium text-gray-700 dark:text-gray-300">{i.project.name}</span></span>
                      {i.project.github_url && (
                        <a href={i.project.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-cyan-300 hover:underline">GitHub →</a>
                      )}
                      {i.project.demo_url && (
                        <a href={i.project.demo_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-cyan-300 hover:underline">Demo →</a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        {submissions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">{t.fromCommunity}</h2>
            <div className="space-y-4">
              {submissions.map((s) => (
                <article key={s.id} className="border border-gray-200 dark:border-white/10 rounded-lg dark:rounded-2xl p-5 bg-gray-50 dark:bg-white/[0.02] dark:backdrop-blur-xl">
                  <p className="text-sm mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">{t.problem}:</span> {s.problem}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold">{t.idea}:</span> {s.idea}</p>
                  {s.submitter_name && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">— {s.submitter_name}</p>}
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-gray-200 dark:border-white/10 pt-8">
          <h2 className="text-xl font-semibold mb-2">{t.haveIdea}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">{t.submitIntro}</p>

          {submitted && (
            <div className="mb-5 p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-900/40 text-sm text-green-800 dark:text-green-300">
              {t.submitted}
            </div>
          )}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40 text-sm text-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          <form action={submitIdea} className="space-y-4">
            <input type="hidden" name="ministry_slug" value={slug} />
            <input type="hidden" name="locale" value={locale} />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div>
              <label htmlFor="problem" className="block text-sm font-medium mb-1.5">{t.theProblem}</label>
              <textarea id="problem" name="problem" required minLength={10} maxLength={2000} rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-transparent"
                placeholder={t.problemPlaceholder} />
            </div>
            <div>
              <label htmlFor="idea" className="block text-sm font-medium mb-1.5">{t.yourIdea}</label>
              <textarea id="idea" name="idea" required minLength={10} maxLength={2000} rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-transparent"
                placeholder={t.ideaPlaceholder} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="submitter_name" className="block text-sm font-medium mb-1.5">{t.yourName}</label>
                <input id="submitter_name" name="submitter_name" type="text" maxLength={100}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="submitter_contact" className="block text-sm font-medium mb-1.5">{t.contact}</label>
                <input id="submitter_contact" name="submitter_contact" type="text" maxLength={200}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-transparent"
                  placeholder={t.contactPlaceholder} />
              </div>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              {t.submitButton}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
