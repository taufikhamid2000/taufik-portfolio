'use client';

import { useCallback, useSyncExternalStore } from 'react';

const memory: Record<string, string> = {};
const EVENT = 'pes-pref-change';

function subscribe(cb: () => void) {
  window.addEventListener('storage', cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener('storage', cb);
    window.removeEventListener(EVENT, cb);
  };
}

function read(key: string): string {
  try {
    return localStorage.getItem(key) ?? memory[key] ?? '';
  } catch {
    return memory[key] ?? '';
  }
}

/** A string preference backed by localStorage (in-memory fallback if blocked). SSR-safe: server value is ''. */
export function usePref(key: string) {
  const value = useSyncExternalStore(subscribe, () => read(key), () => '');
  const set = useCallback(
    (v: string) => {
      memory[key] = v;
      try {
        localStorage.setItem(key, v);
      } catch {
        // storage blocked: memory fallback above still works for this session
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [key],
  );
  return [value, set] as const;
}

/** Live `matchMedia(query).matches`; false on the server. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener('change', cb);
      return () => m.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
