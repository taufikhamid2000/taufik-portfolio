-- =====================================================
-- Mark SBMP as migrated to standalone repo
-- =====================================================
-- SBMP code has been lifted out of app/projects/SBMP/ into a new
-- standalone repo at github.com/taufikhamid2000/sbmp. The portfolio
-- now just links to it rather than hosting the routes.
-- =====================================================

update public.projects
set
  github_url = 'https://github.com/taufikhamid2000/sbmp',
  description = 'A neighbour learned I write code and asked if I could build a system to help him run his restaurant. Has inventory, orders, financial tracking, and FAQ support. Built quickly and never fully finished — migrated out of the portfolio monorepo into its own repo so it can be revived independently if a concrete first customer shows up.',
  updated_at = now()
where name = 'SBMP';

-- =====================================================
-- Mark the migration sprint task as done
-- =====================================================

update public.tasks
set status = 'done',
    completed_at = now()
where title = 'Migrate SBMP to standalone repo'
  and status <> 'done';

update public.tasks
set status = 'done',
    completed_at = now()
where title = 'Create sbmp GitHub repo + push migrated code'
  and status <> 'done';
