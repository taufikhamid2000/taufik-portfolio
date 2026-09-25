'use client';

import { useEffect, useState } from 'react';
import type { PesLocale } from '../types';
import ScreenShell from './ScreenShell';

interface Option {
  id: 'language' | 'motion';
  label: string;
  value: string;
  hint: string;
}

export default function OptionsScreen({
  locale,
  reduceMotion,
  onLocale,
  onReduceMotion,
  onBack,
}: {
  locale: PesLocale;
  reduceMotion: boolean;
  onLocale: (l: PesLocale) => void;
  onReduceMotion: (v: boolean) => void;
  onBack: () => void;
}) {
  const [index, setIndex] = useState(0);

  const options: Option[] = [
    {
      id: 'language',
      label: 'LANGUAGE',
      value: locale === 'en' ? 'ENGLISH' : 'BAHASA MELAYU',
      hint: 'Language for the Vision section.',
    },
    {
      id: 'motion',
      label: 'REDUCE MOTION',
      value: reduceMotion ? 'ON' : 'OFF',
      hint: 'Turns off animations and transitions in this menu.',
    },
  ];

  const toggle = (id: Option['id']) => {
    if (id === 'language') onLocale(locale === 'en' ? 'ms' : 'en');
    else onReduceMotion(!reduceMotion);
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, options.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        toggle(options[index].id);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, locale, reduceMotion]);

  return (
    <ScreenShell
      title="OPTIONS"
      onBack={onBack}
      hints={[
        { keys: '↑↓', label: 'Option', kind: 'arrows' },
        { keys: '←→', label: 'Change', kind: 'arrows' },
      ]}
    >
      <div className="pes-list pes-options" role="listbox" aria-label="Options">
        {options.map((o, i) => (
          <button
            key={o.id}
            type="button"
            role="option"
            aria-selected={i === index}
            className="pes-card pes-option"
            onClick={() => {
              setIndex(i);
              toggle(o.id);
            }}
          >
            <span className="pes-card-main">
              <span className="pes-card-name">{o.label}</span>
              <span className="pes-card-sub">{o.hint}</span>
            </span>
            <span className="pes-option-value">{o.value}</span>
          </button>
        ))}
      </div>
    </ScreenShell>
  );
}
