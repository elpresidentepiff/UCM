# UCM Local System Cost Proposal

Date: 20 July 2026

Status: planning estimate for commercial discussion; final fixed quotation follows discovery and written acceptance of scope.

## Offer

Build three proprietary UCM products with a UCM-controlled local infrastructure option:

- UCM Workforce for employees, supervisors, HR, payroll outputs and field readiness.
- UCM Commercial CRM for leads, quotes, contracts, renewals and account control.
- UCM Client App for CleanScope, quote status, bookings, Proof Passports, documents and support.

The products are built privately for UCM, tested with synthetic data and transferred to Carlos with source code, deployment configuration, documentation, credentials, administrator training and agreed intellectual-property assignment after final payment and acceptance.

## Recommended Hardware Allowance

| Item | Recommended specification | Budget allowance |
| --- | --- | ---: |
| Primary mini-server | Business mini-PC, 6+ modern CPU cores, 32GB RAM, 1TB NVMe, wired network, three-year warranty | GBP 700-1,050 |
| UPS | 900-1200VA line-interactive UPS with USB shutdown support | GBP 140-260 |
| Backup drives | Two encrypted 2TB external SSD/HDD devices for rotation | GBP 180-320 |
| Network and installation materials | Cabling, surge protection and secure mounting | GBP 50-120 |
| Optional firewall appliance | Only where the existing business router is unsuitable | GBP 250-500 |

Expected equipment total without optional firewall: **GBP 1,070-1,750**.

Hardware should be purchased by UCM directly. Exact models and supplier prices must be confirmed at order time; the allowance is not a hardware resale margin.

## Phase Pricing

| Phase | Deliverable | Price excluding VAT |
| --- | --- | ---: |
| 0. Discovery and governance | Workshops, product boundaries, data inventory, roles, retention, acceptance criteria and final technical specification | GBP 3,500 |
| 1. Local foundation | Linux hardening, Docker, reverse proxy, local networking, monitoring, encrypted backup automation and restoration test | GBP 3,250 |
| 2. Workforce secure MVP | Authentication, employee roles, shifts, training, certificates, documents, leave requests, notifications, audit controls and phone PWA | GBP 12,500 |
| 3. Commercial CRM MVP | Leads, accounts, sites, pipeline, quotes, contracts, renewals, tasks, permissions, imports, exports and reporting | GBP 15,500 |
| 4. Client App MVP | Customer accounts, CleanScope, human-reviewed quote status, schedules, Proof Passport, documents and tickets | GBP 18,500 |
| 5. Integration, assurance and handover | Controlled APIs, cross-user isolation tests, backup/recovery exercise, documentation, training, repository and infrastructure transfer | GBP 6,500 |

Full three-product implementation: **GBP 59,750 excluding VAT and hardware**.

Expected full programme including recommended equipment: **GBP 60,820-61,500 excluding VAT**.

## Lower-Risk Starting Package

Carlos does not need to approve the entire programme at once.

### Workforce Local Pilot

- Discovery and governance.
- Local server foundation.
- Secure Workforce MVP.
- Initial administrator training and pilot support.

Pilot professional services: **GBP 19,250 excluding VAT**.

Expected pilot including equipment: **GBP 20,320-21,000 excluding VAT**.

CRM and Client App remain separately approved options after the Workforce pilot demonstrates value.

## Ongoing Costs

### UCM Essential Care

**GBP 650 per month excluding VAT**.

Includes:

- Security and dependency updates during an agreed maintenance window.
- Backup monitoring and one scheduled restoration test per quarter.
- Service-health monitoring and administrator alerts.
- Up to four hours of support or minor configuration work monthly.
- Monthly system and risk report.

### UCM Managed Care

**GBP 1,250 per month excluding VAT**.

Includes Essential Care plus:

- Up to twelve support/development hours monthly.
- Priority incident response during agreed business hours.
- Monthly release window and improvement backlog review.
- User and access review support.

Unused support hours do not roll over. Hardware replacement, major new features, third-party subscriptions and out-of-hours emergency work are excluded.

## Optional Public Client App Hosting

If UCM does not want the public Client App dependent on office power and broadband, use a UCM-owned VPS while keeping Workforce and CRM local.

Planning allowance: **GBP 20-60 per month** for the server, backup capacity and traffic, plus the selected care plan. The provider and exact price are selected at procurement; Railway and Supabase are not required.

## Payment Schedule

- 30% of each approved phase on commencement.
- 30% at working demonstration.
- 30% at pilot acceptance.
- 10% at documentation, credential rotation and handover.

Work outside the agreed phase is quoted separately. Suggested change-work rate: **GBP 650 per day excluding VAT**, subject to written approval.

## Commercial Protections

- UCM owns its business, employee and customer data at all times.
- Production source is held in private repositories dedicated to UCM.
- Bespoke deliverables transfer under a written IP assignment after payment and acceptance.
- Open-source and third-party components remain under their own licences and are listed in the dependency register.
- No real employee or customer records enter a prototype or unapproved environment.
- Material integrations, payroll connections, payment processing, SMS, email volume and identity-provider charges are scoped separately.

UK Intellectual Property Office guidance states that commissioned copyright normally remains with the creator unless ownership is agreed in writing. The final contract should be reviewed by a qualified UK solicitor.

Reference: [UK IPO ownership of copyright works](https://www.gov.uk/guidance/ownership-of-copyright-works)

## Validity And Assumptions

This estimate is valid for planning for 30 days. It assumes one company, one brand, UK operations, an initial small pilot, English-only interfaces and no complex payroll write-back or accounting replacement. Discovery may reduce, confirm or increase later phase prices before those phases are authorised.
