-- =====================================================
-- Sprint updates: Google OAuth + audit fix + Vercel fix
-- =====================================================
-- 1. Add Sign in with Google to login page
-- 2. Restrict admin to allowlisted emails (middleware)
-- 3. Review npm audit report → bumped Next to 16.3.0-canary.45,
--    cleared postcss CVE (0 vulnerabilities)
-- 4. Fix Vercel deploy: eslint 8 → 9 (was blocking since Next 16 bump)
-- =====================================================

update public.tasks
set status = 'done',
    completed_at = now()
where title in (
  'Add Sign in with Google',
  'Review npm audit report',
  'Delete studenthub repo',
  'Archive WXGeoDemo.API repo',
  'Archive Syllabuzz repo',
  'Archive pokemonapp repo',
  'Archive proxlox repo',
  'Archive Angular tiwikom repo',
  'Push portfolio cleanup commits',
  'Delete contoh repo (GitHub + local)'
)
and status <> 'done';
