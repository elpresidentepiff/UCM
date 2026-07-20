# UCM Client Ownership And Access Setup

## Decision

Build production in UCM-owned accounts from this point forward. Do not keep the live employee system, billing, domain, production data or recovery access inside a developer's personal account.

The current prototype can be transferred without rebuilding it. It contains fictional demonstration data and no backend. Transfer it now, while the move is simple, then continue development with UCM as owner and the delivery team as invited collaborators.

Supabase remains paused. No database provider should be connected until the employee identity model, access roles, privacy requirements and actual sources of truth are agreed. The public website, employee app and future CRM are separate products even if they later share approved integrations.

## Ownership Model

| Asset | UCM owner | Delivery access | Rule |
| --- | --- | --- | --- |
| GitHub organisation and repository | Carlos plus one UCM backup owner | Maintainer or write | UCM controls source, releases and removal of access |
| Railway workspace and billing | Carlos or UCM finance/admin | Member; admin only when operationally required | Staging and production live in the UCM workspace |
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
- A UCM Railway workspace with UCM billing details and two-factor authentication enforced where the selected plan permits it.
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

1. Carlos creates the UCM GitHub organisation and enables two-factor authentication requirements.
2. Add the delivery team as collaborators and confirm Carlos plus a UCM backup person are owners.
3. Transfer `elpresidentepiff/UCM` to the organisation. Preserve the repository history and update local Git remotes after transfer.
4. Carlos creates the UCM Railway workspace and adds the delivery team with the minimum required role.
5. Create a Railway staging project from the transferred repository using `/app/employee` as the service root.
6. Keep staging on fictional data and confirm the install experience on Carlos's iPhone and an Android device.
7. Connect `staff.ucmservices.co.uk` only after the staging release passes review.
8. Select authentication and define the role matrix before selecting or creating the employee database.
9. Build and independently test server-side access controls.
10. Import only the minimum pilot data, run the pilot, resolve defects and obtain UCM approval before wider rollout.

## GitHub Transfer Checks

- The target organisation must not already contain a repository called `UCM`.
- Carlos must allow the transfer and the current repository administrator must initiate it.
- Confirm actions, deployment secrets, webhooks and GitHub Pages settings after transfer.
- Update every local clone to the new organisation URL even though GitHub provides repository redirects.
- Do not create a new repository at the old path after transfer because that can break redirects.
- Protect `main`, require reviewed changes for production code and prevent force pushes.

Official reference: [GitHub repository transfers](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository)

## Railway Setup Checks

- UCM owns the workspace, subscription and billing method.
- Carlos is an Admin; normal developers are Members or Deployers according to need.
- The project remains private.
- Staging and production are separate environments with separate variables.
- Production secrets exist only in Railway variables or the UCM password manager.
- Health checks, deployment logs and spend alerts are visible to UCM.
- At least two UCM-controlled people can recover the account.

Official references: [Railway workspaces and roles](https://docs.railway.com/projects/workspaces) and [Railway project transfer](https://docs.railway.com/projects)

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

- Access GitHub, Railway, DNS, monitoring and the password manager.
- Add and remove a delivery partner without losing the system.
- View billing and change the payment method.
- Deploy or roll back an approved release.
- Add, suspend and remove an employee account.
- Produce an access audit and complete a tested restore.
- Contact named support routes without relying on one developer.

That is the standard: UCM owns the company system; specialists help build and operate it.
