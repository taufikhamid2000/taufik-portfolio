import Link from 'next/link';
import type { Sprint, SprintStatus } from '../../../../lib/sprints';

interface SprintFormProps {
  sprint?: Sprint;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  error?: string;
}

const STATUSES: { value: SprintStatus; label: string }[] = [
  { value: 'planned', label: 'Planned' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const inputClasses =
  'w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-transparent';

export function SprintForm({ sprint, action, submitLabel, error }: SprintFormProps) {
  return (
    <form
      action={action}
      className="space-y-6 max-w-2xl dark:rounded-2xl dark:border dark:border-white/10 dark:bg-white/[0.03] dark:p-8 dark:backdrop-blur-xl"
    >
      {error && (
        <div
          role="alert"
          className="p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40 text-sm text-red-800 dark:text-red-300"
        >
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={sprint?.name}
          placeholder="e.g. Sprint 1 — Portfolio cleanup"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="goal" className="block text-sm font-medium mb-1.5">Goal</label>
        <textarea
          id="goal"
          name="goal"
          rows={3}
          defaultValue={sprint?.goal ?? ''}
          placeholder="What do you want to achieve in this sprint?"
          className={inputClasses}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium mb-1.5">Start date</label>
          <input
            id="start_date"
            name="start_date"
            type="date"
            defaultValue={sprint?.start_date ?? ''}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="end_date" className="block text-sm font-medium mb-1.5">End date</label>
          <input
            id="end_date"
            name="end_date"
            type="date"
            defaultValue={sprint?.end_date ?? ''}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium mb-1.5">Status</label>
        <select
          id="status"
          name="status"
          required
          defaultValue={sprint?.status ?? 'planned'}
          className={inputClasses}
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/sprints"
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cyan-300 text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
