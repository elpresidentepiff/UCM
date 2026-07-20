# UCM System Boundaries

## Rule

The website, customer app, CRM, Workforce app and Media Engine are separate products with explicit responsibilities. They may exchange approved data later, but they must not be presented as one application.

## Public Website

Audience: prospects, buyers, candidates and the public.

Owns:

- Brand, service pages, locations, case studies and articles.
- Search visibility and conversion pages.
- Public trust evidence and approved claims.
- Entry points to call, WhatsApp and CleanScope.

Does not expose internal notes, contract value, margins, compliance gaps or operational records.

## Customer App

Audience: customers and authorised client contacts.

Owns:

- Quote requests and approvals.
- Bookings and service schedules.
- Proof Passport, approved photographs and completion records.
- Client documents, support tickets and service communication.
- Multi-site client reporting where contracted.

Does not expose internal profitability, staff HR data, unapproved media or other clients.

## UCM CRM

Audience: authorised UCM sales, management, operations and marketing users.

Owns:

- Leads, organisations, contacts, opportunities and attribution.
- Site surveys, quote versions, values, decisions and follow-up.
- Contracts, renewals, expansion opportunities and account risk.
- Compliance status, document ownership and expiry controls.
- Client issues and commercial actions.
- Carbon and efficiency commitments with evidence status.

It is the internal commercial source of truth. It is not the customer interface or cleaner field app.

## Field Operations App

Audience: supervisors, cleaners, maintenance teams and approved subcontractors.

Owns:

- Assigned work, site instructions and access notes.
- Required risk/COSHH acknowledgements.
- Checklists, time records, issues and completion evidence.
- Escalations to supervisors.

It receives the approved service scope from operations. It does not expose sales notes or unrelated customer records.

Field operations may later become an employee-facing module inside UCM Workforce, while preserving these data boundaries.

## UCM Workforce App

Audience: UCM employees, supervisors and specifically authorised HR, payroll and operations roles.

Owns:

- Employee self-service, approved profile information and controlled change requests.
- Shifts, assigned field work, readiness acknowledgements and operational escalations.
- Training requirements, learning progress, competencies and certificate expiry.
- Leave requests, company policies, announcements and confidential support routes.
- Display of authorised payslips and payroll outputs from the accounting/payroll source.

Employees see their own personal records. Supervisors see only the operational information needed to manage assigned work. Pay, banking, health, right-to-work and HR-case information require separately authorised access.

The Workforce app does not calculate payroll, replace accounting, expose CRM margins or provide employee information to the Media Engine without explicit permission.

## Media Engine

Audience: UCM marketing and approved reviewers.

Owns:

- Consent-checked media ingestion.
- Transcription, tagging, script/clip proposals and brand treatment.
- Claims review, human approval and publishing records.
- Content performance and lead attribution.

It may only receive approved media and minimum necessary context. It never becomes the CRM or customer app.

## Accounting

Audience: finance and authorised management.

Owns invoices, payments, tax, nominal codes, payroll and formal financial records. The CRM may hold commercial values and invoice status references, but it must not replace accounting software.
