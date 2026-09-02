-- Add an optional screenshot/cover image URL to projects.
-- Local screenshots live under /public/screenshots/<slug>.png and are
-- referenced as '/screenshots/<slug>.png'. NULL falls back to the gradient header.
alter table public.projects add column if not exists image_url text;

comment on column public.projects.image_url is
  'Optional path/URL to a project screenshot used as the card header (e.g. /screenshots/edubridge.png).';

-- Point existing projects at the screenshots captured into /public/screenshots.
update public.projects set image_url = '/screenshots/duitduit.png', updated_at = now() where name = 'DuitDuit';
update public.projects set image_url = '/screenshots/edubridge.png', updated_at = now() where name = 'EduBridge';
update public.projects set image_url = '/screenshots/myquiza.png', updated_at = now() where name = 'MyQuiza';
update public.projects set image_url = '/screenshots/veyoyee.png', updated_at = now() where name = 'Veyoyee';
update public.projects set image_url = '/screenshots/biliksewa.png', updated_at = now() where name = 'BilikSewa';
update public.projects set image_url = '/screenshots/myberatur.png', updated_at = now() where name = 'MyBeratur';
update public.projects set image_url = '/screenshots/proxlox.png', updated_at = now() where name = 'Proxlox';
update public.projects set image_url = '/screenshots/accodesea.png', updated_at = now() where name = 'ACCodeSEA';
update public.projects set image_url = '/screenshots/template.png', updated_at = now() where name = 'Template';
update public.projects set image_url = '/screenshots/tiwikom.png', updated_at = now() where name = 'TIWIKOM';
update public.projects set image_url = '/screenshots/pokemonapp.png', updated_at = now() where name = 'Pokemon App';
update public.projects set image_url = '/screenshots/quizapp.png', updated_at = now() where name = 'Quiz App';
update public.projects set image_url = '/screenshots/tongtong.png', updated_at = now() where name = 'TongTong';
update public.projects set image_url = '/screenshots/jomkomute.png', updated_at = now() where name = 'JomKomute';
