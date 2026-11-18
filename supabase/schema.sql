-- Run this in the Supabase SQL editor, then create a private storage bucket named "artwork".
-- The service role key used by the server can insert rows and upload objects.
-- Do not expose the service role key in the browser.

create table if not exists public.quote_requests (
  id text primary key,
  created_at timestamptz not null default now(),
  kind text not null,
  name text not null,
  business text,
  phone text not null,
  email text not null,
  city text,
  packaging_type text,
  material text,
  length_mm numeric,
  width_mm numeric,
  height_mm numeric,
  quantity numeric,
  printing jsonb,
  finishing jsonb,
  instructions text,
  brand_color text,
  source text,
  artwork_path text,
  artwork_name text
);

alter table public.quote_requests enable row level security;

-- No public policies. The Next.js server uses the service role key, which bypasses RLS.
-- Add a staff policy later if you query this table from a signed-in dashboard.
