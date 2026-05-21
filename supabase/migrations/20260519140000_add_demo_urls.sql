-- =====================================================
-- Add demo URLs to existing projects + insert new projects
-- =====================================================
-- Updates 7 projects with their live deployment URLs
-- and adds 5 new projects that were missing from the seed.
-- =====================================================

-- 1. Update demo URLs for existing projects
update public.projects set demo_url = 'https://edubridge-sigma.vercel.app/'  where name = 'EduBridge';
update public.projects set demo_url = 'https://veyoyee.vercel.app/'           where name = 'Veyoyee';
update public.projects set demo_url = 'https://bilsewa-portal.onrender.com/'  where name = 'BilikSewa';
update public.projects set demo_url = 'https://mysertifico.vercel.app/landing' where name = 'Mysertifico';
update public.projects set demo_url = 'https://myberatur.vercel.app/'         where name = 'MyBeratur';
update public.projects set demo_url = 'https://tiwikom.vercel.app/'           where name = 'TIWIKOM';
update public.projects set demo_url = 'https://accodesea.vercel.app/'         where name = 'ACCodeSEA';

-- 2. Insert new projects that have deployments but were missing from the seed
insert into public.projects (name, tagline, description, tech, github_url, demo_url, status, featured, display_order)
values
  (
    'MyQuiza',
    'Quiz platform (in development)',
    'Quiz platform being developed as the planned standalone home for the portfolio''s TekaTeki code. Currently at boilerplate stage with planned hierarchical quiz organization (Levels - Subjects - Chapters - Lessons).',
    array['Next.js 15', 'Supabase', 'TypeScript'],
    'https://github.com/taufikhamid2000/myquiza',
    'https://myquiza.vercel.app/',
    'in-progress', false, 140
  ),
  (
    'Pokemon App',
    'Pokemon browser (Vue 3)',
    'Responsive Pokemon catalog using the public PokeAPI. Features pagination, search filter, detail pages, and editable intro stored in Pinia. Built as a Vue 3 learning project.',
    array['Vue 3', 'Vite', 'Pinia', 'Bootstrap'],
    'https://github.com/taufikhamid2000/pokemonapp',
    'https://pokemonapp-pi-five.vercel.app/',
    'archived', false, 150
  ),
  (
    'Template',
    'Next.js + Supabase starter',
    'Reusable Next.js 13+ template with App Router, TypeScript, Tailwind CSS, and Supabase authentication. Used to bootstrap new projects quickly.',
    array['Next.js 13', 'Supabase', 'TypeScript', 'Tailwind'],
    'https://github.com/taufikhamid2000/template',
    'https://template-beta-one.vercel.app/',
    'active', false, 160
  ),
  (
    'Proxlox',
    'Next.js dashboard skeleton',
    'Dashboard layout skeleton with sidebar and header components. Early-stage scaffold for a larger application.',
    array['Next.js', 'TypeScript', 'Tailwind'],
    'https://github.com/taufikhamid2000/proxlox',
    'https://proxlox.vercel.app/',
    'concept', false, 170
  ),
  (
    'WXGeoDemo API',
    'Geographic data demo API',
    'A demo C# / ASP.NET Core Web API project. Built as a learning exercise.',
    array['ASP.NET Core', 'C#'],
    'https://github.com/taufikhamid2000/WXGeoDemo.API',
    'https://wx-geo-demo-api.vercel.app/',
    'archived', false, 180
  )
on conflict do nothing;
