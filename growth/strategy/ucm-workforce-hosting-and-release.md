# UCM Workforce Hosting And Release Plan

## Decision

Use GitHub for source control, review and release history. Use a UCM-controlled local Docker server as the default deployment target. Railway, Supabase and other managed platforms remain optional alternatives, not dependencies. Do not use GitHub Pages for the real employee app because Pages is public static hosting and does not provide the application authentication or server-side authorisation required for HR and pay data.

Workforce will be completed in a private repository dedicated to UCM using fictional or synthetic data. At acceptance, the private repository, deployment, domains, credentials and documentation transfer to UCM-owned accounts. Carlos becomes an owner or administrator; delivery partners retain only the support access UCM authorises. See [UCM Client Ownership And Access Setup](ucm-client-ownership-and-access-setup.md) and [UCM Proprietary Product Delivery And Handover](ucm-proprietary-product-delivery-and-handover.md).

The local stack uses Docker Compose for repeatable services and Caddy as the gateway. The production build later adds PostgreSQL, authentication, private storage, monitoring and encrypted backups after governance approval.

References:

- [Docker Compose installation](https://docs.docker.com/compose/install/)
- [Caddy reverse proxy](https://caddyserver.com/docs/quick-starts/reverse-proxy)
- [PostgreSQL backup and restore](https://www.postgresql.org/docs/current/backup.html)
- [Authentik Docker Compose installation](https://docs.goauthentik.io/install-config/install/docker-compose/)

## Current Safe Release

The current application is a fictional demonstration. It may be deployed to the local Docker stack so UCM can test design and navigation. It must display the prototype warning and must not collect or import real employee information.

The staging deployment uses the runtime in `app/employee/`:

- `package.json` starts the Node static service.
- `server.js` listens on the configured `PORT`, serves only the employee-app directory, applies baseline browser security headers and exposes `/health`.
- `Dockerfile` packages the service as a non-root application container.
- `manifest.webmanifest`, the branded icons and `service-worker.js` make the app installable.
- The service worker caches only the application shell. It does not cache future APIs, payslips, HR documents or employee records.

## Local Docker Staging Setup

1. Move the approved Workforce checkpoint into its dedicated private delivery repository.
2. Install Docker Engine and Docker Compose on the UCM test server.
3. Start the stack from `deploy/local/compose.yml`.
4. Confirm the Workforce container is healthy and the gateway returns `/health`.
5. Keep the gateway bound to localhost during developer testing.
6. Configure a trusted HTTPS hostname before testing phone installation over the local network.
7. Test installation, offline shell behaviour and every supported phone size.
8. Keep the demonstration warning and fictional records until the secure backend is approved.

A production hostname should be `staff.ucmservices.co.uk`. Workforce and CRM may be restricted through a UCM VPN; the Client App requires a separately secured public boundary.

## Phone Installation

### iPhone And iPad

1. Open the HTTPS staging or production URL in Safari.
2. Tap Share.
3. Tap Add to Home Screen.
4. Confirm the UCM Workforce name and icon.

### Android

1. Open the HTTPS URL in Chrome.
2. Tap the install button in UCM Workforce or Chrome's Install app option.
3. Confirm installation.

The installed PWA opens full-screen and can retain the static interface shell for poor-connectivity situations. Sensitive employee content must still require a valid session and should not be persisted offline by default.

## Production Gate

Do not cross this gate until UCM approves:

- Employee identity provider and multi-factor authentication for privileged roles.
- Employee, supervisor, operations, HR and payroll permissions.
- Server-side authorisation for every request; hiding a screen is not security.
- Dedicated UCM database and private document storage.
- Data purposes, lawful bases, privacy notice, retention and deletion rules.
- Audit history for access, downloads, changes, approvals and exports.
- Joiner, mover and leaver access process.
- Backup restoration, incident response and breach handling.
- Independent access tests proving employees cannot read other employees' records.

## Target Architecture

`Phone PWA -> Caddy HTTPS/VPN -> Workforce service -> authenticated API -> dedicated employee database/private storage`

Only an approved gateway is reachable. Application services and PostgreSQL remain on a private Docker network. The payroll system remains the source of truth; Workforce displays authorised outputs and sends controlled queries.

## Release Environments

| Environment | Data | Audience | Deployment |
| --- | --- | --- | --- |
| Local | Fictional | Developers and UCM reviewers | Manual local server |
| Local Docker staging | Fictional or synthetic | Named UCM testers | Private GitHub staging branch |
| Production pilot | Minimum verified employee data | Small authorised employee group | Protected production release |
| Production | Approved operational data | Authorised UCM workforce | Controlled release after pilot |

## Immediate Next Actions

1. Create the dedicated private UCM Workforce delivery repository.
2. Move the approved prototype into it and deploy the fictional local Docker build.
3. Decide the employee identity and authentication provider.
4. Confirm UCM's payroll, HR, rota, training and certificate sources of truth.
5. Define the minimum employee record and role matrix.
6. Build authentication and server-side access controls before importing real data.
7. Prepare Carlos's UCM ownership accounts and complete the transfer at acceptance.

Commercial allowances are in [UCM Local System Cost Proposal](../commercial/ucm-local-system-cost-proposal.md).
