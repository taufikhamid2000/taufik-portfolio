'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render the actual state after mount.
  useEffect(() => {
    setMounted(true);
  }, []);

  const current = mounted ? resolvedTheme : undefined;
  const isDark = current === 'dark';

  // Cycle: system -> light -> dark -> system
  function cycle() {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  }

  const label = !mounted
    ? 'Toggle theme'
    : theme === 'system'
      ? `System (${resolvedTheme})`
      : isDark
        ? 'Dark'
        : 'Light';

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Switch theme — current: ${label}`}
      title={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
    >
      {/* Render both icons; visibility controlled by dark class to avoid SSR mismatch */}
      <SunIcon className="w-4 h-4 dark:hidden" />
      <MoonIcon className="w-4 h-4 hidden dark:block" />
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
