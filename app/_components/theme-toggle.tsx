'use client';

import { useEffect, useState, useTransition } from 'react';
import { setTheme } from '../actions/theme';
import type { Theme } from '../../lib/theme';

// Applies instantly client-side as a preview (data-theme attribute for the
// token colors, plus the legacy `.dark` class for pages not yet on the
// token system) — the server action call below just persists the cookie
// in the background, no reload needed to make it "take".
function applyTheme(theme: Theme) {
  const html = document.documentElement;
  const resolvedDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (theme === 'system') html.removeAttribute('data-theme');
  else html.setAttribute('data-theme', theme);
  html.classList.toggle('dark', resolvedDark);

  return resolvedDark;
}

export function ThemeToggle({ initialTheme = 'system' }: { initialTheme?: Theme }) {
  const [theme, setThemeLocal] = useState<Theme>(initialTheme);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [, startTransition] = useTransition();

  // Avoid a hydration mismatch — the actual resolved appearance (for
  // "system") is only knowable client-side.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setIsDark(
      theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }, [theme]);

  // Cycle: system -> light -> dark -> system
  function cycle() {
    const next: Theme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    setThemeLocal(next);
    setIsDark(applyTheme(next));
    startTransition(() => {
      setTheme(next);
    });
  }

  const label = !mounted
    ? 'Toggle theme'
    : theme === 'system'
      ? `System (${isDark ? 'dark' : 'light'})`
      : isDark
        ? 'Dark'
        : 'Light';

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Switch theme — current: ${label}`}
      title={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-border text-foreground/60 hover:text-foreground hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {mounted && isDark ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4" />}
      <span className="sr-only">{label}</span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
