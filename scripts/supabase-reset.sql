-- DESTRUCTIVE. Erases everything scripts/supabase-schema.sql creates in the
-- database — every table, policy, trigger, function, and all profile/role
-- and metadata rows. Run in the Supabase SQL editor to wipe back to empty,
-- then re-run supabase-schema.sql to rebuild.
-- Idempotent: safe to run even if parts were already removed.
--
-- STORAGE IS NOT TOUCHED HERE. Supabase blocks deleting storage rows from
-- SQL ("Direct deletion from storage tables is not allowed"). Remove the
-- buckets + their files separately:
--   Dashboard -> Storage -> open each bucket -> delete bucket
--   (buckets: 'gallery', 'reports', 'gp-papers')
-- or with the CLI:
--   supabase storage rm --recursive ss:///gallery
--   supabase storage rm --recursive ss:///reports
--   supabase storage rm --recursive ss:///gp-papers

-- 1. auth trigger + function -----------------------------------------
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user() cascade;

-- 2. storage.objects policies (storage.objects itself is Supabase-managed
--    and stays, so its policies must be dropped by name) --------------
drop policy if exists "public read gallery bucket" on storage.objects;
drop policy if exists "admins write gallery bucket" on storage.objects;
drop policy if exists "public read reports bucket" on storage.objects;
drop policy if exists "admins write reports bucket" on storage.objects;
drop policy if exists "public read gp-papers bucket" on storage.objects;
drop policy if exists "admins write gp-papers bucket" on storage.objects;

-- 3. application tables (cascade drops their own policies) -----------
drop table if exists public.gallery_items cascade;
drop table if exists public.annual_reports cascade;
drop table if exists public.gp_papers cascade;
drop table if exists public.profiles cascade;
