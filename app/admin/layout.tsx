import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '../../lib/supabase/server';
import { THEME_COOKIE, isTheme } from '../../lib/theme';
import { AppShell } from '../_components/AppShell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware also protects this, but double-check on the server.
  if (!user) {
    redirect('/login?redirect=/admin');
  }

  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE)?.value;
  const initialTheme = isTheme(themeCookie) ? themeCookie : 'system';

  return (
    <AppShell userEmail={user.email ?? ''} initialTheme={initialTheme}>
      {children}
    </AppShell>
  );
}
