# UCM Proprietary Product Delivery And Handover

## Commercial Decision

UCM Workforce, UCM Commercial CRM and the UCM Client App will be built as proprietary products specifically for UCM Cleaning Services. Development may be managed by the delivery team, but the completed product source, production infrastructure, business data, domains, credentials and operating documentation will be handed to Carlos and placed under UCM control.

The existing `UCM` repository has been publicly accessible. It remains suitable for strategy, approved marketing material and fictional demonstrations, but secrecy cannot be guaranteed for code that has already been published. Production code must therefore move into three dedicated private repositories:

- `ucm-workforce-private`
- `ucm-crm-private`
- `ucm-client-app-private`

Repository names are temporary until Carlos approves the UCM organisation and naming convention.

## Legal Ownership Gate

Calling a commissioned system "proprietary" does not by itself transfer copyright. UK Intellectual Property Office guidance states that the creator is normally the first owner of commissioned copyright work unless ownership is agreed in writing. The commercial agreement must therefore contain a signed assignment covering the bespoke source code, interface designs, documentation, database designs, tests and product-specific assets delivered for UCM.

This document is an engineering and handover specification, not a substitute for a solicitor-drafted agreement.

Official references:

- [UK IPO guidance on ownership of commissioned copyright works](https://www.gov.uk/guidance/ownership-of-copyright-works)
- [GOV.UK guidance on transferring copyright](https://www.gov.uk/copyright/license-and-sell-your-copyright)

## Ownership Schedule

### Assigned To UCM At Handover

- Bespoke application source and compiled application assets.
- UCM-specific interface designs, workflows and data models.
- Automated tests, deployment configuration and migration files.
- Product requirements, runbooks, architecture and administrator documentation.
- UCM-created content, approved brand assets and product-specific prompts.
- Production domains, deployment projects, databases, storage and backups.
- UCM business data, employee data, customer data and operational records at all times.

### Not Assigned As Bespoke UCM Property

- Open-source software, which remains governed by its original licence.
- Third-party platforms such as GitHub, optional hosting providers, email, payment or identity providers.
- Stock media, fonts, models or datasets governed by third-party terms.
- General engineering knowledge, methods and independently developed reusable tools not containing UCM confidential information.

A dependency and licence register must identify every non-UCM component before acceptance. No copyleft or source-disclosure dependency may be introduced into production without an explicit licence review.

## Build And Handover Model

### Build Phase

- Use private repositories dedicated only to UCM.
- Use fictional or synthetic records until the security and privacy gate passes.
- Keep development and staging separate from production.
- Keep secrets in the hosting platform or password manager, never in Git.
- Record architecture decisions, dependencies and deployment changes as the products are built.
- Demonstrate completed milestones to Carlos and record acceptance or corrective actions.

### Handover Phase

- Carlos creates the UCM GitHub organisation, prepares the UCM local server or chosen hosting account, and creates the password vault and named administrator accounts.
- Transfer each private repository with complete commit history.
- Recreate or transfer staging and production services onto the UCM local server or chosen UCM-controlled host.
- Move domain and DNS control to UCM-controlled accounts.
- Rotate every production credential after transfer so the final values are known to UCM.
- Deliver database migrations, backup and tested restoration procedures.
- Deliver administrator, support, incident, release and rollback runbooks.
- Train Carlos and at least one backup UCM administrator.
- Remove delivery-team owner access after the agreed support transition; retain only the support role UCM authorises.

## Product Separation

| Product | Primary users | Sensitive records | Production boundary |
| --- | --- | --- | --- |
| UCM Workforce | Employees, supervisors, HR, payroll and operations | HR, pay outputs, training, certificates and assigned work | Dedicated private repository, identity rules and employee-data access controls |
| UCM Commercial CRM | Sales, management, operations and authorised marketing users | Leads, contacts, quotes, contracts, margins, renewals and compliance | Dedicated private repository and commercial-data permissions |
| UCM Client App | Customers and authorised client contacts | Quotes, bookings, sites, tickets, documents and Proof Passports | Dedicated private repository with strict tenant isolation |

The applications may use approved APIs later, but they do not share browser storage, unrestricted database access or a single universal administrator role.

## Acceptance Standard

Handover is complete only when UCM can independently:

- Access and administer all repositories, deployments, domains and service accounts.
- Build, test, deploy, roll back and restore each product from documented instructions.
- Add, suspend and remove users and delivery partners.
- Export UCM data in an agreed usable format.
- Review access history and respond to a security incident.
- Replace the delivery team without losing the products or their operating knowledge.
- Verify the dependency licences and written IP assignment.

## Delivery Sequence

1. Agree and sign the IP, confidentiality, payment, acceptance, support and warranty terms.
2. Create the three private delivery repositories.
3. Finish the Workforce design and functional prototype.
4. Build Workforce authentication and role controls, then complete a synthetic-data pilot.
5. Finish the CRM operating model and functional product.
6. Build the Client App around CleanScope, quote status and Proof Passport.
7. Complete independent security, access-isolation and recovery testing for each product.
8. Create the UCM-owned organisation, hosting workspace and administrator accounts.
9. Transfer repositories and environments, rotate credentials and connect UCM domains.
10. Train UCM administrators, obtain signed acceptance and begin the support period.
