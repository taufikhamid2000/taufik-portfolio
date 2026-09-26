-- =====================================================
-- Commits become evidence, not items
-- =====================================================
-- Hierarchy: year > iteration > sprint > item (ticket) > commit.
-- Year/iteration are computed from dates. Commits live in their own table and
-- optionally link to an item via a `[T-<ticket_no>]` tag in the commit message.
-- Untagged commits are grouped by repo and day in the UI.
-- Owner-only, like sprints/tasks.
-- =====================================================

create table if not exists portfolio.commits (
  id uuid primary key default gen_random_uuid(),
  repo text not null,
  sha text not null,
  message text not null,
  committed_at timestamptz not null,
  task_id uuid references portfolio.tasks(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (repo, sha)
);

create index if not exists commits_committed_at_idx on portfolio.commits (committed_at);
create index if not exists commits_task_id_idx on portfolio.commits (task_id);

alter table portfolio.commits enable row level security;

drop policy if exists "Admin can read commits" on portfolio.commits;
create policy "Admin can read commits" on portfolio.commits
  for select using ((auth.jwt() ->> 'email') = 'taufikhamid2000@gmail.com');

drop policy if exists "Admin can write commits" on portfolio.commits;
create policy "Admin can write commits" on portfolio.commits
  for all using ((auth.jwt() ->> 'email') = 'taufikhamid2000@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'taufikhamid2000@gmail.com');

grant select, insert, update, delete on portfolio.commits to authenticated, service_role;

-- Move the commits previously imported as done tasks (description = 'github:<repo>@<sha>').
insert into portfolio.commits (repo, sha, message, committed_at)
select split_part(substr(description, 8), '@', 1),
       split_part(description, '@', 2),
       regexp_replace(title, '^\[[^]]*\] ', ''),
       completed_at
from portfolio.tasks
where description like 'github:%' and completed_at is not null
on conflict (repo, sha) do nothing;

delete from portfolio.tasks where description like 'github:%';

-- Drop the auto-created, now empty "Activity" sprints.
delete from portfolio.sprints s
where s.name like '% — Activity'
  and not exists (select 1 from portfolio.tasks t where t.sprint_id = s.id);

-- Stable ticket numbers so commits can say [T-42].
alter table portfolio.tasks add column if not exists ticket_no integer generated always as identity;
create unique index if not exists tasks_ticket_no_key on portfolio.tasks (ticket_no);

notify pgrst, 'reload schema';
