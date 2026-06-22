-- =====================================================
-- Vision Planning: ministries, initiatives, submissions
-- =====================================================
-- A public, SEO-friendly planning surface mapping Malaysian government
-- ministries to software solutions. Curated entries (initiatives) are
-- admin-authored; the public can submit ideas (submissions) into a
-- moderation queue that only surfaces publicly after admin approval.
-- Reuses the existing public.projects table for the "which software helps"
-- mapping.
-- =====================================================

-- ---------- 1. ministries ----------
create table if not exists public.ministries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ministries_slug_idx on public.ministries (slug);
create index if not exists ministries_display_order_idx on public.ministries (display_order);

-- ---------- 2. initiatives (admin-curated, public-read) ----------
create table if not exists public.initiatives (
  id uuid primary key default gen_random_uuid(),
  ministry_id uuid not null references public.ministries (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  problem text not null,
  idea text not null,
  status text not null default 'active'
    check (status in ('active', 'planned', 'concept')),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists initiatives_ministry_idx on public.initiatives (ministry_id);
create index if not exists initiatives_project_idx on public.initiatives (project_id);

-- ---------- 3. submissions (public-write to a moderation queue) ----------
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  ministry_id uuid references public.ministries (id) on delete set null,
  problem text not null check (char_length(problem) between 10 and 2000),
  idea text not null check (char_length(idea) between 10 and 2000),
  submitter_name text check (submitter_name is null or char_length(submitter_name) <= 100),
  submitter_contact text check (submitter_contact is null or char_length(submitter_contact) <= 200),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists submissions_status_idx on public.submissions (status);
create index if not exists submissions_ministry_idx on public.submissions (ministry_id);

-- ---------- 4. updated_at triggers (reuse existing set_updated_at) ----------
drop trigger if exists set_ministries_updated_at on public.ministries;
create trigger set_ministries_updated_at
  before update on public.ministries
  for each row execute function public.set_updated_at();

drop trigger if exists set_initiatives_updated_at on public.initiatives;
create trigger set_initiatives_updated_at
  before update on public.initiatives
  for each row execute function public.set_updated_at();

drop trigger if exists set_submissions_updated_at on public.submissions;
create trigger set_submissions_updated_at
  before update on public.submissions
  for each row execute function public.set_updated_at();

-- ---------- 5. RLS ----------
alter table public.ministries  enable row level security;
alter table public.initiatives enable row level security;
alter table public.submissions enable row level security;

-- Admin allowlist (matches the middleware allowlist).
-- ministries: public read, admin write
drop policy if exists "Public can read ministries" on public.ministries;
create policy "Public can read ministries" on public.ministries
  for select using (true);

drop policy if exists "Admin can write ministries" on public.ministries;
create policy "Admin can write ministries" on public.ministries
  for all using (
    auth.jwt() ->> 'email' in ('taufikhamid2000@gmail.com', 'putrasabah41@gmail.com')
  ) with check (
    auth.jwt() ->> 'email' in ('taufikhamid2000@gmail.com', 'putrasabah41@gmail.com')
  );

-- initiatives: public read, admin write
drop policy if exists "Public can read initiatives" on public.initiatives;
create policy "Public can read initiatives" on public.initiatives
  for select using (true);

drop policy if exists "Admin can write initiatives" on public.initiatives;
create policy "Admin can write initiatives" on public.initiatives
  for all using (
    auth.jwt() ->> 'email' in ('taufikhamid2000@gmail.com', 'putrasabah41@gmail.com')
  ) with check (
    auth.jwt() ->> 'email' in ('taufikhamid2000@gmail.com', 'putrasabah41@gmail.com')
  );

-- submissions:
--   anon/public can INSERT, but only as 'pending' (can't self-approve)
--   public can SELECT only 'approved' rows
--   admin can SELECT all + UPDATE (moderate) + DELETE
drop policy if exists "Public can submit ideas" on public.submissions;
create policy "Public can submit ideas" on public.submissions
  for insert with check (status = 'pending');

drop policy if exists "Public can read approved submissions" on public.submissions;
create policy "Public can read approved submissions" on public.submissions
  for select using (status = 'approved');

drop policy if exists "Admin can read all submissions" on public.submissions;
create policy "Admin can read all submissions" on public.submissions
  for select using (
    auth.jwt() ->> 'email' in ('taufikhamid2000@gmail.com', 'putrasabah41@gmail.com')
  );

drop policy if exists "Admin can moderate submissions" on public.submissions;
create policy "Admin can moderate submissions" on public.submissions
  for update using (
    auth.jwt() ->> 'email' in ('taufikhamid2000@gmail.com', 'putrasabah41@gmail.com')
  );

drop policy if exists "Admin can delete submissions" on public.submissions;
create policy "Admin can delete submissions" on public.submissions
  for delete using (
    auth.jwt() ->> 'email' in ('taufikhamid2000@gmail.com', 'putrasabah41@gmail.com')
  );

-- Ensure the anon role can insert into submissions (RLS still gates it).
grant insert on public.submissions to anon;
grant select on public.submissions to anon;
grant select on public.ministries, public.initiatives to anon;

-- ---------- 6. Seed ministries ----------
insert into public.ministries (name, slug, description, display_order)
values
  ('Ministry of Education', 'education', 'Schools, curriculum, and student outcomes for primary and secondary education.', 10),
  ('Ministry of Higher Education', 'higher-education', 'Universities, polytechnics, and tertiary learning.', 20),
  ('Ministry of Health', 'health', 'Public healthcare, hospitals, and health services.', 30),
  ('Ministry of Housing and Local Government', 'housing-local-government', 'Affordable housing, rentals, and local council services.', 40),
  ('Ministry of Human Resources', 'human-resources', 'Employment, labour, and workforce development.', 50),
  ('Ministry of Finance', 'finance', 'National budget, taxation, and public finance.', 60),
  ('Ministry of Economy', 'economy', 'Economic planning, statistics, and development.', 70),
  ('Ministry of Digital', 'digital', 'Digital government, data, and the digital economy.', 80),
  ('Ministry of Transport', 'transport', 'Roads, public transport, licensing, and mobility.', 90),
  ('Ministry of Home Affairs', 'home-affairs', 'Immigration, national registration, and public order.', 100),
  ('Ministry of Domestic Trade and Cost of Living', 'domestic-trade-cost-of-living', 'Consumer protection, prices, and domestic trade.', 110),
  ('Ministry of Communications', 'communications', 'Media, broadcasting, and public communication.', 120),
  ('Ministry of Science, Technology and Innovation', 'science-technology-innovation', 'R&D, innovation, and emerging technology.', 130),
  ('Ministry of Rural and Regional Development', 'rural-regional-development', 'Rural infrastructure and regional growth.', 140),
  ('Ministry of Works', 'works', 'Public infrastructure and construction.', 150),
  ('Ministry of Agriculture and Food Security', 'agriculture-food-security', 'Farming, fisheries, and food supply.', 160),
  ('Ministry of Youth and Sports', 'youth-sports', 'Youth development and sports.', 170),
  ('Ministry of Tourism, Arts and Culture', 'tourism-arts-culture', 'Tourism, heritage, arts, and culture.', 180),
  ('Ministry of Investment, Trade and Industry', 'investment-trade-industry', 'Trade, investment, and industrial development.', 190),
  ('Ministry of Entrepreneur Development and Cooperatives', 'entrepreneur-cooperatives', 'SMEs, entrepreneurs, and cooperatives.', 200),
  ('Ministry of Defence', 'defence', 'National defence and armed forces.', 210),
  ('Ministry of Foreign Affairs', 'foreign-affairs', 'Diplomacy and international relations.', 220),
  ('Ministry of Plantation and Commodities', 'plantation-commodities', 'Palm oil, rubber, and commodities.', 230),
  ('Ministry of Natural Resources and Environmental Sustainability', 'natural-resources-environment', 'Environment, biodiversity, and natural resources.', 240),
  ('Ministry of Energy Transition and Water Transformation', 'energy-water', 'Energy, renewables, and water.', 250),
  ('Ministry of Women, Family and Community Development', 'women-family-community', 'Welfare, family, and community development.', 260),
  ('Ministry of National Unity', 'national-unity', 'Social cohesion and national unity.', 270)
on conflict (slug) do nothing;

-- ---------- 7. Seed initiatives linking existing projects ----------
insert into public.initiatives (ministry_id, project_id, problem, idea, status, display_order)
select m.id, p.id, v.problem, v.idea, v.status, v.display_order
from (values
  ('education',
   'EduBridge',
   'Students lack a structured, gamified way to practise the national syllabus, and teachers have little visibility into per-topic mastery.',
   'EduBridge — a learning platform with quizzes, server-side scoring, XP, and leaderboards, backed by the MyQuiza API and a native Android client (Syllabuzz).',
   'active', 10),
  ('higher-education',
   'EduBridge',
   'Tertiary learners need self-paced revision tools that map to their courses.',
   'Extend the EduBridge content tree and quiz engine to tertiary subjects.',
   'planned', 10),
  ('housing-local-government',
   'BilikSewa',
   'Renters struggle to find verified rooms, and there is no trustworthy listing channel with organisation verification.',
   'BilikSewa — a rental platform with organisation verification and shuttle-van listings.',
   'active', 10),
  ('human-resources',
   'JobMatch',
   'Job seekers and employers lack a structured channel to track applications and match openings.',
   'JobMatch — application tracking, job posting management, and employer dashboards.',
   'active', 10),
  ('entrepreneur-cooperatives',
   'UYE',
   'University students running small businesses operate informally over WhatsApp with no structure.',
   'UYE (University Young Entrepreneur) — a structured marketplace for student-run services.',
   'active', 10),
  ('home-affairs',
   'MyBeratur',
   'Government counter services (IC, licence, passport, summons) involve long, opaque queues.',
   'MyBeratur — digital queuing with smart branch recommendations, priority queues, and QR/PDF tickets.',
   'active', 10)
) as v(ministry_slug, project_name, problem, idea, status, display_order)
join public.ministries m on m.slug = v.ministry_slug
left join public.projects p on p.name = v.project_name
where not exists (
  select 1 from public.initiatives i
  where i.ministry_id = m.id and i.problem = v.problem
);
