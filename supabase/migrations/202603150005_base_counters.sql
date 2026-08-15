-- Secure counter increments (clients must not write counters directly)

create or replace function public.increment_base_copy_count(p_base_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.bases
  set copy_count = copy_count + 1
  where id = p_base_id
    and status = 'published';
end;
$$;

create or replace function public.increment_base_view_count(p_base_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.bases
  set view_count = view_count + 1
  where id = p_base_id
    and status = 'published';
end;
$$;

revoke all on function public.increment_base_copy_count(uuid) from public;
revoke all on function public.increment_base_view_count(uuid) from public;
grant execute on function public.increment_base_copy_count(uuid) to anon, authenticated;
grant execute on function public.increment_base_view_count(uuid) to anon, authenticated;
