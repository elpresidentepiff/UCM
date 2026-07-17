# UCM Media Center App Product Brief

## Product Goal

Build an internal UCM app that helps MS Infosys and UCM decide where to market, what to say, what content to create and how to learn from results.

## Implemented Growth Command Center

The current version is a local static strategy and workflow demonstration:

- `app/media-center/index.html`

It includes:

- Executive views of the customer hub, internal operations center and Media Engine.
- Instagram, YouTube, LinkedIn and Facebook operating dashboards.
- Carlos Cuevas founder-authority profiles and programme.
- A filterable fifteen-script video backlog.
- London Demand Radar and service filtering.
- Twelve core innovations, two controlled pilots and care-plan comparison.
- CleanScope, Proof Passport, AI Efficiency Ledger and claims-register demonstrations.
- Customer-hub, internal-center and prioritised implementation roadmaps.

This app does not claim that customer authentication, booking, CRM, automated publishing or live attribution are operational. Those capabilities belong to the next authenticated product phase.

## Core Modules

### 1. London Targeting Map

Shows boroughs and zones by opportunity score.

Inputs:

- Private renters.
- New completions.
- Opportunity Areas.
- Office/commercial density.
- Rent pressure.
- UCM service fit.

Outputs:

- Priority score.
- Best service offer.
- Campaign angle.
- CTA.

### 2. Campaign Generator

Turns a zone and service into:

- Hook.
- Caption.
- Creative brief.
- Landing page recommendation.
- Paid ad angle.
- CTA.
- Proof required.

### 3. Media Engine Queue

Tracks:

- Raw asset.
- Borough.
- Service.
- Proof status.
- Script.
- Clip status.
- Approval status.
- Publish status.
- Metrics.

### 4. AI Savings Guardrail

Keeps campaign language honest.

Approved frame:

> AI-assisted planning helps UCM reduce admin waste, quote faster, group work more efficiently and build clearer scopes. That can support more economical service without cutting standards.

### 5. Reporting

Tracks:

- Content output.
- Reach.
- Saves.
- Shares.
- Landing-page clicks.
- Calls.
- Quote forms.
- Qualified leads.
- Cost per qualified lead.
- Winning borough/service/hook combinations.

## Build Path

### Phase 1 - Static App

- Completed local HTML/CSS/JS Growth Command Center.
- Structured JSON growth-system and target-zone data.
- Interactive channel, script, zone and innovation filtering.
- Claims, plans and workflow demonstrations.

### Phase 2 - Operational App

- Next.js or Remix frontend.
- Supabase database.
- Auth.
- Campaign manifests.
- Asset upload.
- Approval queue.
- Metrics import.

### Phase 3 - AI Media Center

- Whisper transcription.
- VideoAgent / FFmpeg sandbox.
- Caption generation.
- Script generation.
- Clip suggestions.
- Meta/GBP/GA4 metric ingestion.
- Learning loop.
