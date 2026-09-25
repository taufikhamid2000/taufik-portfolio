'use client';

import { useCallback, useRef } from 'react';

export type SoundKind = 'move' | 'confirm' | 'back';

const TONES: Record<SoundKind, { freqs: number[]; type: OscillatorType; step: number }> = {
  move: { freqs: [660], type: 'triangle', step: 0.05 },
  confirm: { freqs: [660, 990], type: 'square', step: 0.07 },
  back: { freqs: [520, 390], type: 'triangle', step: 0.07 },
};

/**
 * Tiny synthesised UI blips (Web Audio, no asset files). Silent unless
 * `enabled`. The AudioContext is created lazily on first play, which only
 * ever happens inside a user gesture, so autoplay policies are respected.
 */
export function useSound(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  return useCallback(
    (kind: SoundKind) => {
      if (!enabled) return;
      try {
        const AC =
          window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        const ctx = (ctxRef.current ??= new AC());
        if (ctx.state === 'suspended') void ctx.resume();

        const { freqs, type, step } = TONES[kind];
        const t0 = ctx.currentTime;
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const start = t0 + i * step;
          osc.type = type;
          osc.frequency.value = f;
          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(0.06, start + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + step + 0.05);
          osc.connect(gain).connect(ctx.destination);
          osc.start(start);
          osc.stop(start + step + 0.06);
        });
      } catch {
        // audio unavailable: stay silent
      }
    },
    [enabled],
  );
}
