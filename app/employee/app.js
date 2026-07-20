(function () {
  "use strict";

  let deferredInstallPrompt = null;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    document.querySelector("#installApp")?.classList.add("install-ready");
  });

  const state = {
    announcements: [
      { id: 1, title: "New site safety briefing", body: "All Canary Wharf team members must read the updated access and lone-working guidance before tonight's shift.", date: "Today", read: false },
      { id: 2, title: "July payslips published", body: "Your fictional demonstration payslip is now visible in Pay.", date: "Yesterday", read: false },
      { id: 3, title: "HOCl pilot briefing", body: "Selected staff will receive product-specific training before any controlled disinfection pilot begins.", date: "16 Jul", read: false }
    ],
    schedule: [
      { day: "Mon", date: "13 Jul", job: "Wembley managed block", service: "Communal areas", time: "07:00-15:00", status: "Completed", tone: "green" },
      { day: "Wed", date: "15 Jul", job: "Park Royal workspace", service: "Office clean", time: "18:00-22:00", status: "Completed", tone: "green" },
      { day: "Sat", date: "18 Jul", job: "Canary Wharf office", service: "Evening office clean", time: "18:00-22:00", status: "Today", tone: "blue", today: true },
      { day: "Sun", date: "19 Jul", job: "Not scheduled", service: "Rest day", time: "-", status: "Rest", tone: "amber" }
    ],
    readiness: [
      { id: "rams", label: "I have read the site-specific RAMS and access notes", meta: "Required before shift", checked: false },
      { id: "ppe", label: "I have the assigned PPE and know how to report a defect", meta: "Required before shift", checked: false },
      { id: "team", label: "I know my supervisor and escalation contact", meta: "Confirmed", checked: true }
    ],
    courses: [
      { title: "COSHH refresher", type: "Required", due: "Due 24 Jul", progress: 45, tone: "red", action: "Resume" },
      { title: "Site safety and dynamic risk", type: "Required", due: "Completed 04 Jul", progress: 100, tone: "green", action: "Review" },
      { title: "Respect at work", type: "Required", due: "Completed 18 Jun", progress: 100, tone: "green", action: "Review" },
      { title: "Cleaning quality standards", type: "Role learning", due: "Completed 10 Jun", progress: 100, tone: "green", action: "Review" },
      { title: "Data and customer privacy", type: "Required", due: "Completed 02 May", progress: 100, tone: "green", action: "Review" },
      { title: "Manual handling", type: "Required", due: "Completed 12 Apr", progress: 100, tone: "green", action: "Review" }
    ],
    certificates: [
      { name: "COSHH awareness", issued: "24 Jul 2025", expires: "24 Jul 2026", status: "Expires soon", tone: "red" },
      { name: "Manual handling", issued: "12 Apr 2026", expires: "12 Apr 2027", status: "Valid", tone: "green" },
      { name: "Health and safety induction", issued: "04 Jul 2026", expires: "04 Jul 2027", status: "Valid", tone: "green" },
      { name: "Right to work check", issued: "14 Feb 2024", expires: "Review controlled by HR", status: "Restricted", tone: "blue" },
      { name: "Enhanced task authorisation", issued: "Not issued", expires: "Training required", status: "Not assigned", tone: "amber" }
    ],
    personalDocuments: [
      { title: "Employment statement", detail: "Signed 14 Feb 2024", category: "Employment", version: "Current" },
      { title: "July 2026 payslip", detail: "Published 17 Jul 2026", category: "Pay", version: "PDF demo" },
      { title: "Pension enrolment notice", detail: "Published 20 Feb 2024", category: "Benefits", version: "Current" }
    ],
    policies: [
      { title: "Health and safety policy", detail: "Owner: H&S lead", category: "Safety", version: "v3.2 · Jul 2026" },
      { title: "Sickness and absence procedure", detail: "Owner: HR", category: "People", version: "v2.1 · Jun 2026" },
      { title: "Data protection and privacy", detail: "Owner: Data owner", category: "Privacy", version: "v1.4 · May 2026" },
      { title: "Respect at work", detail: "Owner: HR", category: "People", version: "v2.0 · Apr 2026" },
      { title: "Incident and near-miss reporting", detail: "Owner: Operations", category: "Safety", version: "v2.4 · Mar 2026" }
    ],
    payslips: [
      { period: "June 2026", date: "17 Jul 2026", gross: "£2,050.00", deductions: "£407.20", net: "£1,642.80" },
      { period: "May 2026", date: "17 Jun 2026", gross: "£2,018.00", deductions: "£395.10", net: "£1,622.90" },
      { period: "April 2026", date: "17 May 2026", gross: "£2,082.00", deductions: "£415.40", net: "£1,666.60" }
    ],
    requests: [
      { title: "Annual leave · 24-25 July", detail: "2 working days", date: "Approved 15 Jul", status: "Approved", tone: "green" },
      { title: "Emergency contact update", detail: "Identity confirmation required", date: "Submitted 10 Jul", status: "In review", tone: "blue" },
      { title: "Uniform replacement", detail: "Safety shoes · Size 6", date: "Completed 02 Jul", status: "Completed", tone: "green" }
    ]
  };

  function icon(name) {
    return `<i data-lucide="${name}"></i>`;
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  function showToast(message) {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => { toast.hidden = true; }, 2600);
  }

  function isInstalled() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  async function installWorkforce() {
    if (isInstalled()) {
      showToast("UCM Workforce is already installed on this device.");
      return;
    }

    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      document.querySelector("#installApp")?.classList.remove("install-ready");
      return;
    }

    const isAppleMobile = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    showToast(isAppleMobile
      ? "On iPhone or iPad: tap Share, then Add to Home Screen."
      : "Open the browser menu and choose Install app or Add to Home Screen.");
  }

  function initialisePwa() {
    document.querySelector("#installApp").addEventListener("click", installWorkforce);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./service-worker.js", { scope: "./" })
        .catch(() => showToast("Install support could not start. Refresh and try again."));
    }

    window.addEventListener("appinstalled", () => {
      deferredInstallPrompt = null;
      document.querySelector("#installApp")?.classList.remove("install-ready");
      showToast("UCM Workforce installed successfully.");
    });
    window.addEventListener("offline", () => showToast("Offline mode: only the approved app interface is available."));
    window.addEventListener("online", () => showToast("Connection restored."));
  }

  function showView(id) {
    const target = document.querySelector(`#${id}`) ? id : "home";
    document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === target));
    document.querySelectorAll("[data-nav]").forEach((link) => link.classList.toggle("active", link.dataset.nav === target));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderAnnouncements() {
    const markup = state.announcements.map((item) => `
      <article class="announcement ${item.read ? "read" : ""}" data-announcement="${item.id}">
        <span class="unread-mark"></span><div><strong>${item.title}</strong><p>${item.body}</p></div><time>${item.date}</time>
      </article>`).join("");
    document.querySelector("#announcementList").innerHTML = markup;
    document.querySelector("#notificationList").innerHTML = state.announcements.map((item) => `
      <article class="notification-item"><strong>${item.title}</strong><p>${item.body}</p><small>${item.date}</small></article>`).join("");
    document.querySelector(".notification-count").textContent = String(state.announcements.filter((item) => !item.read).length);
  }

  function renderSchedule() {
    document.querySelector("#scheduleList").innerHTML = state.schedule.map((item) => `
      <article class="schedule-row ${item.today ? "today" : ""}">
        <div class="schedule-date"><strong>${item.day}</strong><small>${item.date}</small></div><span class="schedule-marker"></span>
        <div class="schedule-job"><strong>${item.job}</strong><small>${item.service}</small></div>
        <div class="schedule-time"><strong>${item.time}</strong><small>${item.today ? "Supervisor: Andre" : ""}</small></div>
        <span class="status ${item.tone}">${item.status}</span>
      </article>`).join("");
    document.querySelector("#readinessChecklist").innerHTML = state.readiness.map((item) => `
      <label class="check-item"><input type="checkbox" data-readiness="${item.id}" ${item.checked ? "checked" : ""}><strong>${item.label}</strong><span>${item.meta}</span></label>`).join("");
    document.querySelectorAll("[data-readiness]").forEach((input) => input.addEventListener("change", () => {
      const item = state.readiness.find((entry) => entry.id === input.dataset.readiness);
      if (item) item.checked = input.checked;
      const complete = state.readiness.filter((entry) => entry.checked).length;
      showToast(`${complete} of ${state.readiness.length} readiness checks complete.`);
    }));
  }

  function renderTraining() {
    document.querySelector("#courseList").innerHTML = state.courses.map((item) => `
      <article class="course-row"><span class="course-icon">${icon(item.progress === 100 ? "badge-check" : "book-open-check")}</span>
        <div><strong>${item.title}</strong><small>${item.type}</small></div>
        <div class="mini-progress" aria-label="${item.progress} percent complete"><span class="progress-${item.progress}"></span></div>
        <small>${item.due}</small><button class="secondary-button" type="button" data-course="${item.title}">${item.action}</button>
      </article>`).join("");
    document.querySelector("#certificateList").innerHTML = state.certificates.map((item) => `
      <article class="certificate-row"><strong>${item.name}</strong><span>${item.issued}</span><span>${item.expires}</span><span class="status ${item.tone}">${item.status}</span><button class="icon-button" type="button" data-download="certificate" aria-label="Download demonstration certificate">${icon("download")}</button></article>`).join("");
    document.querySelectorAll("[data-course]").forEach((button) => button.addEventListener("click", () => showToast(`${button.dataset.course} opened in demonstration mode.`)));
    bindDownloads();
    refreshIcons();
  }

  function renderDocuments(query = "") {
    const matches = (item) => `${item.title} ${item.detail} ${item.category}`.toLowerCase().includes(query.toLowerCase());
    const row = (item) => `<article class="document-row"><span class="file-icon">${icon("file-text")}</span><div><strong>${item.title}</strong><small>${item.detail}</small></div><span>${item.category}</span><small>${item.version}</small><button class="icon-button" type="button" data-download="document" aria-label="Download demonstration document">${icon("download")}</button></article>`;
    document.querySelector("#personalDocuments").innerHTML = state.personalDocuments.filter(matches).map(row).join("") || '<p class="empty">No personal documents match that search.</p>';
    document.querySelector("#policyDocuments").innerHTML = state.policies.filter(matches).map(row).join("") || '<p class="empty">No policies match that search.</p>';
    bindDownloads();
    refreshIcons();
  }

  function renderPay() {
    document.querySelector("#payslipRows").innerHTML = state.payslips.map((item) => `<tr><td><strong>${item.period}</strong></td><td>${item.date}</td><td>${item.gross}</td><td>${item.deductions}</td><td><strong>${item.net}</strong></td><td><button class="icon-button" type="button" data-download="payslip" aria-label="Download demonstration payslip">${icon("download")}</button></td></tr>`).join("");
    bindDownloads();
    refreshIcons();
  }

  function renderRequests() {
    document.querySelector("#requestList").innerHTML = state.requests.map((item) => `<article class="request-row"><div><strong>${item.title}</strong><small>${item.detail}</small></div><span>${item.date}</span><span class="status ${item.tone}">${item.status}</span></article>`).join("");
  }

  function bindDownloads() {
    document.querySelectorAll("[data-download]").forEach((button) => {
      if (button.dataset.bound) return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => downloadDemo(button.dataset.download));
    });
  }

  function downloadDemo(type) {
    const content = `UCM WORKFORCE DEMONSTRATION\n\nThis is a fictional ${type} generated by the UCM employee-app prototype.\nIt is not an employment, payroll, training or compliance record.\nNo personal data is contained in this file.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ucm-demo-${type}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Fictional ${type} downloaded.`);
  }

  function openDrawer() {
    document.querySelector("#drawerBackdrop").hidden = false;
    document.querySelector("#notificationDrawer").hidden = false;
  }

  function closeDrawer() {
    document.querySelector("#drawerBackdrop").hidden = true;
    document.querySelector("#notificationDrawer").hidden = true;
  }

  const forms = {
    leave: {
      eyebrow: "Time away",
      title: "Request annual leave",
      fields: `<div class="field-row"><label class="field">First day<input type="date" required></label><label class="field">Last day<input type="date" required></label></div><label class="field">Leave type<select><option>Annual leave</option><option>Unpaid leave</option><option>Other authorised leave</option></select></label><label class="field">Note for approver<textarea placeholder="Only include information needed to assess the request"></textarea></label>`
    },
    incident: {
      eyebrow: "Safety and service",
      title: "Report an issue or near miss",
      fields: `<label class="field">Type<select><option>Safety concern</option><option>Near miss</option><option>Equipment defect</option><option>Site access problem</option><option>Service issue</option></select></label><label class="field">Location or assignment<input value="Canary Wharf office (demo)" required></label><label class="field">What happened?<textarea required placeholder="Describe facts, immediate risk and action taken"></textarea></label><label class="field">Immediate danger?<select><option>No</option><option>Yes - supervisor contacted</option></select></label>`
    },
    pay: {
      eyebrow: "Confidential query",
      title: "Raise a payroll query",
      fields: `<label class="field">Pay period<select><option>June 2026</option><option>May 2026</option><option>April 2026</option></select></label><label class="field">Query type<select><option>Hours or overtime</option><option>Deduction</option><option>Bank payment</option><option>Pension</option><option>Other</option></select></label><label class="field">Details<textarea required placeholder="Do not include full bank details or unnecessary medical information"></textarea></label>`
    },
    support: {
      eyebrow: "Employee support",
      title: "Ask UCM for help",
      fields: `<label class="field">Area<select><option>Shift or site</option><option>HR</option><option>Training</option><option>Pay</option><option>App access</option></select></label><label class="field">Message<textarea required placeholder="Tell us what you need"></textarea></label><label class="field">Preferred response<select><option>In-app message</option><option>Phone call</option><option>Email</option></select></label>`
    },
    profile: {
      eyebrow: "Personal information",
      title: "Request a profile change",
      fields: `<label class="field">Information to change<select><option>Home address</option><option>Phone number</option><option>Emergency contact</option><option>Name</option><option>Bank details</option></select></label><label class="field">Requested change<textarea required placeholder="Sensitive changes require identity verification outside this demonstration"></textarea></label>`
    }
  };

  function openForm(type) {
    const config = forms[type];
    if (!config) return;
    document.querySelector("#dialogEyebrow").textContent = config.eyebrow;
    document.querySelector("#dialogTitle").textContent = config.title;
    document.querySelector("#dialogFields").innerHTML = config.fields;
    document.querySelector("#formDialog").dataset.formType = type;
    document.querySelector("#formDialog").showModal();
    refreshIcons();
  }

  function initialise() {
    renderAnnouncements();
    renderSchedule();
    renderTraining();
    renderDocuments();
    renderPay();
    renderRequests();
    initialisePwa();

    const initial = window.location.hash.slice(1) || "home";
    showView(initial);
    document.querySelectorAll("[data-nav], [data-jump]").forEach((control) => control.addEventListener("click", (event) => {
      const id = control.dataset.nav || control.dataset.jump;
      if (control.dataset.jump) event.preventDefault();
      window.location.hash = id;
      showView(id);
    }));
    window.addEventListener("hashchange", () => showView(window.location.hash.slice(1)));

    document.querySelector("#markAnnouncements").addEventListener("click", () => {
      state.announcements.forEach((item) => { item.read = true; });
      renderAnnouncements();
      showToast("Announcements marked as read.");
    });
    document.querySelector("#openNotifications").addEventListener("click", openDrawer);
    document.querySelector("#drawerBackdrop").addEventListener("click", closeDrawer);
    document.querySelector("[data-close-drawer]").addEventListener("click", closeDrawer);
    document.querySelector("#documentSearch").addEventListener("input", (event) => renderDocuments(event.target.value));

    document.querySelectorAll("[data-training-tab]").forEach((button) => button.addEventListener("click", () => {
      document.querySelectorAll("[data-training-tab]").forEach((item) => item.classList.toggle("active", item === button));
      const certificates = button.dataset.trainingTab === "certificates";
      document.querySelector("#courseList").hidden = certificates;
      document.querySelector("#certificateList").hidden = !certificates;
    }));

    document.querySelector("#clockButton").addEventListener("click", () => showToast("Shift start is locked until the authorised time and location."));
    document.querySelector("#openLeave").addEventListener("click", () => openForm("leave"));
    document.querySelector("#openIncident").addEventListener("click", () => openForm("incident"));
    document.querySelector("#openPayQuery").addEventListener("click", () => openForm("pay"));
    document.querySelector("#openSupport").addEventListener("click", () => openForm("support"));
    document.querySelector("#requestProfileChange").addEventListener("click", () => openForm("profile"));
    document.querySelector("#dialogForm").addEventListener("submit", (event) => {
      if (event.submitter && event.submitter.value === "cancel") return;
      event.preventDefault();
      const dialog = document.querySelector("#formDialog");
      dialog.close();
      showToast("Demonstration request completed. Nothing was saved or sent.");
    });
    bindDownloads();
    window.setTimeout(refreshIcons, 0);
  }

  document.addEventListener("DOMContentLoaded", initialise);
})();
