-- Activation only, after testing the campus migration in an isolated environment.
-- Run as database owner. pg_cron is Supabase's built-in database scheduler.
create extension if not exists pg_cron;
select cron.schedule('study-cleanup-guests','15 * * * *','select public.study_cleanup_guests();');
-- Verify with: select jobid,jobname,schedule,active from cron.job where jobname='study-cleanup-guests';
