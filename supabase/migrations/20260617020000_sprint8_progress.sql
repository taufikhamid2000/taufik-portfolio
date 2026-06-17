-- =====================================================
-- Sprint 8 — EduBridge Hardening: progress update
-- =====================================================
-- 8 of 10 shipped to master (verified: green prod build + tests).
-- #9 blocked on a MyQuiza change; #10 held pending explicit sign-off.
-- =====================================================

-- Mark the 8 shipped tasks done (scoped to Sprint 8)
update public.tasks
set status       = 'done',
    completed_at = now(),
    updated_at   = now()
where sprint_id = (select id from public.sprints where name = 'Sprint 8 — EduBridge Hardening & Cleanup')
  and title in (
    'Fix bypassAuthCheck privilege-escalation hole in make-admin route',
    'Re-enable type-checking and linting in build/CI',
    'Delete ~20 leftover debug/diagnostic API routes',
    'Add automated tests on the API layer + wire into CI',
    'Add dependency/vulnerability monitoring + finish Supabase ssr migration',
    'Remove dead and orphaned code',
    'Clean up production console.log noise / enforce logger',
    'Replace hardcoded values with real config/data'
  );

-- #9 — blocked on MyQuiza returning per-question correctness in POST /attempts
update public.tasks
set status     = 'blocked',
    updated_at = now(),
    description = description || ' [BLOCKED: needs MyQuiza to return per-question correctness in the attempt response — currently aggregate score only.]'
where sprint_id = (select id from public.sprints where name = 'Sprint 8 — EduBridge Hardening & Cleanup')
  and title = 'Restore quiz per-question results breakdown (needs MyQuiza change)';

-- #10 — held pending sign-off (live auth-path refactor, higher risk)
update public.tasks
set status     = 'blocked',
    updated_at = now(),
    description = description || ' [HELD: careful refactor of the live auth path — awaiting explicit sign-off before touching.]'
where sprint_id = (select id from public.sprints where name = 'Sprint 8 — EduBridge Hardening & Cleanup')
  and title = 'Simplify/harden custom auth-session caching in supabase.ts';
