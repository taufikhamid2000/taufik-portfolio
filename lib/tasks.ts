import { createClient } from './supabase/server';

export type TaskStatus = 'todo' | 'in-progress' | 'blocked' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  sprint_id: string | null;
  project_id: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  effort: number | null;
  display_order: number;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface TaskInput {
  sprint_id: string | null;
  project_id: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  effort: number | null;
  display_order: number;
}

export interface TaskWithProject extends Task {
  project: { id: string; name: string } | null;
}

export async function getTasksForSprint(sprintId: string): Promise<TaskWithProject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tasks')
    .select('*, project:projects(id, name)')
    .eq('sprint_id', sprintId)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Failed to fetch tasks:', error);
    return [];
  }
  return (data as TaskWithProject[] | null) ?? [];
}

export async function getTask(id: string): Promise<Task | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) {
    console.error('Failed to fetch task:', error);
    return null;
  }
  return data;
}

export async function createTask(input: TaskInput): Promise<Task> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tasks')
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateTask(id: string, input: Partial<TaskInput>): Promise<Task> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tasks')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
