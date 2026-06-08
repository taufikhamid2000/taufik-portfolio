-- =====================================================
-- GitHub housekeeping batch (Sprint 2)
-- =====================================================
-- studenthub     → deleted  (empty stub, no code)
-- WXGeoDemo.API  → archived
-- Syllabuzz      → archived
-- pokemonapp     → archived
-- proxlox        → archived
-- tiwikom        → archived
-- Portfolio cleanup commits already pushed to main.
-- =====================================================

update public.tasks
set status = 'done',
    completed_at = now()
where title in (
  'Delete studenthub repo',
  'Archive WXGeoDemo.API repo',
  'Archive Syllabuzz repo',
  'Archive pokemonapp repo',
  'Archive proxlox repo',
  'Archive Angular tiwikom repo',
  'Push portfolio cleanup commits'
)
and status <> 'done';
