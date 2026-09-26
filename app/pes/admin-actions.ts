'use server';

import { revalidatePath } from 'next/cache';
import { getIsOwner } from '../../lib/auth';
import { createSprint, deleteSprint, updateSprint, type SprintStatus } from '../../lib/sprints';
import { createTask, deleteTask, updateTask, type TaskPriority, type TaskStatus } from '../../lib/tasks';
import { createProject, deleteProject, updateProject, type ProjectStatus } from '../../lib/projects';
import { translateToMalay } from '../../lib/translate';
import { getAllSubmissions } from '../../lib/vision';
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

export interface ProjectFields {
  name: string;
  tagline: string;
  description: string;
  tech: string;
  github_url: string;
  demo_url: string;
  image_url: string;
  status: string;
  featured: boolean;
  display_order: string;
}

const PROJECT_STATUSES: ProjectStatus[] = ['active', 'in-progress', 'concept', 'archived', 'in-portfolio'];

function projectInput(f: ProjectFields) {
  const name = f.name.trim();
  const tagline = f.tagline.trim();
  const description = f.description.trim();
  if (!name) throw new Error('Name is required.');
  if (!tagline) throw new Error('Tagline is required.');
  if (!description) throw new Error('Description is required.');
  if (!PROJECT_STATUSES.includes(f.status as ProjectStatus)) throw new Error('Invalid status.');
  const order = parseInt(f.display_order || '0', 10);
  return {
    name,
    tagline,
    description,
    tech: f.tech.split(',').map((t) => t.trim()).filter(Boolean),
    github_url: f.github_url.trim() || null,
    demo_url: f.demo_url.trim() || null,
    image_url: f.image_url.trim() || null,
    status: f.status as ProjectStatus,
    featured: f.featured,
    display_order: Number.isFinite(order) ? order : 0,
  };
}

export async function createProjectAction(f: ProjectFields): Promise<Result> {
  return guard(async () => void (await createProject(projectInput(f))));
}

export async function updateProjectAction(id: string, f: ProjectFields): Promise<Result> {
  return guard(async () => void (await updateProject(id, projectInput(f))));
}

export async function deleteProjectAction(id: string): Promise<Result> {
  return guard(() => deleteProject(id));
}

// ----- Inbox: idea submissions and missing translations -----

export interface InboxSubmission {
  id: string;
  ministry: string | null;
  problem: string;
  idea: string;
  name: string | null;
  contact: string | null;
  status: string;
  at: string;
}
export interface Inbox {
  error?: string;
  submissions: InboxSubmission[];
  untranslated: number;
}

async function countUntranslated(): Promise<number> {
  const supabase = await createClient();
  const [m, i] = await Promise.all([
    supabase.from('ministries').select('id', { count: 'exact', head: true }).or('name_ms.is.null,description_ms.is.null'),
    supabase.from('initiatives').select('id', { count: 'exact', head: true }).or('problem_ms.is.null,idea_ms.is.null'),
  ]);
  return (m.count ?? 0) + (i.count ?? 0);
}

export async function loadInboxAction(): Promise<Inbox> {
  if (!(await getIsOwner())) return { error: 'Sign in as the site owner first.', submissions: [], untranslated: 0 };
  const [subs, untranslated] = await Promise.all([getAllSubmissions(), countUntranslated()]);
  return {
    untranslated,
    submissions: subs.map((s) => ({
      id: s.id,
      ministry: s.ministry?.name ?? null,
      problem: s.problem,
      idea: s.idea,
      name: s.submitter_name,
      contact: s.submitter_contact,
      status: s.status,
      at: s.created_at,
    })),
  };
}

export async function setSubmissionStatusAction(id: string, status: string): Promise<Result> {
  return guard(async () => {
    if (status !== 'approved' && status !== 'rejected') throw new Error('Invalid status.');
    const supabase = await createClient();
    const { error } = await supabase.from('submissions').update({ status }).eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/vision', 'layout');
  });
}

export async function deleteSubmissionAction(id: string): Promise<Result> {
  return guard(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('submissions').delete().eq('id', id);
    if (error) throw new Error(error.message);
  });
}

/** Fill missing Malay translations. Calls the paid Anthropic API, so the owner check comes first. */
export async function translateMissingAction(): Promise<Result & { done?: number }> {
  if (!(await getIsOwner())) return { error: 'Sign in as the site owner first.' };
  const supabase = await createClient();
  let done = 0;
  try {
    const { data: ministries } = await supabase
      .from('ministries')
      .select('id, name, description, name_ms, description_ms')
      .or('name_ms.is.null,description_ms.is.null');
    for (const m of ministries ?? []) {
      const patch: Record<string, string> = {};
      if (!m.name_ms && m.name) patch.name_ms = await translateToMalay(m.name);
      if (!m.description_ms && m.description) patch.description_ms = await translateToMalay(m.description);
      if (Object.keys(patch).length) {
        await supabase.from('ministries').update(patch).eq('id', m.id);
        done++;
      }
    }
    const { data: initiatives } = await supabase
      .from('initiatives')
      .select('id, problem, idea, problem_ms, idea_ms')
      .or('problem_ms.is.null,idea_ms.is.null');
    for (const i of initiatives ?? []) {
      const patch: Record<string, string> = {};
      if (!i.problem_ms && i.problem) patch.problem_ms = await translateToMalay(i.problem);
      if (!i.idea_ms && i.idea) patch.idea_ms = await translateToMalay(i.idea);
      if (Object.keys(patch).length) {
        await supabase.from('initiatives').update(patch).eq('id', i.id);
        done++;
      }
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Translation failed.';
    return { error: /api key|401|ANTHROPIC/i.test(msg) ? 'ANTHROPIC_API_KEY is not set on this deployment.' : msg, done };
  }
  revalidatePath('/ms/vision', 'layout');
  revalidatePath('/');
  return { done };
}
