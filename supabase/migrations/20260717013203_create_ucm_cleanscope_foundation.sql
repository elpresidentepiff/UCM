create extension if not exists pgcrypto;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated, service_role;

create table public.ucm_staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null check (role in ('admin', 'sales', 'operations', 'marketing', 'reviewer')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.lead_enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  contact_user_id uuid references auth.users(id) on delete set null,
  status text not null default 'new'
    check (status in ('new', 'qualified', 'site_visit', 'quote', 'won', 'lost', 'active', 'renewal')),
  owner_id uuid references auth.users(id) on delete set null,
  next_action text,
  next_action_at timestamptz,
  response_due_at timestamptz not null,
  responded_at timestamptz,
  lost_reason text,
  buyer_type text not null
    check (buyer_type in ('homeowner_tenant', 'landlord_agent', 'office_facilities', 'property_manager', 'other_business')),
  service_code text not null
    check (service_code in ('office_cleaning', 'commercial_cleaning', 'property_care', 'end_of_tenancy', 'deep_cleaning', 'technical_cleaning', 'responsive_maintenance', 'handover_complete')),
  organisation_name text,
  contact_name text not null,
  email text not null,
  phone text not null,
  preferred_contact text not null check (preferred_contact in ('phone', 'email', 'whatsapp')),
  postcode text not null,
  address_line text,
  property_type text not null,
  size_estimate text,
  frequency text not null,
  urgency text not null check (urgency in ('planned', 'within_30_days', 'within_7_days', 'urgent_48_hours')),
  preferred_date date,
  areas text[] not null default '{}',
  scope_details text not null,
  access_notes text,
  media_consent boolean not null default false,
  privacy_consent boolean not null default false,
  marketing_consent boolean not null default false,
  source_channel text,
  source_campaign text,
  source_content text,
  source_term text,
  landing_path text,
  completeness_score smallint not null default 0 check (completeness_score between 0 and 100),
  submitted_ip_hash text,
  user_agent text
);

create table public.lead_media (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.lead_enquiries(id) on delete cascade,
  storage_path text not null unique,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 26214400),
  consent_scope text not null check (consent_scope in ('scope_only', 'internal_proof', 'marketing_approved')),
  approved_for_marketing_at timestamptz,
  approved_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.lead_events (
  id bigint generated always as identity primary key,
  lead_id uuid not null references public.lead_enquiries(id) on delete cascade,
  event_type text not null,
  from_status text,
  to_status text,
  note text,
  actor_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.reel_manifests (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.lead_enquiries(id) on delete set null,
  title text not null,
  location_label text not null,
  service_code text not null,
  buyer text not null,
  hook text not null,
  proof_summary text not null,
  call_to_action text not null,
  source_media_ids uuid[] not null default '{}',
  review_round smallint not null default 0 check (review_round between 0 and 2),
  quality_score smallint not null default 0 check (quality_score between 0 and 100),
  hard_failures text[] not null default '{}',
  status text not null default 'draft'
    check (status in ('draft', 'review', 'changes_required', 'human_approval', 'approved', 'published', 'rejected')),
  claims_status text not null default 'evidence_required'
    check (claims_status in ('evidence_required', 'approved', 'blocked')),
  consent_verified boolean not null default false,
  human_approver_id uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  published_url text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reel_publish_gate check (
    status not in ('approved', 'published')
    or (
      quality_score >= 85
      and cardinality(hard_failures) = 0
      and claims_status = 'approved'
      and consent_verified
      and human_approver_id is not null
    )
  )
);

create index lead_enquiries_status_due_idx on public.lead_enquiries(status, response_due_at);
create index lead_enquiries_owner_idx on public.lead_enquiries(owner_id, next_action_at);
create index lead_enquiries_postcode_idx on public.lead_enquiries(postcode);
create index lead_enquiries_source_idx on public.lead_enquiries(source_channel, source_campaign);
create index lead_media_lead_idx on public.lead_media(lead_id);
create index lead_events_lead_created_idx on public.lead_events(lead_id, created_at desc);
create index reel_manifests_status_idx on public.reel_manifests(status, updated_at desc);

create or replace function private.is_ucm_staff(required_roles text[] default null)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.ucm_staff
    where user_id = (select auth.uid())
      and active
      and (required_roles is null or role = any(required_roles))
  );
$$;

revoke all on function private.is_ucm_staff(text[]) from public;
grant execute on function private.is_ucm_staff(text[]) to authenticated, service_role;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function private.set_updated_at() from public;

create trigger set_lead_enquiries_updated_at
before update on public.lead_enquiries
for each row execute function private.set_updated_at();

create trigger set_reel_manifests_updated_at
before update on public.reel_manifests
for each row execute function private.set_updated_at();

alter table public.ucm_staff enable row level security;
alter table public.lead_enquiries enable row level security;
alter table public.lead_media enable row level security;
alter table public.lead_events enable row level security;
alter table public.reel_manifests enable row level security;

create policy "Staff can read their membership"
on public.ucm_staff for select
to authenticated
using (user_id = (select auth.uid()) or (select private.is_ucm_staff(array['admin'])));

create policy "Admins can manage staff"
on public.ucm_staff for all
to authenticated
using ((select private.is_ucm_staff(array['admin'])))
with check ((select private.is_ucm_staff(array['admin'])));

create policy "Staff can read leads"
on public.lead_enquiries for select
to authenticated
using ((select private.is_ucm_staff()));

create policy "Staff can create leads"
on public.lead_enquiries for insert
to authenticated
with check ((select private.is_ucm_staff()));

create policy "Staff can update leads"
on public.lead_enquiries for update
to authenticated
using ((select private.is_ucm_staff()))
with check ((select private.is_ucm_staff()));

create policy "Customers can read their own leads"
on public.lead_enquiries for select
to authenticated
using (contact_user_id = (select auth.uid()));

create policy "Staff can manage lead media"
on public.lead_media for all
to authenticated
using ((select private.is_ucm_staff()))
with check ((select private.is_ucm_staff()));

create policy "Staff can manage lead events"
on public.lead_events for all
to authenticated
using ((select private.is_ucm_staff()))
with check ((select private.is_ucm_staff()));

create policy "Staff can manage reel manifests"
on public.reel_manifests for all
to authenticated
using ((select private.is_ucm_staff()))
with check ((select private.is_ucm_staff()));

revoke all on public.ucm_staff, public.lead_enquiries, public.lead_media, public.lead_events, public.reel_manifests from anon;
grant select, insert, update, delete on public.ucm_staff, public.lead_enquiries, public.lead_media, public.lead_events, public.reel_manifests to authenticated;
grant usage, select on sequence public.lead_events_id_seq to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ucm-lead-media',
  'ucm-lead-media',
  false,
  26214400,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "Staff can read UCM lead media"
on storage.objects for select
to authenticated
using (bucket_id = 'ucm-lead-media' and (select private.is_ucm_staff()));

create policy "Staff can upload UCM lead media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'ucm-lead-media' and (select private.is_ucm_staff()));

create policy "Staff can update UCM lead media"
on storage.objects for update
to authenticated
using (bucket_id = 'ucm-lead-media' and (select private.is_ucm_staff()))
with check (bucket_id = 'ucm-lead-media' and (select private.is_ucm_staff()));

create policy "Staff can delete UCM lead media"
on storage.objects for delete
to authenticated
using (bucket_id = 'ucm-lead-media' and (select private.is_ucm_staff()));
