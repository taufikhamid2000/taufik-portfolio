-- =====================================================
-- Tighten project card copy + pick featured trio
-- =====================================================
-- Cards previously mixed long product pitches with technical notes and
-- read as a wall of text. Rewritten for a hiring engineer:
--   tagline     ≤ 70 chars, what it is
--   description ≤ 200 chars: what was built + the technically interesting part
--   tech        ≤ 5 items, consistent naming, verified against each repo's
--               package.json / *.csproj / composer.json on 2026-09-02
-- Featured = DuitDuit, EduBridge, Veyoyee (full product / ecosystem / marketplace).
-- Facts corrected: MyQuiza targets net10.0 (tech said "ASP.NET Core 8");
-- BilikSewa and TIWIKOM are net8.0; UYE is Laravel 11.
-- Only tagline, description, tech, featured, updated_at are touched here.

update public.projects set featured = false, updated_at = now() where featured;

update public.projects set
  tagline     = 'Malaysian personal finance: budgets, AI receipts, LHDN tax relief',
  description = 'Personal finance app built around Malaysian tax rules. Receipt scanning with an LLM, LHDN relief category tracking, recurring transactions and investment tracking on Next.js 16 + Supabase.',
  tech        = array['Next.js 16','TypeScript','Supabase','Tailwind CSS'],
  featured    = true, updated_at = now()
where name = 'DuitDuit';

update public.projects set
  tagline     = 'Quiz platform for Malaysian secondary students',
  description = 'Web client of a three-part ecosystem with MyQuiza (ASP.NET Core API) and Syllabuzz (Android). Supabase auth, JWT forwarded to the API for server-side scoring, XP and leaderboards.',
  tech        = array['Next.js 15','TypeScript','Supabase Auth','React Query','Jest'],
  featured    = true, updated_at = now()
where name = 'EduBridge';

update public.projects set
  tagline     = 'REST API for quiz delivery, scoring and leaderboards',
  description = 'ASP.NET Core (.NET 10) service on Render via Docker. Validates Supabase JWTs, scores attempts server-side, tracks XP and topic progress; shared by the EduBridge web and Syllabuzz Android clients.',
  tech        = array['ASP.NET Core','.NET 10','EF Core','PostgreSQL','OpenAPI'],
  featured    = false, updated_at = now()
where name = 'MyQuiza';

update public.projects set
  tagline     = 'Native Android client for the MyQuiza API',
  description = 'Kotlin app with Retrofit against the MyQuiza API and Supabase auth over REST. Subject → chapter → topic → quiz tree, server-scored attempts, progress and leaderboard; tested on device.',
  tech        = array['Android','Kotlin','Retrofit','Supabase'],
  featured    = false, updated_at = now()
where name = 'Syllabuzz';

update public.projects set
  tagline     = 'Student survey marketplace with a points economy',
  description = 'Students earn points answering surveys and spend them to collect responses for their own final-year project. Admin panel, marketplace, reputation and claim system on Next.js 15 + Supabase.',
  tech        = array['Next.js 15','Supabase','Tailwind CSS','Zustand','Zod'],
  featured    = true, updated_at = now()
where name = 'Veyoyee';

update public.projects set
  tagline     = 'Room rental platform with landlord verification',
  description = 'Multi-project ASP.NET Core 8 solution (Razor Pages front end + separate API) centralising landlord and agency listings with a verification flow and shuttle-van listings. Deployed on Render.',
  tech        = array['ASP.NET Core 8','C#','EF Core','Razor Pages'],
  featured    = false, updated_at = now()
where name = 'BilikSewa';

update public.projects set
  tagline     = 'Queue booking for Malaysian government services',
  description = 'Book a queue number from home for IC, licence and passport renewals, then arrive just before your turn. Built after a four-hour wait at JPN; QR ticket and PDF download included.',
  tech        = array['Next.js 15','TypeScript','Supabase','Tailwind CSS'],
  featured    = false, updated_at = now()
where name = 'MyBeratur';

update public.projects set
  tagline     = 'AI-parsed job requirement matching',
  description = 'Employers paste a listing and an LLM extracts the real requirements to match candidates — a fix for keyword-only job-board filters. Frontend prototype done; matching engine in progress.',
  tech        = array['Next.js 14','TypeScript','Tailwind CSS'],
  featured    = false, updated_at = now()
where name = 'JobMatch';

update public.projects set
  tagline     = 'Searchable marketplace for student-run services',
  description = 'Replaces spammy WhatsApp/Telegram groups where students sell food, rides and repairs with structured listings, filters and search. Laravel 11 with MySQL, containerised with Docker.',
  tech        = array['Laravel 11','PHP','MySQL','Docker'],
  featured    = false, updated_at = now()
where name = 'UYE';

