create extension if not exists pgcrypto;

create table if not exists public.briefing_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 160),
  corporate_email text not null check (char_length(corporate_email) between 3 and 160),
  region text not null check (char_length(region) between 1 and 160),
  source text not null default 'tcnconsultants.com',
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists briefing_requests_created_at_idx
  on public.briefing_requests (created_at desc);

alter table public.briefing_requests enable row level security;

revoke all on table public.briefing_requests from anon, authenticated;

grant insert on table public.briefing_requests to service_role;
