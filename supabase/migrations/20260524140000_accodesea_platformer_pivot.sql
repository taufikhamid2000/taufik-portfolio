-- =====================================================
-- ACCodeSEA: align DB with the real (platformer) repo
-- =====================================================
-- The portfolio subfolder app/projects/ACCodeSEA/ (34 files: About,
-- Admin/roles, Contact, Feedback, Join, Storyline) has been deleted.
-- It was vestigial — the project lives in its own repo now, and that
-- repo has pivoted twice since the portfolio version was last touched:
--
--   v1 (portfolio):    Community site with About/Join/FAQ/roles/feedback
--   v2 (first pivot):  Browser-playable CYOA narrative
--   v3 (current):      2D side-scroller stealth platformer with
--                      vision-cone guards, air assassinations, level
--                      system. Lives at github.com/taufikhamid2000/ac-code-sea
--                      and ac-code-sea.vercel.app.
--
-- This migration:
--   - Repoints github_url from the archived nextjs-animated-slider repo
--     to the real ac-code-sea repo.
--   - Repoints demo_url from the dead accodesea.vercel.app deployment
--     to the live ac-code-sea.vercel.app deployment.
--   - Updates tagline/description/tech to reflect the platformer reality.
--   - Marks the now-misnamed Sprint 1 task done with explanation.
-- =====================================================

update public.projects
set
  github_url = 'https://github.com/taufikhamid2000/ac-code-sea',
  demo_url   = 'https://ac-code-sea.vercel.app',
  tagline    = '2D side-scroller stealth platformer (browser)',
  description = 'A browser-playable 2D side-scroller set in pre-colonial Southeast Asia — the Brotherhood, vision-cone guards, stealth + air assassinations, a level system. Pivoted twice: from a community fan site (the original portfolio version) → to a CYOA narrative → to the current platformer. Lives in its own repo now; the portfolio used to host a stub UI which has been removed.',
  tech       = array['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
  status     = 'in-progress',
  featured   = false,
  updated_at = now()
where name = 'ACCodeSEA';

-- The task was originally "move portfolio code into nextjs-animated-slider
-- repo". That plan is dead: nextjs-animated-slider was archived, a fresh
-- ac-code-sea repo was created, and the portfolio code was so stale
-- (1-sentence storyline stubs, CYOA UI components incompatible with the
-- platformer pivot) that nothing was worth lifting. Marking done with the
-- portfolio folder simply deleted.
update public.tasks
set status = 'done',
    completed_at = now()
where title = 'Move ACCodeSEA portfolio code into nextjs-animated-slider repo'
  and status <> 'done';
