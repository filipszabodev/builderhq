-- BuilderHQ Milestone 1: profiles
-- Run this in Supabase → SQL Editor → New query → Run

create extension if not exists citext;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username citext unique not null,
  display_name text,
  avatar_key text,
  bio text,
  role text not null default 'user' check (role in ('user', 'moderator', 'admin')),
  reputation_score numeric not null default 0,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_length check (char_length(username) between 3 and 30),
  constraint username_format check (username ~ '^[a-zA-Z0-9_]+$')
);

create index if not exists profiles_username_idx on public.profiles (username);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles
  for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

-- Reserved usernames (block at insert/update)
create or replace function public.enforce_reserved_usernames()
returns trigger
language plpgsql
as $$
declare
  reserved text[] := array[
    'admin', 'administrator', 'mod', 'moderator', 'support',
    'builderhq', 'official', 'supercell', 'system', 'api', 'login',
    'register', 'settings', 'profile', 'upload', 'bases', 'base'
  ];
begin
  if lower(new.username) = any (reserved) then
    raise exception 'This username is reserved';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_reserved_usernames on public.profiles;
create trigger profiles_reserved_usernames
  before insert or update of username on public.profiles
  for each row
  execute function public.enforce_reserved_usernames();
