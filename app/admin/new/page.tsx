import Link from 'next/link';
import { ProjectForm } from '../_components/ProjectForm';
import { createProjectAction } from '../actions';

interface NewProjectPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewProjectPage({ searchParams }: NewProjectPageProps) {
  const { error } = await searchParams;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin"
          className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-cyan-300"
        >
          &larr; Back to projects
        </Link>
        <h1 className="text-2xl font-bold mt-2">New project</h1>
      </div>
      <ProjectForm action={createProjectAction} submitLabel="Create project" error={error} />
    </div>
  );
}
