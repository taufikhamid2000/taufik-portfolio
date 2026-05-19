import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject } from '../../../../lib/projects';
import { ProjectForm } from '../../_components/ProjectForm';
import { updateProjectAction } from '../../actions';

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditProjectPage({ params, searchParams }: EditProjectPageProps) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  // Bind the project id to the update action so the form just submits FormData.
  const action = updateProjectAction.bind(null, id);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin"
          className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
        >
          &larr; Back to projects
        </Link>
        <h1 className="text-2xl font-bold mt-2">Edit {project.name}</h1>
      </div>
      <ProjectForm
        project={project}
        action={action}
        submitLabel="Save changes"
        error={error}
      />
    </div>
  );
}
