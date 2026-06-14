-- Sprint 6: Wire EduBridge (Next.js) to the live MyQuiza API.
-- MyQuiza API is live at https://myquiza-api.onrender.com — validates Supabase JWTs,
-- handles server-side scoring/XP, exposes /api/v1/* endpoints.

-- Create Sprint 6
insert into public.sprints (name, goal, status, start_date, end_date)
values (
  'Sprint 6 — EduBridge × MyQuiza Wiring',
  'Replace EduBridge direct-Supabase calls with MyQuiza API calls for quiz attempts, progress, and leaderboard. Auth: forward Supabase access_token as Bearer.',
  'planned',
  current_date,
  current_date + interval '2 weeks'
);

-- Insert Sprint 6 tasks
with s as (select id from public.sprints where name = 'Sprint 6 — EduBridge × MyQuiza Wiring'),
     p as (select id from public.projects where name ilike '%edubridge%' limit 1)
insert into public.tasks (sprint_id, project_id, title, description, status, priority, effort, display_order)
select
  s.id,
  p.id,
  t.title,
  t.description,
  'todo',
  t.priority,
  t.effort,
  t.display_order
from s, p, (values
  (1, 'Add MYQUIZA_API_URL env var to EduBridge Vercel deployment',
   'Set MYQUIZA_API_URL=https://myquiza-api.onrender.com in EduBridge''s Vercel environment variables. Update .env.example.',
   'medium', 1),
  (2, 'Create MyQuiza API client in EduBridge',
   'Add a typed fetch wrapper (e.g. lib/myquiza.ts) that calls the MyQuiza API, forwarding the Supabase session access_token as Authorization: Bearer. Cover all v1 endpoints: subjects, quizzes, attempts, me/progress, leaderboard.',
   'medium', 3),
  (3, 'Wire EduBridge quiz list to MyQuiza content tree',
   'Replace direct Supabase query for quizzes under a topic with GET /api/v1/topics/{id}/quizzes. This endpoint returns only verified quizzes. Subjects/chapters/topics can stay on Supabase direct for now.',
   'medium', 2),
  (4, 'Replace direct Supabase quiz-attempt calls with MyQuiza API',
   'Swap the quiz submission flow to POST /api/v1/quizzes/{id}/attempts instead of writing to Supabase directly. Server-side scoring, correct-answer hiding, and XP (+50 for verified quiz with score ≥ 70%) are all handled by MyQuiza.',
   'high', 5),
  (5, 'Replace direct Supabase progress calls with MyQuiza API',
   'Swap GET user_topic_progress reads and upsert calls to use GET /api/v1/me/progress from MyQuiza API.',
   'medium', 3),
  (6, 'Replace direct Supabase leaderboard query with MyQuiza API',
   'Swap the leaderboard data fetch to GET /api/v1/leaderboard (supports ?period=weekly&limit=, max 100).',
   'medium', 2)
) as t(display_order, title, description, priority, effort);
