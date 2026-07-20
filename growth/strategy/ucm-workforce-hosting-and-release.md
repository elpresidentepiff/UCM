# UCM Workforce Hosting And Release Plan

## Decision

Use GitHub for source control, review and release history. Use Railway for protected staging and, once authentication and data governance are complete, the employee-facing web service. Do not use GitHub Pages for the real employee app because Pages is public static hosting and does not provide the application authentication or server-side authorisation required for HR and pay data.

Railway supports GitHub deployments, HTTPS, custom domains and pull-request preview environments. Railway services can also communicate with a future API and database over private networking rather than exposing those internal services publicly.

References:

- [Railway static hosting and custom domains](https://docs.railway.com/guides/static-hosting)
- [Railway GitHub autodeployments and Wait for CI](https://docs.railway.com/deployments/github-autodeploys)
- [Railway private networking](https://docs.railway.com/private-networking)
- [Railway health checks](https://docs.railway.com/deployments/healthchecks)

## Current Safe Release

The current application is a fictional demonstration. It may be deployed to a Railway staging URL so UCM can test design, navigation and phone installation. It must display the prototype warning and must not collect or import real employee information.

The staging deployment uses the runtime in `app/employee/`:

- `package.json` starts the Node static service.
- `server.js` listens on Railway's `PORT`, serves only the employee-app directory, applies baseline browser security headers and exposes `/health`.
- `railway.toml` declares the start command and health check.
- `manifest.webmanifest`, the branded icons and `service-worker.js` make the app installable.
- The service worker caches only the application shell. It does not cache future APIs, payslips, HR documents or employee records.

## Railway Staging Setup

1. Push an approved employee-app checkpoint to GitHub.
2. In Railway, create a service from `elpresidentepiff/UCM`.
3. Set the service root directory to `/app/employee`.
4. Use a staging branch initially rather than production `main` autodeployment.
5. Confirm Railway detects `npm start` or use the command from `railway.toml`.
6. Set the health-check path to `/health` and generate a Railway domain.
7. Test installation, offline shell behaviour and every supported phone size.
8. Keep the demonstration warning and fictional records until the secure backend is approved.

Railway automatically supplies HTTPS for its generated domain. A later custom domain should be `staff.ucmservices.co.uk`, with both the CNAME and verification record configured as Railway instructs.

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

`Phone PWA -> Railway web service -> authenticated API -> dedicated employee database/private storage`

Only the web service is public. The API and database should use Railway private networking where practical. The payroll system remains the source of truth; Workforce displays authorised outputs and sends controlled queries.

## Release Environments

| Environment | Data | Audience | Deployment |
| --- | --- | --- | --- |
| Local | Fictional | Developers and UCM reviewers | Manual local server |
| Railway staging | Fictional or synthetic | Named UCM testers | GitHub staging branch |
| Production pilot | Minimum verified employee data | Small authorised employee group | Protected production release |
| Production | Approved operational data | Authorised UCM workforce | Controlled release after pilot |

## Immediate Next Actions

1. Test the installable PWA locally and on a Railway staging URL.
2. Decide the employee identity and authentication provider.
3. Confirm UCM's payroll, HR, rota, training and certificate sources of truth.
4. Define the minimum employee record and role matrix.
5. Build authentication and server-side access controls before importing real data.
