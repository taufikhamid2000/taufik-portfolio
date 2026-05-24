-- =====================================================
-- Mysertifico: deployment taken down + repo archived
-- =====================================================
-- Contract work — IP belongs to the client, was never supposed to be
-- broadcasting publicly. Closed the loop:
--
--   Vercel project `mysertifico`         -> deleted
--   mysertifico.vercel.app               -> 404
--   GitHub repo (private, taufikhamid2000/mysertifico):
--     - description updated to "[ARCHIVED] Next.js conversion —
--       contract work, IP belongs to client. Deployment taken down."
--     - homepage URL cleared
--     - archived
-- =====================================================

update public.tasks
set status = 'done',
    completed_at = now()
where title = 'Take down mysertifico.vercel.app deployment'
  and status <> 'done';
