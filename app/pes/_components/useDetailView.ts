'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from './usePref';

/**
 * Portrait phones show one pane at a time: the list, then a full-screen
 * detail. On wider screens both panes are always visible, so this is inert.
 * While the detail is open, Esc/Backspace and the header Back button return
 * to the list instead of closing the whole screen.
 */
export function useDetailView(onBack: () => void, paused = false) {
  const [detail, setDetail] = useState(false);
  const portrait = useMediaQuery('(max-aspect-ratio: 1/1)');
  const inDetail = detail && portrait;

  const openDetail = useCallback(() => setDetail(true), []);
  const closeDetail = useCallback(() => setDetail(false), []);

  useEffect(() => {
    if (!inDetail || paused) return;
    function onKey(e: KeyboardEvent) {
      const typing = (e.target as HTMLElement | null)?.closest('input, textarea, select');
      if (e.key === 'Escape' || (e.key === 'Backspace' && !typing)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setDetail(false);
      }
    }
    // Capture phase so this runs before PesApp's window listener closes the screen.
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [inDetail, paused]);

  return {
    view: inDetail ? ('detail' as const) : ('list' as const),
    openDetail,
    closeDetail,
    back: inDetail ? closeDetail : onBack,
  };
}
