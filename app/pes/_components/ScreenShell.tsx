'use client';

import { useAutoFocus } from './useAutoFocus';

export interface Hint {
  keys: string;
  label: string;
  kind?: 'arrows' | 'confirm' | 'back';
}

/** Shared frame for the full-screen PES sections: title bar, back button, key hints. */
export default function ScreenShell({
  title,
  count,
  onBack,
  hints,
  children,
}: {
  title: string;
  count?: number;
  onBack: () => void;
  hints: Hint[];
  children: React.ReactNode;
}) {
  const ref = useAutoFocus<HTMLDivElement>();
  return (
    <div className="pes-full pes-enter" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref}>
      <div className="pes-full-head">
        <h2 className="pes-full-title">{title}</h2>
        {count !== undefined && <span className="pes-full-count">{count}</span>}
        <button type="button" className="pes-btn pes-btn--ghost pes-full-back" onClick={onBack}>
          BACK
        </button>
      </div>
      {children}
      <div className="pes-hints pes-hints--screen" aria-hidden="true">
        {hints.map((h) => (
          <span className="pes-hint" key={h.label}>
            <span
              className={`pes-key ${h.kind === 'arrows' ? 'pes-key--arrows' : h.kind === 'back' ? 'pes-key--back' : ''}`}
            >
              {h.keys}
            </span>{' '}
            {h.label}
          </span>
        ))}
        <span className="pes-hint">
          <span className="pes-key pes-key--back">Esc</span> Back
        </span>
      </div>
    </div>
  );
}
