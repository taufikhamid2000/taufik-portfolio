-- MyQuiza API deployed to Render (Docker, Singapore region).
update public.projects set
  demo_url = 'https://myquiza-api.onrender.com',
  status   = 'active'
where name = 'MyQuiza';

-- Sprint 5 deploy task — service is live & healthy.
update public.tasks set
  status      = 'done',
  description = 'DONE: deployed to Render (Docker, Singapore) at https://myquiza-api.onrender.com. /health green; Supabase JWT auth enforced (401 without token). Final config step: set CONNECTIONSTRINGS__DEFAULTCONNECTION (EduBridge Supabase DB password) so data endpoints return rows.',
  updated_at  = now()
where title = 'Deploy API to Render or Azure';
