'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { migrateScreenshotsToStorageAction, signOutAction } from '../admin-actions';
import InboxScreen from './InboxScreen';
import { go, readSub } from './nav';
import ScreenShell from './ScreenShell';
import VisionAdminScreen from './VisionAdminScreen';

const TABS = [
  { id: 'inbox', label: 'Inbox' },
  { id: 'vision', label: 'Vision' },
  { id: 'account', label: 'Account' },
] as const;
type Tab = (typeof TABS)[number]['id'];

// Owner admin: tabs like the Projects screen. English only (admin tool).
export default function AdminScreen({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [migrating, setMigrating] = useState(false);
  const [migrateResult, setMigrateResult] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>(() => {
    const sub = readSub('admin');
    return TABS.some((t) => t.id === sub) ? (sub as Tab) : 'inbox';
  });
  useEffect(() => {
    go(`#admin/${tab}`, 'replace');
  }, [tab]);

  // ←/→ switch tabs, like the Projects filter (ignored while typing).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.target as HTMLElement | null)?.closest('input, textarea, select')) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      setTab((t) => TABS[(TABS.findIndex((x) => x.id === t) + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length].id);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <ScreenShell
      title="ADMIN"
      onBack={onBack}
      hints={[{ keys: '←→', label: 'Tab', kind: 'arrows' }]}
      extra={
        <div className="pes-tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className="pes-tab" onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      }
    >
      {tab === 'inbox' && <InboxScreen />}
      {tab === 'vision' && <VisionAdminScreen />}
      {tab === 'account' && (
        <div className="pes-form">
          <p>Signed in as the site owner. Edit projects and sprints from their own screens.</p>
          <button
            type="button"
            className="pes-btn"
            disabled={pending}
            onClick={() =>
              start(async () => {
                await signOutAction();
                router.refresh();
                onBack();
              })
            }
          >
            SIGN OUT
          </button>
          <p style={{ marginTop: 24 }}>
            One-off: move every project&apos;s committed <code>/screenshots/...</code> image into Storage and repoint its Image URL. Safe to run more than once — already-migrated projects are skipped.
          </p>
          <button
            type="button"
            className="pes-btn pes-btn--ghost"
            disabled={migrating}
            onClick={async () => {
              setMigrating(true);
              setMigrateResult(null);
              const r = await migrateScreenshotsToStorageAction();
              setMigrating(false);
              setMigrateResult(r.error ?? `Migrated ${r.migrated}, skipped ${r.skipped}.\n${(r.details ?? []).join('\n')}`);
              if (!r.error) router.refresh();
            }}
          >
            {migrating ? 'MIGRATING…' : 'MIGRATE SCREENSHOTS TO STORAGE'}
          </button>
          {migrateResult && <pre className="pes-detail-desc" style={{ whiteSpace: 'pre-wrap' }}>{migrateResult}</pre>}
        </div>
      )}
    </ScreenShell>
  );
}
