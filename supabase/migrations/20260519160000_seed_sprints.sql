-- =====================================================
-- Seed sprints and tasks from REPOSITORY_AUDIT.md
-- =====================================================
-- Three initial sprints covering portfolio cleanup,
-- GitHub housekeeping, and security/maintenance work.
-- Tasks link to projects where applicable.
-- =====================================================

-- Helper: look up project IDs by name (variables via CTE)
-- We use subqueries inline since plain SQL can't use variables easily.

-- 1. Create the three sprints
insert into public.sprints (name, goal, start_date, end_date, status)
values
  (
    'Sprint 1 — Portfolio Slim-Down',
    'Migrate substantial in-portfolio subprojects to their own standalone repos and remove unused infrastructure. Goal: the portfolio repo becomes a clean static showcase that fetches projects from the DB and links out.',
    null,
    null,
    'active'
  ),
  (
    'Sprint 2 — GitHub Housekeeping',
    'Clean up the GitHub repo list: delete empty stubs, archive abandoned learning projects, create new repos for the migrated subprojects.',
    null,
    null,
    'planned'
  ),
  (
    'Sprint 3 — Security & Maintenance',
    'Address the dependabot vulnerabilities (4 critical, 19 high, 28 moderate, 9 low) flagged on push. Upgrade Next.js and other outdated deps.',
    null,
    null,
    'planned'
  )
on conflict do nothing;

-- 2. Tasks for Sprint 1 — Portfolio Slim-Down
insert into public.tasks (sprint_id, project_id, title, description, status, priority, display_order)
values
  (
    (select id from public.sprints where name = 'Sprint 1 — Portfolio Slim-Down'),
    (select id from public.projects where name = 'SBMP'),
    'Migrate SBMP to standalone repo',
    'SBMP has 35 files of substantial code in app/projects/SBMP/ but no standalone repo. Move it into a new ../sbmp/ folder, set up as its own Next.js app, then create and push a GitHub repo.',
    'todo', 'high', 10
  ),
  (
    (select id from public.sprints where name = 'Sprint 1 — Portfolio Slim-Down'),
    (select id from public.projects where name = 'JobMatch'),
    'Migrate JobMatch to standalone repo',
    'JobMatch has 14 files (Dashboard, ApplicationTracking, JobPostingManagement, UserManagement, etc). Move to a new ../jobmatch/ folder and set up as standalone.',
    'todo', 'high', 20
  ),
  (
    (select id from public.sprints where name = 'Sprint 1 — Portfolio Slim-Down'),
    (select id from public.projects where name = 'TekaTeki'),
    'Move TekaTeki code into MyQuiza repo',
    'MyQuiza is an empty Next.js boilerplate. Move app/projects/TekaTeki/* into ../myquiza/ as the actual implementation. After migration, delete the TekaTeki entry in the portfolio DB (or merge it with MyQuiza).',
    'todo', 'medium', 30
  ),
  (
    (select id from public.sprints where name = 'Sprint 1 — Portfolio Slim-Down'),
    (select id from public.projects where name = 'ACCodeSEA'),
    'Move ACCodeSEA portfolio code into nextjs-animated-slider repo',
    'The portfolio version of ACCodeSEA is more advanced than the original cloned ``nextjs-animated-slider`` repo. Migrate the portfolio version in as a replacement. Optionally rename the repo to ``accodesea``.',
    'todo', 'medium', 40
  ),
  (
    (select id from public.sprints where name = 'Sprint 1 — Portfolio Slim-Down'),
    (select id from public.projects where name = 'Veyoyee'),
    'Delete app/projects/Veyoyee from portfolio',
    'The standalone veyoyee repo (115 commits) is far more advanced than the portfolio prototype. Safe to delete the portfolio version entirely.',
    'todo', 'low', 50
  ),
  (
    (select id from public.sprints where name = 'Sprint 1 — Portfolio Slim-Down'),
    (select id from public.projects where name = 'UYE'),
    'Delete app/projects/UYE from portfolio',
    'Portfolio UYE is only an about page; the real UYE work is in the standalone Laravel repo. Remove the stub.',
    'todo', 'low', 60
  ),
  (
    (select id from public.sprints where name = 'Sprint 1 — Portfolio Slim-Down'),
    null,
    'Remove unused API routes',
    'Delete app/api/surveys, app/api/quizzes, app/api/hierarchy, app/api/create-page, app/api/create-project, app/api/dashboardRoutes.js, app/api/authMiddleware.js. The new portfolio uses Server Components + Server Actions, not these routes.',
    'todo', 'medium', 70
  ),
  (
    (select id from public.sprints where name = 'Sprint 1 — Portfolio Slim-Down'),
    null,
    'Remove old auth and create-project pages',
    'Delete app/auth/ and app/create-project/ — superseded by the new /login and /admin sections.',
    'todo', 'medium', 80
  ),
  (
    (select id from public.sprints where name = 'Sprint 1 — Portfolio Slim-Down'),
    null,
    'Trim package.json dependencies',
    'After subproject migration, remove deps that are no longer needed: chart.js, react-chartjs-2, leaflet, react-leaflet, swiper, react-select, react-icons, uuid (these are all used only by the subprojects being migrated out).',
    'todo', 'medium', 90
  ),
  (
    (select id from public.sprints where name = 'Sprint 1 — Portfolio Slim-Down'),
    null,
    'Delete unused shared components',
    'After subproject removal: clean up components/ folder. CommonComponents, HierarchyView, LanguageSwitcher, SocialAuthButton, SurveyTemplateModal, TemplateProjectPage, Table, DropdownMenu, ThemeToggle (old), PasswordInput, MessageBanner — most of these are only used by the migrating subprojects.',
    'todo', 'low', 100
  );

