-- =====================================================
-- DuitDuit card: mention the no-account demo
-- =====================================================
-- DuitDuit now has a "Try the demo — no account needed" entry point
-- (anonymous Supabase session seeded with sample data), so the card
-- should say so instead of implying a sign-up wall.

update public.projects set
  description = 'Personal finance app built around Malaysian tax rules: LLM receipt scanning, LHDN relief tracking, budgets, installments and payslips on Next.js 16 + Supabase. Live demo needs no account.',
  updated_at  = now()
where name = 'DuitDuit';
