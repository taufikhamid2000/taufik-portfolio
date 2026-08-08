import Link from 'next/link';
import Reveal from '../../_components/Reveal';
import TiltWrapper from '../../_components/TiltWrapper';
import { submitIdea } from '../actions';
import { dict, localePrefix, type Locale } from '../../../lib/i18n';
import type { Ministry, Initiative, Submission } from '../../../lib/vision';

const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  planned: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  concept: 'bg-muted text-foreground/70',
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
  const statusLabel: Record<string, string> = {
    active: t.statusActive,
    planned: t.statusPlanned,
    concept: t.statusConcept,
  };

  return (
    <div className="animate-page-in">
      <Reveal>
        <Link
          href={`${prefix}/vision/ministries`}
          className="inline-block mb-6 text-sm text-foreground/60 hover:text-foreground transition-colors"
        >
          &larr; {t.allMinistries}
        </Link>
      </Reveal>

      <Reveal>
        <section className="mb-10 dark:rounded-3xl dark:border dark:border-white/10 dark:bg-white/[0.03] dark:p-10 dark:backdrop-blur-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">{ministry.name}</h1>
          {ministry.description && (
            <p className="text-lg text-foreground/70 text-balance">{ministry.description}</p>
          )}
        </section>
      </Reveal>

      <section className="mb-12">
        <Reveal>
          <h2 className="text-xl font-semibold mb-4">{t.problemsAndIdeas}</h2>
        </Reveal>
        {initiatives.length === 0 ? (
          <p className="text-sm text-foreground/50 border border-dashed border-border rounded-lg dark:rounded-2xl bg-muted/40 p-6">
            {t.noInitiatives}
          </p>
        ) : (
          <div className="space-y-4">
            {initiatives.map((i, idx) => (
              <Reveal key={i.id} delay={idx * 80}>
                <TiltWrapper className="rounded-lg dark:rounded-2xl">
                  <article className="border border-border bg-muted/40 rounded-lg dark:rounded-2xl dark:bg-white/[0.03] dark:backdrop-blur-xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold">{t.problem}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[i.status]}`}>{statusLabel[i.status]}</span>
                    </div>
                    <p className="text-sm mb-3 text-foreground/70">{i.problem}</p>
                    <h3 className="font-semibold mb-1">{t.idea}</h3>
                    <p className="text-sm mb-3 text-foreground/70">{i.idea}</p>
                    {i.project && (
                      <div className="flex flex-wrap items-center gap-3 text-sm pt-2 border-t border-border">
                        <span className="text-foreground/50">{t.poweredBy} <span className="font-medium text-foreground/70">{i.project.name}</span></span>
                        {i.project.github_url && (
                          <a href={i.project.github_url} target="_blank" rel="noopener noreferrer" className="text-primary dark:text-cyan-300 hover:underline">GitHub →</a>
                        )}
                        {i.project.demo_url && (
                          <a href={i.project.demo_url} target="_blank" rel="noopener noreferrer" className="text-primary dark:text-cyan-300 hover:underline">Demo →</a>
                        )}
                      </div>
                    )}
                  </article>
                </TiltWrapper>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {submissions.length > 0 && (
        <section className="mb-12">
          <Reveal>
            <h2 className="text-xl font-semibold mb-4">{t.fromCommunity}</h2>
          </Reveal>
          <div className="space-y-4">
            {submissions.map((s, idx) => (
              <Reveal key={s.id} delay={idx * 80}>
                <TiltWrapper className="rounded-lg dark:rounded-2xl">
                  <article className="border border-border rounded-lg dark:rounded-2xl p-5 bg-muted/40 dark:backdrop-blur-xl">
                    <p className="text-sm mb-2 text-foreground/70"><span className="font-semibold">{t.problem}:</span> {s.problem}</p>
                    <p className="text-sm text-foreground/70"><span className="font-semibold">{t.idea}:</span> {s.idea}</p>
                    {s.submitter_name && <p className="text-xs text-foreground/50 mt-2">— {s.submitter_name}</p>}
                  </article>
                </TiltWrapper>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-border pt-8">
        <h2 className="text-xl font-semibold mb-2">{t.haveIdea}</h2>
        <p className="text-sm text-foreground/60 mb-5">{t.submitIntro}</p>

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
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              placeholder={t.problemPlaceholder} />
          </div>
          <div>
            <label htmlFor="idea" className="block text-sm font-medium mb-1.5">{t.yourIdea}</label>
            <textarea id="idea" name="idea" required minLength={10} maxLength={2000} rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              placeholder={t.ideaPlaceholder} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="submitter_name" className="block text-sm font-medium mb-1.5">{t.yourName}</label>
              <input id="submitter_name" name="submitter_name" type="text" maxLength={100}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring" />
            </div>
            <div>
              <label htmlFor="submitter_contact" className="block text-sm font-medium mb-1.5">{t.contact}</label>
              <input id="submitter_contact" name="submitter_contact" type="text" maxLength={200}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                placeholder={t.contactPlaceholder} />
            </div>
          </div>
          <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium">
            {t.submitButton}
          </button>
        </form>
      </section>
    </div>
  );
}
