'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { signInAction, signOutAction } from '../admin-actions';
import { go } from './nav';
import ScreenShell from './ScreenShell';

// Owner sign-in. English only: it is an admin tool, not part of the public showcase.
export default function LoginScreen({ isOwner, onBack }: { isOwner: boolean; onBack: () => void }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const run = (fn: () => Promise<{ error?: string }>) =>
    start(async () => {
      const r = await fn();
      if (r.error) return setError(r.error);
      setError(null);
      router.refresh();
      onBack();
    });

  return (
    <ScreenShell title={isOwner ? 'ADMIN' : 'SIGN IN'} onBack={onBack} hints={[{ keys: '↵', label: isOwner ? 'Sign out' : 'Sign in', kind: 'confirm' }]}>
      {isOwner ? (
        <div className="pes-form">
          <p>You are signed in as the owner. Edit projects, sprints and items from their screens; review idea submissions and translations in the inbox.</p>
          <button type="button" className="pes-btn pes-btn--ghost" onClick={() => go('#inbox', 'push')}>
            INBOX
          </button>
          <button type="button" className="pes-btn pes-btn--ghost" onClick={() => go('#vision-admin', 'push')}>
            VISION EDITOR
          </button>
          <button type="button" className="pes-btn" disabled={pending} onClick={() => run(signOutAction)}>
            SIGN OUT
          </button>
        </div>
      ) : (
        <form
          className="pes-form"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            run(() => signInAction(String(f.get('email') ?? ''), String(f.get('password') ?? '')));
          }}
        >
          <label>
            Email
            <input name="email" type="email" autoComplete="username" required autoFocus />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          {error && <p role="alert" className="pes-form-error">{error}</p>}
          <button type="submit" className="pes-btn" disabled={pending}>
            {pending ? 'SIGNING IN…' : 'SIGN IN'}
          </button>
          <a className="pes-form-link" href="/auth/reset-password">
            Forgot password?
          </a>
        </form>
      )}
    </ScreenShell>
  );
}
