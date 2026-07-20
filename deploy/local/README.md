# UCM Local Deployment

## Current Scope

This stack runs the fictional UCM Workforce prototype locally with Docker Compose and Caddy. It does not include authentication, PostgreSQL, customer data, employee data or document storage. Those services enter the private production build only after UCM approves the data model, roles and security controls.

## Start

From the repository root:

```powershell
docker compose --env-file deploy/local/.env.example -f deploy/local/compose.yml up --build -d
```

Open `http://127.0.0.1:8080/` and check `http://127.0.0.1:8080/health`.

## Stop

```powershell
docker compose --env-file deploy/local/.env.example -f deploy/local/compose.yml down
```

## Verify

```powershell
docker compose --env-file deploy/local/.env.example -f deploy/local/compose.yml ps
docker compose --env-file deploy/local/.env.example -f deploy/local/compose.yml logs --tail 100
```

## Network Rule

The demonstration binds only to `127.0.0.1`; other devices cannot connect. Do not change this to `0.0.0.0` as an improvised production release.

For authorised phone testing on a local network, configure a named test host and trusted HTTPS certificate. For production, use an approved UCM domain, Caddy HTTPS, authentication, a firewall and either a UCM VPN for Workforce/CRM or a separately secured public boundary for the Client App.

## Planned Private Stack

The production local system will add, after approval:

- PostgreSQL for application records.
- Authentik for identity, MFA and application access.
- Encrypted private filesystem storage for documents and evidence.
- Encrypted scheduled backups and restoration tests.
- Monitoring, audit logs and administrator alerts.
- Separate application services and database roles for Workforce, CRM and Client App.

Production secrets belong in the UCM password vault and local environment files excluded from Git. Real employee or customer data is prohibited in this demonstration stack.
