const fallbackData = {
  zones: [
    {
      zone: "Canary Wharf / Isle of Dogs / South Poplar",
      score: 96,
      segment: "High-density flats, offices, finance workers, managed buildings",
      bestServices: ["office cleaning", "communal area cleaning", "end-of-tenancy", "property manager care", "IT equipment cleaning"],
      campaignAngle: "AI-assisted cleaning plans for busy apartment blocks and offices: faster quoting, smarter scheduling, less admin waste.",
      cta: "Request a managed building or office cleaning quote"
    },
    {
      zone: "Royal Docks / Canning Town / Stratford / Newham growth belt",
      score: 94,
      segment: "New homes, regeneration zones, renters, landlords, property managers",
      bestServices: ["end-of-tenancy", "new-build sparkle cleans", "communal cleaning", "property management cleaning"],
      campaignAngle: "New-build and rental turnover cleaning with AI-assisted scheduling to keep handovers moving.",
      cta: "Book a new-build or tenancy turnover clean"
    },
    {
      zone: "Wembley / Brent Cross / Cricklewood",
      score: 91,
      segment: "New completions, build-to-rent, mixed-use development, family renters",
      bestServices: ["residential cleaning", "communal area cleaning", "end-of-tenancy", "property manager care"],
      campaignAngle: "Cleaner shared spaces and faster tenant turnaround for growing residential developments.",
      cta: "Request a block or landlord cleaning plan"
    },
    {
      zone: "Nine Elms / Battersea / Clapham Junction",
      score: 90,
      segment: "High-value flats, professionals, renters, offices, hospitality",
      bestServices: ["premium residential cleaning", "end-of-tenancy", "office cleaning", "hospitality cleaning"],
      campaignAngle: "Premium cleaning support for time-poor professionals and managed buildings.",
      cta: "Get a tailored London cleaning quote"
    },
    {
      zone: "Canada Water / Elephant and Castle / Old Kent Road",
      score: 89,
      segment: "Regeneration, dense apartments, commercial space, young professionals",
      bestServices: ["office cleaning", "communal cleaning", "end-of-tenancy", "deep cleaning"],
      campaignAngle: "Smart cleaning and maintenance support for fast-changing London neighbourhoods.",
      cta: "Request cleaning support for your building"
    }
  ]
};

async function loadZones() {
  try {
    const response = await fetch("./data/london-target-zones.json");
    if (!response.ok) throw new Error("Unable to load JSON data");
    return response.json();
  } catch {
    return fallbackData;
  }
}

function zoneCard(zone) {
  const services = zone.bestServices.map((service) => `<span>${service}</span>`).join("");
  return `
    <article class="zone">
      <div class="zone-top">
        <div>
          <h3>${zone.zone}</h3>
          <p>${zone.segment}</p>
        </div>
        <div class="score">${zone.score}</div>
      </div>
      <div class="tags">${services}</div>
      <p><strong>Campaign:</strong> ${zone.campaignAngle}</p>
      <p><strong>CTA:</strong> ${zone.cta}</p>
    </article>
  `;
}

function renderZones(data, filter = "all") {
  const grid = document.querySelector("#zoneGrid");
  const zones = data.zones.filter((zone) => {
    if (filter === "all") return true;
    return zone.bestServices.some((service) => service.toLowerCase().includes(filter));
  });
  grid.innerHTML = zones.map(zoneCard).join("");
}

function bindCopyButton() {
  const button = document.querySelector("#copyClaim");
  const claim = "Because we use AI-assisted planning, UCM can reduce admin waste and build more efficient cleaning plans. That helps us offer clearer, more economical quotes without cutting service standards.";
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(claim);
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = "Copy campaign claim";
    }, 1200);
  });
}

loadZones().then((data) => {
  renderZones(data);
  document.querySelector("#serviceFilter").addEventListener("change", (event) => {
    renderZones(data, event.target.value);
  });
  bindCopyButton();
});
