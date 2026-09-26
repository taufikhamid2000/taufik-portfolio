'use client';

import { useState, useTransition } from 'react';
import { dict } from '../../../lib/i18n';
import { submitIdeaAction } from '../idea-action';
import type { PesLocale } from '../types';

// Public "have an idea?" form, shown inside the vision screen instead of linking to the classic page.
export default function IdeaForm({ slug, locale, onDone }: { slug: string; locale: PesLocale; onDone: () => void }) {
  const t = dict[locale];
  const [pending, start] = useTransition();
  const [state, setState] = useState<'idle' | 'sent' | 'short' | 'failed'>('idle');
  const msg = { short: locale === 'ms' ? 'Sila huraikan masalah dan idea (sekurang-kurangnya 10 aksara).' : 'Please describe both the problem and the idea (at least 10 characters each).', failed: locale === 'ms' ? 'Sesuatu tidak kena. Sila cuba lagi.' : 'Something went wrong. Please try again.' };

  if (state === 'sent') {
    return (
      <div className="pes-form">
        <p role="status">{t.submitted}</p>
        <button type="button" className="pes-btn pes-btn--ghost" onClick={onDone}>
          OK
        </button>
      </div>
    );
  }

  return (
    <form
      className="pes-form"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const v = (k: string) => String(f.get(k) ?? '');
        start(async () => {
          const r = await submitIdeaAction({ ministrySlug: slug, problem: v('problem'), idea: v('idea'), name: v('name'), contact: v('contact'), website: v('website') });
          setState(r.error === 'short' ? 'short' : r.error ? 'failed' : 'sent');
        });
      }}
    >
      <p>{t.submitIntro}</p>
      <label>
        {t.theProblem}
        <textarea name="problem" rows={3} required autoFocus placeholder={t.problemPlaceholder} />
      </label>
      <label>
        {t.yourIdea}
        <textarea name="idea" rows={3} required placeholder={t.ideaPlaceholder} />
      </label>
      <div className="pes-form-row">
        <label>
          {t.yourName}
          <input name="name" autoComplete="name" />
        </label>
        <label>
          {t.contact}
          <input name="contact" placeholder={t.contactPlaceholder} />
        </label>
      </div>
      {/* Honeypot: bots fill it, people never see it. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      {(state === 'short' || state === 'failed') && (
        <p role="alert" className="pes-form-error">
          {msg[state]}
        </p>
      )}
      <div className="pes-form-row">
        <button type="submit" className="pes-btn" disabled={pending}>
          {pending ? t.submitting : t.submitButton}
        </button>
        <button type="button" className="pes-btn pes-btn--ghost" onClick={onDone}>
          {locale === 'ms' ? 'BATAL' : 'CANCEL'}
        </button>
      </div>
    </form>
  );
}
