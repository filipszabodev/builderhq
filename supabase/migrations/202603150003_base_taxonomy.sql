-- BuilderHQ: base taxonomy (type + tags) aligned with common CoC base sites
-- Run in Supabase SQL Editor after 202603150002_bases.sql

-- If you already have the old `category` column, migrate it.
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'bases'
      and column_name = 'category'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'bases'
      and column_name = 'base_type'
  ) then
    alter table public.bases rename column category to base_type;
  end if;
end $$;

-- Ensure base_type exists (fresh installs that already used renamed migration may skip)
alter table public.bases
  add column if not exists base_type text;

update public.bases
set base_type = coalesce(base_type, 'war')
where base_type is null;

alter table public.bases
  alter column base_type set default 'war';

alter table public.bases
  alter column base_type set not null;

-- Drop old check constraints loosely, then re-add
alter table public.bases drop constraint if exists bases_category_check;
alter table public.bases drop constraint if exists bases_base_type_check;

alter table public.bases
  add constraint bases_base_type_check
  check (base_type in (
    'war', 'farming', 'defense', 'trophy', 'legend', 'progress', 'hybrid', 'fun'
  ));

alter table public.bases
  add column if not exists tags text[] not null default '{}';

create index if not exists bases_base_type_idx on public.bases (base_type);
create index if not exists bases_tags_gin_idx on public.bases using gin (tags);
create index if not exists bases_view_count_idx on public.bases (view_count desc);
create index if not exists bases_average_rating_idx on public.bases (average_rating desc);
