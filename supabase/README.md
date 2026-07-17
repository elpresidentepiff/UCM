# UCM Supabase Backend

This directory belongs exclusively to UCM Cleaning Services.

## Hard Boundary

The existing Supabase project is the Velo Oracle Prime system. It is not a shared sandbox and must not receive UCM migrations, tables, customers, staff, media, Auth users, functions or credentials.

UCM requires a separate Supabase project with its own:

- Postgres database and migration history.
- Authentication users and UCM staff roles.
- Row-level security policies.
- Private `ucm-lead-media` Storage bucket.
- `submit-cleanscope` Edge Function and anti-bot secrets.
- Publishable and secret API keys.
- logs, security advisors, backups and restore tests.

## Repository Contents

- `config.toml` defines the local UCM Supabase stack and Edge Function configuration.
- `migrations/20260717013203_create_ucm_cleanscope_foundation.sql` creates UCM staff, enquiries, media, events and reel manifests with RLS and publishing constraints.
- `functions/submit-cleanscope/index.ts` validates public enquiries, verifies Turnstile and writes through the backend without exposing a secret key to the browser.

## Deployment Gate

Before any remote command:

1. Confirm the target project name is UCM and not Velo Oracle Prime.
2. Confirm the target project reference matches the recorded UCM project reference.
3. Confirm the region and environment: staging or production.
4. Review the migration and run it against UCM staging first.
5. Test anonymous, customer, sales, operations, reviewer and administrator access separately.
6. Run Supabase security and performance advisors.
7. Verify the Edge Function origin allowlist and Turnstile configuration.
8. Submit a synthetic CleanScope enquiry and confirm it appears only in the UCM Lead Center.

## Current Remote Status

No UCM remote project is recorded here yet. Until the dedicated project is created and its deployment is verified, the Growth App must continue to describe CleanScope, Lead Center and Reel Factory as demonstration workflows.

Never commit API keys, database passwords, access tokens, `.env` files or customer data to this repository.
