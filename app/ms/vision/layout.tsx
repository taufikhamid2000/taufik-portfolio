import { cookies } from 'next/headers';
import { THEME_COOKIE, isTheme } from '../../../lib/theme';
import { VisionShell } from '../../vision/_components/VisionShell';

export default async function MsVisionLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE)?.value;
  const initialTheme = isTheme(themeCookie) ? themeCookie : 'system';

  return (
    <VisionShell locale="ms" initialTheme={initialTheme}>
      {children}
    </VisionShell>
  );
}
