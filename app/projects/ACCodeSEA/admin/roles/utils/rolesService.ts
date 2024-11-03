// app/projects/ACCodeSEA/Admin/roles/utils/rolesService.ts

import { Role } from './types';
import supabase from '../../../../../../lib/supabaseClient';

export async function fetchRoles(): Promise<Role[]> {
  const { data, error } = await supabase.from('roles').select('*');
  if (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
  return data;
}

export async function addRole(newRole: Role): Promise<Role | null> {
  const { data, error } = await supabase.from('roles').insert(newRole).select().single();
  if (error) {
    console.error('Error adding role:', error);
    return null;
  }
  return data;
}

export async function updateRole(updatedRole: Role): Promise<Role | null> {
  if (!updatedRole.id) {
    console.error('Role ID is required for update.');
    return null;
  }

  const { data, error } = await supabase
    .from('roles')
    .update(updatedRole)
    .eq('id', updatedRole.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating role:', error);
    return null;
  }
  return data;
}

export async function deleteRole(roleId: number): Promise<void> {
  const { error } = await supabase.from('roles').delete().eq('id', roleId);
  if (error) {
    console.error('Error deleting role:', error);
  }
}