-- =====================================================
-- Add Mysertifico takedown task to Sprint 2
-- =====================================================
-- The portfolio entry has been reframed as contract work.
-- The live Vercel deployment still needs to be taken down
-- (client's IP, not authorized for public showcase).
-- =====================================================

insert into public.tasks (sprint_id, project_id, title, description, status, priority, display_order)
values (
  (select id from public.sprints where name = 'Sprint 2 — GitHub Housekeeping'),
  (select id from public.projects where name = 'Mysertifico'),
  'Take down mysertifico.vercel.app deployment',
  'This was contract work — the IP belongs to the client, not me. The Vercel deployment is currently broadcasting their product publicly. Take it down from the Vercel dashboard (vercel.com/taufikhamid2000/mysertifico → Settings → delete). Also archive the GitHub repo: ``gh repo archive taufikhamid2000/mysertifico``. The portfolio entry has already been reframed as ''Next.js conversion (contract work)'' with no demo URL.',
  'todo',
  'high',
  5
);
