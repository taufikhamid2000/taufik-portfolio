-- =====================================================
-- Mark TekaTeki deletion task as done
-- =====================================================
-- The 11-file TekaTeki subfolder under app/projects/ has been removed.
-- TekaTeki is no longer being migrated anywhere — the EduBridge concept
-- is split into EduBridge (web client) / MyQuiza (.NET API) / Syllabuzz
-- (Android client). The projects.TekaTeki row stays as historical
-- context (status='archived' from the earlier reframing migration).
-- =====================================================

update public.tasks
set status = 'done',
    completed_at = now()
where title = 'Delete app/projects/TekaTeki subfolder from portfolio'
  and status <> 'done';
