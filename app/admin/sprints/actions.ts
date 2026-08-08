'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSprint, deleteSprint, updateSprint, type SprintInput, type SprintStatus } from '../../../lib/sprints';
import { createTask, deleteTask, updateTask, type TaskInput, type TaskPriority, type TaskStatus } from '../../../lib/tasks';
import { requireOwner } from '../../../lib/auth';

const SPRINT_STATUSES: SprintStatus[] = ['planned', 'active', 'completed', 'cancelled'];
const TASK_STATUSES: TaskStatus[] = ['todo', 'in-progress', 'blocked', 'done'];
const TASK_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

// ----------- Sprint actions -----------

function parseSprint(formData: FormData): { input: SprintInput | null; error: string | null } {
  const name = (formData.get('name') as string)?.trim();
  const goal = ((formData.get('goal') as string) || '').trim() || null;
  const start_date = ((formData.get('start_date') as string) || '').trim() || null;
  const end_date = ((formData.get('end_date') as string) || '').trim() || null;
  const status = formData.get('status') as SprintStatus;

  if (!name) return { input: null, error: 'Name is required.' };
  if (!SPRINT_STATUSES.includes(status)) return { input: null, error: 'Invalid status.' };

  return {
    input: { name, goal, start_date, end_date, status },
    error: null,
  };
}

export async function createSprintAction(formData: FormData) {
  await requireOwner('/admin/sprints/new');
  const { input, error } = parseSprint(formData);
  if (!input) {
    redirect('/admin/sprints/new?error=' + encodeURIComponent(error || 'Invalid input.'));
  }
  let createdId: string;
  try {
    const created = await createSprint(input!);
    createdId = created.id;
  } catch (e) {
    const m = e instanceof Error ? e.message : 'Failed to create sprint.';
    redirect('/admin/sprints/new?error=' + encodeURIComponent(m));
  }
  revalidatePath('/admin/sprints');
  redirect(`/admin/sprints/${createdId}`);
}

export async function updateSprintAction(id: string, formData: FormData) {
  await requireOwner(`/admin/sprints/${id}/edit`);
  const { input, error } = parseSprint(formData);
  if (!input) {
    redirect(`/admin/sprints/${id}/edit?error=` + encodeURIComponent(error || 'Invalid input.'));
  }
  try {
    await updateSprint(id, input!);
  } catch (e) {
    const m = e instanceof Error ? e.message : 'Failed to update sprint.';
    redirect(`/admin/sprints/${id}/edit?error=` + encodeURIComponent(m));
  }
  revalidatePath('/admin/sprints');
  revalidatePath(`/admin/sprints/${id}`);
  redirect(`/admin/sprints/${id}`);
}

export async function deleteSprintAction(id: string) {
  await requireOwner('/admin/sprints');
  try {
    await deleteSprint(id);
  } catch (e) {
    const m = e instanceof Error ? e.message : 'Failed to delete sprint.';
    redirect('/admin/sprints?error=' + encodeURIComponent(m));
  }
  revalidatePath('/admin/sprints');
  redirect('/admin/sprints');
}

// ----------- Task actions -----------

export async function createTaskAction(sprintId: string, formData: FormData) {
  await requireOwner(`/admin/sprints/${sprintId}`);
  const title = (formData.get('title') as string)?.trim();
  if (!title) {
    redirect(`/admin/sprints/${sprintId}?error=` + encodeURIComponent('Title is required.'));
  }

  const project_id = ((formData.get('project_id') as string) || '').trim() || null;
  const priority = (formData.get('priority') as TaskPriority) || 'medium';
  const effortRaw = (formData.get('effort') as string) || '';
  const effort = effortRaw === '' ? null : parseInt(effortRaw, 10);
  const description = ((formData.get('description') as string) || '').trim() || null;

  const input: TaskInput = {
    sprint_id: sprintId,
    project_id,
    title,
    description,
    status: 'todo',
    priority: TASK_PRIORITIES.includes(priority) ? priority : 'medium',
    effort: Number.isFinite(effort as number) ? (effort as number) : null,
    display_order: Date.now() % 1000000, // simple ordering: newer tasks get higher numbers
  };

  try {
    await createTask(input);
  } catch (e) {
    const m = e instanceof Error ? e.message : 'Failed to create task.';
    redirect(`/admin/sprints/${sprintId}?error=` + encodeURIComponent(m));
  }
  revalidatePath(`/admin/sprints/${sprintId}`);
  redirect(`/admin/sprints/${sprintId}`);
}

export async function updateTaskStatusAction(taskId: string, sprintId: string, status: TaskStatus) {
  await requireOwner(`/admin/sprints/${sprintId}`);
  if (!TASK_STATUSES.includes(status)) {
    redirect(`/admin/sprints/${sprintId}?error=` + encodeURIComponent('Invalid status.'));
  }
  try {
    await updateTask(taskId, { status });
  } catch (e) {
    const m = e instanceof Error ? e.message : 'Failed to update task.';
    redirect(`/admin/sprints/${sprintId}?error=` + encodeURIComponent(m));
  }
  revalidatePath(`/admin/sprints/${sprintId}`);
  redirect(`/admin/sprints/${sprintId}`);
}

export async function deleteTaskAction(taskId: string, sprintId: string) {
  await requireOwner(`/admin/sprints/${sprintId}`);
  try {
    await deleteTask(taskId);
  } catch (e) {
    const m = e instanceof Error ? e.message : 'Failed to delete task.';
    redirect(`/admin/sprints/${sprintId}?error=` + encodeURIComponent(m));
  }
  revalidatePath(`/admin/sprints/${sprintId}`);
  redirect(`/admin/sprints/${sprintId}`);
}
