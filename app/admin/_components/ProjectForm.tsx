import Link from 'next/link';
import type { Project, ProjectStatus } from '../../../lib/projects';

interface ProjectFormProps {
  project?: Project;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  error?: string;
}

const STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'in-portfolio', label: 'In Portfolio' },
  { value: 'concept', label: 'Concept' },
  { value: 'archived', label: 'Archived' },
];

export function ProjectForm({ project, action, submitLabel, error }: ProjectFormProps) {
  return (
    <form
      action={action}
      className="space-y-6 max-w-2xl dark:rounded-2xl dark:border dark:border-white/10 dark:bg-white/[0.03] dark:p-8 dark:backdrop-blur-xl"
    >
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40 text-sm text-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      <Field label="Name" htmlFor="name" hint="Short, recognizable name (e.g. EduBridge)">
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={project?.name}
          className={inputClasses}
        />
      </Field>

      <Field label="Tagline" htmlFor="tagline" hint="One short line shown under the title">
        <input
          id="tagline"
          name="tagline"
          type="text"
          required
          defaultValue={project?.tagline}
          className={inputClasses}
        />
      </Field>

      <Field label="Description" htmlFor="description" hint="Full description shown on the project card">
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={project?.description}
          className={inputClasses}
        />
      </Field>

      <Field
        label="Tech stack"
        htmlFor="tech"
        hint="Comma-separated list (e.g. Next.js, Supabase, TypeScript)"
      >
        <input
          id="tech"
          name="tech"
          type="text"
          defaultValue={project?.tech.join(', ')}
          className={inputClasses}
        />
      </Field>

      <div className="grid md:grid-cols-2 gap-6">
        <Field label="GitHub URL" htmlFor="github_url">
          <input
            id="github_url"
            name="github_url"
            type="url"
            defaultValue={project?.github_url ?? ''}
            placeholder="https://github.com/..."
            className={inputClasses}
          />
        </Field>

        <Field label="Demo URL" htmlFor="demo_url">
          <input
            id="demo_url"
            name="demo_url"
            type="url"
            defaultValue={project?.demo_url ?? ''}
            placeholder="https://..."
            className={inputClasses}
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Status" htmlFor="status">
          <select
            id="status"
            name="status"
            required
            defaultValue={project?.status ?? 'active'}
            className={inputClasses}
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Display order"
          htmlFor="display_order"
          hint="Lower numbers appear first"
        >
          <input
            id="display_order"
            name="display_order"
            type="number"
            defaultValue={project?.display_order ?? 0}
            className={inputClasses}
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured}
          className="w-4 h-4 rounded border-gray-300 dark:border-white/20"
        />
        <span className="text-sm">Featured (shown at the top of the portfolio)</span>
      </label>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin"
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cyan-300 text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

const inputClasses =
  'w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-transparent';

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      {children}
      {hint && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">{hint}</p>
      )}
    </div>
  );
}
