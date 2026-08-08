-- =====================================================
-- Make sprint planning publicly readable
-- =====================================================
-- Sprints/tasks were originally admin-only for both read and write (see
-- 20260519150000_create_sprints_tasks.sql, whose comment anticipated this
-- exact change: "To make it public, change the SELECT policies to
-- `using (true)`"). The portfolio's admin section is now a public-readable
-- part of the site, with writes still gated to the owner's email via the
-- existing "Admin can write sprints"/"Admin can write tasks" policies
-- (untouched here) — this migration only adds public SELECT.
-- =====================================================

drop policy if exists "Admin can read sprints" on public.sprints;
create policy "Public can read sprints" on public.sprints
  for select using (true);

drop policy if exists "Admin can read tasks" on public.tasks;
create policy "Public can read tasks" on public.tasks
  for select using (true);
