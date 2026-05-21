-- =====================================================
-- Rewrite project descriptions with real vision/context
-- =====================================================
-- After the user walked through each project, this migration
-- replaces my guessed descriptions with the actual intent,
-- adjusts statuses to reflect reality (e.g. Mysertifico is
-- client work, not the user's product), and reorders by
-- importance instead of historical accident.
--
-- Adds Syllabuzz (mobile attempt at the EduBridge concept)
-- which was missing from the initial seed.
-- =====================================================

-- =====================================================
-- Tier 1: Flagship products with clear vision + monetization
-- =====================================================

update public.projects set
  tagline = 'Community-verified SPM learning platform',
  description = 'SoloLearn-style platform for Malaysian SPM students, but content is community-contributed instead of platform-authored. A Verifier role vets accuracy. Leaderboards rank top students and schools. Planned monetization: targeted ads from universities to school-aged users — a natural recruitment funnel.',
  status = 'active',
  featured = true,
  display_order = 10
where name = 'EduBridge';

update public.projects set
  tagline = 'Student survey marketplace with point cycle',
  description = 'Solves the perpetual final-year-project survey shortage. Junior students earn points by answering surveys; they spend those points when they need responses for their own FYP. Self-balancing supply across years — the more you help early, the more reach you have later. Born from struggling to collect enough responses for my own degree and master''s.',
  status = 'active',
  featured = true,
  display_order = 20
where name = 'Veyoyee';

update public.projects set
  tagline = 'Streamlined room rental — pitched as govt infrastructure',
  description = 'Built from the pain of room-hunting on scattered, unverified, unresponsive listings. Centralizes landlord and agency inventory with verification flow and shuttle van listings. Strategic angle: instead of competing head-on with iBilik / Mudah, pitch this to the Ministry of Housing (or relevant body) as infrastructure to standardize the rental market.',
  status = 'active',
  featured = false,
  display_order = 30
where name = 'BilikSewa';

update public.projects set
  tagline = 'Unified queue booking for Malaysian govt services',
  description = 'Book your queue number from home for IC renewal, driver licence, passport, summons — show up 30 minutes before your turn instead of waiting 4 hours at JPN. Built around personal pain (4-hour wait for a 30-minute IC service). Strategic angle: pitch as a standardized cross-department platform every Malaysian government office should have, rather than a consumer app fighting for installs.',
  status = 'active',
  featured = false,
  display_order = 40
where name = 'MyBeratur';

update public.projects set
  tagline = 'AI-parsed job matching',
  description = 'The real problem with JobStreet is the filter — it can''t parse what a job actually requires. JobMatch is the planned AI layer: employers paste a listing, the model extracts the real requirements and matches candidates. Could flip — give HR a tool that critiques their listing and helps them write a more honest, matchable spec. Frontend prototype exists in the portfolio; the AI engine is the missing piece.',
  status = 'in-progress',
  featured = false,
  display_order = 50
where name = 'JobMatch';

-- =====================================================
-- Tier 2: Real pain-driven projects
-- =====================================================

update public.projects set
  tagline = 'Searchable student services marketplace',
  description = 'Students already sell food, offer rides, repair phones, and cut hair through WhatsApp/Telegram groups — but those spam relentlessly, and when you actually need a service you have to scroll through weeks of messages to find a contact. UYE keeps the same network organized: structured listings, filters, search, no firehose.',
  status = 'active',
  featured = false,
  display_order = 60
where name = 'UYE';

update public.projects set
  tagline = 'Local reseller marketplace (StockX for Malaysia)',
  description = 'Reselling isn''t illegal in Malaysia but the experience is fragmented across Carousell, Facebook groups, and classifieds. Proxlox is the planned trusted middle ground for enthusiasts and resellers — clean listings, verified sellers, structured for high-demand items (concert tickets, sneakers, limited drops). Currently a Next.js dashboard skeleton.',
  status = 'concept',
  featured = false,
  display_order = 70
where name = 'Proxlox';

update public.projects set
  tagline = 'Marketplace for educational slide decks',
  description = 'I was too lazy to read textbooks at uni — well-designed colorful slides absorbed material much faster. SlideMarket is the marketplace version of that observation: teachers/creators sell decks, educators request customizations for their specific classroom (curriculum, region, language). Local Teachers Pay Teachers with a customization layer.',
  status = 'concept',
  featured = false,
  display_order = 80
where name = 'SlideMarket';

update public.projects set
  tagline = 'À la carte sports streaming (concept)',
  description = 'Astro forces the full bouquet on me when I only want EPL, Chelsea games, and the occasional badminton — I never watch F1 or tennis. The product fans want is per-league subscription with mix-and-match competitions. Genuine consumer pain, but viability hinges entirely on streaming rights that giants own — concept only unless those barriers shift.',
  status = 'concept',
  featured = false,
  display_order = 90
where name = 'SelectYourLeague';

update public.projects set
  tagline = 'Restaurant manager (neighbour''s request, paused)',
  description = 'A neighbour learned I write code and asked if I could build a system to help him run his restaurant. Has inventory, orders, financial tracking, and FAQ support. Built quickly and never fully finished — kept here as a paused project rather than an active one. Could be revived if there''s a concrete first customer.',
  status = 'archived',
  featured = false,
  display_order = 100
where name = 'SBMP';

-- =====================================================
-- Tier 3: ACCodeSEA pivot
-- =====================================================

update public.projects set
  tagline = 'Browser-playable interactive narrative (pivot)',
  description = 'Began as a fan community site for Assassin''s Creed enthusiasts in Southeast Asia — my first project and where I first explored AI image generation. The original community angle no longer holds my interest. Pivoting: keep the storyline mechanics, choice pathways, and visuals, but rebuild as a browser-playable interactive experience — no install, no download, just open and play.',
  status = 'in-progress',
  featured = false,
  display_order = 110
where name = 'ACCodeSEA';

-- =====================================================
-- Tier 4: EduBridge variants / earlier attempts
-- =====================================================

update public.projects set
  tagline = 'Earlier attempt at the EduBridge concept (web)',
  description = 'Same conceptual space as EduBridge — hierarchical learning (Levels → Subjects → Chapters → Lessons) with admin verification of quizzes. Lives inside the portfolio repo as a subfolder. Superseded by the EduBridge canonical product; kept here for historical context.',
  status = 'archived',
  featured = false,
  display_order = 120
where name = 'TekaTeki';

update public.projects set
  tagline = 'Earlier attempt at the EduBridge concept (Next.js)',
  description = 'A separate Next.js + Supabase starting point for the SoloLearn-style learning platform idea. Currently at boilerplate stage. Same space as TekaTeki and Syllabuzz; the active product is EduBridge.',
  status = 'archived',
  featured = false,
  display_order = 130
where name = 'MyQuiza';

-- =====================================================
-- Tier 5: Learning projects / utilities
-- =====================================================

update public.projects set
  tagline = 'Personal Next.js + Supabase boilerplate',
  description = 'After enough projects started from scratch, I extracted a personal template — App Router, TypeScript, Tailwind, Supabase Auth pre-wired. Bootstraps new projects without redoing the auth/setup layer each time. Not a product, just a tool I reuse.',
  status = 'active',
  featured = false,
  display_order = 150
where name = 'Template';

update public.projects set
  tagline = 'Workplace knowledge sharing (C# learning project)',
  description = 'Built while learning C# / ASP.NET Core. The idea — colleagues share things they wish they''d known on their first day — overlaps with what Notion and Confluence already do well. Treating as a completed learning exercise rather than a product.',
  status = 'archived',
  featured = false,
  display_order = 160
where name = 'TIWIKOM';

update public.projects set
  tagline = 'PokeAPI catalog (job test)',
  description = 'A take-home test for a job interview, vibe-coded in Vue 3. The lasting value was learning how to consume REST APIs from the frontend — a foundation that carried into every Next.js project after this.',
  status = 'archived',
  featured = false,
  display_order = 170
where name = 'Pokemon App';

update public.projects set
  tagline = '.NET Web API learning exercise',
  description = 'Built to practice ASP.NET Core Web API design — endpoints, controllers, EF migrations. Stalled when I discovered Vercel doesn''t host .NET runtimes and I never moved it elsewhere. Treating as a completed learning exercise.',
  status = 'archived',
  featured = false,
  display_order = 180
where name = 'WXGeoDemo API';

-- =====================================================
-- Tier 6: Not my IP
-- =====================================================

update public.projects set
  tagline = 'Next.js conversion (contract work)',
  description = 'A client''s vanilla-stack certificate platform that I reimplemented in Next.js. They originally requested React; I delivered Next.js with App Router, TypeScript, Tailwind, and Supabase auth. Showcased here as evidence of full-stack delivery on a real-world brief — the product idea and IP belong to the client, not me.',
  status = 'archived',
  featured = false,
  display_order = 200,
  demo_url = null
where name = 'Mysertifico';

-- =====================================================
-- Add Syllabuzz (mobile version of the EduBridge concept)
-- =====================================================

insert into public.projects (name, tagline, description, tech, github_url, demo_url, status, featured, display_order)
values (
  'Syllabuzz',
  'Mobile attempt at the EduBridge concept (Android)',
  'Native Android implementation of the SoloLearn-for-SPM idea — same concept as EduBridge, on mobile instead of web. Currently incomplete (a couple of fragments wired up). The web version (EduBridge) is the canonical product.',
  array['Android', 'Java', 'Kotlin', 'Gradle'],
  'https://github.com/taufikhamid2000/Syllabuzz',
  null,
  'archived',
  false,
  140
)
on conflict do nothing;
