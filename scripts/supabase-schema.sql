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

-- the trigger above only fires for auth.users rows created AFTER it exists —
-- backfill a profile row for any user that predates it (e.g. an admin
-- created in the dashboard before this script was first run), so login
-- doesn't bounce back to /login for having no matching profiles row.
insert into public.profiles (id)
select u.id from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;

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

-- 5. team_members -------------------------------------------------------
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text not null,
  project text not null,
  centre text not null default '—',
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);

alter table public.team_members enable row level security;

drop policy if exists "public read team_members" on public.team_members;
create policy "public read team_members"
  on public.team_members for select
  using (true);

drop policy if exists "admins write team_members" on public.team_members;
create policy "admins write team_members"
  on public.team_members for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 6. partners (CSR / project collaborators) -----------------------------
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  project text not null,
  csr_partner text not null,
  storage_path text not null,
  url text not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);

alter table public.partners enable row level security;

drop policy if exists "public read partners" on public.partners;
create policy "public read partners"
  on public.partners for select
  using (true);

drop policy if exists "admins write partners" on public.partners;
create policy "admins write partners"
  on public.partners for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 7. testimonials ---------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  detail text not null,
  status text not null default 'pending' check (status in ('pending', 'approved')),
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);

alter table public.testimonials enable row level security;

drop policy if exists "public read approved testimonials" on public.testimonials;
create policy "public read approved testimonials"
  on public.testimonials for select
  using (
    status = 'approved'
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

drop policy if exists "anyone submits testimonial" on public.testimonials;
create policy "anyone submits testimonial"
  on public.testimonials for insert
  with check (status = 'pending');

drop policy if exists "admins manage testimonials" on public.testimonials;
create policy "admins manage testimonials"
  on public.testimonials for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "admins delete testimonials" on public.testimonials;
create policy "admins delete testimonials"
  on public.testimonials for delete
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 8. success_stories -------------------------------------------------------
create table if not exists public.success_stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  name text not null,
  story text not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);

alter table public.success_stories enable row level security;

drop policy if exists "public read success_stories" on public.success_stories;
create policy "public read success_stories"
  on public.success_stories for select
  using (true);

drop policy if exists "admins write success_stories" on public.success_stories;
create policy "admins write success_stories"
  on public.success_stories for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 9. hb_registrations (Homi Bhabha batch registrations) ------------------
-- Holds personal/contact data and a payment-screenshot reference, so unlike
-- the public-read tables above, only admins can read rows back — anyone can
-- submit, nobody but an admin can list or view submissions.
create table if not exists public.hb_registrations (
  id uuid primary key default gen_random_uuid(),
  course_id text not null,
  student_name_mr_surname text not null,
  student_name_mr_name text not null,
  student_name_mr_father text not null,
  student_name_en_surname text not null,
  student_name_en_name text not null,
  student_name_en_middle text not null default '',
  payment_screenshot_path text not null,
  address text not null,
  village text not null,
  taluka text not null,
  district text not null,
  parent_name text not null,
  whatsapp_no text not null,
  email text not null,
  school_name text not null,
  medium_chosen text not null check (medium_chosen in ('english', 'marathi')),
  school_address text not null,
  school_board text not null check (school_board in ('ssc-marathi', 'ssc-english', 'cbse', 'icse', 'home-schooling', 'other')),
  school_timing_weekday text not null,
  school_timing_saturday text not null,
  preferred_slot text not null check (preferred_slot in ('morning-marathi', 'evening-marathi', 'evening-english')),
  heard_from text not null check (heard_from in ('person', 'whatsapp', 'facebook', 'instagram', 'teacher-school', 'other')),
  created_at timestamptz not null default now()
);

alter table public.hb_registrations enable row level security;

drop policy if exists "anyone submits hb registration" on public.hb_registrations;
create policy "anyone submits hb registration"
  on public.hb_registrations for insert
  with check (true);

drop policy if exists "admins read hb registrations" on public.hb_registrations;
create policy "admins read hb registrations"
  on public.hb_registrations for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "admins delete hb registrations" on public.hb_registrations;
create policy "admins delete hb registrations"
  on public.hb_registrations for delete
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 10. contact_submissions -------------------------------------------------
-- Personal contact info, so like hb_registrations: anyone can submit,
-- only admins can read the messages back.
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

drop policy if exists "anyone submits contact message" on public.contact_submissions;
create policy "anyone submits contact message"
  on public.contact_submissions for insert
  with check (true);

drop policy if exists "admins read contact messages" on public.contact_submissions;
create policy "admins read contact messages"
  on public.contact_submissions for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "admins delete contact messages" on public.contact_submissions;
create policy "admins delete contact messages"
  on public.contact_submissions for delete
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 11. storage buckets ---------------------------------------------------
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('reports', 'reports', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('gp-papers', 'gp-papers', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('partners', 'partners', true)
on conflict (id) do nothing;

-- private: payment screenshots, admin-only read via signed URL
insert into storage.buckets (id, name, public)
values ('hb-registrations', 'hb-registrations', false)
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

drop policy if exists "public read partners bucket" on storage.objects;
create policy "public read partners bucket"
  on storage.objects for select
  using (bucket_id = 'partners');

drop policy if exists "admins write partners bucket" on storage.objects;
create policy "admins write partners bucket"
  on storage.objects for all
  using (bucket_id = 'partners' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (bucket_id = 'partners' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "anyone uploads hb-registrations bucket" on storage.objects;
create policy "anyone uploads hb-registrations bucket"
  on storage.objects for insert
  with check (bucket_id = 'hb-registrations');

drop policy if exists "admins read hb-registrations bucket" on storage.objects;
create policy "admins read hb-registrations bucket"
  on storage.objects for select
  using (bucket_id = 'hb-registrations' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "admins delete hb-registrations bucket" on storage.objects;
create policy "admins delete hb-registrations bucket"
  on storage.objects for delete
  using (bucket_id = 'hb-registrations' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
