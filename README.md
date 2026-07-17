# UCM Growth Repository

This repository is the working home for UCM Cleaning Services digital growth operations.

It contains:

- A dedicated UCM growth agent.
- The 360-degree digital business audit and strategy deck.
- A master commercial growth and marketing strategy.
- Dedicated Instagram, YouTube, LinkedIn and Facebook operating plans.
- A service innovation portfolio with twelve core products and two controlled pilots.
- Customer-hub, internal-operations and Media Engine integration blueprints.
- Sprint plans, SEO/GEO briefs, content calendars and paid campaign briefs.
- A working Growth Command Center, CleanScope enquiry workflow, Lead Center and governed Reel Factory demonstration.

## Current Status

The strategy foundation and Growth Command Center were implemented on 2026-07-16. The first operating slice now includes CleanScope, a lead pipeline and a location-led Reel Factory with hard consent and claims gates. These tools use browser-local data until a dedicated UCM Supabase project is approved and deployed; customer authentication, bookings, live CRM data and automated Media Engine publishing are not yet operational.

The immediate priority is to supply real business evidence and connect the operating systems:

1. Rotate any exposed Media Engine credentials and remove secrets from Git history.
2. Confirm website, analytics, Search Console, Google Business Profile, Meta, LinkedIn and YouTube access.
3. Collect client permissions, reviews, accreditations, pricing inputs and real job media.
4. Package and test CleanScope, Proof Passport and the three recurring Care Plans.
5. Build the authenticated customer hub and internal lead-to-contract center.
6. Adapt the Media Engine to UCM consent, branding and approval rules.
7. Launch tightly measured office, property-manager and handover campaigns.

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
- `app/media-center/OPERATIONS.md` - production activation and security rules.
- `supabase/migrations/20260717013203_create_ucm_cleanscope_foundation.sql` - dedicated UCM schema, RLS and private media-bucket foundation.
- `growth/sprints/2026-07-16-kickoff.md` - active kickoff sprint.
- `growth/seo-briefs/office-cleaning-london.md` - first SEO/GEO page brief.
- `growth/seo-briefs/commercial-cleaning-london.md` - second SEO/GEO page brief.
- `growth/content/2026-07-content-calendar.md` - first content calendar draft.
- `growth/campaigns/meta-commercial-cleaning-readiness.md` - paid campaign readiness brief.

## Working Rule

UCM marketing work must be commercially accountable. Do not optimize for activity alone. Every recommendation should support search visibility, buyer trust, conversion, retention or recurring revenue. Claims, customer media and prestigious-client references require recorded evidence and approval before publication.
