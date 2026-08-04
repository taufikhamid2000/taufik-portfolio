import Link from 'next/link';
import { SprintForm } from '../_components/SprintForm';
import { createSprintAction } from '../actions';

interface NewSprintPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewSprintPage({ searchParams }: NewSprintPageProps) {
  const { error } = await searchParams;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/sprints"
          className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-cyan-300"
        >
          &larr; Back to sprints
        </Link>
        <h1 className="text-2xl font-bold mt-2">New sprint</h1>
      </div>
      <SprintForm action={createSprintAction} submitLabel="Create sprint" error={error} />
    </div>
  );
}
