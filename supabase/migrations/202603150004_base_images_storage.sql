-- BuilderHQ: public storage bucket for base screenshots
-- Run in Supabase SQL Editor

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'base-images',
  'base-images',
  true,
  5242880,
  array['image/webp']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public read
drop policy if exists "Public read base images" on storage.objects;
create policy "Public read base images"
  on storage.objects
  for select
  using (bucket_id = 'base-images');

-- Authenticated users can upload into their own folder: {userId}/...
drop policy if exists "Users upload own base images" on storage.objects;
create policy "Users upload own base images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'base-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users update own base images" on storage.objects;
create policy "Users update own base images"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'base-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users delete own base images" on storage.objects;
create policy "Users delete own base images"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'base-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
