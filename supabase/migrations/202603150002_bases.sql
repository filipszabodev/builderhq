-- BuilderHQ Milestone 2: bases
-- Run in Supabase → SQL Editor → New query → Run

create table if not exists public.bases (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles (id) on delete cascade,

  title text not null,
  slug text not null unique,
  description text,

  layout_type text not null default 'home_village'
    check (layout_type in ('home_village', 'builder_base', 'clan_capital')),

  town_hall_level integer
    check (town_hall_level is null or town_hall_level between 1 and 18),
  builder_hall_level integer
    check (builder_hall_level is null or builder_hall_level between 1 and 10),

  district text,
  district_level integer,

  base_type text not null default 'war'
    check (base_type in (
      'war', 'farming', 'defense', 'trophy', 'legend', 'progress', 'hybrid', 'fun'
    )),

  tags text[] not null default '{}',

  copy_link text not null,

  full_image_key text not null,
  thumbnail_image_key text not null,

  status text not null default 'published'
    check (status in ('draft', 'published', 'hidden', 'removed')),

  average_rating numeric not null default 0,
  rating_count integer not null default 0,
  like_count integer not null default 0,
  dislike_count integer not null default 0,
  favorite_count integer not null default 0,
  comment_count integer not null default 0,
  copy_count bigint not null default 0,
  view_count bigint not null default 0,
  community_success_rate numeric,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint bases_level_required check (
    (layout_type = 'home_village' and town_hall_level is not null)
    or (layout_type = 'builder_base' and builder_hall_level is not null)
    or (layout_type = 'clan_capital' and district is not null)
  )
);

create index if not exists bases_creator_id_idx on public.bases (creator_id);
create index if not exists bases_created_at_idx on public.bases (created_at desc);
create index if not exists bases_town_hall_level_idx on public.bases (town_hall_level);
create index if not exists bases_base_type_idx on public.bases (base_type);
create index if not exists bases_tags_gin_idx on public.bases using gin (tags);
create index if not exists bases_status_idx on public.bases (status);
create index if not exists bases_copy_count_idx on public.bases (copy_count desc);
create index if not exists bases_view_count_idx on public.bases (view_count desc);
create index if not exists bases_average_rating_idx on public.bases (average_rating desc);

alter table public.bases enable row level security;

create policy "Anyone can read published bases"
  on public.bases
  for select
  using (status = 'published' or auth.uid() = creator_id);

create policy "Authenticated users can create bases"
  on public.bases
  for insert
  to authenticated
  with check (auth.uid() = creator_id);

create policy "Creators can update own bases"
  on public.bases
  for update
  to authenticated
  using (auth.uid() = creator_id)
  with check (auth.uid() = creator_id);

create policy "Creators can delete own bases"
  on public.bases
  for delete
  to authenticated
  using (auth.uid() = creator_id);

drop trigger if exists bases_set_updated_at on public.bases;
create trigger bases_set_updated_at
  before update on public.bases
  for each row
  execute function public.set_updated_at();
