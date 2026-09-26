'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  deleteInitiativeAction,
  loadVisionAdminAction,
  saveInitiativeAction,
  type InitiativeFields,
  type InitiativeRow,
  type VisionAdminData,
} from '../admin-actions';
import { useAdminRun } from './SprintAdmin';

const STATUS_COLOR: Record<string, string> = { active: '#22c55e', planned: '#3b82f6', concept: '#eab308' };

function InitiativeForm({ data, item, onDone }: { data: VisionAdminData; item?: InitiativeRow; onDone: () => void }) {
  const { run, pending, error } = useAdminRun();
  const [f, setF] = useState<InitiativeFields>({
    ministry_id: item?.ministry_id ?? '',
    project_id: item?.project_id ?? '',
    problem: item?.problem ?? '',
    idea: item?.idea ?? '',
    problem_ms: item?.problem_ms ?? '',
    idea_ms: item?.idea_ms ?? '',
    status: item?.status ?? 'concept',
  });
  const set = (k: keyof InitiativeFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });
  return (
    <form
      className="pes-form"
      onSubmit={(e) => {
        e.preventDefault();
        run(() => saveInitiativeAction(item?.id ?? null, f), onDone);
      }}
    >
      <div className="pes-form-row">
        <label>
          Ministry
          <select value={f.ministry_id} onChange={set('ministry_id')} required autoFocus>
            <option value="">Choose…</option>
            {data.ministries.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Project
          <select value={f.project_id} onChange={set('project_id')}>
            <option value="">None</option>
            {data.projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select value={f.status} onChange={set('status')}>
            {['active', 'planned', 'concept'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Problem
        <textarea value={f.problem} onChange={set('problem')} rows={3} required />
      </label>
      <label>
        Idea
        <textarea value={f.idea} onChange={set('idea')} rows={3} required />
      </label>
      <label>
        Problem (Malay, leave empty to auto-translate later)
        <textarea value={f.problem_ms} onChange={set('problem_ms')} rows={2} />
      </label>
      <label>
        Idea (Malay, leave empty to auto-translate later)
        <textarea value={f.idea_ms} onChange={set('idea_ms')} rows={2} />
      </label>
      {error && (
        <p role="alert" className="pes-form-error">
          {error}
        </p>
      )}
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
              if (window.confirm('Delete this initiative?')) run(() => deleteInitiativeAction(item.id), onDone);
            }}
          >
            DELETE
          </button>
        )}
      </div>
    </form>
  );
}

// Owner editor for vision initiatives. English only (admin tool).
export default function VisionAdminScreen() {
  const [data, setData] = useState<VisionAdminData | null>(null);
  const [editing, setEditing] = useState<string | null>(null);

  const reload = useCallback(() => loadVisionAdminAction().then(setData), []);
  useEffect(() => {
    let live = true;
    loadVisionAdminAction().then((d) => live && setData(d));
    return () => {
      live = false;
    };
  }, []);

  const done = () => {
    setEditing(null);
    reload();
  };

  return (
      <div className="pes-detail pes-inbox">
        {!data && <p className="pes-empty">Loading…</p>}
        {data?.error && (
          <p role="alert" className="pes-form-error">
            {data.error}
          </p>
        )}
        {data && !data.error && (
          <>
            {editing === 'new' ? (
              <InitiativeForm data={data} onDone={done} />
            ) : (
              <button type="button" className="pes-btn pes-btn--ghost" onClick={() => setEditing('new')}>
                + NEW INITIATIVE
              </button>
            )}
            <div className="pes-list">
              {data.initiatives.map((i) =>
                editing === i.id ? (
                  <InitiativeForm key={i.id} data={data} item={i} onDone={done} />
                ) : (
                  <article key={i.id} className="pes-card pes-inbox-card">
                    <span className="pes-card-tag" style={{ background: STATUS_COLOR[i.status] ?? '#6b7280' }}>
                      {i.status}
                    </span>
                    <span className="pes-card-main pes-inbox-main">
                      <span className="pes-card-sub">{i.ministry_name}</span>
                      <span>
                        <b>Problem:</b> {i.problem}
                      </span>
                      <span>
                        <b>Idea:</b> {i.idea}
                      </span>
                      {(!i.problem_ms || !i.idea_ms) && <span className="pes-card-sub">Needs Malay translation</span>}
                    </span>
                    <button type="button" className="pes-btn pes-btn--ghost pes-mini" onClick={() => setEditing(i.id)}>
                      EDIT
                    </button>
                  </article>
                ),
              )}
            </div>
          </>
        )}
      </div>
  );
}
