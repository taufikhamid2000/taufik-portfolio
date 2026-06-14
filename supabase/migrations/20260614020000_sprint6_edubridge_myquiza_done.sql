-- =====================================================
-- Sprint 6 — EduBridge × MyQuiza Wiring: DONE
-- =====================================================
-- EduBridge is fully integrated with the MyQuiza API.
-- Three features migrated off direct Supabase:
--   - Quiz list → GET /api/v1/topics/{id}/quizzes
--   - Quiz submission → POST /api/v1/quizzes/{id}/attempts (server-side scoring + XP)
--   - Leaderboard → GET /api/v1/leaderboard
-- Bonus: Vercel Cron job pings /health every 10min (Render free-tier keep-alive)
-- =====================================================

-- Mark all Sprint 6 tasks done
update public.tasks
set status      = 'done',
    completed_at = now(),
    updated_at   = now()
where sprint_id = (select id from public.sprints where name = 'Sprint 6 — EduBridge × MyQuiza Wiring')
  and status <> 'done';

-- Close Sprint 6
update public.sprints
set status   = 'completed',
    end_date = current_date,
    updated_at = now()
where name = 'Sprint 6 — EduBridge × MyQuiza Wiring';

-- Update EduBridge project entry to reflect microservice integration
update public.projects
set description = 'Full-stack quiz platform. Next.js 15 frontend consuming the MyQuiza REST API (ASP.NET Core, Render) for quiz attempts, server-side scoring, XP, and leaderboard. Auth via Supabase JWT forwarded as Bearer. Vercel Cron keeps the API warm.',
    updated_at  = now()
where name ilike '%edubridge%';
