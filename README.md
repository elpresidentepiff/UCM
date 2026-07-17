# UCM Growth System

This repository is the operating home for building UCM Cleaning Services into a modern, evidence-led cleaning and property-care company.

UCM is not being built as a brochure website or a social-media content exercise. The system connects customer acquisition, structured enquiries, quoting, service delivery, proof of work, recurring contracts and measurable marketing into one commercial operation.

## What UCM Is About

UCM combines established cleaning experience with disciplined technology and human service. The commercial position is straightforward:

- Make it easier for homeowners, landlords, offices and property managers to request the right service.
- Respond with clearer scopes and faster human-reviewed quotes.
- Prove completed work through checklists, approved photographs, issue records and sign-off.
- Reduce administrative waste through AI-assisted planning while keeping decisions and customer support human-controlled.
- Turn genuine service evidence into local marketing that produces enquiries, quotes and recurring contracts.
- Grow cleaning, technical cleaning, property care, responsive maintenance and handover services without making unsupported savings, sustainability or performance claims.

The objective is recurring, profitable contract revenue and stronger customer retention, not likes, follower counts or empty automation.

It contains:

- A dedicated UCM growth agent.
- The 360-degree digital business audit and strategy deck.
- A master commercial growth and marketing strategy.
- Dedicated Instagram, YouTube, LinkedIn and Facebook operating plans.
- A service innovation portfolio with twelve core products and two controlled pilots.
- Customer-hub, internal-operations and Media Engine integration blueprints.
- Sprint plans, SEO/GEO briefs, content calendars and paid campaign briefs.
- A working Growth Command Center, CleanScope enquiry workflow, Lead Center and governed Reel Factory demonstration.
- A separate UCM Commercial CRM demonstration using fictional records only.
- A founder/company introduction script covering purpose, differentiation, compliance and evidence-led carbon reduction.
- An evidence-gated HOCl Verified Disinfection promotion and implementation pilot.
- A rendered 34-second UCM Cleaning Services vertical campaign reel with voiceover and captions.

## Current Status

The strategy foundation and Growth Command Center were implemented on 2026-07-16. The first operating slice now includes CleanScope, a lead pipeline and a location-led Reel Factory with hard consent and claims gates.

The public Growth App currently uses browser-local data. A dedicated UCM Supabase backend has been designed but remote deployment is paused because UCM is not yet ready to hold real client information in this system.

The UCM CRM is now a separate demonstration application. It uses fictional records in memory, does not persist them and is not connected to Supabase. Before a live CRM is authorised, UCM must agree data ownership, minimum fields, user roles, retention periods, operating workflows and the relationship with accounting and field-service systems.

Customer authentication, shared live CRM data, secure media uploads, bookings and automated Media Engine publishing are not yet operational.

## Separate Products

| Product | Audience | Primary job |
| --- | --- | --- |
| UCM website | Public and prospective buyers | Explain services, establish trust and generate enquiries |
| Customer app | Customers and authorised client contacts | Quotes, bookings, service evidence, documents and support |
| UCM CRM | Authorised UCM staff | Leads, quotes, accounts, contracts, renewals, compliance and commercial control |
| Field operations app | Cleaners, supervisors and maintenance teams | Assigned work, site controls, checklists, time, issues and proof |
| Media Engine | Marketing and approved reviewers | Consent-checked content production, approval, publishing and attribution |

These systems may exchange approved data later. They are not one application and must not be described as one.

### Supabase Separation

UCM must have its own Supabase project. The existing Supabase project belongs to Velo Oracle Prime and is outside UCM's system boundary.

- Do not run UCM migrations against the Velo Oracle Prime project.
- Do not store UCM customers, enquiries, media, staff accounts or analytics in the Velo database.
- Do not reuse Velo API keys, Storage buckets, Auth users, Edge Functions or environment files.
- The `supabase/` directory in this repository is the source of truth for the dedicated UCM backend.
- Production deployment requires a newly created UCM project, staging verification, security-advisor checks and an explicit project-reference check before every migration.

The immediate priority is to validate the company evidence and operating model before collecting client data:

