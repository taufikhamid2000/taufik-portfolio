import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSprint } from '../../../../../lib/sprints';
import { SprintForm } from '../../_components/SprintForm';
import { updateSprintAction, deleteSprintAction } from '../../actions';

interface EditSprintPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditSprintPage({ params, searchParams }: EditSprintPageProps) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const sprint = await getSprint(id);
  if (!sprint) notFound();

  const update = updateSprintAction.bind(null, id);
  const remove = deleteSprintAction.bind(null, id);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href={`/admin/sprints/${id}`}
            className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-cyan-300"
          >
            &larr; Back to sprint
          </Link>
          <h1 className="text-2xl font-bold mt-2">Edit {sprint.name}</h1>
        </div>
        <form action={remove}>
          <button
            type="submit"
            className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            Delete sprint
          </button>
        </form>
      </div>
      <SprintForm sprint={sprint} action={update} submitLabel="Save changes" error={error} />
    </div>
  );
}
