-- =====================================================
-- Vision: map ACCodeSEA (SEA history platformer) to ministries
-- =====================================================
-- ACCodeSEA is a narrative platformer set in the 1511 fall of Malacca.
-- It fits two ministries: heritage tourism (MOTAC) and history education.
-- =====================================================

insert into public.initiatives (ministry_id, project_id, problem, idea, status, display_order)
select m.id, p.id, v.problem, v.idea, v.status, v.display_order
from (values
  ('tourism-arts-culture',
   'ACCodeSEA',
   'Young Malaysians rarely connect with the country''s heritage — places like Melaka feel like distant history rather than somewhere to explore.',
   'ACCodeSEA — a narrative platformer set in the 1511 fall of Malacca that turns Southeast Asian heritage into an interactive experience, sparking real interest in historical sites.',
   'planned', 10),
  ('education',
   'ACCodeSEA',
   'Students find Sejarah (history) dry and disconnected from the places and stories around them.',
   'ACCodeSEA — learn Malaysian history by playing through it: a platformer set in 1511 Malacca, in the spirit of Assassin''s Creed''s Discovery Tour mode.',
   'planned', 60)
) as v(ministry_slug, project_name, problem, idea, status, display_order)
join public.ministries m on m.slug = v.ministry_slug
left join public.projects p on p.name = v.project_name
where not exists (
  select 1 from public.initiatives i
  where i.ministry_id = m.id and i.problem = v.problem
);