update public.projects set
  tagline     = 'Verified reseller marketplace for Malaysia',
  description = 'A trusted middle ground for high-demand resale items (tickets, sneakers, limited drops) instead of scattered classifieds. Currently a Next.js dashboard skeleton with Supabase auth.',
  tech        = array['Next.js 15','TypeScript','Supabase','Tailwind CSS'],
  featured    = false, updated_at = now()
where name = 'Proxlox';

update public.projects set
  tagline     = 'Marketplace for educational slide decks',
  description = 'Idea: a place to buy and sell well-designed lecture slides for students who learn faster from visuals than textbooks. Concept only, not built.',
  tech        = array['Concept'],
  featured    = false, updated_at = now()
where name = 'SlideMarket';

update public.projects set
  tagline     = 'À la carte sports streaming',
  description = 'Idea: subscribe to a single league or team instead of a full sports bundle. Concept only, not built.',
  tech        = array['Concept'],
  featured    = false, updated_at = now()
where name = 'SelectYourLeague';

update public.projects set
  tagline     = 'Restaurant back-office manager',
  description = 'Dashboard, inventory, order processing and FAQ/support modules for a neighbour''s restaurant. Next.js with Chart.js reporting; paused after the initial build.',
  tech        = array['Next.js','TypeScript','Chart.js'],
  featured    = false, updated_at = now()
where name = 'SBMP';

update public.projects set
  tagline     = 'Browser side-scroller stealth platformer',
  description = '2D stealth platformer that runs in the browser, evolved from an Assassin''s Creed fan community site. Framer Motion animation, branching storyline and feedback CRUD on Supabase.',
  tech        = array['Next.js','TypeScript','Framer Motion','Supabase'],
  featured    = false, updated_at = now()
where name = 'ACCodeSEA';

update public.projects set
  tagline     = 'Next.js + Supabase starter kit',
  description = 'Personal boilerplate used to bootstrap new projects: Next.js 15, Supabase auth, Tailwind CSS 4, Zustand, Zod and Jest pre-wired.',
  tech        = array['Next.js 15','Supabase','Tailwind CSS','Zustand','Jest'],
  featured    = false, updated_at = now()
where name = 'Template';

update public.projects set
  tagline     = 'Workplace knowledge-sharing platform',
  description = 'Posts, comments, roles and filtering for sharing know-how inside a team. Rebuilt in ASP.NET Core 8 with EF Core as a C# learning project; the earlier Angular version is archived.',
  tech        = array['ASP.NET Core 8','C#','EF Core','Bootstrap'],
  featured    = false, updated_at = now()
where name = 'TIWIKOM';

update public.projects set
  tagline     = 'PokéAPI catalog built for a hiring test',
  description = 'Vue 3 + Vite app with Pinia state management browsing the PokéAPI. Completed as a take-home assessment.',
  tech        = array['Vue 3','Vite','Pinia','Bootstrap'],
  featured    = false, updated_at = now()
where name = 'Pokemon App';

update public.projects set
  tagline     = '.NET Web API learning exercise',
  description = 'Small ASP.NET Core 8 Web API with a separate xUnit test project, built to learn the .NET API and testing workflow.',
  tech        = array['ASP.NET Core 8','C#','xUnit'],
  featured    = false, updated_at = now()
where name = 'WXGeoDemo API';

update public.projects set
  tagline     = 'Digital certificate management (contract work)',
  description = 'Converted a certificate issuing and verification system to Next.js 13 with Supabase and PWA support: student profiles, verification flow, animations. Taken down at the client''s request.',
  tech        = array['Next.js 13','Supabase','TypeScript','PWA'],
  featured    = false, updated_at = now()
where name = 'Mysertifico';

update public.projects set
  tagline     = 'Static-content quiz platform with zero content database',
  description = 'Subjects, topics and quizzes ship as static content so the app needs no database for questions; Supabase handles auth only. Next.js 15 with Zustand state and Jest tests.',
  tech        = array['Next.js 15','TypeScript','Supabase Auth','Zustand','Jest'],
  featured    = false, updated_at = now()
where name = 'Quiz App';

update public.projects set
  tagline     = 'Neighbourhood-to-station shuttle pooling',
  description = 'Marketplace matching commuters with shared shuttles from their neighbourhood to the nearest LRT/MRT station. Next.js 16 with Supabase and Zod-validated forms; in progress.',
  tech        = array['Next.js 16','TypeScript','Supabase','Zod'],
  featured    = false, updated_at = now()
where name = 'TongTong';

update public.projects set
  tagline     = 'LRT/MRT commute tracker with crowding forecasts',
  description = 'Tracks daily rail commutes and forecasts crowding by line and time. Static Next.js 16 build deployed to GitHub Pages.',
  tech        = array['Next.js 16','TypeScript','Tailwind CSS'],
  featured    = false, updated_at = now()
where name = 'JomKomute';
