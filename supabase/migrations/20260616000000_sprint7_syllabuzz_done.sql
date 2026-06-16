-- =====================================================
-- Sprint 7 — Syllabuzz Mobile: DONE
-- =====================================================
-- Syllabuzz completed as native Android (Kotlin), not Expo.
-- Supabase auth via REST, Retrofit API client.
-- All Sprint 7 tasks complete — verified on physical device.
--
-- Three MyQuiza bugs surfaced + fixed during integration:
--   1. JWT signing key rotation broke auth (legacy secret in API config)
--   2. quizzes entity assumed updated_at column (doesn't exist) → 500
--   3. Unverified quizzes invisible — added ?includeUnverified=true opt-in
--
-- EduBridge flag: authenticated routes never exercised in prod.
-- Data flags: sparse quiz content, leaderboard displayName all null.
-- =====================================================

-- Mark all Sprint 7 tasks done
update public.tasks
set status       = 'done',
    completed_at = now(),
    updated_at   = now()
where sprint_id = (select id from public.sprints where name = 'Sprint 7 — Syllabuzz Mobile')
  and status <> 'done';

-- Close Sprint 7
update public.sprints
set status     = 'completed',
    end_date   = current_date,
    updated_at = now()
where name = 'Sprint 7 — Syllabuzz Mobile';

-- Correct Syllabuzz project card — native Android (Kotlin), not Expo
update public.projects
set tagline     = 'Native Android quiz app (Kotlin) integrated with the MyQuiza API',
    description = 'Native Android app (Kotlin) that is the mobile client for the MyQuiza/EduBridge ecosystem. Supabase auth via REST, Retrofit API client. Features: subject → chapter → topic → quiz content tree, quiz taking + server-side scoring, progress tracking, and leaderboard. Verified end-to-end on physical device.',
    tech        = array['Android', 'Kotlin', 'Retrofit', 'Supabase', 'MyQuiza API'],
    status      = 'active',
    updated_at  = now()
where name = 'Syllabuzz';
