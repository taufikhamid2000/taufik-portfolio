-- =====================================================
-- Update admin email on projects table RLS policies
-- =====================================================
-- Changes the admin from putrasabah41@gmail.com to taufikhamid2000@gmail.com.
-- The admin can be changed by re-applying this style of migration.
-- =====================================================

drop policy if exists "Admin can insert projects" on public.projects;
create policy "Admin can insert projects" on public.projects
  for insert with check (
    auth.jwt() ->> 'email' = 'taufikhamid2000@gmail.com'
  );

drop policy if exists "Admin can update projects" on public.projects;
create policy "Admin can update projects" on public.projects
  for update using (
    auth.jwt() ->> 'email' = 'taufikhamid2000@gmail.com'
  );

drop policy if exists "Admin can delete projects" on public.projects;
create policy "Admin can delete projects" on public.projects
  for delete using (
    auth.jwt() ->> 'email' = 'taufikhamid2000@gmail.com'
  );
