'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../../../lib/supabase/server';
import { getSiteUrl } from '../../../lib/site-url';

export async function requestPasswordReset(formData: FormData) {
  const email = (formData.get('email') as string)?.trim();

  if (!email) {
    redirect('/auth/reset-password?error=' + encodeURIComponent('Email is required.'));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getSiteUrl()}/auth/confirm?next=/auth/update-password`,
  });

  if (error) {
    redirect('/auth/reset-password?error=' + encodeURIComponent(error.message));
  }

  redirect(
    '/auth/reset-password?message=' +
      encodeURIComponent(
        'Check your email for the reset link. It expires in 1 hour.'
      )
  );
}
