'use server';

import { revalidatePath } from 'next/cache';
import { syncCommits } from '../../lib/commit-sync';
import { getIsOwner } from '../../lib/auth';

export async function syncCommitsAction(): Promise<{ added: number; error?: string }> {
  if (!(await getIsOwner())) return { added: 0, error: 'Owner only.' };
  const result = await syncCommits();
  if (!result.error && result.added > 0) revalidatePath('/');
  return result;
}
