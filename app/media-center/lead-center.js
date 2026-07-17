(function () {
  "use strict";

  const rows = document.querySelector("#leadRows");
  const emptyState = document.querySelector("#emptyState");
  const detailDrawer = document.querySelector("#detailDrawer");
  const toast = document.querySelector("#toast");
  let selectedId = null;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.setTimeout(() => { toast.hidden = true; }, 2600);
  }

  function dateTime(value) {
    if (!value) return "Not set";
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  }

  function filteredLeads() {
    const query = document.querySelector("#leadSearch").value.trim().toLowerCase();
    const status = document.querySelector("#statusFilter").value;
    const service = document.querySelector("#serviceFilter").value;
    return window.UCMHub.getLeads().filter((lead) => {
      const haystack = [lead.reference, lead.contactName, lead.organisationName, lead.postcode, lead.email].join(" ").toLowerCase();
      return (!query || haystack.includes(query))
        && (status === "all" || lead.status === status)
        && (service === "all" || lead.serviceCode === service);
    });
  }

  function renderMetrics(leads) {
    const open = leads.filter((lead) => !["won", "lost", "active"].includes(lead.status));
    const overdue = open.filter((lead) => !lead.respondedAt && new Date(lead.responseDueAt) < new Date());
    document.querySelector("#openCount").textContent = String(open.length);
    document.querySelector("#overdueCount").textContent = String(overdue.length);
    document.querySelector("#qualifiedCount").textContent = String(leads.filter((lead) => lead.status === "qualified").length);
    document.querySelector("#sourceCount").textContent = String(new Set(leads.map((lead) => lead.sourceChannel).filter(Boolean)).size);
  }

  function renderTable() {
    const allLeads = window.UCMHub.getLeads();
    const leads = filteredLeads();
    renderMetrics(allLeads);
    rows.innerHTML = leads.map((lead) => `
      <tr data-id="${escapeHtml(lead.id)}">
        <td><button class="table-link" type="button" data-open="${escapeHtml(lead.id)}">${escapeHtml(lead.reference)}</button>${lead.demo ? ' <span class="tag">Demo</span>' : ""}</td>
        <td><span class="status ${escapeHtml(lead.status)}">${escapeHtml(window.UCMHub.labels.status[lead.status] || lead.status)}</span></td>
        <td>${escapeHtml(window.UCMHub.labels.buyerType[lead.buyerType] || lead.buyerType)}</td>
        <td>${escapeHtml(window.UCMHub.labels.serviceCode[lead.serviceCode] || lead.serviceCode)}</td>
        <td>${escapeHtml(lead.postcode)}</td>
        <td>${escapeHtml(window.UCMHub.labels.urgency[lead.urgency] || lead.urgency)}</td>
        <td>${escapeHtml(lead.owner || "Unassigned")}</td>
        <td>${escapeHtml(lead.sourceChannel || "direct")}</td>
      </tr>
    `).join("");
    emptyState.hidden = leads.length !== 0;
    document.querySelector("#demoButton").textContent = allLeads.some((lead) => lead.demo) ? "Remove demonstration leads" : "Load demonstration leads";
    rows.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => openDetail(button.dataset.open)));
  }

  function detailRow(term, detail) {
    return `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(detail || "Not provided")}</dd></div>`;
  }

  function openDetail(id) {
    const lead = window.UCMHub.getLeads().find((item) => item.id === id);
    if (!lead) return;
    selectedId = id;
    document.querySelector("#detailReference").textContent = lead.reference;
    document.querySelector("#detailTitle").textContent = lead.organisationName || lead.contactName;
    const status = document.querySelector("#detailStatus");
    status.className = `status ${lead.status}`;
    status.textContent = window.UCMHub.labels.status[lead.status] || lead.status;
    document.querySelector("#detailSummary").innerHTML = [
      detailRow("Contact", `${lead.contactName} | ${lead.preferredContact}`),
      detailRow("Email", lead.email),
      detailRow("Phone", lead.phone),
      detailRow("Buyer", window.UCMHub.labels.buyerType[lead.buyerType]),
      detailRow("Service", window.UCMHub.labels.serviceCode[lead.serviceCode]),
      detailRow("Site", `${lead.postcode}${lead.propertyType ? ` | ${lead.propertyType}` : ""}`),
      detailRow("Scope", lead.scopeDetails),
      detailRow("Evidence", `${lead.files?.length || 0} files | scope consent ${lead.mediaConsent ? "confirmed" : "not confirmed"}`),
      detailRow("Source", `${lead.sourceChannel || "direct"} / ${lead.sourceCampaign || "unattributed"}`),
      detailRow("Completeness", `${lead.completenessScore || 0}%`),
      detailRow("Response due", dateTime(lead.responseDueAt))
    ].join("");
    document.querySelector("#editStatus").value = lead.status;
    document.querySelector("#editOwner").value = lead.owner || "";
    document.querySelector("#editNextAction").value = lead.nextAction || "";
    document.querySelector("#detailTimeline").innerHTML = (lead.events || []).map((event) => `<li><strong>${escapeHtml(event.note)}</strong><br><span>${escapeHtml(dateTime(event.createdAt))}</span></li>`).join("");
    detailDrawer.hidden = false;
    if (window.innerWidth < 900) detailDrawer.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function saveSelected() {
    if (!selectedId) return;
    const current = window.UCMHub.getLeads().find((lead) => lead.id === selectedId);
    if (!current) return;
    const status = document.querySelector("#editStatus").value;
    const owner = document.querySelector("#editOwner").value.trim() || "Unassigned";
    const nextAction = document.querySelector("#editNextAction").value.trim();
    const patch = { status, owner, nextAction };
    if (current.status === "new" && status !== "new" && !current.respondedAt) patch.respondedAt = new Date().toISOString();
    window.UCMHub.updateLead(selectedId, patch, `Stage ${current.status} -> ${status}; owner ${owner}`);
    renderTable();
    openDetail(selectedId);
    showToast("Lead updated.");
  }

  function exportCsv() {
    const leads = filteredLeads();
    if (!leads.length) return showToast("There are no matching leads to export.");
    const blob = new Blob([window.UCMHub.leadsToCsv(leads)], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ucm-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  ["#leadSearch", "#statusFilter", "#serviceFilter"].forEach((selector) => {
    document.querySelector(selector).addEventListener(selector === "#leadSearch" ? "input" : "change", renderTable);
  });
  document.querySelector("#closeDetail").addEventListener("click", () => { detailDrawer.hidden = true; selectedId = null; });
  document.querySelector("#saveLeadButton").addEventListener("click", saveSelected);
  document.querySelector("#exportButton").addEventListener("click", exportCsv);
  document.querySelector("#demoButton").addEventListener("click", () => {
    const hasDemo = window.UCMHub.getLeads().some((lead) => lead.demo);
    if (hasDemo) window.UCMHub.removeDemoLeads();
    else window.UCMHub.seedDemoLeads();
    detailDrawer.hidden = true;
    selectedId = null;
    renderTable();
  });
  window.addEventListener("ucm-store-change", renderTable);
  renderTable();
})();
