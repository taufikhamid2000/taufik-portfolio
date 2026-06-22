-- =====================================================
-- Vision: map remaining relevant projects to ministries
-- =====================================================
-- Adds initiatives for the EduBridge suite (MyQuiza, Syllabuzz) under
-- Education, BilikSewa's last-mile feature under Transport, and the
-- other relevant-but-unmapped projects.
-- =====================================================

insert into public.initiatives (ministry_id, project_id, problem, idea, status, display_order)
select m.id, p.id, v.problem, v.idea, v.status, v.display_order
from (values
  ('education',
   'MyQuiza',
   'EduBridge''s web and mobile clients need one trusted source for quiz content, scoring, and progress — without each client re-implementing the rules or trusting client-side scores.',
   'MyQuiza — an ASP.NET Core REST API that validates Supabase JWTs and owns server-side scoring, XP, and progress. Powers both EduBridge (web) and Syllabuzz (mobile).',
   'active', 20),
  ('education',
   'Syllabuzz',
   'Students want to learn and take quizzes on their phones, not only on the web.',
   'Syllabuzz — a native Android client for the EduBridge/MyQuiza ecosystem: browse subjects, take quizzes, and track progress and leaderboard on mobile.',
   'active', 30),
  ('education',
   'SlideMarket',
   'Teachers spend hours making slides, and quality teaching materials are not easily shared or sold.',
   'SlideMarket — a marketplace where educators sell and request custom educational slides.',
   'concept', 40),
  ('education',
   'Mysertifico',
   'Schools issue paper certificates that are hard to verify and easy to forge.',
   'Mysertifico — digital certificate management and verification with student profiles and a resume builder.',
   'concept', 50),
  ('transport',
   'BilikSewa',
   'Renters who find a room still face a last-mile gap — getting from transit hubs to the property and around the area without a car.',
   'BilikSewa''s shuttle-van listings connect rentals to nearby transit, tackling last-mile connectivity alongside the room search.',
   'active', 10),
  ('entrepreneur-cooperatives',
   'SBMP',
   'Small business owners juggle inventory, orders, and finances across spreadsheets with no single dashboard.',
   'SBMP (Small Business Management Platform) — a dashboard for inventory, order processing, and financial tracking aimed at micro and small enterprises.',
   'concept', 20),
  ('human-resources',
   'TIWIKOM',
   'Workplace knowledge — the practical lessons employees learn — is rarely captured or shared across an organisation.',
   'TIWIKOM (Things I Wish I Knew On My...) — a platform for employees to post insights, advice, and lessons learned.',
   'planned', 20),
  ('economy',
   'Veyoyee',
   'Researchers and policymakers need quality survey data, and participants have little incentive to give thoughtful responses.',
   'Veyoyee — a survey platform connecting creators and participants with a rewards and reputation system to improve data quality.',
   'active', 10)
) as v(ministry_slug, project_name, problem, idea, status, display_order)
join public.ministries m on m.slug = v.ministry_slug
left join public.projects p on p.name = v.project_name
where not exists (
  select 1 from public.initiatives i
  where i.ministry_id = m.id and i.problem = v.problem
);
