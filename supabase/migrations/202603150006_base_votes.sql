-- BuilderHQ Milestone 4: like / dislike votes
-- Run in Supabase → SQL Editor → New query → Run

create table if not exists public.base_votes (
  base_id uuid not null references public.bases (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  vote smallint not null check (vote in (1, -1)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (base_id, user_id)
);

create index if not exists base_votes_user_id_idx on public.base_votes (user_id);
create index if not exists base_votes_base_id_idx on public.base_votes (base_id);

alter table public.base_votes enable row level security;

drop policy if exists "Users can read own base votes" on public.base_votes;
create policy "Users can read own base votes"
  on public.base_votes
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Writes go through cast_base_vote (security definer). No direct insert/update/delete.

create or replace function public.cast_base_vote(p_base_id uuid, p_vote smallint)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  v_creator uuid;
  likes integer;
  dislikes integer;
  total integer;
  score numeric;
  my_vote smallint;
begin
  if uid is null then
    raise exception 'You must be logged in to vote.';
  end if;

  if p_vote not in (-1, 0, 1) then
    raise exception 'Invalid vote.';
  end if;

  select creator_id
  into v_creator
  from public.bases
  where id = p_base_id
    and status = 'published';

  if v_creator is null then
    raise exception 'Base not found.';
  end if;

  if v_creator = uid then
    raise exception 'You cannot vote on your own base.';
  end if;

  if p_vote = 0 then
    delete from public.base_votes
    where base_id = p_base_id
      and user_id = uid;
  else
    insert into public.base_votes (base_id, user_id, vote)
    values (p_base_id, uid, p_vote)
    on conflict (base_id, user_id) do update
      set vote = excluded.vote,
          updated_at = now();
  end if;

  select
    coalesce(count(*) filter (where vote = 1), 0),
    coalesce(count(*) filter (where vote = -1), 0)
  into likes, dislikes
  from public.base_votes
  where base_id = p_base_id;

  total := likes + dislikes;
  score := case
    when total = 0 then 0
    else round((likes::numeric * 100) / total, 1)
  end;

  update public.bases
  set
    like_count = likes,
    dislike_count = dislikes,
    rating_count = total,
    average_rating = score,
    updated_at = now()
  where id = p_base_id;

  select vote
  into my_vote
  from public.base_votes
  where base_id = p_base_id
    and user_id = uid;

  return json_build_object(
    'like_count', likes,
    'dislike_count', dislikes,
    'rating_count', total,
    'average_rating', score,
    'my_vote', my_vote
  );
end;
$$;

revoke all on function public.cast_base_vote(uuid, smallint) from public;
grant execute on function public.cast_base_vote(uuid, smallint) to authenticated;
