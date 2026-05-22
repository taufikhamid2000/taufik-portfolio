-- =====================================================
-- Specialize the EduBridge stack: web / API / mobile
-- =====================================================
-- Three look-alike repos now have distinct roles:
--   - EduBridge   → web client (Next.js)
--   - MyQuiza     → API (ASP.NET Core)
--   - Syllabuzz   → mobile client (Android)
-- TekaTeki (portfolio subfolder, no real repo) is deleted.
-- =====================================================

-- 1. Update EduBridge — now framed as the web client
update public.projects set
  tagline = 'SPM learning platform — web client',
  description = 'Web client of a community-verified SPM learning platform (SoloLearn-style, but for Malaysian high-school subjects with community-contributed content and Verifier role). Renders content, quizzes, and leaderboards in Next.js. Will call the MyQuiza API for complex business logic; Supabase still handles auth + simple reads.',
  tech = array['Next.js 15', 'Supabase Auth', 'React Query', 'Jest', 'TypeScript'],
  status = 'active',
  featured = true,
  display_order = 10
where name = 'EduBridge';

-- 2. Reborn MyQuiza — ASP.NET Core API
update public.projects set
  tagline = 'SPM learning platform — API (.NET)',
  description = 'ASP.NET Core Web API serving as the business-logic layer for the SPM learning platform. Validates Supabase-issued JWTs for auth, owns content / quiz / progress / leaderboard endpoints. Consumed by both EduBridge (web) and Syllabuzz (mobile). Currently being scaffolded — the previous Next.js boilerplate is being replaced.',
  tech = array['ASP.NET Core 8', 'C#', 'Entity Framework Core', 'PostgreSQL', 'OpenAPI'],
  github_url = 'https://github.com/taufikhamid2000/myquiza',
  demo_url = null,
  status = 'in-progress',
  featured = false,
  display_order = 12
where name = 'MyQuiza';

-- 3. Promote Syllabuzz — Android client (no longer treated as superseded)
update public.projects set
  tagline = 'SPM learning platform — Android client',
  description = 'Native Android client of the SPM learning platform. Talks to the MyQuiza API using Supabase-issued JWTs for auth. Currently in early development (a few fragments wired up). Same vision as the EduBridge web client, just on mobile.',
  tech = array['Android', 'Kotlin', 'Gradle'],
  status = 'in-progress',
  featured = false,
  display_order = 14
where name = 'Syllabuzz';

-- 4. Delete the obsolete Sprint 1 task ("Move TekaTeki into MyQuiza")
-- TekaTeki is no longer being migrated into MyQuiza — MyQuiza is becoming the API.
delete from public.tasks
where title = 'Move TekaTeki code into MyQuiza repo';

-- 5. Replace it with a simpler task in Sprint 1
insert into public.tasks (sprint_id, project_id, title, description, status, priority, display_order)
values (
  (select id from public.sprints where name = 'Sprint 1 — Portfolio Slim-Down'),
  null,
  'Delete app/projects/TekaTeki subfolder from portfolio',
  'TekaTeki is no longer being migrated anywhere — the EduBridge concept is now split into three repos (EduBridge web client, MyQuiza .NET API, Syllabuzz Android client). The TekaTeki subfolder inside the portfolio can just be deleted.',
  'todo', 'low', 30
);

-- 6. Delete TekaTeki from the projects table entirely (it has no standalone repo / deployment)
delete from public.projects where name = 'TekaTeki';

-- 7. Create Sprint 4 for the new architecture work
insert into public.sprints (name, goal, status)
values (
  'Sprint 4 — EduBridge Multi-Platform Architecture',
  'Specialize the three EduBridge look-alikes into a coherent multi-platform product: ASP.NET Core API (MyQuiza), Next.js web client (EduBridge), Android client (Syllabuzz). Supabase keeps owning auth; the .NET API owns business logic.',
  'planned'
);

-- 8. Sprint 4 tasks
insert into public.tasks (sprint_id, project_id, title, description, status, priority, display_order)
values
  (
    (select id from public.sprints where name = 'Sprint 4 — EduBridge Multi-Platform Architecture'),
    (select id from public.projects where name = 'MyQuiza'),
    'Scaffold ASP.NET Core Web API in MyQuiza repo',
    'Wipe the Next.js boilerplate. Initialize a new ASP.NET Core 8 Web API project with controllers, dependency injection, OpenAPI/Swagger, and Entity Framework Core configured against the Supabase Postgres connection string. Push to taufikhamid2000/myquiza.',
    'todo', 'high', 10
  ),
  (
    (select id from public.sprints where name = 'Sprint 4 — EduBridge Multi-Platform Architecture'),
    (select id from public.projects where name = 'MyQuiza'),
    'Wire Supabase JWT validation in the API',
    'Configure ASP.NET Core to validate JWTs issued by Supabase Auth (JWKS endpoint or shared secret). All authenticated endpoints check the user identity from the JWT. No separate user store in the API.',
    'todo', 'high', 20
  ),
  (
    (select id from public.sprints where name = 'Sprint 4 — EduBridge Multi-Platform Architecture'),
    (select id from public.projects where name = 'MyQuiza'),
    'Define API surface (v1 endpoints)',
    'Draft the OpenAPI spec for v1: auth/me, content tree (levels/subjects/chapters/lessons), quiz CRUD + attempts, progress tracking, leaderboard queries. Generate client SDKs from the spec for both EduBridge and Syllabuzz.',
    'todo', 'high', 30
  ),
  (
    (select id from public.sprints where name = 'Sprint 4 — EduBridge Multi-Platform Architecture'),
    (select id from public.projects where name = 'MyQuiza'),
    'Deploy API to Render or Azure',
    'Vercel does not host .NET runtimes. Pick a host — Render is the path of least resistance (already used for BilikSewa). Set up CI from GitHub. Update MyQuiza project entry demo_url with the deployed API URL once live.',
    'todo', 'medium', 40
  ),
  (
    (select id from public.sprints where name = 'Sprint 4 — EduBridge Multi-Platform Architecture'),
    (select id from public.projects where name = 'EduBridge'),
    'Wire EduBridge to call MyQuiza API',
    'Add an API client layer in EduBridge that calls the MyQuiza API for complex operations (quiz attempts, leaderboards, content management). Keep Supabase direct reads for trivial queries. Use the Supabase access token as the bearer token to the API.',
    'todo', 'medium', 50
  ),
  (
    (select id from public.sprints where name = 'Sprint 4 — EduBridge Multi-Platform Architecture'),
    (select id from public.projects where name = 'Syllabuzz'),
    'Connect Syllabuzz to MyQuiza API',
    'Replace the placeholder logic in the Android fragments with calls to the MyQuiza API. Use Retrofit + Kotlin coroutines, with Supabase JWT for auth. Build out the first real feature end-to-end (e.g. browse subjects → start quiz → submit attempt).',
    'todo', 'medium', 60
  ),
  (
    (select id from public.sprints where name = 'Sprint 4 — EduBridge Multi-Platform Architecture'),
    null,
    'Write multi-platform architecture README',
    'A README at the top of each of the three repos (EduBridge, MyQuiza, Syllabuzz) explaining how they fit together, with a diagram. Link each one to the others. Saves future-you from re-deriving the architecture.',
    'todo', 'low', 70
  );
