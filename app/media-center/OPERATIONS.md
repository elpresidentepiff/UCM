# UCM Growth App Operations

## What Works Now

- CleanScope captures a structured, five-step service enquiry.
- Lead Center stores, filters, updates and exports browser-local pipeline records.
- Reel Factory creates a location-led content manifest from a CleanScope record.
- The Reel Factory enforces the 85/100 quality threshold, independent evidence checks, claims approval, consent verification and a maximum of two automated revision rounds.
- All three tools are intentionally labelled as demonstration mode until a dedicated UCM backend is deployed.

Browser-local records are useful for workflow testing only. They are not shared between devices, backed up, authenticated or suitable for production customer data.

## Production Activation

Status: paused. UCM is not yet using this system to hold real client information. Do not create or link a remote project until the CRM operating model, minimum data fields, user roles, retention rules and accountable data owner are approved.

1. Create a dedicated UCM Supabase project. The existing project belongs to Velo Oracle Prime and must not receive UCM data or migrations.
2. Apply `supabase/migrations/20260717013203_create_ucm_cleanscope_foundation.sql` to staging first.
3. Create the first staff user and insert the matching role in `public.ucm_staff` through an administrator-only process.
4. Deploy `supabase/functions/submit-cleanscope` with JWT verification disabled. The function performs its own origin, Turnstile and payload validation.
5. Set `ALLOWED_ORIGINS` and `TURNSTILE_SECRET_KEY` as Edge Function secrets.
6. Set the public function URL and Turnstile site key in `config.js`. Never put a Supabase secret key in this file.
7. Replace Lead Center browser storage with authenticated Supabase reads and writes.
8. Implement signed media uploads to the private `ucm-lead-media` bucket. Until then, files remain on the customer's device.
9. Test row-level security using separate admin, sales, reviewer, customer and anonymous accounts.
10. Configure daily managed backups, a 30-day retention target and a monthly restore test after the production database exists.

## Required Edge Function Secrets

```text
ALLOWED_ORIGINS=https://www.ucmservices.co.uk,https://elpresidentepiff.github.io
TURNSTILE_SECRET_KEY=managed-in-supabase-secrets
```

Supabase provides `SUPABASE_URL` and `SUPABASE_SECRET_KEYS` to hosted Edge Functions. The secret key bypasses row-level security and must never enter browser code, logs, Git or public documentation.

## Publishing Rule

Reel Factory does not publish. A reel can move to human approval only after the quality threshold and all hard gates pass. Database constraints prevent approved or published status without a named human approver, verified consent, approved claims, no hard failures and a score of at least 85.
