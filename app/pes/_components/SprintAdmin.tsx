'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
  createItemAction,
  createSprintAction,
  deleteItemAction,
  deleteSprintAction,
  setItemStatusAction,
  updateItemAction,
  updateSprintAction,
  type ItemFields,
  type Result,
  type SprintFields,
} from '../admin-actions';
import type { PesSprint, PesTask } from '../types';

// Owner-only editing controls for the Sprints screen. English only (admin tool).
export const STATUS_CYCLE = ['todo', 'in-progress', 'done', 'blocked'];

/** Run a server action, show its error inline, refresh the page data on success. */
export function useAdminRun() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const run = (fn: () => Promise<Result>, after?: () => void) =>
    start(async () => {
      const r = await fn();
      if (r.error) return setError(r.error);
      setError(null);
      router.refresh();
      after?.();
    });
  return { run, pending, error };
}

function Err({ error }: { error: string | null }) {
  return error ? (
    <p role="alert" className="pes-form-error">
      {error}
    </p>
  ) : null;
}

export function SprintForm({
  sprint,
  defaults,
  onDone,
}: {
  sprint?: PesSprint;
  defaults?: Partial<SprintFields>;
  onDone: () => void;
}) {
  const { run, pending, error } = useAdminRun();
  const [f, setF] = useState<SprintFields>({
    name: sprint?.name ?? defaults?.name ?? '',
    goal: sprint?.goal ?? '',
    start_date: sprint?.start_date ?? defaults?.start_date ?? '',
    end_date: sprint?.end_date ?? defaults?.end_date ?? '',
    status: sprint?.status ?? defaults?.status ?? 'planned',
  });
  const set = (k: keyof SprintFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <form
      className="pes-form"
      onSubmit={(e) => {
        e.preventDefault();
        run(() => (sprint ? updateSprintAction(sprint.id, f) : createSprintAction(f)), onDone);
      }}
    >
      <label>
        Name
        <input value={f.name} onChange={set('name')} required autoFocus />
      </label>
      <label>
        Goal
        <input value={f.goal} onChange={set('goal')} />
      </label>
      <div className="pes-form-row">
        <label>
          Start
          <input type="date" value={f.start_date} onChange={set('start_date')} />
        </label>
        <label>
          End
          <input type="date" value={f.end_date} onChange={set('end_date')} />
        </label>
        <label>
          Status
          <select value={f.status} onChange={set('status')}>
            {['planned', 'active', 'completed', 'cancelled'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <Err error={error} />
      <div className="pes-form-row">
        <button type="submit" className="pes-btn" disabled={pending}>
          SAVE
        </button>
        <button type="button" className="pes-btn pes-btn--ghost" onClick={onDone}>
          CANCEL
        </button>
        {sprint && (
          <button
            type="button"
            className="pes-btn pes-btn--ghost"
            disabled={pending}
            onClick={() => {
              if (window.confirm(`Delete "${sprint.name}" and its ${sprint.task_count} items?`)) run(() => deleteSprintAction(sprint.id), onDone);
            }}
          >
            DELETE
          </button>
        )}
      </div>
    </form>
  );
}

export function ItemForm({ sprintId, item, onDone }: { sprintId: string; item?: PesTask; onDone: () => void }) {
  const { run, pending, error } = useAdminRun();
  const [f, setF] = useState<ItemFields>({
    title: item?.title ?? '',
    status: item?.status ?? 'todo',
    priority: item?.priority ?? 'medium',
    effort: item?.effort != null ? String(item.effort) : '',
  });
  const set = (k: keyof ItemFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <form
      className="pes-form"
      onSubmit={(e) => {
        e.preventDefault();
        run(() => (item ? updateItemAction(item.id, f) : createItemAction(sprintId, f)), onDone);
      }}
    >
      <label>
        Title
        <input value={f.title} onChange={set('title')} required autoFocus />
      </label>
      <div className="pes-form-row">
        <label>
          Status
          <select value={f.status} onChange={set('status')}>
            {STATUS_CYCLE.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select value={f.priority} onChange={set('priority')}>
            {['low', 'medium', 'high', 'urgent'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Effort
          <input type="number" min="0" value={f.effort} onChange={set('effort')} />
        </label>
      </div>
      <Err error={error} />
      <div className="pes-form-row">
        <button type="submit" className="pes-btn" disabled={pending}>
          SAVE
        </button>
        <button type="button" className="pes-btn pes-btn--ghost" onClick={onDone}>
          CANCEL
        </button>
        {item && (
          <button
            type="button"
            className="pes-btn pes-btn--ghost"
            disabled={pending}
            onClick={() => {
              if (window.confirm(`Delete T-${item.ticket_no}?`)) run(() => deleteItemAction(item.id), onDone);
            }}
          >
            DELETE
          </button>
        )}
      </div>
    </form>
  );
}

/** Click the status tag to cycle todo → in-progress → done → blocked. */
export function StatusCycler({ item, label, color }: { item: PesTask; label: string; color: string }) {
  const { run, pending } = useAdminRun();
  const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(item.status) + 1) % STATUS_CYCLE.length];
  return (
    <button
      type="button"
      className="pes-card-tag pes-tag-btn"
      style={{ background: color }}
      disabled={pending}
      title={`Mark as ${next}`}
      onClick={() => run(() => setItemStatusAction(item.id, next))}
    >
      {label}
    </button>
  );
}
