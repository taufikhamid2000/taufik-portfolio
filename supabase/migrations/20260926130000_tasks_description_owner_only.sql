-- Tasks are publicly readable, but their free-text `description` holds private notes
-- (contract details, security findings). Anonymous visitors get every column except it;
-- the public UI never uses it. The owner (authenticated) still reads everything.

revoke select on portfolio.tasks from anon;
grant select (id, sprint_id, project_id, title, status, priority, effort, display_order, ticket_no, created_at, updated_at, completed_at)
  on portfolio.tasks to anon;

-- T-10 is shown publicly: keep its wording generic.
update portfolio.tasks
set title = 'Take down an unused deployment',
    description = 'Remove a deployment that is no longer needed.'
where ticket_no = 10;

notify pgrst, 'reload schema';
