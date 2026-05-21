-- =====================================================
-- Portfolio Projects Schema
-- =====================================================
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- =====================================================

-- 1. Create projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tagline text not null,
  description text not null,
  tech text[] not null default '{}',
  github_url text,
  demo_url text,
  status text not null default 'active'
    check (status in ('active', 'in-progress', 'concept', 'archived', 'in-portfolio')),
  featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Indexes for sorting/filtering
create index if not exists projects_display_order_idx on public.projects (display_order);
create index if not exists projects_featured_idx on public.projects (featured);
create index if not exists projects_status_idx on public.projects (status);

-- 3. Auto-update updated_at on row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- 4. Enable Row Level Security
alter table public.projects enable row level security;

-- 5. Policies
--    Public can SELECT (read) all projects
drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects" on public.projects
  for select using (true);

--    Only the admin email can INSERT / UPDATE / DELETE
--    CHANGE THE EMAIL BELOW to your admin email if different
drop policy if exists "Admin can insert projects" on public.projects;
create policy "Admin can insert projects" on public.projects
  for insert with check (
    auth.jwt() ->> 'email' = 'putrasabah41@gmail.com'
  );

drop policy if exists "Admin can update projects" on public.projects;
create policy "Admin can update projects" on public.projects
  for update using (
    auth.jwt() ->> 'email' = 'putrasabah41@gmail.com'
  );

drop policy if exists "Admin can delete projects" on public.projects;
create policy "Admin can delete projects" on public.projects
  for delete using (
    auth.jwt() ->> 'email' = 'putrasabah41@gmail.com'
  );

-- =====================================================
-- 6. Seed data (the projects we already had in code)
-- =====================================================

insert into public.projects (name, tagline, description, tech, github_url, status, featured, display_order)
values
  (
    'EduBridge',
    'Educational platform with gamification',
    'A structured learning platform with quiz attempts, leaderboards, an admin panel, and a comments system. Built with performance optimizations and a full testing suite.',
    array['Next.js 15', 'Supabase', 'React Query', 'Jest', 'TypeScript'],
    'https://github.com/taufikhamid2000/edubridge',
    'active', true, 10
  ),
  (
    'Veyoyee',
    'Survey platform with rewards',
    'Bridges survey creators and participants. Features admin panel, marketplace, leaderboard, reputation system, and a claim flow for compensation.',
    array['Next.js 15', 'Supabase', 'Shadcn UI', 'Zustand', 'Zod'],
    'https://github.com/taufikhamid2000/veyoyee',
    'active', true, 20
  ),
  (
    'BilikSewa',
    'Rental room platform',
    'Multi-project ASP.NET Core solution for room rentals with organization verification, shuttle van listings, and Render deployment.',
    array['ASP.NET Core', 'C#', 'Entity Framework', 'Razor Pages'],
    'https://github.com/taufikhamid2000/BilikSewa',
    'active', false, 30
  ),
  (
    'Mysertifico',
    'Digital certificate management',
    'Certificate management and verification platform with student profiles, resume builder, and PWA support.',
    array['Next.js 13', 'Supabase', 'TypeScript', 'PWA'],
    'https://github.com/taufikhamid2000/mysertifico',
    'active', false, 40
  ),
  (
    'MyBeratur',
    'Malaysian government queue system',
    'Digital queuing for IC renewal, driver license, passport, and summon payments. Smart branch recommendations, priority queues, and QR/PDF download.',
    array['Next.js', 'TypeScript', 'Tailwind'],
    'https://github.com/taufikhamid2000/nogipin',
    'active', false, 50
  ),
  (
    'UYE',
    'University Young Entrepreneur',
    'Platform inspired by UNISEL students offering services (rides, food, repairs) through WhatsApp. Provides a structured environment for student businesses.',
    array['Laravel', 'PHP', 'Docker', 'MySQL'],
    'https://github.com/taufikhamid2000/uye',
    'active', false, 60
  ),
  (
    'TIWIKOM',
    'Things I Wish I Knew On My...',
    'Workplace wisdom-sharing platform where employees post insights, advice, and lessons learned. Currently being rewritten in ASP.NET Core (v2).',
    array['ASP.NET Core 8', 'Entity Framework', 'Bootstrap'],
    'https://github.com/taufikhamid2000/tiwikom-v2',
    'in-progress', false, 70
  ),
  (
    'ACCodeSEA',
    'Assassins Creed SEA community',
    'Community platform for Assassins Creed enthusiasts in Southeast Asia. Storytelling experience with choice pathways, feedback system, and member roles.',
    array['Next.js', 'Framer Motion', 'SQLite'],
    'https://github.com/taufikhamid2000/nextjs-animated-slider',
    'in-progress', false, 80
  ),
  (
    'SBMP',
    'Small Business Management Platform',
    'Dashboard with business overview, inventory management, order processing, financial tracking, and FAQ support — designed for small business owners.',
    array['Next.js', 'TypeScript', 'Chart.js'],
    null,
    'in-portfolio', false, 90
  ),
  (
    'JobMatch',
    'Job tracking and matching',
    'Application tracking, job posting management, user management, and employer dashboards. Built for connecting job seekers and employers.',
    array['Next.js', 'TypeScript', 'Tailwind'],
    null,
    'in-portfolio', false, 100
  ),
  (
    'TekaTeki',
    'Hierarchical quiz platform',
    'Quiz system organized by Levels → Subjects → Chapters → Lessons. Admin can create/verify quizzes, users answer and compete.',
    array['Next.js', 'Supabase', 'TypeScript'],
    null,
    'in-portfolio', false, 110
  ),
  (
    'SelectYourLeague',
    'Football streaming concept',
    'Pay-per-league football streaming concept. Fans select specific leagues (EPL, La Liga, UCL) for personalized subscription packages.',
    array['Concept'],
    null,
    'concept', false, 120
  ),
  (
    'SlideMarket',
    'Educational slides marketplace',
    'Marketplace concept where content creators sell educational slides and educators request customizations for their classrooms.',
    array['Concept'],
    null,
    'concept', false, 130
  )
on conflict do nothing;
