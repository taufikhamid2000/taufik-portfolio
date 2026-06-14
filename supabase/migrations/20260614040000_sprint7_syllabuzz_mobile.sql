-- =====================================================
-- Sprint 7 — Syllabuzz Mobile (Expo × MyQuiza)
-- =====================================================
-- Syllabuzz reborn as a cross-platform mobile client (iOS + Android)
-- for the MyQuiza API. Same ecosystem as EduBridge — Supabase auth,
-- JWT forwarded as Bearer, full content tree + quiz + progress + leaderboard.
-- =====================================================

-- Insert Syllabuzz project row if it doesn't exist, otherwise update
do $$
begin
  if exists (select 1 from public.projects where name = 'Syllabuzz') then
    update public.projects set
      tagline     = 'Cross-platform mobile quiz app (iOS + Android) powered by the MyQuiza API',
      description = 'Expo (React Native) mobile client for the MyQuiza/EduBridge ecosystem. Students browse the subject → chapter → topic → quiz content tree, submit attempts with server-side scoring, track progress, and view the leaderboard — all via the MyQuiza REST API. Auth via Supabase Google sign-in using Expo AuthSession.',
      tech        = array['Expo', 'React Native', 'TypeScript', 'Supabase', 'MyQuiza API'],
      github_url  = 'https://github.com/taufikhamid2000/Syllabuzz',
      status      = 'in-progress',
      updated_at  = now()
    where name = 'Syllabuzz';
  else
    insert into public.projects (name, tagline, description, tech, github_url, demo_url, status, featured)
    values (
      'Syllabuzz',
      'Cross-platform mobile quiz app (iOS + Android) powered by the MyQuiza API',
      'Expo (React Native) mobile client for the MyQuiza/EduBridge ecosystem. Students browse the subject → chapter → topic → quiz content tree, submit attempts with server-side scoring, track progress, and view the leaderboard — all via the MyQuiza REST API. Auth via Supabase Google sign-in using Expo AuthSession.',
      array['Expo', 'React Native', 'TypeScript', 'Supabase', 'MyQuiza API'],
      'https://github.com/taufikhamid2000/Syllabuzz',
      null,
      'in-progress',
      false
    );
  end if;
end $$;

-- Create Sprint 7
insert into public.sprints (name, goal, status, start_date, end_date)
select
  'Sprint 7 — Syllabuzz Mobile',
  'Build Syllabuzz as a cross-platform Expo app that is the mobile client for the MyQuiza API — same auth, same data, same API contract as EduBridge, native mobile UI.',
  'planned',
  current_date,
  current_date + interval '3 weeks'
where not exists (
  select 1 from public.sprints where name = 'Sprint 7 — Syllabuzz Mobile'
);

-- Seed Sprint 7 tasks
with s as (select id from public.sprints where name = 'Sprint 7 — Syllabuzz Mobile'),
     p as (select id from public.projects where name = 'Syllabuzz')
insert into public.tasks (sprint_id, project_id, title, description, status, priority, effort, display_order)
select s.id, p.id, t.title, t.description, 'todo', t.priority, t.effort, t.display_order
from s, p, (values
  (1,
   'Scaffold Expo project in Syllabuzz repo',
   'Reset repo to Expo (React Native + TypeScript) using `npx create-expo-app`. Set up Expo Router, ESLint, Prettier, .gitignore. Remove old Android native code.',
   'high', 2),
  (2,
   'Set up tab navigation and screen shells',
   'Expo Router tab layout: Home, Subjects, Progress, Leaderboard. Create placeholder screens. Set up shared theme (colours, fonts, spacing) consistent across iOS/Android.',
   'high', 2),
  (3,
   'Wire Supabase auth (Google sign-in via Expo AuthSession)',
   'Install @supabase/supabase-js. Implement Google OAuth using Expo AuthSession + Supabase signInWithIdToken. Persist session with SecureStore. Expose useSession() hook.',
   'high', 3),
  (4,
   'Create MyQuiza API client',
   'Add lib/myquiza.ts — typed fetch wrapper that reads the Supabase access_token from session and forwards it as Authorization: Bearer. Mirror EduBridge''s client. Cover: subjects tree, topics/{id}/quizzes, quizzes/{id}, attempts, me/progress, leaderboard.',
   'high', 3),
  (5,
   'Build content tree screens (Subjects → Chapters → Topics)',
   'Subjects list screen → Chapters list → Topics list. Fetch from GET /api/v1/subjects. Stack navigation within the Subjects tab.',
   'medium', 3),
  (6,
   'Build Quiz screen (fetch + attempt submission)',
   'Topic screen lists quizzes (GET /api/v1/topics/{id}/quizzes). Quiz screen renders questions, collects answers, submits to POST /api/v1/quizzes/{id}/attempts. Show score + XP awarded on result screen.',
   'high', 5),
  (7,
   'Build Progress screen',
   'Authenticated screen showing per-topic progress from GET /api/v1/me/progress. Group by subject. Show completion % and XP.',
   'medium', 2),
  (8,
   'Build Leaderboard screen',
   'Fetch GET /api/v1/leaderboard. Toggle weekly / all-time. Highlight current user''s rank.',
   'medium', 2),
  (9,
   'Test on iOS + Android simulators',
   'Run on Expo Go / simulators. Verify auth flow, API calls, navigation, and UI on both platforms. Fix any platform-specific issues.',
   'high', 3),
  (10,
   'Update Syllabuzz portfolio card with demo info',
   'Add GitHub link, screenshots or video demo URL. Update status to active. Mark as featured if warranted.',
   'low', 1)
) as t(display_order, title, description, priority, effort);
