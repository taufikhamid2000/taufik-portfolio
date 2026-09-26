-- =====================================================
-- Public sprint planning, private repos hidden
-- =====================================================
-- Sprints and items become publicly readable (writes stay owner-only).
-- Commits stay owner-only in their table; visitors read them through
-- portfolio.public_commits, which masks anything from a private repo
-- (repo name, sha and message).
-- =====================================================

alter table portfolio.commits add column if not exists is_private boolean not null default false;

update portfolio.commits
set is_private = true
where repo in ('duitduit', 'BilikSewa', 'mysertifico', 'georepo-webapp-taufik', 'atlas');

-- Items auto-created from private-repo commits must not carry the repo name or messages.
update portfolio.tasks
set title = 'Private project: development work',
    description = 'Commits in private repositories.'
where id in (select task_id from portfolio.commits where is_private and task_id is not null);

-- Public read for sprints and tasks.
drop policy if exists "Admin can read sprints" on portfolio.sprints;
drop policy if exists "Public can read sprints" on portfolio.sprints;
create policy "Public can read sprints" on portfolio.sprints for select using (true);

drop policy if exists "Admin can read tasks" on portfolio.tasks;
drop policy if exists "Public can read tasks" on portfolio.tasks;
create policy "Public can read tasks" on portfolio.tasks for select using (true);

-- Masked commit feed for everyone. The view runs with its owner's rights, so it
-- can read the owner-only table; the masking happens here, not in the client.
create or replace view portfolio.public_commits as
select
  case when is_private then 'private' else repo end as repo,
  case when is_private then null else sha end as sha,
  case when is_private then 'Private repository' else message end as message,
  committed_at,
  task_id
from portfolio.commits;

grant select on portfolio.public_commits to anon, authenticated;

notify pgrst, 'reload schema';
