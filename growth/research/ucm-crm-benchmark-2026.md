# UCM CRM Benchmark and Build Decision

## Decision

Build a UCM-specific commercial CRM as a separate product from the public website, customer app and Media Engine. Do not deploy a live customer database yet. Use labelled fictional data while UCM confirms data ownership, operating processes, retention rules and user roles.

UCM should not clone a generic CRM. It should combine the strongest operating patterns from cleaning and field-service products around UCM's own sales and contract model.

## Products Reviewed

### CleanManager

Useful patterns:

- Cleaning plans, scheduling and client records designed around contract cleaning.
- Quality audits with templates, scores, comments and photographs.
- Controlled client portal access to schedules, completed work, audits and image evidence.
- Time tracking, quote calculation, invoice calculation and payroll support as modular capabilities.

UCM lesson: quality proof, site plans and client-visible reporting are core contract-retention features, not marketing extras.

Official sources:

- https://cleanmanager.com/
- https://cleanmanager.com/base-module/client-portal
- https://cleanmanager.com/add-on-modules/quality-control

### Jobber

Useful patterns:

- Separate leads from active customers.
- Structured requests, branded quotes, optional line items and automatic quote follow-up.
- Recurring jobs, team scheduling, route support, time tracking and job costing.
- Checklists, photographs, notes, service history, invoices and a client hub.

UCM lesson: every opportunity needs a next action, every won quote must become an operational record, and margin must be visible before scaling.

Official sources:

- https://www.getjobber.com/industries/cleaning-crm-software/
- https://www.getjobber.com/industries/commercial-cleaning-software/

### BigChange

Useful patterns:

- CRM, job scheduling, mobile workforce, vehicle/route information and customer portal in one field-service operating model.
- Mandatory digital risk assessments and access to RAMS, COSHH information and site documents.
- Proof of work, signatures, job financials, service contracts and SLAs.

UCM lesson: compliance gates must be attached to the site and job, not kept in a disconnected folder.

Official sources:

- https://www.bigchange.com/industries/cleaning-software-crm
- https://www.bigchange.com/field-service-management-software

### ServiceM8

Useful patterns:

- Recurring cleaning schedules, mobile job details, checklists, notes, photographs, video and PDF reports.
- Automated customer communication, online booking, route optimisation and invoicing.

UCM lesson: field teams need a focused delivery tool. The office CRM should not force cleaners through a sales interface.

Official source:

- https://www.servicem8.com/us/industries/cleaning-software

## UCM CRM Scope

## Commercial Buy-versus-Build Position

The demonstration CRM should be used to test UCM's workflow and data model before paying for a platform or commissioning a production build.

| Option | Best fit | Main limitation for UCM | Decision |
| --- | --- | --- | --- |
| CleanManager | Contract cleaning plans, audits, time and client proof | Sales pipeline and wider maintenance workflows may need adaptation | Trial against one fictional office contract |
| Jobber | Fast lead, quote, recurring job, invoice and client-hub setup | Less cleaning-specific compliance/audit depth | Trial the complete enquiry-to-renewal journey |
| BigChange | Larger field operation, compliance gates, routes, vehicles and mobile teams | Higher cost and implementation weight than UCM may need initially | Request a focused demo after team/vehicle requirements are known |
| ServiceM8 | Cleaner mobile job flow, recurring work, checklists and reports | Not the strongest commercial contract/account CRM | Consider later for field operations, not as the CRM decision by itself |
| Fully custom UCM CRM | Exact UCM commercial, compliance, carbon and attribution model | Highest build, security, maintenance and adoption risk | Build production only where validated UCM differentiation justifies it |

Do not custom-build payroll, accounting, payment processing, generic route optimisation or commodity scheduling first. Integrate proven systems where practical. Custom work should focus on UCM's differentiators: CleanScope qualification, contract evidence, compliance status, Proof Passport, Building Health reporting, renewal control and marketing-to-revenue attribution.

## UCM CRM Scope

The CRM owns:

- Organisations, contacts and buyer roles.
- Opportunities, source attribution and qualification.
- Site surveys, quote versions, decisions and lost reasons.
- Contracts, values, renewal dates and expansion opportunities.
- Sites, service packages and key commercial risks.
- Compliance document status and expiry alerts.
- Customer issues, complaints and commercial follow-up.
- Marketing-assisted pipeline and won revenue.
- Environmental action commitments and evidence status.

The CRM does not own:

- Public website pages or SEO content.
- Customer self-service screens.
- Cleaner clock-in, route navigation or job execution UI.
- Video editing or social publishing.
- General accounting ledgers or payroll calculations.

## UCM-Specific Advantage

The differentiator is the connection between sales promise and service evidence:

`Campaign -> Enquiry -> Qualified need -> Site scope -> Quote -> Contract -> Service evidence -> Review -> Renewal`

Every contract should answer:

- What standard was sold?
- What compliance controls apply?
- What evidence is required?
- What does the customer see?
- What does the service cost to deliver?
- What is the renewal risk?
- Which source and message created the opportunity?
- Which environmental actions were promised, measured and evidenced?

## Build Sequence

1. Demonstration CRM with fictional records and agreed terminology.
2. Process workshop with sales, operations and finance.
3. Data inventory and UK GDPR retention design.
4. Role model and permission matrix.
5. Dedicated CRM database and authentication decision.
6. Lead and quote production release.
7. Contract, renewal and compliance release.
8. Customer app and field-service integrations.
9. Carbon/activity ledger after measurement methods are agreed.
