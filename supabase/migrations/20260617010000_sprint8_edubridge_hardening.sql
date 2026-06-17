-- =====================================================
-- Sprint 8 — EduBridge Hardening & Cleanup
-- =====================================================
-- 10 improvements surfaced by the EduBridge team from the codebase,
-- triaged: Critical (1-2), High value (3-5), Cleanup (6-8),
-- Product/cross-team (9-10).
-- =====================================================

-- Create Sprint 8
insert into public.sprints (name, goal, status, start_date, end_date)
select
  'Sprint 8 — EduBridge Hardening & Cleanup',
  'Close a privilege-escalation hole, restore type/lint/test gates in CI, remove debug-route attack surface and dead code, add dependency monitoring, and simplify the bespoke auth-session caching.',
  'planned',
  current_date,
  current_date + interval '3 weeks'
where not exists (
  select 1 from public.sprints where name = 'Sprint 8 — EduBridge Hardening & Cleanup'
);

-- Seed Sprint 8 tasks
with s as (select id from public.sprints where name = 'Sprint 8 — EduBridge Hardening & Cleanup'),
     p as (select id from public.projects where name ilike '%edubridge%' limit 1)
insert into public.tasks (sprint_id, project_id, title, description, status, priority, effort, display_order)
select s.id, p.id, t.title, t.description, 'todo', t.priority, t.effort, t.display_order
from s, p, (values
  (1,
   'Fix bypassAuthCheck privilege-escalation hole in make-admin route',
   'URGENT SECURITY: src/app/api/admin/make-admin/route.ts grants any role to any user if the request body contains bypassAuthCheck:true — no auth required. An unauthenticated attacker can POST {userId, role:''admin'', bypassAuthCheck:true} to self-promote to admin. Remove the bypass entirely, or gate it behind a server-only secret + the first-user check only. Effort: S.',
   'high', 1),
  (2,
   'Re-enable type-checking and linting in build/CI',
   'prebuild is literally echo ''Skipping TypeScript check''; every build skips type validation + linting. This is exactly how the schoolTypes regression reached production. Add a CI step (or restore predeploy) running tsc --noEmit + next lint that fails on error. Likely surfaces a backlog of existing type errors. Effort: M.',
   'high', 3),
  (3,
   'Delete ~20 leftover debug/diagnostic API routes',
   'Routes like /api/debug-env, /api/test-env, /api/debug-connection, /api/rls-diagnostic-full, /api/sql-join-test, /api/schema-test, /api/final-fix, /api/quiz-bypass/[quizId], /api/quiz-fixed, /api/quiz-optimized, /api/create-test-question, /api/admin-test, /api/hello. debug-env/test-env can leak environment details. Attack surface + noise. Effort: S-M.',
   'medium', 2),
  (4,
   'Add automated tests on the API layer + wire into CI',
   'The rotated-JWT 401 and missing supabaseAdmin export both went unnoticed until a build/partner caught them — a coverage gap on API routes. Test files exist but do not gate deploys (and some do not type-check). Get a real suite running in CI. Effort: L.',
   'medium', 5),
  (5,
   'Add dependency/vulnerability monitoring + finish Supabase ssr migration',
   'The Next.js CVE was caught by luck — add Dependabot or Renovate. Also @supabase/auth-helpers-nextjs and @supabase/auth-helpers-shared are deprecated (build warns every run); migrate remaining usages fully to @supabase/ssr. Effort: M.',
   'medium', 3),
  (6,
   'Remove dead and orphaned code',
   'src/lib/quiz.ts is unused (obsolete direct-Supabase quiz-write + updateUserStats path). Leftover src/app/leaderboard/page.new.tsx. fetchLeaderboard in src/services/leaderboardService.ts still queries Supabase directly even though the page now goes through the MyQuiza-backed /api/leaderboard. Consolidate to one path. Effort: S-M.',
   'low', 2),
  (7,
   'Clean up production console.log noise / enforce logger',
   'QuizPlayer.tsx, the dashboard page, and several routes are littered with raw console.log debug dumps. console-override.ts and a fix-console-logs script already exist — apply consistently and lint against raw console.*. Effort: S.',
   'low', 1),
  (8,
   'Replace hardcoded values with real config/data',
   'Quiz time limit is hardcoded timeLimit={15} in the play page (comment says it should come from quiz.time_limit); the weekly quiz target (10) and XP formulas are scattered magic numbers. Source these from the data model / a config module. Effort: M.',
   'low', 3),
  (9,
   'Restore quiz per-question results breakdown (needs MyQuiza change)',
   'The quiz-detail migration correctly removed the answer key from the client, but that also dropped the Question 1: Correct/Incorrect breakdown on the results screen. Ask MyQuiza to return per-question correctness in the POST /attempts response so EduBridge can show it again without exposing the key pre-submission. Effort: S on EduBridge side, needs a MyQuiza change.',
   'medium', 1),
  (10,
   'Simplify/harden custom auth-session caching in supabase.ts',
   'There is a bespoke 5-minute localStorage auth cache plus recoverSession() recovery logic wrapping supabase-js. It is complex and a likely source of stale-session edge cases. Evaluate whether built-in supabase-js / @supabase/ssr session handling can replace most of it. Effort: M, reduces a whole class of auth bugs.',
   'medium', 3)
) as t(display_order, title, description, priority, effort);
