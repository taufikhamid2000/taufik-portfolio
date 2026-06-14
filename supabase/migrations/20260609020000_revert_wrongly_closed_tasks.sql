-- Revert tasks incorrectly marked done by 20260609010000.
-- The broad ILIKE match on '%myquiza%api%' caught unrelated integration tasks.
UPDATE public.tasks
SET
  status       = 'todo',
  completed_at = NULL,
  updated_at   = now()
WHERE status = 'done'
  AND (
    title ILIKE '%wire%edubridge%myquiza%'
    OR title ILIKE '%connect%syllabuzz%myquiza%'
    OR (
      title ILIKE '%myquiza%'
      AND title ILIKE '%api%'
      AND title NOT ILIKE '%scaffold%'
    )
  );
