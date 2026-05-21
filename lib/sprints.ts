import { createClient } from './supabase/server';

export type SprintStatus = 'planned' | 'active' | 'completed' | 'cancelled';

export interface Sprint {
  id: string;
  name: string;
  goal: string | null;
  start_date: string | null;
  end_date: string | null;
  status: SprintStatus;
  created_at: string;
  updated_at: string;
}

export interface SprintInput {
  name: string;
  goal: string | null;
  start_date: string | null;
  end_date: string | null;
  status: SprintStatus;
}

export interface SprintWithCounts extends Sprint {
  task_count: number;
  done_count: number;
}

export async function getSprints(): Promise<SprintWithCounts[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sprints')
    .select('*, tasks(status)')
    .order('start_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch sprints:', error);
    return [];
  }

  // Flatten the task counts
  type Row = Sprint & { tasks: { status: string }[] };
  return (data as Row[] | null ?? []).map((row) => {
    const tasks = row.tasks ?? [];
    const { tasks: _ignore, ...rest } = row;
    return {
      ...rest,
      task_count: tasks.length,
      done_count: tasks.filter((t) => t.status === 'done').length,
    };
  });
}

export async function getSprint(id: string): Promise<Sprint | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sprints')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Failed to fetch sprint:', error);
    return null;
  }
  return data;
}

export async function createSprint(input: SprintInput): Promise<Sprint> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sprints')
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateSprint(id: string, input: SprintInput): Promise<Sprint> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sprints')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSprint(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('sprints').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
