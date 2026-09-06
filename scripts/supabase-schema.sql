-- Complete schema for the EARC site. Run in the Supabase SQL editor.
-- Idempotent: safe to re-run — every policy is dropped and recreated, and
-- tables/buckets use "if not exists". To wipe everything first, run
-- scripts/supabase-reset.sql.

-- 1. profiles ---------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- creates a profile row (default role 'user') whenever a user is created —
-- fires whether they're added via the app or manually in the Supabase
-- dashboard (Authentication -> Users -> Add user)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- To create an admin: Authentication -> Users -> Add user in the Supabase
-- dashboard, then run:
--   update public.profiles set role = 'admin' where id = '<their-user-uuid>';
-- There is no public signup flow — this is the only way in.

-- 2. gallery_items -----------------------------------------------------
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  media_type text not null check (media_type in ('photo', 'video')),
  storage_path text not null,
  url text not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);

alter table public.gallery_items enable row level security;

drop policy if exists "public read gallery" on public.gallery_items;
create policy "public read gallery"
  on public.gallery_items for select
  using (true);

drop policy if exists "admins write gallery" on public.gallery_items;
create policy "admins write gallery"
  on public.gallery_items for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 3. annual_reports ------------------------------------------------------
create table if not exists public.annual_reports (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  year int not null,
  storage_path text not null,
  url text not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);

alter table public.annual_reports enable row level security;

drop policy if exists "public read reports" on public.annual_reports;
create policy "public read reports"
  on public.annual_reports for select
  using (true);

drop policy if exists "admins write reports" on public.annual_reports;
create policy "admins write reports"
  on public.annual_reports for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 4. gp_papers (Ganit Prabhutwa Pariksha papers) ----------------------
create table if not exists public.gp_papers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  year int not null,
  standard text not null check (standard in ('5th', '8th')),
  kind text not null check (kind in ('question-paper', 'answer-sheet')),
  storage_path text not null,
  url text not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);

alter table public.gp_papers enable row level security;

drop policy if exists "public read gp_papers" on public.gp_papers;
create policy "public read gp_papers"
  on public.gp_papers for select
  using (true);

drop policy if exists "admins write gp_papers" on public.gp_papers;
create policy "admins write gp_papers"
  on public.gp_papers for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 5. storage buckets ---------------------------------------------------
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('reports', 'reports', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('gp-papers', 'gp-papers', true)
on conflict (id) do nothing;

drop policy if exists "public read gallery bucket" on storage.objects;
create policy "public read gallery bucket"
  on storage.objects for select
  using (bucket_id = 'gallery');

drop policy if exists "admins write gallery bucket" on storage.objects;
create policy "admins write gallery bucket"
  on storage.objects for all
  using (bucket_id = 'gallery' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (bucket_id = 'gallery' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "public read reports bucket" on storage.objects;
create policy "public read reports bucket"
  on storage.objects for select
  using (bucket_id = 'reports');

drop policy if exists "admins write reports bucket" on storage.objects;
create policy "admins write reports bucket"
  on storage.objects for all
  using (bucket_id = 'reports' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (bucket_id = 'reports' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "public read gp-papers bucket" on storage.objects;
create policy "public read gp-papers bucket"
  on storage.objects for select
  using (bucket_id = 'gp-papers');

drop policy if exists "admins write gp-papers bucket" on storage.objects;
create policy "admins write gp-papers bucket"
  on storage.objects for all
  using (bucket_id = 'gp-papers' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (bucket_id = 'gp-papers' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
