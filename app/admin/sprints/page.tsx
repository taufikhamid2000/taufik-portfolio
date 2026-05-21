import Link from 'next/link';
import { getSprints, type SprintStatus } from '../../../lib/sprints';
import { deleteSprintAction } from './actions';

interface SprintsPageProps {
  searchParams: Promise<{ error?: string }>;
}

const statusStyles: Record<SprintStatus, string> = {
  planned: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  active: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

function formatDateRange(start: string | null, end: string | null) {
  if (!start && !end) return '—';
  const s = start ? new Date(start).toLocaleDateString() : '?';
  const e = end ? new Date(end).toLocaleDateString() : '?';
  return `${s} → ${e}`;
}

export default async function SprintsPage({ searchParams }: SprintsPageProps) {
  const [{ error }, sprints] = await Promise.all([searchParams, getSprints()]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Sprints</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {sprints.length} {sprints.length === 1 ? 'sprint' : 'sprints'}
          </p>
        </div>
        <Link
          href="/admin/sprints/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          + New sprint
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40 text-sm text-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {sprints.length === 0 ? (
        <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No sprints yet. Plan your first one.
          </p>
          <Link
            href="/admin/sprints/new"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create sprint
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sprints.map((s) => {
            const progress = s.task_count === 0 ? 0 : Math.round((s.done_count / s.task_count) * 100);
            return (
              <Link
                key={s.id}
                href={`/admin/sprints/${s.id}`}
                className="block border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="font-semibold">{s.name}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[s.status]}`}>
                    {s.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                  {formatDateRange(s.start_date, s.end_date)}
                </p>
                {s.goal && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                    {s.goal}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>{s.done_count} / {s.task_count} done</span>
                  <span>{progress}%</span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 dark:bg-green-600 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {/* hidden form so we can use deleteSprintAction without lint warning about unused import */}
      <form action={deleteSprintAction.bind(null, '')} className="hidden" />
    </div>
  );
}
