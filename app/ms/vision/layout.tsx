import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { THEME_COOKIE, isTheme } from '../../../lib/theme';
import { SiteShell } from '../../_components/SiteShell';
import { AuthNav } from '../../_components/auth-nav';

export default async function MsVisionLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE)?.value;
  const initialTheme = isTheme(themeCookie) ? themeCookie : 'system';

  return (
    <SiteShell initialTheme={initialTheme} authSlot={<Suspense fallback={null}><AuthNav /></Suspense>}>
      {children}
    </SiteShell>
  );
}
