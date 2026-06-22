'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '../../../lib/supabase/server';

async function setStatus(id: string, status: 'approved' | 'rejected') {
  const supabase = await createClient();
  const { error } = await supabase
    .from('submissions')
    .update({ status })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/submissions');
  revalidatePath('/vision', 'layout');
}

export async function approveSubmission(formData: FormData) {
  await setStatus(formData.get('id') as string, 'approved');
}

export async function rejectSubmission(formData: FormData) {
  await setStatus(formData.get('id') as string, 'rejected');
}

export async function deleteSubmission(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('submissions')
    .delete()
    .eq('id', formData.get('id') as string);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/submissions');
}
