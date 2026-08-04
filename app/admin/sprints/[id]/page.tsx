import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSprint, type SprintStatus } from '../../../../lib/sprints';
import { getTasksForSprint, type TaskStatus, type TaskPriority, type TaskWithProject } from '../../../../lib/tasks';
import { getProjects } from '../../../../lib/projects';
import { createTaskAction, deleteTaskAction, updateTaskStatusAction } from '../actions';

interface SprintDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

const sprintStatusStyles: Record<SprintStatus, string> = {
  planned: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  active: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

const taskStatusStyles: Record<TaskStatus, string> = {
  todo: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  blocked: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  done: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
};

const taskPriorityStyles: Record<TaskPriority, string> = {
  low: 'text-gray-500 dark:text-gray-500',
  medium: 'text-blue-600 dark:text-blue-400',
  high: 'text-orange-600 dark:text-orange-400',
  urgent: 'text-red-600 dark:text-red-400',
};

const COLUMNS: { status: TaskStatus; title: string }[] = [
  { status: 'todo', title: 'To Do' },
  { status: 'in-progress', title: 'In Progress' },
  { status: 'blocked', title: 'Blocked' },
  { status: 'done', title: 'Done' },
];

function formatDateRange(start: string | null, end: string | null) {
  if (!start && !end) return null;
  const s = start ? new Date(start).toLocaleDateString() : '?';
  const e = end ? new Date(end).toLocaleDateString() : '?';
  return `${s} → ${e}`;
}

export default async function SprintDetailPage({ params, searchParams }: SprintDetailPageProps) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const sprint = await getSprint(id);
  if (!sprint) notFound();

  const [tasks, projects] = await Promise.all([
    getTasksForSprint(id),
    getProjects(),
  ]);

  const tasksByStatus: Record<TaskStatus, TaskWithProject[]> = {
    todo: [],
    'in-progress': [],
    blocked: [],
    done: [],
  };
  tasks.forEach((t) => {
    tasksByStatus[t.status].push(t);
  });

  const dateRange = formatDateRange(sprint.start_date, sprint.end_date);
  const total = tasks.length;
  const done = tasksByStatus.done.length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/sprints"
          className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-cyan-300"
        >
          &larr; Back to sprints
        </Link>
      </div>

      {/* Sprint header card */}
      <div className="border border-gray-200 dark:border-white/10 rounded-lg dark:rounded-2xl dark:bg-white/[0.03] dark:backdrop-blur-xl p-6 mb-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{sprint.name}</h1>
              <span className={`text-xs px-2 py-1 rounded-full ${sprintStatusStyles[sprint.status]}`}>
                {sprint.status}
              </span>
            </div>
            {dateRange && (
              <p className="text-sm text-gray-500 dark:text-gray-500">{dateRange}</p>
            )}
          </div>
          <Link
            href={`/admin/sprints/${id}/edit`}
            className="text-sm text-blue-600 dark:text-cyan-300 hover:underline"
          >
            Edit
          </Link>
        </div>
        {sprint.goal && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{sprint.goal}</p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>{done} of {total} tasks done</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 dark:bg-green-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40 text-sm text-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Add task form */}
      <form
        action={createTaskAction.bind(null, id)}
        className="mb-8 border border-gray-200 dark:border-white/10 rounded-lg dark:rounded-2xl dark:bg-white/[0.03] dark:backdrop-blur-xl p-4 flex flex-wrap items-end gap-3"
      >
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="title" className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
            New task
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="What needs to be done?"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
          />
        </div>
        <div>
          <label htmlFor="project_id" className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
            Project
          </label>
          <select
            id="project_id"
            name="project_id"
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5"
          >
            <option value="">— None —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            defaultValue="medium"
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div>
          <label htmlFor="effort" className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
            Effort
          </label>
          <input
            id="effort"
            name="effort"
            type="number"
            min="0"
            placeholder="pts"
            className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          Add
        </button>
      </form>

      {/* Kanban columns */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {COLUMNS.map((col) => (
          <div
            key={col.status}
            className="border border-gray-200 dark:border-white/10 rounded-lg dark:rounded-2xl p-3 min-h-[200px] bg-gray-50/50 dark:bg-white/[0.02] dark:backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-semibold text-sm">{col.title}</h3>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {tasksByStatus[col.status].length}
              </span>
            </div>
            <div className="space-y-2">
              {tasksByStatus[col.status].length === 0 ? (
                <p className="text-xs text-gray-400 dark:text-gray-600 px-2 py-3 text-center">
                  No tasks
                </p>
              ) : (
                tasksByStatus[col.status].map((task) => (
                  <TaskCard key={task.id} task={task} sprintId={id} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task, sprintId }: { task: TaskWithProject; sprintId: string }) {
  return (
    <article className="bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-md dark:rounded-xl p-3 text-sm dark:backdrop-blur-xl">
      <p className="font-medium mb-2 break-words">{task.title}</p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        {task.project && (
          <span className="text-gray-500 dark:text-gray-500">
            {task.project.name}
          </span>
        )}
        <span className={taskPriorityStyles[task.priority]}>
          {task.priority}
        </span>
        {task.effort != null && (
          <span className="text-gray-400 dark:text-gray-600">{task.effort}pt</span>
        )}
      </div>
      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
        {(['todo', 'in-progress', 'blocked', 'done'] as TaskStatus[])
          .filter((s) => s !== task.status)
          .map((s) => (
            <form
              key={s}
              action={updateTaskStatusAction.bind(null, task.id, sprintId, s)}
              className="inline"
            >
              <button
                type="submit"
                className={`text-[10px] px-1.5 py-0.5 rounded ${taskStatusStyles[s]} hover:opacity-80`}
                title={`Move to ${s}`}
              >
                → {s}
              </button>
            </form>
          ))}
        <form
          action={deleteTaskAction.bind(null, task.id, sprintId)}
          className="inline ml-auto"
        >
          <button
            type="submit"
            className="text-[10px] text-red-500 dark:text-red-400 hover:underline"
            title="Delete task"
          >
            ✕
          </button>
        </form>
      </div>
    </article>
  );
}
