'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import {
  deleteSubmissionAction,
  loadInboxAction,
  setSubmissionStatusAction,
  translateMissingAction,
  type Inbox,
  type Result,
} from '../admin-actions';
import ScreenShell from './ScreenShell';

const STATUS_COLOR: Record<string, string> = { pending: '#eab308', approved: '#22c55e', rejected: '#6b7280' };

// Owner inbox: public idea submissions and missing Malay translations. English only (admin tool).
export default function InboxScreen({ onBack }: { onBack: () => void }) {
  const [data, setData] = useState<Inbox | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const reload = useCallback(() => loadInboxAction().then(setData), []);
  useEffect(() => {
    let live = true;
    loadInboxAction().then((d) => live && setData(d));
    return () => {
      live = false;
    };
  }, []);

  const run = (fn: () => Promise<Result>) =>
    start(async () => {
      const r = await fn();
      setNote(r.error ?? null);
      await reload();
    });

  const pendingSubs = data?.submissions.filter((s) => s.status === 'pending') ?? [];
  const reviewed = data?.submissions.filter((s) => s.status !== 'pending') ?? [];

  const card = (s: NonNullable<typeof data>['submissions'][number]) => (
    <article key={s.id} className="pes-card pes-inbox-card">
      <span className="pes-card-tag" style={{ background: STATUS_COLOR[s.status] ?? '#6b7280' }}>
        {s.status}
      </span>
      <span className="pes-card-main pes-inbox-main">
        <span className="pes-card-sub">
          {s.ministry ?? 'No ministry'} · {new Date(s.at).toLocaleDateString()}
          {s.name ? ` · ${s.name}` : ''}
          {s.contact ? ` · ${s.contact}` : ''}
        </span>
        <span>
          <b>Problem:</b> {s.problem}
        </span>
        <span>
          <b>Idea:</b> {s.idea}
        </span>
        <span className="pes-form-row">
          {s.status === 'pending' && (
            <>
              <button type="button" className="pes-btn pes-mini" disabled={pending} onClick={() => run(() => setSubmissionStatusAction(s.id, 'approved'))}>
                APPROVE
              </button>
              <button type="button" className="pes-btn pes-btn--ghost pes-mini" disabled={pending} onClick={() => run(() => setSubmissionStatusAction(s.id, 'rejected'))}>
                REJECT
              </button>
            </>
          )}
          <button
            type="button"
            className="pes-btn pes-btn--ghost pes-mini"
            disabled={pending}
            onClick={() => {
              if (window.confirm('Delete this submission?')) run(() => deleteSubmissionAction(s.id));
            }}
          >
            DELETE
          </button>
        </span>
      </span>
    </article>
  );

  return (
    <ScreenShell title="INBOX" count={pendingSubs.length} onBack={onBack} hints={[]}>
      <div className="pes-detail pes-inbox">
        {!data && <p className="pes-empty">Loading…</p>}
        {data?.error && <p role="alert" className="pes-form-error">{data.error}</p>}
        {note && <p role="alert" className="pes-form-error">{note}</p>}
        {data && !data.error && (
          <>
            <h4 className="pes-detail-name">Translations</h4>
            <div className="pes-sync">
              <span>{data.untranslated === 0 ? 'All vision content is translated.' : `${data.untranslated} records need a Malay translation.`}</span>
              <button
                type="button"
                className="pes-btn pes-btn--ghost pes-mini"
                disabled={pending || data.untranslated === 0}
                onClick={() =>
                  start(async () => {
                    const r = await translateMissingAction();
                    setNote(r.error ?? `Translated ${r.done ?? 0} record${r.done === 1 ? '' : 's'}.`);
                    await reload();
                  })
                }
              >
                {pending ? 'WORKING…' : 'TRANSLATE MISSING'}
              </button>
            </div>

            <h4 className="pes-detail-name">Pending review ({pendingSubs.length})</h4>
            <div className="pes-list">{pendingSubs.length === 0 ? <p className="pes-empty">Nothing waiting for review.</p> : pendingSubs.map(card)}</div>

            {reviewed.length > 0 && (
              <>
                <h4 className="pes-detail-name">Reviewed</h4>
                <div className="pes-list">{reviewed.map(card)}</div>
              </>
            )}
          </>
        )}
      </div>
    </ScreenShell>
  );
}
