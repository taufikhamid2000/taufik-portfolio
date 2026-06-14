-- =====================================================
-- Update EduBridge + MyQuiza portfolio cards
-- =====================================================

-- MyQuiza: point demo_url to Scalar API docs
update public.projects
set
  demo_url    = 'https://myquiza-api.onrender.com/scalar/v1',
  tagline     = 'ASP.NET Core REST API for quiz delivery, server-side scoring, and leaderboard',
  description = 'RESTful API built on ASP.NET Core (.NET 10) and deployed on Render (Docker). Validates Supabase JWTs, handles server-side quiz scoring, XP awards, and topic progress tracking. Consumed by EduBridge as a microservice. Full OpenAPI docs via Scalar.',
  updated_at  = now()
where name = 'MyQuiza';

-- EduBridge: reflect microservice integration story
update public.projects
set
  tagline     = 'Next.js quiz platform integrated with MyQuiza API for server-side scoring and leaderboard',
  description = 'Full-stack quiz platform for Malaysian secondary school students. Next.js 15 frontend backed by Supabase for auth/data and the MyQuiza REST API for quiz attempts, server-side scoring, XP awards, and leaderboard. Features JWT Bearer forwarding, a typed API client, and a Vercel Cron keep-alive for the Render free tier.',
  updated_at  = now()
where name ilike '%edubridge%';
