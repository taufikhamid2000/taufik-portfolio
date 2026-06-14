-- Sprint 4: Scaffold ASP.NET Core Web API in MyQuiza repo — DONE
UPDATE public.tasks
SET
  status      = 'done',
  updated_at  = now(),
  description = 'Scaffolded ASP.NET Core Web API (.NET 10) in myquiza/backend. EF Core + Npgsql, feature-based structure (Quizzes, Questions, Results), health check at /health, OpenAPI docs, solution file, .gitignore, README.'
WHERE title ILIKE '%scaffold%asp%net%'
   OR title ILIKE '%scaffold%web api%'
   OR (title ILIKE '%myquiza%' AND title ILIKE '%api%');
