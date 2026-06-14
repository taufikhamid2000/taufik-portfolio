-- =====================================================
-- Sprint 5 — MyQuiza API Build-Out
-- =====================================================
-- Move the MyQuiza API tasks out of Sprint 4 into a focused Sprint 5,
-- add the data-model realignment task, and mark completed work done.
-- Uses EXACT-title matches (no broad ILIKE wildcards).
-- =====================================================

-- 1. Create Sprint 5 (idempotent on name)
insert into public.sprints (name, goal, status)
select
  'Sprint 5 — MyQuiza API Build-Out',
  'Build out the MyQuiza ASP.NET Core API on the scaffold: map onto EduBridge''s existing Supabase schema, validate Supabase JWTs, ship the v1 endpoint surface, and deploy.',
  'active'
where not exists (
  select 1 from public.sprints where name = 'Sprint 5 — MyQuiza API Build-Out'
);

-- 2. Move + complete: Supabase JWT validation
update public.tasks set
  sprint_id   = (select id from public.sprints where name = 'Sprint 5 — MyQuiza API Build-Out'),
  status      = 'done',
  description = 'DONE: JwtBearer validates Supabase-issued JWTs (issuer/JWKS or HS256 secret, configurable). CurrentUser maps the sub claim; Moderator/Admin authorization policies resolve roles from user_roles + user_profiles.school_role. No user store in the API.',
  updated_at  = now()
where title = 'Wire Supabase JWT validation in the API';

-- 3. Move + complete: v1 API surface
update public.tasks set
  sprint_id   = (select id from public.sprints where name = 'Sprint 5 — MyQuiza API Build-Out'),
  status      = 'done',
  description = 'DONE: v1 controllers under /api/v1 — me + progress + attempts, content tree (subjects/chapters/topics/quizzes), quiz GET/create/verify, attempt submission with SERVER-SIDE scoring (+ topic progress + XP for verified quizzes), leaderboard. Taker DTOs strip is_correct. OpenAPI + Scalar.',
  updated_at  = now()
where title = 'Define API surface (v1 endpoints)';

-- 4. Move: deploy (artifacts ready; hosting still pending)
update public.tasks set
  sprint_id   = (select id from public.sprints where name = 'Sprint 5 — MyQuiza API Build-Out'),
  status      = 'in-progress',
  description = 'Dockerfile + .dockerignore added (runtime image binds $PORT). Remaining: create Render/Azure service, set env (connection string + Supabase issuer), wire CI from GitHub, update MyQuiza demo_url once live.',
  updated_at  = now()
where title = 'Deploy API to Render or Azure';

-- 5. Add the new data-model realignment task (done)
insert into public.tasks (sprint_id, project_id, title, description, status, priority, display_order)
select
  (select id from public.sprints where name = 'Sprint 5 — MyQuiza API Build-Out'),
  (select id from public.projects where name = 'MyQuiza'),
  'Realign MyQuiza data model to EduBridge Supabase schema',
  'DONE: replaced the generic Quiz/Question/Result scaffold with EF entities mapped to EduBridge''s existing tables (subjects, chapters, topics, quizzes, questions, answers, quiz_attempts, user_profiles, user_roles, user_topic_progress). snake_case via EFCore.NamingConventions; same Supabase DB; API owns NO migrations.',
  'done', 'high', 5
where not exists (
  select 1 from public.tasks where title = 'Realign MyQuiza data model to EduBridge Supabase schema'
);
