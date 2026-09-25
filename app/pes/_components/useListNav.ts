'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Up/Down selection for a vertical list, plus Enter. Scrolls only the list
 * container to keep the selection visible (scrollIntoView would also scroll
 * the overflow:hidden PES root and shift the whole scene).
 */
export function useListNav(length: number, onEnter?: (index: number) => void) {
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const clamped = Math.min(index, Math.max(length - 1, 0));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && onEnter) {
        e.preventDefault();
        onEnter(clamped);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [length, onEnter, clamped]);

  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-index="${clamped}"]`);
    if (!list || !item) return;
    const l = list.getBoundingClientRect();
    const c = item.getBoundingClientRect();
    if (c.top < l.top) list.scrollBy({ top: c.top - l.top - 8, behavior: 'smooth' });
    else if (c.bottom > l.bottom) list.scrollBy({ top: c.bottom - l.bottom + 8, behavior: 'smooth' });
  }, [clamped]);

  return { index: clamped, setIndex, listRef };
}
