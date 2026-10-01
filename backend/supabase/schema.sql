-- KPCT contact submissions.
-- Run once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).

create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  email       text        not null,
  phone       text,
  subject     text        not null,
  interest    text,
  message     text        not null,
  source      text        not null default 'website',
  received_at timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

-- Newest-first reads are the common query.
create index if not exists contact_submissions_received_at_idx
  on public.contact_submissions (received_at desc);

-- Row level security is enabled and no policies are created, so the anon and
-- authenticated roles cannot read or write this table at all. The API reaches
-- it with the service-role key, which bypasses RLS and never leaves the server.
alter table public.contact_submissions enable row level security;
