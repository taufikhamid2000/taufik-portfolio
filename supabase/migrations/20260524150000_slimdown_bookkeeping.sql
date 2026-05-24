-- =====================================================
-- Sprint 1 Slim-Down: final bookkeeping
-- =====================================================
-- Marks two more Sprint 1 tasks done:
--
--   1. "Remove old auth and create-project pages" — already done in
--      commit 1fe5cc8 as part of the earlier dead-API sweep, just
--      needs the task status flipped here.
--
--   2. "Trim package.json dependencies" — 12 unused packages removed:
--        runtime:   @heroicons/react, chart.js, classnames, leaflet,
--                   react-chartjs-2, react-icons, react-leaflet,
--                   react-select, swiper, uuid
--        devDeps:   @types/chart.js, @types/leaflet
--      Surviving runtime deps: @supabase/ssr, @supabase/supabase-js,
--        next, next-themes, react, react-dom.
--      Vulnerability count dropped from 35 -> 15 alerts as a side effect.
-- =====================================================

update public.tasks
set status = 'done',
    completed_at = now()
where title in (
  'Remove old auth and create-project pages',
  'Trim package.json dependencies'
)
and status <> 'done';
