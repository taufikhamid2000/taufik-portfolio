-- =====================================================
-- Sprint planning schema
-- =====================================================
-- Two tables: sprints (time-boxed work periods) and tasks
-- (work items, optionally linked to a sprint and/or a project).
-- Admin-only for both read and write — sprint planning is private.
-- To make it public, change the SELECT policies to `using (true)`.
-- =====================================================

-- 1. sprints
create table if not exists public.sprints (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  goal text,
  start_date date,
  end_date date,
  status text not null default 'planned'
    check (status in ('planned', 'active', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sprints_status_idx on public.sprints (status);
create index if not exists sprints_start_date_idx on public.sprints (start_date);

drop trigger if exists set_sprints_updated_at on public.sprints;
create trigger set_sprints_updated_at
  before update on public.sprints
  for each row execute function public.set_updated_at();

-- 2. tasks
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  sprint_id uuid references public.sprints(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  description text,
  status text not null default 'todo'
    check (status in ('todo', 'in-progress', 'blocked', 'done')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'urgent')),
  effort integer,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists tasks_sprint_id_idx on public.tasks (sprint_id);
create index if not exists tasks_project_id_idx on public.tasks (project_id);
create index if not exists tasks_status_idx on public.tasks (status);

drop trigger if exists set_tasks_updated_at on public.tasks;
create trigger set_tasks_updated_at
  before update on public.tasks
  for each row execute function public.set_updated_at();

-- Auto-set completed_at when status transitions to 'done'
create or replace function public.set_completed_at()
returns trigger language plpgsql as $$
begin
  if new.status = 'done' and (old.status is distinct from 'done') then
    new.completed_at = now();
  elsif new.status <> 'done' then
    new.completed_at = null;
  end if;
  return new;
end;
$$;

drop trigger if exists set_tasks_completed_at on public.tasks;
create trigger set_tasks_completed_at
  before update on public.tasks
  for each row execute function public.set_completed_at();

-- 3. RLS — admin-only on both read and write
alter table public.sprints enable row level security;
alter table public.tasks enable row level security;

drop policy if exists "Admin can read sprints" on public.sprints;
create policy "Admin can read sprints" on public.sprints
  for select using (
    auth.jwt() ->> 'email' = 'taufikhamid2000@gmail.com'
  );

drop policy if exists "Admin can write sprints" on public.sprints;
create policy "Admin can write sprints" on public.sprints
  for all using (
    auth.jwt() ->> 'email' = 'taufikhamid2000@gmail.com'
  )
  with check (
    auth.jwt() ->> 'email' = 'taufikhamid2000@gmail.com'
  );

drop policy if exists "Admin can read tasks" on public.tasks;
create policy "Admin can read tasks" on public.tasks
  for select using (
    auth.jwt() ->> 'email' = 'taufikhamid2000@gmail.com'
  );

drop policy if exists "Admin can write tasks" on public.tasks;
create policy "Admin can write tasks" on public.tasks
  for all using (
    auth.jwt() ->> 'email' = 'taufikhamid2000@gmail.com'
  )
  with check (
    auth.jwt() ->> 'email' = 'taufikhamid2000@gmail.com'
  );
