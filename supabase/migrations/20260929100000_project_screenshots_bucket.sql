insert into storage.buckets (id, name, public)
values ('project-screenshots', 'project-screenshots', true)
on conflict (id) do nothing;

drop policy if exists "Public can read project screenshots" on storage.objects;
create policy "Public can read project screenshots" on storage.objects
  for select using (bucket_id = 'project-screenshots');

drop policy if exists "Admin can write project screenshots" on storage.objects;
create policy "Admin can write project screenshots" on storage.objects
  for all using (bucket_id = 'project-screenshots' and (auth.jwt() ->> 'email') = 'taufikhamid2000@gmail.com')
  with check (bucket_id = 'project-screenshots' and (auth.jwt() ->> 'email') = 'taufikhamid2000@gmail.com');
