const state = {
  growth: null,
  zones: null,
  activeChannel: "instagram"
};

const approvedClaim = "UCM uses AI-assisted planning to reduce administrative waste, improve scheduling and build clearer cleaning scopes. Trained people review the scope and deliver the service.";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.json();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 1800);
}

function renderSystemLayers() {
  const container = document.querySelector("#systemLayers");
  container.innerHTML = state.growth.systemLayers.map((layer) => `
    <article class="system-item">
      <span class="label">${escapeHtml(layer.status)}</span>
      <h3>${escapeHtml(layer.name)}</h3>
      <p>${escapeHtml(layer.summary)}</p>
    </article>
  `).join("");
}

function renderChannelTabs() {
  const tabs = document.querySelector("#channelTabs");
  tabs.innerHTML = state.growth.channels.map((channel) => `
    <button type="button" role="tab" data-channel="${escapeHtml(channel.id)}" aria-selected="${channel.id === state.activeChannel}">
      ${escapeHtml(channel.name)}
    </button>
  `).join("");

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-channel]");
    if (!button) return;
    state.activeChannel = button.dataset.channel;
    renderChannelTabs();
    renderChannelPanel();
  }, { once: true });
}

function listMarkup(items) {
  return `<ul class="data-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderChannelPanel() {
  const channel = state.growth.channels.find((item) => item.id === state.activeChannel);
  const panel = document.querySelector("#channelPanel");
  panel.innerHTML = `
    <div>
      <p class="eyebrow">${escapeHtml(channel.role)}</p>
      <h3>${escapeHtml(channel.name)}</h3>
      <p>${escapeHtml(channel.cadence)}</p>
      <p class="channel-cta">Primary conversion: ${escapeHtml(channel.cta)}</p>
      ${channel.profile ? `<a href="${escapeHtml(channel.profile)}" target="_blank" rel="noreferrer">Open canonical profile</a>` : ""}
    </div>
    <div><h3>Audience and offers</h3>${listMarkup([...channel.audience, ...channel.offers])}</div>
    <div><h3>Commercial scorecard</h3>${listMarkup(channel.metrics)}</div>
  `;
}

function renderFounder() {
  const founder = state.growth.founder;
  document.querySelector("#founderName").textContent = founder.name;
  document.querySelector("#founderPosition").textContent = founder.position;
  document.querySelector("#founderSeries").innerHTML = founder.series.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

function renderScripts(filter = "all") {
  const scripts = state.growth.scripts.filter((script) => filter === "all" || script.channels.includes(filter));
  const grid = document.querySelector("#scriptGrid");
  grid.innerHTML = scripts.length ? scripts.map((script) => `
    <article class="script-item">
      <span class="script-number">${script.id}</span>
      <div>
        <h3>${escapeHtml(script.title)}</h3>
        <p>${escapeHtml(script.hook)}</p>
        <div class="script-meta">
          <span>${escapeHtml(script.buyer)}</span>
          <span>${escapeHtml(script.cta)}</span>
        </div>
      </div>
    </article>
  `).join("") : '<p class="empty">No scripts match this channel.</p>';
}

function zoneCard(zone) {
  const services = zone.bestServices.map((service) => `<span>${escapeHtml(service)}</span>`).join("");
  return `
    <article class="zone">
      <div class="zone-top">
        <div><h3>${escapeHtml(zone.zone)}</h3><p>${escapeHtml(zone.segment)}</p></div>
        <div class="score" aria-label="Opportunity score ${escapeHtml(zone.score)}">${escapeHtml(zone.score)}</div>
      </div>
      <div class="tags">${services}</div>
      <p><strong>Campaign:</strong> ${escapeHtml(zone.campaignAngle)}</p>
      <p><strong>CTA:</strong> ${escapeHtml(zone.cta)}</p>
    </article>
  `;
}

function renderZones(filter = "all") {
  const zones = state.zones.zones.filter((zone) => filter === "all" || zone.bestServices.some((service) => service.toLowerCase().includes(filter)));
  document.querySelector("#zoneGrid").innerHTML = zones.length ? zones.map(zoneCard).join("") : '<p class="empty">No zones match this service focus.</p>';
}

function renderInnovations(filter = "all") {
  const innovations = state.growth.innovations.filter((item) => filter === "all" || item.stage === filter);
  document.querySelector("#innovationGrid").innerHTML = innovations.map((item) => `
    <article class="innovation">
      <div class="innovation-top"><h3>${item.id}. ${escapeHtml(item.name)}</h3><span class="wave">${escapeHtml(item.stage)}</span></div>
      <p>${escapeHtml(item.value)}</p>
      <dl>
        <dt>Buyer</dt><dd>${escapeHtml(item.buyer)}</dd>
        <dt>Commercial model</dt><dd>${escapeHtml(item.revenue)}</dd>
        <dt>Owner</dt><dd>${escapeHtml(item.owner)}</dd>
        <dt>Dependency</dt><dd>${escapeHtml(item.dependency)}</dd>
        <dt>Primary KPI</dt><dd>${escapeHtml(item.kpi)}</dd>
        <dt>Next experiment</dt><dd>${escapeHtml(item.next)}</dd>
      </dl>
    </article>
  `).join("");
}

function renderPilots() {
  document.querySelector("#pilotList").innerHTML = state.growth.pilots.map((pilot) => `
    <div class="pilot-item"><strong>${escapeHtml(pilot.name)}</strong><span>${escapeHtml(pilot.gate)}</span></div>
  `).join("");
}

function renderCarePlans() {
  document.querySelector("#carePlanGrid").innerHTML = state.growth.carePlans.map((plan) => `
    <article class="care-plan">
      <h3>${escapeHtml(plan.name)}</h3>
      <p>${escapeHtml(plan.fit)}</p>
      <ul>${plan.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function renderEvidence() {
  document.querySelector("#ledgerList").innerHTML = state.growth.ledger.map((metric) => `<span>${escapeHtml(metric)}</span>`).join("");
  document.querySelector("#claimsTable").innerHTML = state.growth.claims.map((claim) => {
    const className = claim.status.toLowerCase().replaceAll(" ", "-");
    return `<div class="claim-row"><strong class="claim-status ${className}">${escapeHtml(claim.status)}</strong><span>${escapeHtml(claim.claim)}</span><span>${escapeHtml(claim.condition)}</span></div>`;
  }).join("");
}

function renderRoadmaps() {
  document.querySelector("#customerRoadmap").innerHTML = state.growth.customerRoadmap.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  document.querySelector("#operationsRoadmap").innerHTML = state.growth.operationsRoadmap.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderExecution() {
  document.querySelector("#executionBoard").innerHTML = state.growth.implementation.map((item) => `
    <div class="execution-item"><strong>${item.step}</strong><span>${escapeHtml(item.title)}</span><em>${escapeHtml(item.status)}</em></div>
  `).join("");
}

function bindControls() {
  document.querySelector("#scriptChannel").addEventListener("change", (event) => renderScripts(event.target.value));
  document.querySelector("#serviceFilter").addEventListener("change", (event) => renderZones(event.target.value));
  document.querySelector("#innovationStage").addEventListener("change", (event) => renderInnovations(event.target.value));
  document.querySelector("#sectionJump").addEventListener("change", (event) => document.querySelector(`#${event.target.value}`)?.scrollIntoView());
  document.querySelector("#copyClaim").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(approvedClaim);
      showToast("Approved claim copied");
    } catch {
      showToast("Clipboard permission unavailable");
    }
  });
}

function renderApp() {
  document.querySelector("#updatedAt").textContent = `Updated ${state.growth.updated}`;
  renderSystemLayers();
  renderChannelTabs();
  renderChannelPanel();
  renderFounder();
  renderScripts();
  renderZones();
  renderInnovations();
  renderPilots();
  renderCarePlans();
  renderEvidence();
  renderRoadmaps();
  renderExecution();
  bindControls();
}

async function init() {
  try {
    [state.growth, state.zones] = await Promise.all([
      loadJson("./data/growth-system.json"),
      loadJson("./data/london-target-zones.json")
    ]);
    renderApp();
  } catch (error) {
    document.querySelector("main").innerHTML = `<section class="section"><p class="eyebrow">Data error</p><h1>Growth Center data could not be loaded.</h1><p class="lede">${escapeHtml(error.message)}</p></section>`;
  }
}

init();
