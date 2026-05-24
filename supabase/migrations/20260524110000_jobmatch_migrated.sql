-- =====================================================
-- Mark JobMatch as migrated to standalone repo
-- =====================================================
-- JobMatch code lifted out of app/projects/jobmatch/ into a new
-- standalone repo at github.com/taufikhamid2000/jobmatch. The portfolio
-- now just links to it rather than hosting the routes.
-- =====================================================

update public.projects
set
  github_url = 'https://github.com/taufikhamid2000/jobmatch',
  updated_at = now()
where name = 'JobMatch';

-- =====================================================
-- Mark the migration sprint tasks as done
-- =====================================================

update public.tasks
set status = 'done',
    completed_at = now()
where title = 'Migrate JobMatch to standalone repo'
  and status <> 'done';

update public.tasks
set status = 'done',
    completed_at = now()
where title = 'Create jobmatch GitHub repo + push migrated code'
  and status <> 'done';
