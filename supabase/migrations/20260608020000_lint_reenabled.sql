-- =====================================================
-- Re-enable next lint
-- =====================================================
-- next lint was removed in Next 16. Migrated to ESLint 9 flat config
-- (eslint.config.mjs), updated lint script to run eslint directly.
-- Fixed all 4 lint errors and 3 warnings surfaced by the re-enabled linter.
-- =====================================================

update public.tasks
set status = 'done',
    completed_at = now()
where title ilike '%lint%'
  and status <> 'done';
