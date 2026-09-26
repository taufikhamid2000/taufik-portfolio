'use server';

import { revalidatePath } from 'next/cache';
import { getIsOwner } from '../../lib/auth';
import { createSprint, deleteSprint, updateSprint, type SprintStatus } from '../../lib/sprints';
import { createTask, deleteTask, updateTask, type TaskPriority, type TaskStatus } from '../../lib/tasks';
import { createClient } from '../../lib/supabase/server';

// Owner tools for the PES view. Every action re-checks the owner (RLS backs it up) and
// returns { error } instead of redirecting, so the screen can show it inline.
export type Result = { error?: string };

const SPRINT_STATUSES: SprintStatus[] = ['planned', 'active', 'completed', 'cancelled'];
const TASK_STATUSES: TaskStatus[] = ['todo', 'in-progress', 'blocked', 'done'];
const TASK_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

async function guard<T extends Result>(fn: () => Promise<T | void>): Promise<Result> {
  if (!(await getIsOwner())) return { error: 'Sign in as the site owner first.' };
  try {
    await fn();
    revalidatePath('/');
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Something went wrong.' };
  }
}

export async function signInAction(email: string, password: string): Promise<Result> {
  if (!email.trim() || !password) return { error: 'Email and password are required.' };
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) return { error: error.message };
  revalidatePath('/', 'layout');
  return {};
}

export async function signOutAction(): Promise<Result> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  return {};
}

export interface SprintFields {
  name: string;
  goal: string;
  start_date: string;
  end_date: string;
  status: string;
}

function sprintInput(f: SprintFields) {
  const name = f.name.trim();
  if (!name) throw new Error('Name is required.');
  if (!SPRINT_STATUSES.includes(f.status as SprintStatus)) throw new Error('Invalid status.');
  return {
    name,
    goal: f.goal.trim() || null,
    start_date: f.start_date.trim() || null,
    end_date: f.end_date.trim() || null,
    status: f.status as SprintStatus,
  };
}

export async function createSprintAction(f: SprintFields): Promise<Result> {
  return guard(async () => void (await createSprint(sprintInput(f))));
}
export async function updateSprintAction(id: string, f: SprintFields): Promise<Result> {
  return guard(async () => void (await updateSprint(id, sprintInput(f))));
}
export async function deleteSprintAction(id: string): Promise<Result> {
  return guard(() => deleteSprint(id));
}

export interface ItemFields {
  title: string;
  status: string;
  priority: string;
  effort: string;
}

function itemInput(f: ItemFields) {
  const title = f.title.trim();
  if (!title) throw new Error('Title is required.');
  if (!TASK_STATUSES.includes(f.status as TaskStatus)) throw new Error('Invalid status.');
  if (!TASK_PRIORITIES.includes(f.priority as TaskPriority)) throw new Error('Invalid priority.');
  const effort = f.effort.trim() === '' ? null : parseInt(f.effort, 10);
  if (effort !== null && !Number.isFinite(effort)) throw new Error('Effort must be a number.');
  const status = f.status as TaskStatus;
  return { title, status, priority: f.priority as TaskPriority, effort, completed_at: status === 'done' ? new Date().toISOString() : null };
}

export async function createItemAction(sprintId: string, f: ItemFields): Promise<Result> {
  return guard(async () => {
    const { completed_at, ...rest } = itemInput(f);
    void completed_at;
    await createTask({ ...rest, sprint_id: sprintId, project_id: null, description: null, display_order: Date.now() % 1000000 });
  });
}

export async function updateItemAction(id: string, f: ItemFields): Promise<Result> {
  return guard(async () => void (await updateTask(id, itemInput(f))));
}

export async function setItemStatusAction(id: string, status: string): Promise<Result> {
  return guard(async () => {
    if (!TASK_STATUSES.includes(status as TaskStatus)) throw new Error('Invalid status.');
    await updateTask(id, { status: status as TaskStatus, completed_at: status === 'done' ? new Date().toISOString() : null } as never);
  });
}

export async function deleteItemAction(id: string): Promise<Result> {
  return guard(() => deleteTask(id));
}
