(function () {
  "use strict";

  const LEADS_KEY = "ucm_leads_v1";
  const REELS_KEY = "ucm_reels_v1";

  const labels = {
    buyerType: {
      homeowner_tenant: "Homeowner or tenant",
      landlord_agent: "Landlord or agent",
      office_facilities: "Office or facilities",
      property_manager: "Property manager",
      other_business: "Other organisation"
    },
    serviceCode: {
      office_cleaning: "Office cleaning",
      commercial_cleaning: "Commercial cleaning",
      property_care: "Property care",
      end_of_tenancy: "End of tenancy",
      deep_cleaning: "Deep cleaning",
      technical_cleaning: "Technical cleaning",
      responsive_maintenance: "Responsive maintenance",
      handover_complete: "Handover Complete"
    },
    urgency: {
      planned: "Planning ahead",
      within_30_days: "Within 30 days",
      within_7_days: "Within 7 days",
      urgent_48_hours: "Urgent, within 48 hours"
    },
    status: {
      new: "New",
      qualified: "Qualified",
      site_visit: "Site visit",
      quote: "Quote",
      won: "Won",
      lost: "Lost",
      active: "Active",
      renewal: "Renewal"
    }
  };

  function read(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("ucm-store-change", { detail: { key } }));
  }

  function uid() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function cleanPostcode(value) {
    return String(value || "").trim().toUpperCase().replace(/\s+/g, " ");
  }

  function makeReference(date = new Date()) {
    const stamp = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("");
    const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
    return `UCM-${stamp}-${suffix}`;
  }

  function nextBusinessResponse(date = new Date()) {
    const due = new Date(date);
    const day = due.getDay();
    const insideWeek = day >= 1 && day <= 5;
    if (insideWeek && due.getHours() < 15) {
      due.setHours(17, 30, 0, 0);
      return due.toISOString();
    }
    do {
      due.setDate(due.getDate() + 1);
    } while (due.getDay() === 0 || due.getDay() === 6);
    due.setHours(12, 0, 0, 0);
    return due.toISOString();
  }

  function attribution() {
    const params = new URLSearchParams(window.location.search);
    return {
      sourceChannel: params.get("utm_source") || params.get("source") || "direct",
      sourceCampaign: params.get("utm_campaign") || "unattributed",
      sourceContent: params.get("utm_content") || "",
      sourceTerm: params.get("utm_term") || "",
      landingPath: `${window.location.pathname}${window.location.search}`
    };
  }

  function completeness(lead) {
    const checks = [
      lead.buyerType,
      lead.serviceCode,
      lead.postcode,
      lead.propertyType,
      lead.frequency,
      lead.urgency,
      lead.scopeDetails && lead.scopeDetails.length >= 20,
      lead.contactName,
      lead.email,
      lead.phone,
      lead.preferredContact,
      lead.privacyConsent
    ];
    const base = Math.round((checks.filter(Boolean).length / checks.length) * 90);
    const evidence = lead.files && lead.files.length && lead.mediaConsent ? 10 : 0;
    return Math.min(100, base + evidence);
  }

  function saveLead(input) {
    const leads = read(LEADS_KEY);
    const now = new Date();
    const lead = {
      id: input.id || uid(),
      reference: input.reference || makeReference(now),
      createdAt: input.createdAt || now.toISOString(),
      updatedAt: now.toISOString(),
      status: input.status || "new",
      owner: input.owner || "Unassigned",
      nextAction: input.nextAction || "Review enquiry and confirm service fit",
      nextActionAt: input.nextActionAt || nextBusinessResponse(now),
      responseDueAt: input.responseDueAt || nextBusinessResponse(now),
      respondedAt: input.respondedAt || null,
      lostReason: input.lostReason || "",
      demo: Boolean(input.demo),
      events: input.events || [{ type: "enquiry_received", note: "CleanScope enquiry received", createdAt: now.toISOString() }],
      ...input
    };
    lead.postcode = cleanPostcode(lead.postcode);
    lead.completenessScore = completeness(lead);
    const index = leads.findIndex((item) => item.id === lead.id);
    if (index >= 0) leads[index] = lead;
    else leads.unshift(lead);
    write(LEADS_KEY, leads);
    return lead;
  }

  function updateLead(id, patch, eventNote) {
    const leads = read(LEADS_KEY);
    const index = leads.findIndex((lead) => lead.id === id);
    if (index < 0) return null;
    const previous = leads[index];
    const now = new Date().toISOString();
    const events = [...(previous.events || [])];
    if (eventNote) {
      events.unshift({
        type: "lead_updated",
        note: eventNote,
        fromStatus: previous.status,
        toStatus: patch.status || previous.status,
        createdAt: now
      });
    }
    const updated = { ...previous, ...patch, events, updatedAt: now };
    updated.completenessScore = completeness(updated);
    leads[index] = updated;
    write(LEADS_KEY, leads);
    return updated;
  }

  function removeDemoLeads() {
    write(LEADS_KEY, read(LEADS_KEY).filter((lead) => !lead.demo));
  }

  function seedDemoLeads() {
    if (read(LEADS_KEY).some((lead) => lead.demo)) return read(LEADS_KEY);
    const now = Date.now();
    const samples = [
      {
        demo: true,
        createdAt: new Date(now - 48 * 60 * 1000).toISOString(),
        buyerType: "office_facilities",
        serviceCode: "office_cleaning",
        organisationName: "Demo: Riverside Workspace",
        contactName: "Demo contact",
        email: "demo@example.invalid",
        phone: "020 0000 0000",
        preferredContact: "email",
        postcode: "E14 5AB",
        propertyType: "Office",
        sizeEstimate: "Three floors",
        frequency: "daily",
        urgency: "within_30_days",
        scopeDetails: "Demo lead for a recurring office-cleaning site review and quality plan.",
        accessNotes: "Reception access",
        areas: ["workspaces", "washrooms", "kitchen"],
        files: [],
        mediaConsent: false,
        privacyConsent: true,
        marketingConsent: false,
        sourceChannel: "linkedin",
        sourceCampaign: "founder_authority",
        status: "new"
      },
      {
        demo: true,
        createdAt: new Date(now - 20 * 60 * 60 * 1000).toISOString(),
        buyerType: "property_manager",
        serviceCode: "property_care",
        organisationName: "Demo: North London Management",
        contactName: "Demo contact",
        email: "demo@example.invalid",
        phone: "020 0000 0001",
        preferredContact: "phone",
        postcode: "NW10 0AB",
        propertyType: "Managed residential building",
        sizeEstimate: "Two blocks",
        frequency: "several_weekly",
        urgency: "within_7_days",
        scopeDetails: "Demo communal-area service with responsive maintenance reporting.",
        accessNotes: "Key safe",
        areas: ["communal", "floors", "minor_repairs"],
        files: [{ name: "demo-lobby.jpg", type: "image/jpeg", size: 1200000 }],
        mediaConsent: true,
        privacyConsent: true,
        marketingConsent: false,
        sourceChannel: "facebook",
        sourceCampaign: "property_manager_care",
        status: "qualified",
        owner: "Carlos"
      },
      {
        demo: true,
        createdAt: new Date(now - 30 * 60 * 60 * 1000).toISOString(),
        buyerType: "landlord_agent",
        serviceCode: "handover_complete",
        organisationName: "Demo: East London Lettings",
        contactName: "Demo contact",
        email: "demo@example.invalid",
        phone: "020 0000 0002",
        preferredContact: "whatsapp",
        postcode: "E16 1DR",
        propertyType: "House or flat",
        sizeEstimate: "Two-bedroom flat",
        frequency: "one_off",
        urgency: "urgent_48_hours",
        scopeDetails: "Demo handover clean, snag observations and minor repair check.",
        accessNotes: "Vacant property",
        areas: ["kitchen", "washrooms", "floors", "minor_repairs"],
        files: [],
        mediaConsent: false,
        privacyConsent: true,
        marketingConsent: false,
        sourceChannel: "google_business_profile",
        sourceCampaign: "handover_complete",
        status: "quote",
        owner: "Sales team"
      }
    ];
    samples.forEach((sample) => saveLead(sample));
    return read(LEADS_KEY);
  }

  function leadsToCsv(leads) {
    const columns = ["reference", "createdAt", "status", "owner", "buyerType", "serviceCode", "organisationName", "contactName", "email", "phone", "postcode", "urgency", "sourceChannel", "sourceCampaign", "completenessScore"];
    const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    return [columns.join(","), ...leads.map((lead) => columns.map((column) => escape(lead[column])).join(","))].join("\r\n");
  }

  function getReels() {
    return read(REELS_KEY);
  }

  function saveReel(input) {
    const reels = getReels();
    const now = new Date().toISOString();
    const reel = {
      id: input.id || uid(),
      createdAt: input.createdAt || now,
      updatedAt: now,
      reviewRound: 0,
      status: "draft",
      ...input
    };
    const index = reels.findIndex((item) => item.id === reel.id);
    if (index >= 0) reels[index] = reel;
    else reels.unshift(reel);
    write(REELS_KEY, reels);
    return reel;
  }

  window.UCMHub = {
    LEADS_KEY,
    REELS_KEY,
    labels,
    attribution,
    completeness,
    getLeads: () => read(LEADS_KEY),
    saveLead,
    updateLead,
    seedDemoLeads,
    removeDemoLeads,
    leadsToCsv,
    getReels,
    saveReel
  };
})();
