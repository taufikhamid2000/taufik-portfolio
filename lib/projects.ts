import { createClient } from './supabase/server';

export type ProjectStatus = 'active' | 'in-progress' | 'concept' | 'archived' | 'in-portfolio';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  status: ProjectStatus;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectInput {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  status: ProjectStatus;
  featured: boolean;
  display_order: number;
}

/**
 * Fetch all projects, ordered by display_order then created_at.
 */
export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
  return data ?? [];
}

/**
 * Fetch a single project by ID.
 */
export async function getProject(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Failed to fetch project:', error);
    return null;
  }
  return data;
}

/**
 * Insert a new project. Returns the created row or throws.
 */
export async function createProject(input: ProjectInput): Promise<Project> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .insert(input)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Update an existing project.
 */
export async function updateProject(id: string, input: ProjectInput): Promise<Project> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Delete a project.
 */
export async function deleteProject(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