1. Verify UCM history, insurance, accreditations, compliance processes, products and environmental evidence.
2. Agree the CRM sales stages, quote process, contract fields, renewal process, roles and data-retention rules.
3. Rotate any exposed Media Engine credentials and remove secrets from Git history.
4. Confirm website, analytics, Search Console, Google Business Profile, Meta, LinkedIn and YouTube access.
5. Collect client permissions, reviews, pricing inputs and real job media.
6. Package and test CleanScope, Proof Passport and the three recurring Care Plans without storing real client data in the demonstration.
7. Adapt the Media Engine to UCM consent, branding and approval rules.
8. Resume the dedicated CRM/database decision only after governance and operating requirements are approved.
9. Launch tightly measured office, property-manager and handover campaigns.

## Run The Growth App

From the repository root:

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173/app/media-center/`.

Operational routes:

- `http://127.0.0.1:4173/app/media-center/cleanscope.html`
- `http://127.0.0.1:4173/app/media-center/lead-center.html`
- `http://127.0.0.1:4173/app/media-center/reel-factory.html`
- `http://127.0.0.1:4173/app/crm/`

## Key Files

- `.agents/ucm-growth-agent/README.md` - dedicated agent charter.
- `docs/audit/UCM-Services-Digital-Business-Audit-Growth-Strategy.pdf` - client-facing audit PDF.
- `docs/audit/UCM-Services-Digital-Business-Audit-Growth-Strategy.pptx` - editable audit deck.
- `growth/marketing/ucm-master-growth-marketing-plan.md` - master commercial growth plan.
- `growth/marketing/channel-operating-model.md` - shared channel governance and attribution.
- `growth/channels/` - Instagram, YouTube, LinkedIn and Facebook plans.
- `growth/innovation/ucm-product-innovation-roadmap.md` - twelve innovations and controlled pilots.
- `growth/strategy/` - customer hub, internal center and Media Engine blueprints.
- `app/media-center/index.html` - UCM Growth Command Center.
- `app/crm/index.html` - separate UCM Commercial CRM demonstration with fictional, non-persistent records.
- `app/media-center/OPERATIONS.md` - production activation and security rules.
- `supabase/README.md` - dedicated UCM backend boundary, deployment order and safety checks.
- `supabase/migrations/20260717013203_create_ucm_cleanscope_foundation.sql` - dedicated UCM schema, RLS and private media-bucket foundation.
- `growth/sprints/2026-07-16-kickoff.md` - active kickoff sprint.
- `growth/scripts/ucm-company-introduction-script.md` - 90, 30 and 15-second company scripts with claims gates.
- `growth/scripts/carlos-ucm-digital-future-script.md` - UCM Growth Agent presentation to Carlos covering the complete digital company system.
- `growth/scripts/ucm-cleaning-services-extended-video-script.md` - longer human-voiced customer film for the next cleaning video.
- `growth/scripts/ucm-mission-statement-script.md` - public UCM mission film and concise written statement.
- `growth/research/ucm-crm-benchmark-2026.md` - cleaning CRM research and UCM build decision.
- `growth/strategy/ucm-system-boundaries.md` - website, app, CRM, field operations and Media Engine ownership boundaries.
- `growth/innovation/hocl-verified-disinfection-promotion-and-implementation.md` - HOCl offer, testing protocol, claims controls, scripts, carbon evidence and 30-day pilot.
- `growth/media/ucm-cleaning-reel/` - rendered UCM cleaning reel, voiceover, subtitles, concept imagery and reproducible renderer.
- `growth/seo-briefs/office-cleaning-london.md` - first SEO/GEO page brief.
- `growth/seo-briefs/commercial-cleaning-london.md` - second SEO/GEO page brief.
- `growth/content/2026-07-content-calendar.md` - first content calendar draft.
- `growth/campaigns/meta-commercial-cleaning-readiness.md` - paid campaign readiness brief.

## Working Rule

UCM marketing work must be commercially accountable. Do not optimize for activity alone. Every recommendation should support search visibility, buyer trust, conversion, retention or recurring revenue. Claims, customer media and prestigious-client references require recorded evidence and approval before publication.

The same rule applies to technology: no false live-system claims, no cross-company customer data, no secrets in Git and no autonomous publishing, pricing or customer decisions without defined human approval.
