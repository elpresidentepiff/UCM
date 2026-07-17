(function () {
  "use strict";

  const initialData = {
    opportunities: [
      { id: "opp-1", name: "Demo: Canary Wharf office portfolio", stage: "quote", service: "office", value: 28800, probability: 60, owner: "Carlos", next: "Review scope and send version 2", source: "LinkedIn", due: "Today", sites: 3, risk: "Evening access and TUPE position require confirmation" },
      { id: "opp-2", name: "Demo: Wembley managed blocks", stage: "survey", service: "property", value: 21600, probability: 40, owner: "Operations", next: "Complete two-site survey", source: "Referral", due: "18 Jul", sites: 2, risk: "Waste and caretaker responsibilities unclear" },
      { id: "opp-3", name: "Demo: Royal Docks handover programme", stage: "qualified", service: "handover", value: 12000, probability: 25, owner: "Sales", next: "Confirm monthly unit volume", source: "Google", due: "19 Jul", sites: 1, risk: "Volume and minor-works boundary not verified" },
      { id: "opp-4", name: "Demo: City technical clean", stage: "negotiation", service: "technical", value: 18000, probability: 75, owner: "Carlos", next: "Agree security and shutdown method", source: "Historic network", due: "Today", sites: 1, risk: "Named client and site details must remain confidential" }
    ],
    accounts: [
      { name: "Demo: East London Workspace", buyer: "Facilities manager", sites: 2, service: "Office cleaning", health: "good", next: "Propose quarterly Building Health Report" },
      { name: "Demo: North London Property Group", buyer: "Property manager", sites: 4, service: "Communal property care", health: "watch", next: "Resolve repeated bin-store issue" },
      { name: "Demo: Central London Landlord", buyer: "Asset manager", sites: 1, service: "Handover Complete", health: "risk", next: "Re-scope response SLA before renewal" }
    ],
    contracts: [
      { name: "Demo: Workspace daily clean", service: "Office cleaning", value: 36000, renewal: "30 Sep 2026", status: "active", owner: "Carlos", action: "Prepare quality and value review by 31 August." },
      { name: "Demo: Managed block care", service: "Property care", value: 24400, renewal: "15 Aug 2026", status: "due", owner: "Operations", action: "Book client review and close two open issues." },
      { name: "Demo: Technical support schedule", service: "Technical cleaning", value: 18000, renewal: "31 Dec 2026", status: "active", owner: "Carlos", action: "Confirm approved evidence for specialist case study." }
    ],
    compliance: [
      { control: "COSHH assessments and SDS register", applies: "Products and cleaning tasks", owner: "H&S lead", status: "due", review: "31 Jul 2026", evidence: "Product inventory, current SDS, task assessment and worker briefing" },
      { control: "Site RAMS and method controls", applies: "Each scoped site/task", owner: "Operations", status: "evidence", review: "Before mobilisation", evidence: "Site-specific risk assessment, method and approval record" },
      { control: "Insurance schedule", applies: "Company and contract requirements", owner: "Director", status: "good", review: "Evidence date not loaded", evidence: "Current certificate and limits verified before public use" },
      { control: "Training and PPE matrix", applies: "Assigned workers and tasks", owner: "Operations", status: "due", review: "Monthly", evidence: "Training date, competency, issue record and task requirement" },
      { control: "Waste duty and transfer records", applies: "Where UCM controls or transports waste", owner: "Operations", status: "evidence", review: "Per service model", evidence: "Responsibility, carrier status, transfer note and authorised destination" },
      { control: "Data protection and retention", applies: "CRM and customer app", owner: "Data owner", status: "missing", review: "Before live CRM", evidence: "Purpose, lawful basis, minimum fields, access, retention and deletion rules" }
    ],
    carbon: [
      { action: "Route and zone planning", measure: "Miles, vehicle and fuel/activity data", status: "evidence", evidence: "Baseline period not started", next: "Agree mileage capture before claiming a reduction" },
      { action: "Correct product dosing", measure: "Concentrate used per service unit", status: "due", evidence: "Product and dosing list required", next: "Record product, dilution and site usage" },
      { action: "Reusable and lower-waste systems", measure: "Disposable items purchased and avoided", status: "evidence", evidence: "No verified baseline", next: "Select one site for a controlled comparison" },
      { action: "Equipment energy use", measure: "Equipment rating and operating hours", status: "missing", evidence: "No equipment register", next: "Create equipment inventory and service-hour estimate" },
      { action: "Client waste separation support", measure: "Site waste streams and contamination observations", status: "watch", evidence: "Site responsibility varies", next: "Add waste arrangement to every site survey" }
    ],
    tasks: [
      { id: "task-1", title: "Follow up Canary Wharf quote version 2", owner: "Carlos", due: "Today", done: false },
      { id: "task-2", title: "Verify current insurance evidence for tender use", owner: "Director", due: "Today", done: false },
      { id: "task-3", title: "Schedule managed block renewal review", owner: "Operations", due: "Today", done: false },
      { id: "task-4", title: "Approve founder introduction script evidence", owner: "Carlos", due: "19 Jul", done: false },
      { id: "task-5", title: "Define minimum CRM fields and retention periods", owner: "Data owner", due: "Before production", done: false }
    ]
  };

  let data = structuredClone(initialData);
  let selectedOpportunity = null;

  const labels = {
    stage: { qualified: "Qualified", survey: "Site survey", quote: "Quote", negotiation: "Negotiation" },
    service: { office: "Office cleaning", property: "Property care", handover: "Handover Complete", technical: "Technical cleaning" }
  };

  function money(value) {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);
  }

  function showToast(message) {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.hidden = false;
    window.setTimeout(() => { toast.hidden = true; }, 2400);
  }

  function renderMetrics() {
    const total = data.opportunities.reduce((sum, item) => sum + item.value, 0);
    const weighted = data.opportunities.reduce((sum, item) => sum + item.value * item.probability / 100, 0);
    document.querySelector("#pipelineValue").textContent = money(total);
    document.querySelector("#weightedValue").textContent = money(weighted);
    document.querySelector("#renewalCount").textContent = String(data.contracts.filter((item) => item.status === "due").length);
    document.querySelector("#complianceCount").textContent = String(data.compliance.filter((item) => item.status !== "good").length);
  }

  function renderOpportunities() {
    const stage = document.querySelector("#stageFilter").value;
    const service = document.querySelector("#serviceFilter").value;
    const filtered = data.opportunities.filter((item) => (stage === "all" || item.stage === stage) && (service === "all" || item.service === service));
    document.querySelector("#opportunityRows").innerHTML = filtered.length ? filtered.map((item) => `
      <tr>
        <td><button class="row-button" type="button" data-opportunity="${item.id}">${item.name}</button></td>
        <td><span class="status ${item.stage}">${labels.stage[item.stage]}</span></td>
        <td>${labels.service[item.service]}</td>
        <td class="money">${money(item.value)}</td>
        <td>${item.owner}</td>
        <td>${item.next}<br><small>${item.due}</small></td>
        <td>${item.source}</td>
      </tr>`).join("") : '<tr><td colspan="7" class="empty">No demonstration opportunities match these filters.</td></tr>';
    document.querySelectorAll("[data-opportunity]").forEach((button) => button.addEventListener("click", () => openOpportunity(button.dataset.opportunity)));
  }

  function openOpportunity(id) {
    const item = data.opportunities.find((opportunity) => opportunity.id === id);
    if (!item) return;
    selectedOpportunity = id;
    const detail = document.querySelector("#opportunityDetail");
    detail.innerHTML = `
      <div class="detail-head"><div><p class="eyebrow">Fictional opportunity</p><h3>${item.name}</h3><p>${labels.service[item.service]} across ${item.sites} site${item.sites === 1 ? "" : "s"}.</p></div><span class="status ${item.stage}">${labels.stage[item.stage]}</span></div>
      <div class="detail-grid">
        <div><span>Potential value</span><strong>${money(item.value)}</strong></div>
        <div><span>Probability</span><strong>${item.probability}%</strong></div>
        <div><span>Owner</span><strong>${item.owner}</strong></div>
        <div><span>Source</span><strong>${item.source}</strong></div>
        <div><span>Next action</span><strong>${item.next}</strong></div>
        <div><span>Due</span><strong>${item.due}</strong></div>
        <div><span>Commercial risk</span><strong>${item.risk}</strong></div>
        <div><span>Data status</span><strong>Demonstration only</strong></div>
      </div>
      <div class="detail-actions"><label for="detailStage">Move demonstration stage <select id="detailStage"><option value="qualified">Qualified</option><option value="survey">Site survey</option><option value="quote">Quote</option><option value="negotiation">Negotiation</option></select></label><button id="saveOpportunity" type="button">Save temporary change</button></div>`;
    detail.hidden = false;
    document.querySelector("#detailStage").value = item.stage;
    document.querySelector("#saveOpportunity").addEventListener("click", saveOpportunity);
    detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function saveOpportunity() {
    const item = data.opportunities.find((opportunity) => opportunity.id === selectedOpportunity);
    if (!item) return;
    item.stage = document.querySelector("#detailStage").value;
    renderOpportunities();
    renderMetrics();
    openOpportunity(item.id);
    showToast("Temporary demonstration stage updated.");
  }

  function renderAccounts() {
    document.querySelector("#accountRows").innerHTML = data.accounts.map((item) => `
      <tr><td><strong>${item.name}</strong></td><td>${item.buyer}</td><td>${item.sites}</td><td>${item.service}</td><td><span class="status ${item.health}">${item.health}</span></td><td>${item.next}</td></tr>`).join("");
  }

  function renderContracts() {
    document.querySelector("#contractRows").innerHTML = data.contracts.map((item) => `
      <div class="contract-row"><div><strong>${item.name}</strong><small>${item.service}</small></div><div><small>Annual value</small><strong>${money(item.value)}</strong></div><div><small>Renewal</small><strong>${item.renewal}</strong></div><div><span class="status ${item.status}">${item.status}</span><small>${item.owner}</small></div><p>${item.action}</p></div>`).join("");
  }

  function renderCompliance() {
    document.querySelector("#complianceRows").innerHTML = data.compliance.map((item) => `
      <tr><td><strong>${item.control}</strong></td><td>${item.applies}</td><td>${item.owner}</td><td><span class="status ${item.status}">${item.status}</span></td><td>${item.review}</td><td>${item.evidence}</td></tr>`).join("");
  }

  function renderCarbon() {
    document.querySelector("#carbonRows").innerHTML = data.carbon.map((item) => `
      <div class="action-row"><div><strong>${item.action}</strong><p>${item.next}</p></div><div><span class="status ${item.status}">${item.status}</span></div><div><small>Measure</small><strong>${item.measure}</strong></div><div><small>Evidence</small><strong>${item.evidence}</strong></div></div>`).join("");
  }

  function renderTasks() {
    document.querySelector("#taskRows").innerHTML = data.tasks.map((item) => `
      <label class="task-row ${item.done ? "completed" : ""}"><input type="checkbox" data-task="${item.id}" ${item.done ? "checked" : ""}><strong>${item.title}</strong><span>${item.owner}</span><small>${item.due}</small></label>`).join("");
    document.querySelectorAll("[data-task]").forEach((checkbox) => checkbox.addEventListener("change", () => {
      const task = data.tasks.find((item) => item.id === checkbox.dataset.task);
      if (task) task.done = checkbox.checked;
      renderTasks();
    }));
  }

  function renderAll() {
    renderMetrics();
    renderOpportunities();
    renderAccounts();
    renderContracts();
    renderCompliance();
    renderCarbon();
    renderTasks();
  }

  document.querySelector("#stageFilter").addEventListener("change", renderOpportunities);
  document.querySelector("#serviceFilter").addEventListener("change", renderOpportunities);
  document.querySelector("#resetDemo").addEventListener("click", () => {
    data = structuredClone(initialData);
    selectedOpportunity = null;
    document.querySelector("#opportunityDetail").hidden = true;
    renderAll();
    showToast("Demonstration records reset.");
  });
  document.querySelectorAll(".sidebar nav a").forEach((link) => link.addEventListener("click", () => {
    document.querySelectorAll(".sidebar nav a").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  }));

  renderAll();
})();
