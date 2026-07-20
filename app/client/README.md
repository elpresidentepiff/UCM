# UCM Client App

Status: installable fictional demonstration implemented; authentication, persistence and secure customer media are not connected.

The Client App gives UCM customers one interface for requesting, understanding, managing and verifying services. It remains separate from the public website, internal CRM and Workforce app.

## Demonstration Capabilities

- Client service overview and next-booking status.
- CleanScope guided quote request with service, site, urgency and scope details.
- Local-only photo/video selection, previews, limits and explicit scoping permission.
- Human-reviewed quote journey and illustrative approval controls.
- Upcoming bookings and schedule-change demonstration.
- Proof Passport completion record and evidence-control explanation.
- Controlled document centre and fictional sample downloads.
- Human-support and temporary ticket demonstrations.
- Responsive desktop/mobile layout, PWA manifest and offline shell.

No customer information is stored. CleanScope files remain in browser memory and are not uploaded. Every visible customer, organisation, quote, booking, document, ticket and service record is fictional.

## Run Directly

```powershell
cd app/client
npm start
```

Open `http://127.0.0.1:3000/`.

## Run In The UCM Local Stack

From the repository root:

```powershell
docker compose --env-file deploy/local/.env.example -f deploy/local/compose.yml up --build -d
```

Open `http://127.0.0.1:8080/client/`.

## Production Gate

Production development will use a dedicated private UCM delivery repository. Authentication, server-side authorisation, strict tenant isolation, encrypted storage, audit logs, deletion, backup restoration and independent cross-customer access testing must pass before real accounts or media are accepted.

The implementation follows:

- [Customer Hub Blueprint](../../growth/strategy/customer-hub-blueprint.md)
- [Client App Private Build And Handover](../../growth/strategy/ucm-client-app-private-build-and-handover.md)
- [UCM Proprietary Product Delivery And Handover](../../growth/strategy/ucm-proprietary-product-delivery-and-handover.md)
