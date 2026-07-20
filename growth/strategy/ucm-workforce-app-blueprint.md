# UCM Workforce App Blueprint

## Product Decision

UCM Workforce is a separate employee-only product. It is not the public website, customer app, Commercial CRM, accounting system or Media Engine.

Its purpose is to give each employee one controlled place to see the information and actions needed for work: assigned shifts, site instructions, required safety acknowledgements, training, certificates, HR documents, leave, payslips, company communication and confidential support.

The first repository version is a fictional, non-persistent prototype. It proves the workflows and interface only. It must not hold real employee, payroll, identity, health, disciplinary, immigration or banking information.

## Users And Access

| Role | Permitted access |
| --- | --- |
| Employee | Own profile, shifts, documents, payslips, leave, learning, certificates, requests and approved site information |
| Supervisor | Assigned team availability, readiness and operational escalation; no unnecessary pay, medical or HR case details |
| Operations | Scheduling, site assignment, task competency, attendance exceptions and service issues |
| HR | Employment records, leave, policy acknowledgement, training administration and controlled employee changes |
| Payroll/finance | Minimum payroll output and query information; no unrestricted operational or HR-case access |
| System administrator | Technical administration without automatic permission to read sensitive employee content |

Access must be deny-by-default. A manager relationship alone does not justify access to all employee information.

## Employee Experience

### Home

- Next shift, team, broad location and service type.
- Urgent training, certificate, document and request actions.
- Hours, leave and learning summaries.
- Company announcements and confidential support entry point.

### Shifts And Field Work

- Approved schedule and assignment changes.
- Site instructions released only when operationally necessary.
- RAMS, COSHH, PPE and access acknowledgements.
- Clock-in/out with a non-location fallback and supervisor exception route.
- Checklist, issue, near-miss and equipment-defect reporting.
- Offline-safe task access for poor-connectivity sites in a later phase.

### HR And Profile

- Employment statement and current policies.
- Annual leave balance, requests and decisions.
- Controlled profile, emergency-contact and bank-detail change requests.
- Sickness notification and return-to-work workflow, with medical details restricted.
- Uniform, equipment, grievance, whistleblowing and support routes.

### Pay

- Payslips and authorised payroll summaries imported from the accounting/payroll source.
- Confidential query workflow.
- Masked payment-account reference.
- No payroll calculation, tax determination or unverified bank-detail change inside the app.

### Training And Certificates

- Required learning by role, site and task.
- Course progress, assessment outcome and refresher date.
- Certificate issue, expiry, evidence and verification status.
- Hard assignment block where a required competency is missing or expired.
- Supervisor cannot override a safety-critical competency without a defined authorised process.

## Data Classes

### Standard Operational

- Employee number, display name, role, team and manager.
- Shift, site assignment, task, completion and equipment issue.
- Training requirement, completion and certificate status.

### Confidential

- Address, personal contact, emergency contact, pay, bank reference and employment document.
- Leave reason, sickness record, HR request and identity-change evidence.

### Special Category Or Highly Restricted

- Health information, adjustments, occupational-health records, equality monitoring and biometric/location-derived attendance data.
- These require an explicit purpose, lawful basis, necessity assessment, restricted access, retention rule and audit trail before collection.

The app should not collect data merely because it may be useful later.

## Production Security Gates

Real employee data is prohibited until all of the following are approved:

1. A dedicated UCM backend and production owner.
2. Written record of purposes, lawful bases, privacy information and employee rights.
3. Data-protection impact assessment for monitoring, location, biometric or high-risk processing.
4. Multi-factor authentication for privileged roles and secure account recovery.
5. Row-level access so employees can read only their own personal records.
6. Field-level separation for pay, banking, health, right-to-work and HR cases.
7. Encryption in transit and at rest, private document storage and short-lived download links.
8. Immutable audit events for access, changes, downloads, approvals and exports.
9. Retention and deletion schedules by record type.
10. Joiner, mover and leaver access process with immediate revocation capability.
11. Tested backup, restoration, incident response and breach-management procedures.
12. Supplier contracts and security review for payroll, identity, training and notification integrations.

## System Boundaries

- **Accounting/payroll** remains the source of truth for payroll, tax, pension, payment and formal payslips. Workforce displays approved outputs and routes queries.
- **Commercial CRM** remains the source of truth for clients, sites, contracts and sales. Workforce receives only the approved assignment data an employee needs.
- **Field operations** can become a module inside Workforce for employees, but commercial notes, margins and unrelated customer records remain hidden.
- **Customer app** receives approved completion evidence, never employee HR or pay data.
- **Media Engine** receives no employee media or identity without recorded permission and campaign approval.

## Delivery Roadmap

### Phase 1: Workflow Prototype

- Validate employee journeys with Carlos, operations and a small employee group.
- Confirm terminology, contract types, pay cycles, leave rules, training matrix and escalation routes.
- Inventory current HR, payroll, scheduling, certificate and policy records.
- Decide which existing system remains authoritative for each record.

### Phase 2: Secure Foundation

- Create the dedicated UCM employee-data environment.
- Implement authentication, role mapping, row-level access, audit events and private document storage.
- Build test accounts for employee, supervisor, operations, HR and payroll roles.
- Complete privacy, retention, DPIA and incident-response controls before importing data.

### Phase 3: Employee Self-Service Pilot

- Launch profile, policies, announcements, leave, training and certificates to a small test group.
- Import only the minimum verified records.
- Run access tests proving one employee cannot access another employee's records.
- Measure login success, task completion, support requests and administrative time.

### Phase 4: Pay And Field Operations

- Integrate authorised payslip delivery without rebuilding payroll.
- Add scheduling, readiness, site instructions, time exceptions and issue reporting.
- Add offline access for assigned operational content.
- Pilot at one team or contract before company-wide release.

### Phase 5: Control And Improvement

- Add management reporting using aggregated workforce measures.
- Monitor certificate expiry, training completion, leave response and payroll-query resolution.
- Review permissions quarterly and after every role change.
- Improve only from employee feedback, operating evidence and measured outcomes.

## Success Measures

- Percentage of employees able to access the app without support.
- Training and certificate compliance by task and site.
- Leave-request response time.
- Payslip-delivery and payroll-query resolution time.
- Shift acknowledgement and readiness completion.
- Reduction in duplicated HR administration.
- Number and severity of access-control or privacy incidents.
- Employee satisfaction and confidence in how their information is handled.

The app succeeds when employees get reliable answers and complete necessary work more easily. It fails if UCM centralises sensitive information without the governance, ownership and security to protect it.
