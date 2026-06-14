-- MyQuiza API fully live & verified against the Supabase DB.
update public.tasks set
  description = 'DONE & VERIFIED LIVE: https://myquiza-api.onrender.com on Render (Docker, Singapore). Connected to EduBridge''s Supabase DB — /api/v1/subjects and /api/v1/leaderboard return real rows; Supabase JWT auth enforced (401 without token).',
  updated_at  = now()
where title = 'Deploy API to Render or Azure';
