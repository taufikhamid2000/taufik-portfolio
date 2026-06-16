-- =====================================================
-- Sprint 4 reconciliation — EduBridge quiz-detail piece
-- =====================================================
-- EduBridge confirmed "Wire EduBridge to call MyQuiza API" is ~done:
-- quiz list, attempt submission, progress, leaderboard all migrated
-- in Sprint 6. Subjects/chapters/topics stay on Supabase by design.
--
-- One piece genuinely remains: the take-quiz data fetch
-- (GET /api/quiz/[quizId]) is still a direct Supabase read and ships
-- is_correct flags client-side, so answers are inspectable before submit.
-- MyQuiza's GET /api/v1/quizzes/{id} hides correct answers for takers.
-- Scoring is unaffected (server-side on MyQuiza), so low severity.
--
-- Action: split this out as its own Sprint 6 task. The Sprint 4 umbrella
-- task "Wire EduBridge to call MyQuiza API" stays open until this lands.
-- =====================================================

insert into public.tasks (sprint_id, project_id, title, description, status, priority, effort, display_order)
select
  (select id from public.sprints where name = 'Sprint 6 — EduBridge × MyQuiza Wiring'),
  (select id from public.projects where name ilike '%edubridge%' limit 1),
  'Wire EduBridge quiz detail to GET /api/v1/quizzes/{id}',
  'Replace the direct-Supabase take-quiz fetch (GET /api/quiz/[quizId]) with MyQuiza''s GET /api/v1/quizzes/{id}, which strips is_correct from taker DTOs. Closes the only remaining piece of the Sprint 4 "Wire EduBridge to call MyQuiza API" task and fixes the client-side answer-inspection leak. One route swap, mirrors the quiz-list migration.',
  'todo', 'high', 2, 7
where not exists (
  select 1 from public.tasks
  where title = 'Wire EduBridge quiz detail to GET /api/v1/quizzes/{id}'
);
