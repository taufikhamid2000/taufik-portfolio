import { SITE } from '../../lib/site';
import ContactLinks from './ContactLinks';
import Hero3DLoader from './Hero3DLoader';
import TextScramble from './TextScramble';

/**
 * Home-page hero: name, a short specific intro, role/location/availability
 * chips, and contact links. Server component — TextScramble and
 * Hero3DLoader are client components rendered inside it.
 */
export default function HeroIntro() {
  const chips = [SITE.role, SITE.location, SITE.availability];

  return (
    <section className="relative mb-16 overflow-hidden dark:rounded-3xl dark:border dark:border-white/10 dark:bg-white/[0.03] dark:p-10 dark:backdrop-blur-xl">
      <div aria-hidden="true" className="absolute inset-0 hidden dark:motion-safe:block">
        <Hero3DLoader />
      </div>
      <div className="relative z-10 sm:max-w-xl dark:[text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
          Hi, I&apos;m{' '}
          <TextScramble
            text={SITE.name}
            className="dark:bg-gradient-to-r dark:from-indigo-300 dark:via-cyan-300 dark:to-indigo-300 dark:bg-[length:200%_auto] dark:bg-clip-text dark:text-transparent dark:motion-safe:animate-gradient-shimmer"
          />
        </h1>

        <p className="text-lg text-foreground/75 text-balance mb-3">
          A full-stack developer based in {SITE.location}. I build products end to end &mdash;
          Next.js/TypeScript front-ends, ASP.NET Core and Supabase back-ends, and native Android
          in Kotlin.
        </p>
        <p className="text-base text-foreground/65 text-balance mb-3">
          Most of my projects tackle specifically Malaysian problems: personal finance and LHDN
          tax relief, government queueing, and student surveys.
        </p>
        <p className="text-base text-foreground/65 mb-6">
          Currently: <span className="text-foreground">{SITE.availability.toLowerCase()}</span>.
        </p>

        <ul className="mb-6 flex flex-wrap gap-2" aria-label="At a glance">
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground/70 dark:border-white/10 dark:bg-white/[0.04]"
            >
              {chip}
            </li>
          ))}
        </ul>

        <ContactLinks />
      </div>
    </section>
  );
}
