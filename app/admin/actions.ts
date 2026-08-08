'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createProject, deleteProject, updateProject, type ProjectInput, type ProjectStatus } from '../../lib/projects';
import { requireOwner } from '../../lib/auth';

const VALID_STATUSES: ProjectStatus[] = [
  'active',
  'in-progress',
  'concept',
  'archived',
  'in-portfolio',
];

function parseFormData(formData: FormData): { input: ProjectInput | null; error: string | null } {
  const name = (formData.get('name') as string)?.trim();
  const tagline = (formData.get('tagline') as string)?.trim();
  const description = (formData.get('description') as string)?.trim();
  const techRaw = (formData.get('tech') as string)?.trim() || '';
  const github_url = ((formData.get('github_url') as string) || '').trim() || null;
  const demo_url = ((formData.get('demo_url') as string) || '').trim() || null;
  const status = formData.get('status') as ProjectStatus;
  const featured = formData.get('featured') === 'on';
  const display_order = parseInt((formData.get('display_order') as string) || '0', 10);

  if (!name) return { input: null, error: 'Name is required.' };
  if (!tagline) return { input: null, error: 'Tagline is required.' };
  if (!description) return { input: null, error: 'Description is required.' };
  if (!VALID_STATUSES.includes(status)) return { input: null, error: 'Invalid status.' };

  const tech = techRaw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    input: {
      name,
      tagline,
      description,
      tech,
      github_url,
      demo_url,
      status,
      featured,
      display_order: Number.isFinite(display_order) ? display_order : 0,
    },
    error: null,
  };
}

export async function createProjectAction(formData: FormData) {
  await requireOwner('/admin/new');
  const { input, error } = parseFormData(formData);
  if (!input) {
    redirect('/admin/new?error=' + encodeURIComponent(error || 'Invalid input.'));
  }

  try {
    await createProject(input!);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to create project.';
    redirect('/admin/new?error=' + encodeURIComponent(message));
  }

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateProjectAction(id: string, formData: FormData) {
  await requireOwner(`/admin/${id}/edit`);
  const { input, error } = parseFormData(formData);
  if (!input) {
    redirect(`/admin/${id}/edit?error=` + encodeURIComponent(error || 'Invalid input.'));
  }

  try {
    await updateProject(id, input!);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to update project.';
    redirect(`/admin/${id}/edit?error=` + encodeURIComponent(message));
  }

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteProjectAction(id: string) {
  await requireOwner('/admin');
  try {
    await deleteProject(id);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to delete project.';
    redirect('/admin?error=' + encodeURIComponent(message));
  }
  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}
