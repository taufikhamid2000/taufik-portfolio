-- =====================================================
-- Contoh repo: deleted (GitHub + local)
-- =====================================================
-- Empty stub repo (1 commit, just "# contoh" README, public).
-- No code, no purpose — deleted as Sprint 2 housekeeping.
--
--   GitHub repo taufikhamid2000/contoh  -> deleted
--   Local folder .../Project/contoh     -> deleted
-- =====================================================

update public.tasks
set status = 'done',
    completed_at = now()
where title ilike '%contoh%'
  and status <> 'done';
