(function () {
  "use strict";

  const views = [...document.querySelectorAll(".view")];
  const navLinks = [...document.querySelectorAll("[data-nav]")];
  const viewLabel = document.querySelector("#viewLabel");
  const toast = document.querySelector("#toast");
  const dialog = document.querySelector("#appDialog");
  const dialogTitle = document.querySelector("#dialogTitle");
  const dialogEyebrow = document.querySelector("#dialogEyebrow");
  const dialogBody = document.querySelector("#dialogBody");
  const dialogAction = document.querySelector("#dialogAction");
  const notificationPanel = document.querySelector("#notificationPanel");
  const scrim = document.querySelector("#scrim");
  let deferredInstallPrompt = null;

  const labels = {
    home: "Service overview",
    cleanscope: "CleanScope quote request",
    quotes: "Quotes and approvals",
    bookings: "Service bookings",
    proof: "Proof Passport",
    documents: "Document centre",
    support: "Customer support",
    account: "Account and privacy"
  };

  function iconRefresh() {
    if (window.lucide) window.lucide.createIcons();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => { toast.hidden = true; }, 3200);
  }

  function openView(name, updateHash = true) {
    const target = document.getElementById(name) || document.getElementById("home");
    views.forEach((view) => view.classList.toggle("active", view === target));
    navLinks.forEach((link) => link.classList.toggle("active", link.dataset.nav === target.id));
    viewLabel.textContent = labels[target.id] || "UCM Client";
    document.title = `${labels[target.id] || "UCM Client"} | UCM Client`;
    if (updateHash && window.location.hash !== `#${target.id}`) history.pushState(null, "", `#${target.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    openView(link.dataset.nav);
  }));

  document.querySelectorAll("[data-jump]").forEach((button) => button.addEventListener("click", () => openView(button.dataset.jump)));
  window.addEventListener("hashchange", () => openView(window.location.hash.slice(1) || "home", false));

  function showDialog(options) {
    dialogEyebrow.textContent = options.eyebrow || "UCM Client demonstration";
    dialogTitle.textContent = options.title;
    dialogBody.innerHTML = options.body;
    dialogAction.textContent = options.action || "Continue";
    dialogAction.hidden = options.hideAction === true;
    dialogAction.onclick = () => {
      if (typeof options.onAction === "function") options.onAction();
    };
    dialog.showModal();
    iconRefresh();
  }

  document.querySelector("#notificationButton").addEventListener("click", () => {
    notificationPanel.hidden = false;
    scrim.hidden = false;
  });
  function closeNotifications() {
    notificationPanel.hidden = true;
    scrim.hidden = true;
  }
  document.querySelector("#closeNotifications").addEventListener("click", closeNotifications);
  scrim.addEventListener("click", closeNotifications);

  document.querySelector("#carePlanButton").addEventListener("click", () => showDialog({
    title: "Managed Care",
    body: "<p>This sample plan combines a defined recurring cleaning scope, support requests, completion evidence and an account review.</p><div class='human-review'><i data-lucide='user-check'></i><div><strong>Human account ownership</strong><p>Production plan changes, prices and contract terms require review by an authorised UCM employee.</p></div></div>",
    action: "Close"
  }));

  document.querySelector("#quoteQuestion").addEventListener("click", () => showDialog({
    eyebrow: "Quote UCM-Q-1042",
    title: "Ask UCM a question",
    body: "<label class='field'><span>Your question</span><textarea id='quoteQuestionText' placeholder='Ask about scope, frequency, access or the proposed start date.'></textarea></label><p>This demonstration does not transmit the message.</p>",
    action: "Preview message",
    onAction: () => showToast("Message preview complete. Nothing was sent.")
  }));

  document.querySelector("#quoteApprove").addEventListener("click", () => showDialog({
    eyebrow: "Controlled approval",
    title: "Preview quote approval",
    body: "<p>Production approval will show the final scope, price, VAT position, contract terms and authorised signatory before recording acceptance.</p><div class='human-review'><i data-lucide='shield-check'></i><div><strong>No approval has been recorded</strong><p>This prototype cannot create a contract or financial commitment.</p></div></div>",
    action: "Acknowledge preview",
    onAction: () => showToast("Approval journey previewed. No commitment was created.")
  }));

  document.querySelector("#requestChange").addEventListener("click", () => showDialog({
    eyebrow: "Booking change",
    title: "Request a schedule change",
    body: "<label class='field'><span>Preferred date or time</span><input type='datetime-local'></label><label class='field'><span>Reason</span><textarea placeholder='Explain the requested change and any access impact.'></textarea></label><p>Changes remain subject to UCM confirmation.</p>",
    action: "Preview request",
    onAction: () => showToast("Change request preview complete. Nothing was sent.")
  }));

  document.querySelectorAll("[data-dialog='booking']").forEach((button) => button.addEventListener("click", () => showDialog({
    eyebrow: "Sample booking",
    title: "Office evening clean",
    body: "<div class='review-grid'><div><small>Date</small><strong>23 July 2026</strong></div><div><small>Window</small><strong>18:00-22:00</strong></div><div><small>Site</small><strong>Canary Wharf, E14</strong></div><div><small>Status</small><strong>Confirmed</strong></div></div><p>Production will show approved arrival updates, access readiness and service instructions without exposing employee HR information.</p>",
    action: "Close"
  })));

  document.querySelector("#evidenceButton").addEventListener("click", () => showDialog({
    eyebrow: "Evidence controls",
    title: "Only approved evidence is visible",
    body: "<p>The production gallery will be restricted to the authorised customer, organisation and site. UCM must approve every file before release.</p><div class='human-review'><i data-lucide='eye-off'></i><div><strong>Protected by default</strong><p>Faces, paperwork, screens, security details and unrelated areas must be excluded or redacted.</p></div></div>",
    action: "Close"
  }));

  document.querySelector("#callSupport").addEventListener("click", () => showDialog({
    eyebrow: "Human support",
    title: "Call UCM",
    body: "<p>The production app will use UCM's confirmed support number and operating hours. No telephone number is invented in this demonstration.</p>",
    action: "Close"
  }));
  document.querySelector("#messageSupport").addEventListener("click", () => document.querySelector("#newTicket").click());

  function addSampleTicket() {
    const subject = String(document.querySelector("#ticketSubject")?.value || "New client request").trim();
    const list = document.querySelector("#ticketList");
    const article = document.createElement("article");
    article.innerHTML = `<span class="ticket-priority">Demonstration request</span><div><strong>${escapeHtml(subject)}</strong><small>Temporary browser record - just now</small></div><span class="status pending">Not submitted</span><button class="icon-button" type="button" aria-label="Open support request"><i data-lucide="chevron-right"></i></button>`;
    list.prepend(article);
    iconRefresh();
    showToast("Temporary ticket added to this screen. Nothing was transmitted.");
  }

  document.querySelector("#newTicket").addEventListener("click", () => showDialog({
    eyebrow: "Customer support",
    title: "New support request",
    body: "<label class='field'><span>Request type</span><select><option>Service question</option><option>Quality issue</option><option>Maintenance issue</option><option>Account request</option></select></label><label class='field'><span>Subject</span><input id='ticketSubject' maxlength='100' placeholder='Brief description'></label><label class='field'><span>Details</span><textarea placeholder='What happened, where and what outcome do you need?'></textarea></label><p>This demonstration creates only a temporary on-screen record.</p>",
    action: "Create demonstration",
    onAction: addSampleTicket
  }));

  document.querySelectorAll("[data-dialog='ticket']").forEach((button) => button.addEventListener("click", () => showDialog({
    eyebrow: "Sample ticket UCM-T-208",
    title: "Confirm bank-holiday schedule",
    body: "<div class='review-grid'><div><small>Status</small><strong>Awaiting UCM</strong></div><div><small>Updated</small><strong>Yesterday</strong></div></div><p>Production messages will be retained in the authorised account record with ownership, timestamps and resolution status.</p>",
    action: "Close"
  })));

  document.querySelectorAll("[data-dialog='profile'], [data-dialog='security'], [data-dialog='privacy']").forEach((button) => button.addEventListener("click", () => {
    const type = button.dataset.dialog;
    const content = {
      profile: ["Contact details", "Production customers will be able to request controlled changes to authorised contact information."],
      security: ["Sign-in and security", "Authentication, account recovery, session controls and audit logging must be implemented before real customer access."],
      privacy: ["Privacy and permissions", "Customers will be able to review media permissions, communication choices and data requests without granting marketing consent by default."]
    }[type];
    showDialog({ title: content[0], body: `<p>${content[1]}</p>`, action: "Close" });
  }));

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  }

  function downloadSample(type) {
    const copy = {
      passport: "UCM Proof Passport - FICTIONAL DEMONSTRATION\nReference: UCM-PP-2026-0630\nNo real service record or evidence is contained in this file.",
      insurance: "UCM insurance document placeholder - FICTIONAL DEMONSTRATION\nProduction will provide the approved controlled document.",
      specification: "UCM service specification placeholder - FICTIONAL DEMONSTRATION\nNo contractual scope is created by this file.",
      rams: "UCM RAMS placeholder - FICTIONAL DEMONSTRATION\nSite-specific RAMS require authorised human review."
    }[type] || "UCM Client fictional demonstration file.";
    const blob = new Blob([copy], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ucm-${type}-DEMO.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast("Fictional demonstration file downloaded.");
  }
  document.querySelectorAll("[data-download]").forEach((button) => button.addEventListener("click", () => downloadSample(button.dataset.download)));

  const scopeForm = document.querySelector("#cleanScopeForm");
  const scopeSteps = [...document.querySelectorAll("[data-scope-step]")];
  const stepperItems = [...document.querySelectorAll("#scopeStepper li")];
  const scopeBack = document.querySelector("#scopeBack");
  const scopeNext = document.querySelector("#scopeNext");
  const scopeSubmit = document.querySelector("#scopeSubmit");
  const mediaInput = document.querySelector("#scopeMedia");
  const mediaPreview = document.querySelector("#mediaPreview");
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "video/mp4", "video/quicktime"]);
  const maxFileSize = 25 * 1024 * 1024;
  let scopeStep = 1;
  let selectedMedia = [];

  function value(name) {
    return String(new FormData(scopeForm).get(name) || "").trim();
  }

  function setError(name, message) {
    const target = scopeForm.querySelector(`[data-error="${name}"]`);
    if (target) target.textContent = message;
  }

  function clearErrors() {
    scopeForm.querySelectorAll(".field-error").forEach((node) => { node.textContent = ""; });
  }

  function validPostcode(postcode) {
    return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(postcode);
  }

  function validateScopeStep(step) {
    clearErrors();
    let valid = true;
    if (step === 1 && !value("service")) {
      setError("service", "Choose a primary service.");
      valid = false;
    }
    if (step === 2) {
      if (!validPostcode(value("postcode"))) { setError("postcode", "Enter a valid UK postcode."); valid = false; }
      if (!value("propertyType")) { setError("propertyType", "Choose a property type."); valid = false; }
      if (!value("urgency")) { setError("urgency", "Choose the required timing."); valid = false; }
      if (value("details").length < 20) { setError("details", "Add at least 20 characters about the required result."); valid = false; }
    }
    if (step === 3) {
      if (selectedMedia.length && !scopeForm.elements.mediaConsent.checked) { setError("media", "Confirm you have authority to share the selected media."); valid = false; }
      if (selectedMedia.some((file) => !allowedTypes.has(file.type) || file.size > maxFileSize)) { setError("media", "Remove unsupported or oversized files."); valid = false; }
    }
    if (step === 4 && !scopeForm.elements.enquiryConsent.checked) {
      setError("enquiryConsent", "Confirm that you understand this is a demonstration.");
      valid = false;
    }
    if (!valid) scopeForm.querySelector(".field-error:not(:empty)")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return valid;
  }

  function renderScopeReview() {
    const details = [
      ["Service", value("service") || "Not selected"],
      ["Postcode", value("postcode").toUpperCase() || "Not added"],
      ["Property", value("propertyType") || "Not selected"],
      ["Size", value("size") || "Not provided"],
      ["Timing", value("urgency") || "Not selected"],
      ["Evidence", selectedMedia.length ? `${selectedMedia.length} file(s) selected locally` : "No files selected"]
    ];
    document.querySelector("#scopeReview").innerHTML = details.map(([label, content]) => `<div><small>${label}</small><strong>${escapeHtml(content)}</strong></div>`).join("");
  }

  function renderScopeStep(shouldScroll = true) {
    scopeSteps.forEach((step, index) => { step.hidden = index !== scopeStep - 1; });
    stepperItems.forEach((item, index) => {
      item.classList.toggle("active", index === scopeStep - 1);
      item.classList.toggle("complete", index < scopeStep - 1);
    });
    scopeBack.hidden = scopeStep === 1;
    scopeNext.hidden = scopeStep === scopeSteps.length;
    scopeSubmit.hidden = scopeStep !== scopeSteps.length;
    scopeBack.parentElement.classList.toggle("single", scopeStep === 1);
    if (scopeStep === 4) renderScopeReview();
    if (shouldScroll) document.querySelector("#scopeStepper").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateScopeSummary() {
    document.querySelector("#summaryService").textContent = value("service") || "Select a service";
    document.querySelector("#summaryPostcode").textContent = value("postcode").toUpperCase() || "Not added";
    document.querySelector("#summaryUrgency").textContent = value("urgency") || "Not selected";
    document.querySelector("#summaryMedia").textContent = selectedMedia.length ? `${selectedMedia.length} selected locally` : "No files";
    let score = 10;
    if (value("service")) score += 20;
    if (validPostcode(value("postcode"))) score += 15;
    if (value("propertyType")) score += 10;
    if (value("urgency")) score += 10;
    if (value("details").length >= 20) score += 20;
    if (selectedMedia.length) score += 15;
    document.querySelector("#completionValue").textContent = `${score}%`;
    document.querySelector("#completionBar").style.width = `${score}%`;
    document.querySelector("#detailCount").textContent = String(scopeForm.elements.details.value.length);
  }

  function releaseMedia() {
    selectedMedia.forEach((item) => URL.revokeObjectURL(item.url));
    selectedMedia = [];
  }

  function renderMedia() {
    mediaPreview.innerHTML = "";
    selectedMedia.forEach((item, index) => {
      const container = document.createElement("div");
      container.className = "media-item";
      if (item.file.type.startsWith("image/")) {
        const image = document.createElement("img");
        image.src = item.url;
        image.alt = `Local preview ${index + 1}`;
        container.append(image);
      } else if (item.file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.src = item.url;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("aria-label", `Local video preview ${index + 1}`);
        container.append(video);
      } else {
        const fallback = document.createElement("span");
        fallback.className = "file-fallback";
        fallback.textContent = item.file.name;
        container.append(fallback);
      }
      const remove = document.createElement("button");
      remove.type = "button";
      remove.setAttribute("aria-label", `Remove ${item.file.name}`);
      remove.innerHTML = "<i data-lucide='x'></i>";
      remove.addEventListener("click", () => {
        URL.revokeObjectURL(item.url);
        selectedMedia.splice(index, 1);
        renderMedia();
        updateScopeSummary();
      });
      container.append(remove);
      mediaPreview.append(container);
    });
    iconRefresh();
  }

  mediaInput.addEventListener("change", () => {
    releaseMedia();
    selectedMedia = [...mediaInput.files].slice(0, 6).map((file) => ({ file, url: URL.createObjectURL(file) }));
    if (mediaInput.files.length > 6) showToast("Only the first six files were selected.");
    renderMedia();
    updateScopeSummary();
  });

  scopeForm.addEventListener("input", updateScopeSummary);
  scopeForm.addEventListener("change", updateScopeSummary);
  scopeNext.addEventListener("click", () => {
    if (!validateScopeStep(scopeStep)) return;
    scopeStep += 1;
    renderScopeStep();
  });
  scopeBack.addEventListener("click", () => {
    scopeStep = Math.max(1, scopeStep - 1);
    renderScopeStep();
  });
  scopeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateScopeStep(4)) return;
    document.querySelector(".scope-layout").hidden = true;
    const reference = `UCM-DEMO-${String(Date.now()).slice(-6)}`;
    document.querySelector("#scopeReference").textContent = reference;
    document.querySelector("#scopeSuccess").hidden = false;
    document.querySelector("#scopeSuccess").focus();
  });
  document.querySelector("#restartScope").addEventListener("click", () => {
    releaseMedia();
    scopeForm.reset();
    scopeStep = 1;
    mediaPreview.innerHTML = "";
    document.querySelector(".scope-layout").hidden = false;
    document.querySelector("#scopeSuccess").hidden = true;
    renderScopeStep();
    updateScopeSummary();
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
  });
  document.querySelector("#installApp").addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      showDialog({
        eyebrow: "Install UCM Client",
        title: "Add the app to your phone",
        body: "<p>On iPhone, use Share then Add to Home Screen. On Android, open the browser menu and choose Install app or Add to Home screen.</p><p>The production release will use UCM's secure hosted address. This local demonstration is available only on this machine.</p>",
        action: "Close"
      });
      return;
    }
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
  });

  window.addEventListener("load", () => {
    if (window.location.hash) window.scrollTo({ top: 0, behavior: "auto" });
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });

  document.addEventListener("DOMContentLoaded", () => {
    openView(window.location.hash.slice(1) || "home", false);
    renderScopeStep(false);
    updateScopeSummary();
    iconRefresh();
  });
})();
