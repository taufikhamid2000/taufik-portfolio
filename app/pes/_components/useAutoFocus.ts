'use client';

import { useEffect, useRef } from 'react';

/** Moves focus into a screen when it opens so keyboard and screen-reader users land inside it. */
export function useAutoFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return ref;
}
