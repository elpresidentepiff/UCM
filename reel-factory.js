(function () {
  "use strict";

  const form = document.querySelector("#reelForm");
  const sourceSelect = document.querySelector("#sourceLead");
  const scoreInputs = [...document.querySelectorAll(".quality-row input")];
  const scoreRing = document.querySelector("#scoreRing");
  const gateMessage = document.querySelector("#gateMessage");
  const output = document.querySelector("#factoryOutput");
  const toast = document.querySelector("#toast");

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

  function totalScore() {
    return scoreInputs.reduce((sum, input) => sum + Number(input.value || 0), 0);
  }

  function hardFailures() {
    const failures = [];
    if (!document.querySelector("#consentVerified").checked) failures.push("Marketing consent not verified");
    if (!document.querySelector("#sourceVerified").checked) failures.push("Source proof not verified");
    if (document.querySelector("#claimsStatus").value !== "approved") failures.push("Claims are not approved");
    if (!sourceSelect.value) failures.push("No source record selected");
    return failures;
  }

  function renderGate() {
    const score = totalScore();
    const failures = hardFailures();
    document.querySelector("#scoreValue").textContent = String(score);
    scoreRing.classList.toggle("pass", score >= 85 && failures.length === 0);
    scoreRing.classList.toggle("fail", failures.length > 0 || score < 85);
    if (failures.length) {
      gateMessage.textContent = `Hard stop: ${failures.join("; ")}.`;
      gateMessage.style.color = "";
      gateMessage.style.background = "";
      return { score, failures, status: "changes_required" };
    }
    if (score < 85) {
      gateMessage.textContent = `Changes required: ${85 - score} more quality points needed.`;
      gateMessage.style.color = "";
      gateMessage.style.background = "";
      return { score, failures, status: "changes_required" };
    }
    gateMessage.textContent = "Quality threshold passed. Send to a named human approver; do not publish automatically.";
    gateMessage.style.color = "#0e6540";
    gateMessage.style.background = "#e8f7ef";
    return { score, failures, status: "human_approval" };
  }

  function populateSources() {
    const leads = window.UCMHub.getLeads();
    sourceSelect.innerHTML = '<option value="">Select a CleanScope lead</option>' + leads.map((lead) => {
      const service = window.UCMHub.labels.serviceCode[lead.serviceCode] || lead.serviceCode;
      return `<option value="${escapeHtml(lead.id)}">${escapeHtml(lead.reference)} | ${escapeHtml(service)} | ${escapeHtml(lead.postcode)}${lead.demo ? " | DEMO" : ""}</option>`;
    }).join("");
  }

  function sourceChanged() {
    const lead = window.UCMHub.getLeads().find((item) => item.id === sourceSelect.value);
    if (!lead) return renderGate();
    document.querySelector("#serviceCode").value = lead.serviceCode || "";
    document.querySelector("#locationLabel").value = lead.postcode || "";
    document.querySelector("#buyer").value = window.UCMHub.labels.buyerType[lead.buyerType] || lead.buyerType || "";
    if (!lead.mediaConsent) showToast("This lead has no scope-media consent. Separate marketing permission is still required in every case.");
    renderGate();
  }

  function validText(id, min = 1) {
    const input = document.querySelector(`#${id}`);
    const valid = input.value.trim().length >= min;
    input.setAttribute("aria-invalid", valid ? "false" : "true");
    return valid;
  }

  function renderOutput(manifest) {
    const service = window.UCMHub.labels.serviceCode[manifest.serviceCode] || manifest.serviceCode;
    const gate = manifest.status === "human_approval" ? "Ready for named human approval" : "Changes required before human approval";
    output.innerHTML = `
      <p class="eyebrow">Saved review manifest</p>
      <h2>${escapeHtml(manifest.title)}</h2>
      <p><strong>Status:</strong> ${escapeHtml(gate)} | Score ${escapeHtml(manifest.qualityScore)}/100 | Review round ${escapeHtml(manifest.reviewRound)}</p>
      <p><strong>0-2s:</strong> ${escapeHtml(manifest.hook)}</p>
      <p><strong>2-6s:</strong> Show the verified site problem in ${escapeHtml(manifest.locationLabel)}.</p>
      <p><strong>6-12s:</strong> Show the genuine ${escapeHtml(service)} process and checklist.</p>
      <p><strong>12-16s:</strong> Show only the verified result: ${escapeHtml(manifest.proofSummary)}</p>
      <p><strong>16-20s:</strong> ${escapeHtml(manifest.callToAction)}</p>
      <p><strong>Hard failures:</strong> ${manifest.hardFailures.length ? escapeHtml(manifest.hardFailures.join("; ")) : "None recorded"}</p>
    `;
    output.hidden = false;
    output.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  scoreInputs.forEach((input) => {
    input.addEventListener("input", () => {
      const max = Number(input.max);
      const value = Math.max(0, Math.min(max, Number(input.value || 0)));
      input.value = String(value);
      renderGate();
    });
  });
  ["#consentVerified", "#sourceVerified", "#claimsStatus"].forEach((selector) => document.querySelector(selector).addEventListener("change", renderGate));
  sourceSelect.addEventListener("change", sourceChanged);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredValid = [
      validText("locationLabel"),
      validText("serviceCode"),
      validText("title"),
      validText("hook"),
      validText("proofSummary", 20),
      validText("buyer"),
      validText("callToAction")
    ].every(Boolean);
    if (!sourceSelect.value || !requiredValid) {
      showToast("Complete the source and creative brief before review.");
      return;
    }
    const gate = renderGate();
    const manifest = window.UCMHub.saveReel({
      leadId: sourceSelect.value,
      title: document.querySelector("#title").value.trim(),
      locationLabel: document.querySelector("#locationLabel").value.trim(),
      serviceCode: document.querySelector("#serviceCode").value,
      buyer: document.querySelector("#buyer").value.trim(),
      hook: document.querySelector("#hook").value.trim(),
      proofSummary: document.querySelector("#proofSummary").value.trim(),
      callToAction: document.querySelector("#callToAction").value.trim(),
      reviewRound: Number(document.querySelector("#reviewRound").value),
      qualityScore: gate.score,
      hardFailures: gate.failures,
      status: gate.status,
      claimsStatus: document.querySelector("#claimsStatus").value,
      consentVerified: document.querySelector("#consentVerified").checked,
      sourceVerified: document.querySelector("#sourceVerified").checked
    });
    renderOutput(manifest);
  });

  window.addEventListener("ucm-store-change", populateSources);
  populateSources();
  renderGate();
})();
