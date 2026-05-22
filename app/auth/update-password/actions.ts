'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '../../../lib/supabase/server';

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string;
  const confirm = formData.get('confirm') as string;

  if (!password || password.length < 8) {
    redirect(
      '/auth/update-password?error=' +
        encodeURIComponent('Password must be at least 8 characters.')
    );
  }
  if (password !== confirm) {
    redirect(
      '/auth/update-password?error=' +
        encodeURIComponent('Passwords do not match.')
    );
  }

  const supabase = await createClient();

  // verifyOtp from the /auth/confirm route already set the session,
  // so we can call updateUser here without re-authenticating.
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(
      '/auth/update-password?error=' + encodeURIComponent(error.message)
    );
  }

  revalidatePath('/', 'layout');
  redirect('/admin');
}
