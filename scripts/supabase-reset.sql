-- DESTRUCTIVE. Erases every table, policy, trigger, function, and storage
-- bucket created by scripts/supabase-schema.sql — including all uploaded
-- files and profile/role data. Run only in the Supabase SQL editor when you
-- want to wipe the project back to empty. Re-run supabase-schema.sql after
-- this to rebuild from scratch.

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

drop table if exists public.gallery_items cascade;
drop table if exists public.annual_reports cascade;
drop table if exists public.profiles cascade;

delete from storage.objects where bucket_id in ('gallery', 'reports');
delete from storage.buckets where id in ('gallery', 'reports');