-- 3. Tasks for Sprint 2 — GitHub Housekeeping
insert into public.tasks (sprint_id, project_id, title, description, status, priority, display_order)
values
  (
    (select id from public.sprints where name = 'Sprint 2 — GitHub Housekeeping'),
    null,
    'Delete contoh repo',
    'Empty stub with just "# contoh" README. Run: gh repo delete taufikhamid2000/contoh --yes',
    'todo', 'low', 10
  ),
  (
    (select id from public.sprints where name = 'Sprint 2 — GitHub Housekeeping'),
    null,
    'Delete studenthub repo',
    'Empty stub with just "# studenthub" README. Run: gh repo delete taufikhamid2000/studenthub --yes',
    'todo', 'low', 20
  ),
  (
    (select id from public.sprints where name = 'Sprint 2 — GitHub Housekeeping'),
    (select id from public.projects where name = 'WXGeoDemo API'),
    'Archive WXGeoDemo.API repo',
    'C# .NET API with 3 commits, no README, unclear purpose. Run: gh repo archive taufikhamid2000/WXGeoDemo.API',
    'todo', 'low', 30
  ),
  (
    (select id from public.sprints where name = 'Sprint 2 — GitHub Housekeeping'),
    null,
    'Archive Syllabuzz repo',
    'Incomplete Android project (3 commits, no README, 2 fragments only). Run: gh repo archive taufikhamid2000/Syllabuzz',
    'todo', 'low', 40
  ),
  (
    (select id from public.sprints where name = 'Sprint 2 — GitHub Housekeeping'),
    (select id from public.projects where name = 'Pokemon App'),
    'Archive pokemonapp repo',
    'Vue 3 PokeAPI tutorial — completed learning project. Run: gh repo archive taufikhamid2000/pokemonapp',
    'todo', 'low', 50
  ),
  (
    (select id from public.sprints where name = 'Sprint 2 — GitHub Housekeeping'),
    (select id from public.projects where name = 'Proxlox'),
    'Archive proxlox repo',
    'Next.js with 2 commits, unclear purpose. Run: gh repo archive taufikhamid2000/proxlox (or delete if you confirm it''s truly unused).',
    'todo', 'low', 60
  ),
  (
    (select id from public.sprints where name = 'Sprint 2 — GitHub Housekeeping'),
    (select id from public.projects where name = 'TIWIKOM'),
    'Archive Angular tiwikom repo',
    'tiwikom (Angular, 23 commits) is being replaced by tiwikom-v2 (ASP.NET Core). Archive the Angular one. Run: gh repo archive taufikhamid2000/tiwikom',
    'todo', 'medium', 70
  ),
  (
    (select id from public.sprints where name = 'Sprint 2 — GitHub Housekeeping'),
    (select id from public.projects where name = 'SBMP'),
    'Create sbmp GitHub repo + push migrated code',
    'After Sprint 1 task to migrate SBMP locally: gh repo create taufikhamid2000/sbmp --public, then push from the new local folder. Update the SBMP project entry in the portfolio DB with the new github_url and demo_url.',
    'todo', 'high', 80
  ),
  (
    (select id from public.sprints where name = 'Sprint 2 — GitHub Housekeeping'),
    (select id from public.projects where name = 'JobMatch'),
    'Create jobmatch GitHub repo + push migrated code',
    'After Sprint 1 task to migrate JobMatch locally: gh repo create taufikhamid2000/jobmatch --public, then push. Update the JobMatch project entry with github_url and demo_url.',
    'todo', 'high', 90
  ),
  (
    (select id from public.sprints where name = 'Sprint 2 — GitHub Housekeeping'),
    null,
    'Push portfolio cleanup commits',
    'After Sprint 1 tasks: commit + push the slimmer portfolio to taufikhamid2000/taufik-portfolio.',
    'todo', 'medium', 100
  );

-- 4. Tasks for Sprint 3 — Security & Maintenance
insert into public.tasks (sprint_id, project_id, title, description, status, priority, display_order)
values
  (
    (select id from public.sprints where name = 'Sprint 3 — Security & Maintenance'),
    null,
    'Review npm audit report',
    'Run ``npm audit`` and triage the 60 vulnerabilities. Identify which are in direct deps (actionable) vs transitive (need upstream fix or override).',
    'todo', 'high', 10
  ),
  (
    (select id from public.sprints where name = 'Sprint 3 — Security & Maintenance'),
    null,
    'Upgrade Next.js 14 → 15',
    'Currently on 14.2.13. Newer projects in the same fleet (edubridge, veyoyee, myquiza) use Next 15. Test thoroughly: App Router, Server Actions, dynamic params (now async), middleware. Will likely fix many vulnerabilities.',
    'todo', 'high', 20
  ),
  (
    (select id from public.sprints where name = 'Sprint 3 — Security & Maintenance'),
    null,
    'Fix critical / high vulnerabilities',
    '2 critical and 12 high vulnerabilities flagged by GitHub Dependabot. Address each (likely involves upgrading or replacing deps).',
    'todo', 'urgent', 30
  ),
  (
    (select id from public.sprints where name = 'Sprint 3 — Security & Maintenance'),
    null,
    'Update remaining vulnerable deps',
    'After Next.js upgrade, run ``npm audit fix`` to clean up the rest. Verify nothing broke.',
    'todo', 'medium', 40
  ),
  (
    (select id from public.sprints where name = 'Sprint 3 — Security & Maintenance'),
    null,
    'Re-enable next lint',
    '``next lint`` currently fails with a plugin loading error (Class extends value undefined). Fix the @typescript-eslint config so lint works again.',
    'todo', 'medium', 50
  );
