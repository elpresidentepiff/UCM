# UCM Commercial CRM Private Build And Handover

## Product Rule

The CRM is UCM's internal commercial operating system. It is not the website, employee app or customer interface. The current `app/crm` build is a fictional, non-persistent demonstration. Production CRM development moves to a dedicated private repository and remains free of real client data until access controls and governance pass testing.

## Production Scope

- Leads, organisations, contacts, sites and source attribution.
- Qualification, site surveys, quote versions, decisions and follow-up.
- Contracts, recurring revenue, renewals, expansion opportunities and account risk.
- Commercial tasks, complaints, service issues and named ownership.
- Compliance evidence status, expiries and responsible owners.
- Campaign and content attribution through qualified lead and contract outcomes.
- Approved links to accounting, Workforce, Client App and Media Engine records without duplicating unrestricted data.

## Build Order

1. Confirm the sales stages, required fields, owners and stage-entry rules.
2. Confirm quote, approval, contract and renewal workflows.
3. Define employee roles and field-level restrictions for values, margins and personal data.
4. Design the private data model and audit history.
5. Add authentication and server-side authorisation.
6. Build lead, pipeline, account, site, quote, contract, renewal and task modules.
7. Add import, duplicate detection, retention and deletion controls.
8. Add reports for response time, conversion, recurring revenue, retention and attribution.
9. Test with synthetic records, then a minimum approved pilot dataset.
10. Complete the UCM ownership handover and administrator training.

## CRM Handover Pack

- Private repository and complete history.
- Data dictionary, schema migrations and integration contracts.
- User-role and field-permission matrix.
- Import/export procedures and a verified UCM data export.
- Deployment, rollback, backup and restoration runbooks.
- Sales-stage and quote operating procedures.
- Dependency and licence register.
- Security test results and outstanding-risk register.
- Administrator training and support escalation routes.

## Production Gate

No live lead or client data enters the CRM until UCM names the data owner, approves minimum fields and retention, configures authentication, passes user-isolation tests and confirms the relationship with accounting and field-service systems.
