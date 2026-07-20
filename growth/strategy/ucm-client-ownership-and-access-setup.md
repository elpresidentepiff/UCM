# UCM Client Ownership And Access Setup

## Decision

Build proprietary Workforce, CRM and Client App products for UCM, then transfer their private repositories, production services, billing, domains, credentials and recovery access to Carlos under a formal handover. No live UCM system may remain dependent on a developer's personal account after acceptance.

The current prototypes contain fictional demonstration data and no production backend. They can inform the private builds, but the existing public repository must not be treated as secret proprietary production source. Follow [UCM Proprietary Product Delivery And Handover](ucm-proprietary-product-delivery-and-handover.md).

Supabase remains paused. No database provider should be connected until the relevant product's identity model, access roles, privacy requirements and sources of truth are agreed. The public website, Workforce app, CRM and Client App are separate products even if they later share approved integrations.

## Ownership Model After Handover

| Asset | UCM owner | Delivery access | Rule |
| --- | --- | --- | --- |
| GitHub organisation and repository | Carlos plus one UCM backup owner | Maintainer or write | UCM controls source, releases and removal of access |
| Hosting server and billing | Carlos or UCM finance/admin | Time-limited administrator access when required | Production runs on UCM-owned hardware or a UCM-controlled hosting account |
| Domain and DNS | UCM company account | Limited DNS access when required | Use `staff.ucmservices.co.uk` for Workforce |
| Company email | UCM | Named individual accounts | No shared personal logins |
| Password manager | UCM | Role-based shared vaults | No secrets in Git, chat or documentation |
| Employee identity and MFA | UCM | Configuration access during implementation | Privileged roles require MFA |
| Employee database and private files | UCM | Least privilege | No real data before authentication and authorisation pass testing |
| Payroll, HR, rota and training systems | UCM | Read/integration access only as approved | Existing operational systems remain sources of truth |
| Monitoring, backups and incident records | UCM | Operational access | UCM receives alerts and can restore without a developer |

## What Carlos Needs

### Accounts

- A named company email address controlled by Carlos, not a personal or agency address.
- A GitHub account with two-factor authentication enabled.
- A UCM GitHub organisation with Carlos and one trusted UCM backup owner.
- A UCM-owned local server or UCM-controlled hosting account, with named administrators and company billing where applicable.
- Access to the registrar and DNS account for `ucmservices.co.uk`.
- A UCM-owned password manager vault for recovery codes, API keys and service credentials.

### Business Decisions

- Legal company name, registered address, company number and data-protection contact.
- Approximate employee count, work locations, departments, managers and employment types.
- The first five to ten pilot employees and the manager responsible for the pilot.
- Which features enter the first release: shifts, training, certificates, leave, documents, pay visibility, expenses, incidents and announcements.
- The current payroll, HR, rota, timekeeping, training and certificate systems, including who owns each system.
- Pay frequency, cut-off dates, leave rules, sickness process, certificate expiry rules and approval responsibilities.
- Which information may be visible to employees, supervisors, operations, HR, payroll and administrators.
- Approved UCM policies, privacy notice, employee handbook, training material and certificate templates.

## Recommended Access Roles

| Role | Intended access |
| --- | --- |
| Employee | Own shifts, training, certificates, requests, approved documents and pay outputs only |
| Supervisor | Assigned teams and sites; no unrestricted pay or HR access |
| Operations | Scheduling, attendance, site operations and service issues |
| HR | Employee records, documents, leave and controlled case management |
| Payroll | Pay inputs and outputs required for payroll work |
| System administrator | Configuration and access administration; no automatic right to read every HR document |
| UCM owner | Governance, billing, recovery and approved reporting |
| Delivery partner | Time-limited technical access with no routine production-data access |

Roles are enforced by the server and database, not by hiding screens in the browser.

## Transfer Sequence

1. Create three private delivery repositories dedicated exclusively to UCM Workforce, CRM and Client App.
2. Build and review each product with fictional or synthetic data only.
3. Complete functional, security, role-isolation, backup and restoration testing.
4. Carlos creates the UCM GitHub organisation and enables two-factor authentication requirements.
5. Carlos prepares the UCM local server or chosen hosting account, password vault and named administrator accounts.
6. Transfer the three private repositories with their complete histories and acceptance records.
7. Recreate or transfer staging and production services onto the UCM local server or chosen UCM-controlled host.
8. Rotate credentials, connect the approved UCM subdomains and verify monitoring and recovery access.
9. Train Carlos and a UCM backup administrator, then remove unnecessary delivery-owner access.
10. Import only the approved pilot data, resolve pilot defects and obtain UCM approval before wider rollout.

## GitHub Transfer Checks

- The target organisation must not already contain repositories with the three agreed production names.
- Carlos must allow the transfer and the current repository administrator must initiate it.
- Confirm actions, deployment secrets and webhooks after each private repository transfer.
- Update every local clone to the new organisation URL even though GitHub provides repository redirects.
- Do not create a new repository at an old private delivery path after transfer because that can break redirects.
- Protect `main`, require reviewed changes for production code and prevent force pushes.

Official reference: [GitHub repository transfers](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository)

## Hosting Setup Checks

- UCM owns the physical server or hosting account, subscription and billing method.
- Carlos is an administrator; normal developers receive only the access required for delivery or support.
- The server, repositories and management interfaces remain private.
- Staging and production are separate environments with separate variables.
- Production secrets exist only in protected server variables or the UCM password manager.
- Health checks, deployment logs and spend alerts are visible to UCM.
- At least two UCM-controlled people can recover the account.

The current local deployment is documented in [`deploy/local/README.md`](../../deploy/local/README.md). Railway, Supabase or another managed platform may be selected later, but none is mandatory.

## Data Gate

Do not upload names, addresses, phone numbers, right-to-work records, contracts, certificates, absence records, disciplinary material, bank details, pay data or live schedules until all of the following are complete:

- UCM privacy and retention decisions are documented.
- Authentication works and privileged users use MFA.
- Every endpoint checks the user's role and record ownership server-side.
- Private files are inaccessible by public URL.
- Employee-to-employee isolation tests pass.
- Audit logging, backup restoration and joiner/mover/leaver procedures are tested.
- Carlos signs off the production pilot.

## Handover Acceptance

UCM is operationally independent only when Carlos can:

- Access GitHub, the local server or selected host, DNS, monitoring and the password manager.
- Add and remove a delivery partner without losing the system.
- View billing and change the payment method.
- Deploy or roll back an approved release.
- Add, suspend and remove an employee account.
- Produce an access audit and complete a tested restore.
- Contact named support routes without relying on one developer.

That is the standard: UCM owns the company system; specialists help build and operate it.
