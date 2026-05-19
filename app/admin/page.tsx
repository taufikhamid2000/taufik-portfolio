import Link from 'next/link';
import { getProjects, type ProjectStatus } from '../../lib/projects';
import { deleteProjectAction } from './actions';

interface AdminPageProps {
  searchParams: Promise<{ error?: string }>;
}

const statusStyles: Record<ProjectStatus, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  'in-portfolio': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  concept: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  archived: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default async function AdminProjectsPage({ searchParams }: AdminPageProps) {
  const [{ error }, projects] = await Promise.all([searchParams, getProjects()]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'} total
          </p>
        </div>
        <Link
          href="/admin/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          + New project
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40 text-sm text-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No projects yet. Add your first one.
          </p>
          <Link
            href="/admin/new"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add project
          </Link>
        </div>
      ) : (
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Order</th>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Featured</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-200 dark:border-gray-800 last:border-0"
                >
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-500 tabular-nums">
                    {project.display_order}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{project.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                      {project.tagline}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${statusStyles[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {project.featured ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                        Yes
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/${project.id}/edit`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Edit
                      </Link>
                      <form
                        action={deleteProjectAction.bind(null, project.id)}
                        className="inline"
                      >
                        <button
                          type="submit"
                          className="text-red-600 dark:text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
