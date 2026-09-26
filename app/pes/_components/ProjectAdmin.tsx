'use client';

import { useState } from 'react';
import { createProjectAction, deleteProjectAction, updateProjectAction, type ProjectFields } from '../admin-actions';
import type { PesProject } from './PesApp';
import { useAdminRun } from './SprintAdmin';

const STATUSES = ['active', 'in-progress', 'in-portfolio', 'concept', 'archived'];

// Owner-only project editor (English only, admin tool).
export function ProjectForm({ project, onDone }: { project?: PesProject; onDone: () => void }) {
  const { run, pending, error } = useAdminRun();
  const [f, setF] = useState<ProjectFields>({
    name: project?.name ?? '',
    tagline: project?.tagline ?? '',
    description: project?.description ?? '',
    tech: project?.tech.join(', ') ?? '',
    github_url: project?.github_url ?? '',
    demo_url: project?.demo_url ?? '',
    image_url: project?.image_url ?? '',
    status: project?.status ?? 'in-progress',
    featured: project?.featured ?? false,
    display_order: String(project?.display_order ?? 0),
  });
  const text = (k: keyof ProjectFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });

  return (
    <form
      className="pes-form"
      onSubmit={(e) => {
        e.preventDefault();
        run(() => (project ? updateProjectAction(project.id, f) : createProjectAction(f)), onDone);
      }}
    >
      <label>
        Name
        <input value={f.name} onChange={text('name')} required autoFocus />
      </label>
      <label>
        Tagline
        <input value={f.tagline} onChange={text('tagline')} required />
      </label>
      <label>
        Description
        <textarea value={f.description} onChange={text('description')} rows={5} required />
      </label>
      <label>
        Tech (comma separated)
        <input value={f.tech} onChange={text('tech')} />
      </label>
      <label>
        GitHub URL
        <input type="url" value={f.github_url} onChange={text('github_url')} />
      </label>
      <label>
        Demo URL
        <input type="url" value={f.demo_url} onChange={text('demo_url')} />
      </label>
      <label>
        Image URL
        <input type="url" value={f.image_url} onChange={text('image_url')} />
      </label>
      <div className="pes-form-row">
        <label>
          Status
          <select value={f.status} onChange={text('status')}>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Order
          <input type="number" value={f.display_order} onChange={text('display_order')} />
        </label>
        <label className="pes-form-check">
          <input type="checkbox" checked={f.featured} onChange={(e) => setF({ ...f, featured: e.target.checked })} />
          Featured
        </label>
      </div>
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
        {project && (
          <button
            type="button"
            className="pes-btn pes-btn--ghost"
            disabled={pending}
            onClick={() => {
              if (window.confirm(`Delete "${project.name}"? This cannot be undone.`)) run(() => deleteProjectAction(project.id), onDone);
            }}
          >
            DELETE
          </button>
        )}
      </div>
    </form>
  );
}
