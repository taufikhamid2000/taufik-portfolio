-- =====================================================
-- Deps upgrade tasks: already completed
-- =====================================================
-- "Upgrade Next.js 14 → 15" — superseded; went straight to 16.3.0-canary.45
-- "Update remaining vulnerable deps" — done alongside Next bump
-- "Fix critical / high vulnerabilities" — 0 vulnerabilities remaining
--    (postcss CVE GHSA-qx2v-qp2m-jg93 cleared in canary.45)
-- =====================================================

update public.tasks
set status = 'done',
    completed_at = now()
where title in (
  'Update remaining vulnerable deps',
  'Fix critical / high vulnerabilities',
  'Upgrade Next.js 14 → 15'
)
and status <> 'done';
