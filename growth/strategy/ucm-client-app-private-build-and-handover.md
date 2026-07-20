# UCM Client App Private Build And Handover

## Product Rule

The Client App is the secure customer interface. It is not the public marketing website and must never expose CRM notes, margins, employee HR records, unapproved site media or another customer's information. The production app will be built in a dedicated private repository and handed to UCM with its deployment and operating controls.

## First Release

- Secure customer registration, invitation and account recovery.
- Service and postcode eligibility.
- CleanScope photo/video enquiry with explicit upload permission.
- Human-reviewed quote and approval status.
- Booking and recurring schedule view.
- Proof Passport completion records and approved evidence.
- Documents, support tickets and human contact routes.
- Rebooking, feedback and genuine review prompts.

## Later Release

- Multi-site property and facilities-management accounts.
- Handover Complete workflows.
- Care-plan reporting and Building Health Reports.
- Online approvals and payments after financial controls are agreed.
- Controlled maintenance tickets and service upgrades.

## Build Order

1. Define customer types, account ownership and invitation rules.
2. Define site, quote, booking, ticket, document and Proof Passport permissions.
3. Design strict tenant isolation so one customer can never access another customer's records.
4. Add authentication, account recovery and server-side authorisation.
5. Build CleanScope and the human review/quote-status journey.
6. Build bookings, evidence, documents and support tickets.
7. Add consent, retention, export and account-closure workflows.
8. Run automated and independent cross-customer isolation tests.
9. Pilot with a small number of approved UCM customers.
10. Complete the UCM ownership handover and administrator training.

## Client App Handover Pack

- Private repository and complete history.
- Customer-role, organisation and site-access matrix.
- Data dictionary, migrations and API contracts.
- Media-consent and Proof Passport rules.
- Customer support, account recovery and incident procedures.
- Deployment, rollback, backup and tested restoration instructions.
- Dependency and licence register.
- Accessibility, browser, mobile and security test results.
- Administrator training and customer-pilot findings.

## Production Gate

No live customer account, address, site media, booking or document is loaded until authentication, tenant isolation, private storage, audit logging, deletion, backup restoration and incident procedures pass testing.
