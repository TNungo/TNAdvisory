create extension if not exists pgcrypto;

create table if not exists public.briefing_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 160),
  corporate_email text not null check (char_length(corporate_email) between 3 and 160),
  help_type text not null check (char_length(help_type) between 1 and 160),
  region text check (region is null or char_length(region) between 1 and 160),
  context text check (context is null or char_length(context) between 1 and 1000),
  source text not null default 'tcnconsultants.com',
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.briefing_requests add column if not exists help_type text;
alter table public.briefing_requests add column if not exists context text;
alter table public.briefing_requests alter column region drop not null;
update public.briefing_requests set help_type = 'other' where help_type is null;
alter table public.briefing_requests alter column help_type set not null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'briefing_requests_help_type_length') then
    alter table public.briefing_requests add constraint briefing_requests_help_type_length check (char_length(help_type) between 1 and 160);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'briefing_requests_context_length') then
    alter table public.briefing_requests add constraint briefing_requests_context_length check (context is null or char_length(context) between 1 and 1000);
  end if;
end $$;

create index if not exists briefing_requests_created_at_idx
  on public.briefing_requests (created_at desc);

alter table public.briefing_requests enable row level security;

revoke all on table public.briefing_requests from anon, authenticated;

grant insert on table public.briefing_requests to service_role;
