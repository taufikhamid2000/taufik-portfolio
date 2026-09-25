'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { PesLocale } from '../types';
import { useT } from './PesLocale';
import ScreenShell from './ScreenShell';

interface Option {
  id: 'language' | 'motion' | 'sound' | 'classic';
  label: string;
  value: string;
  hint: string;
}

export default function OptionsScreen({
  locale,
  reduceMotion,
  sound,
  onLocale,
  onReduceMotion,
  onSound,
  onBack,
}: {
  locale: PesLocale;
  reduceMotion: boolean;
  sound: boolean;
  onLocale: (l: PesLocale) => void;
  onReduceMotion: (v: boolean) => void;
  onSound: (v: boolean) => void;
  onBack: () => void;
}) {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const tr = useT();
  const o = tr.options;

  const options: Option[] = [
    {
      id: 'language',
      label: o.language,
      value: locale === 'en' ? 'ENGLISH' : 'BAHASA MELAYU',
      hint: o.languageHint,
    },
    {
      id: 'motion',
      label: o.motion,
      value: reduceMotion ? o.on : o.off,
      hint: o.motionHint,
    },
    {
      id: 'sound',
      label: o.sound,
      value: sound ? o.on : o.off,
      hint: o.soundHint,
    },
    {
      id: 'classic',
      label: o.classic,
      value: o.open,
      hint: o.classicHint,
    },
  ];

  const toggle = (id: Option['id']) => {
    if (id === 'language') onLocale(locale === 'en' ? 'ms' : 'en');
    else if (id === 'motion') onReduceMotion(!reduceMotion);
    else if (id === 'sound') onSound(!sound);
    else router.push('/classic');
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
  }, [index, locale, reduceMotion, sound]);

  return (
    <ScreenShell
      title={tr.menu.settings.title}
      onBack={onBack}
      hints={[
        { keys: '↑↓', label: tr.hints.option, kind: 'arrows' },
        { keys: '←→', label: tr.hints.change, kind: 'arrows' },
      ]}
    >
      <div className="pes-list pes-options" role="listbox" aria-label={tr.menu.settings.label}>
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
