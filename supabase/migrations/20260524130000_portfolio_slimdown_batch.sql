-- =====================================================
-- Portfolio Slim-Down: batch cleanup
-- =====================================================
-- Marks four Sprint 1 tasks done in one batch:
--   1. Delete app/projects/UYE
--   2. Delete app/projects/Veyoyee
--   3. Remove unused API routes (full sweep: app/api/{quizzes,surveys,
--      hierarchy,create-page,create-project,authMiddleware.js,
--      dashboardRoutes.js})
--   4. Delete unused shared components (8 of them after cascade:
--      DescriptionWithToggle, HierarchyView, LanguageSwitcher,
--      SurveyTemplateModal, Table, MessageBanner, PasswordInput,
--      SocialAuthButton)
--
-- Also deleted alongside (not separate sprint tasks): app/auth/page.tsx
-- (old root auth page, replaced by /login), app/create-project/ (only
-- used the now-deleted APIs), server.js (orphan Express file),
-- lib/apiService.ts (no importers left).
-- =====================================================

update public.tasks
set status = 'done',
    completed_at = now()
where title in (
  'Delete app/projects/UYE from portfolio',
  'Delete app/projects/Veyoyee from portfolio',
  'Remove unused API routes',
  'Delete unused shared components'
)
and status <> 'done';
