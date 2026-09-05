import Link from 'next/link';
import { SITE } from '../../lib/site';
import { LogoMark } from './logo-mark';

const FEATURES = [
  'Next.js/TypeScript, ASP.NET Core, Kotlin',
  'Malaysian problems: tax relief, queueing, surveys',
  'Built and shipped end to end, solo',
];

// Split-screen branding panel shared shape across the owner's projects (see
// DESIGN.md "Auth pages" in the template repo) — this instance is the
// portfolio's own pitch, since /login here is an owner-only admin gate, not
// a public product signup.
export function AuthBrandingPanel() {
  return (
    <div className="relative hidden w-[42%] shrink-0 flex-col justify-between overflow-hidden bg-primary px-10 py-12 text-primary-foreground md:flex lg:w-[38%]">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/5" />

      <Link href="/" className="relative flex items-center gap-2.5">
        <LogoMark size={30} />
        <span className="text-lg font-semibold text-white">{SITE.name}</span>
      </Link>

      <div className="relative">
        <p className="text-2xl font-semibold leading-snug text-balance">
          Full-stack projects, built end to end.
        </p>
        <ul className="mt-6 flex flex-col gap-3 text-sm text-primary-foreground/80">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                <path
                  d="M3 8.5 6.5 12 13 4.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-xs text-primary-foreground/50">
        This is my own site &mdash; sign-in is for me only.{' '}
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:underline hover:text-primary-foreground/70"
        >
          See the code on GitHub &rarr;
        </a>
      </p>
    </div>
  );
}
