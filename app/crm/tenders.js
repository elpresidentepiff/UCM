const STORAGE_KEY = "ucm-tender-control-v1";
const READINESS_KEY = "ucm-rm6264-readiness-v1";

const routeLabels = {
  "live-opportunity": "Live / pipeline",
  "public-portal": "Public portal",
  housing: "Housing / framework",
  "fm-prime": "FM prime",
  accreditation: "Accreditation"
};

const registrationLabels = {
  "not-started": "Not started",
  researching: "Researching",
  "in-progress": "In progress",
  registered: "Registered",
  "not-required": "Not required"
};

const applicationLabels = {
  "not-started": "Not started",
  preparing: "Preparing",
  submitted: "Submitted",
  ongoing: "Ongoing",
  monitor: "Monitor",
  subcontract: "Subcontract route",
  closed: "Closed",
  blocked: "Blocked"
};

const official = {
  rm6264: "https://www.gca.gov.uk/agreements/RM6264",
  srs: "https://supplierregistration.cabinetoffice.gov.uk/organisation/register",
  fts: "https://www.find-tender.service.gov.uk/Search?aff=government+tenders",
  contracts: "https://www.contractsfinder.service.gov.uk/",
  procontract: "https://procontract.due-north.com/"
};

function record(id, buyer, type, opportunity, route, value, priority, registration, application, contact, email, portal, notice, deadline, nextAction, requirements, notes) {
  return {
    id, buyer, type, opportunity, route, value, priority, registration, application,
    contact, email, portal, notice, deadline, nextAction, requirements, notes,
    owner: "Unassigned", lastContacted: "", activity: []
  };
}

const initialRecords = [
  record("rm6264", "Government Commercial Agency", "live-opportunity", "RM6264 Facilities Management and Workplace Services DPS", "DPS admission and filtered competitions", "GBP 500m aggregate; no revenue guarantee", 0, "in-progress", "preparing", "GCA customer services", "info@gca.gov.uk", official.srs, official.rm6264, "Open until 23 Feb 2029", "Complete evidence pack, SRS registration and financial review before applying.", ["EL GBP 5m", "PL GBP 1m", "PI GBP 1m", "Cyber Essentials", "Financial viability", "Carbon and social value", "Monthly MI", "1% levy"], "Best immediate national framework route. Start with credible London services and low value bands. Passing admission only creates access to filtered competitions."),
  record("anchor", "Anchor Hanover Group", "live-opportunity", "Supply of Contract Cleaning Services", "Direct tender via Anchor supplier portal", "Estimated GBP 38.5m excl. VAT", 0, "not-started", "monitor", "Procurement team", "procurement@anchor.org.uk", "https://anchor.my.site.com/s/Welcome", "https://www.find-tender.service.gov.uk/Notice/022472-2025", "Check immediately", "Register on Anchor portal and confirm whether the June 2026 tender was published.", ["Communal housing", "Local contractor model", "London coverage", "Mobilisation capacity", "Resident safeguarding"], "Large national value across about 1,000 communal housing locations. UCM should target London packages, not imply capacity for the whole contract."),
  record("gla-cleaning", "Greater London Authority", "live-opportunity", "Cleaning and Porterage Services", "Public tender / specialist subcontract", "Estimated GBP 6.2m excl. VAT", 0, "not-started", "monitor", "Soft FM procurement", "SoftFMProcurement@tfl.gov.uk", "https://www.find-tender.service.gov.uk/", "https://www.find-tender.service.gov.uk/Notice/075901-2025", "Check notice now", "Confirm formal tender status and map technical-room experience to a specialist subcontract offer.", ["Office cleaning", "Porterage", "Window cleaning", "Secure equipment rooms", "High-level cleaning", "London mobilisation"], "Potentially beyond UCM's present prime-contract scale. Stronger first position: specialist technical cleaning or local delivery partner."),
  record("kingston", "Royal Borough of Kingston upon Thames", "live-opportunity", "Cleaning Services Contract, DN797007", "London Tenders Portal / ProContract", "Estimated GBP 4m excl. VAT", 0, "not-started", "monitor", "Commissioning Team", "commissioning@kingston.gov.uk", official.procontract, "https://www.find-tender.service.gov.uk/Notice/072553-2025", "Tender was expected Apr 2026", "Search DN797007 on ProContract and email commissioning for the current procurement position.", ["Corporate estate", "Community estate", "Porterage", "Innovation", "Sustainability", "SME suitable"], "The preliminary market engagement deadline has passed. The notice estimated a September 2026 contract start, so status requires immediate verification."),
  record("places-london", "Places for London", "live-opportunity", "Soft Facilities Management", "Subcontract or future renewal route", "Awarded value about GBP 25.1m", 2, "not-required", "subcontract", "FM opportunity team", "PlacesFMopportunity@tfl.gov.uk", "https://www.find-tender.service.gov.uk/", "https://www.find-tender.service.gov.uk/Notice/037444-2025", "Awarded / closed", "Identify the awarded prime and prepare a specialist London subcontract capability introduction.", ["Technical cleaning", "Transport environment", "Accreditations", "Rapid response"], "Not open for a direct UCM bid. Keep only as a prime-contractor relationship route."),
  record("tfl-pan", "Transport for London", "live-opportunity", "Pan-TfL Cleaning Services", "Mitie subcontract route", "Awarded", 2, "not-required", "subcontract", "Soft FM team", "smbonefm@tfl.gov.uk", "https://www.find-tender.service.gov.uk/", "https://www.find-tender.service.gov.uk/Notice/002468-2026", "Awarded / closed", "Approach Mitie supplier onboarding with UCM technical and responsive-cleaning evidence.", ["Rail environment", "Safety systems", "London coverage", "Prime onboarding"], "The direct procurement is closed. Commercial value now depends on subcontract positioning, not monitoring the old notice."),

  record("find-tender", "Find a Tender", "public-portal", "UK above-threshold public procurements", "Register, save searches and watch notices", "Multiple", 1, "not-started", "monitor", "Portal support", "", official.fts, official.fts, "Weekly", "Create supplier account and saved searches for CPV 90900000, 90910000 and London.", ["Supplier account", "Saved searches", "Weekly review"], "Core free discovery channel. Watching notices does not replace registration on the buyer's tender portal."),
  record("contracts-finder", "Contracts Finder", "public-portal", "England public contracts and opportunities", "Saved search and direct buyer links", "Multiple", 1, "not-started", "monitor", "Portal support", "", official.contracts, official.contracts, "Weekly", "Create saved cleaning and facilities searches; record only commercially viable leads.", ["Search profile", "CPV codes", "London filter"], "Core free source, especially for lower-value public opportunities."),
  record("capital-esourcing", "capitalEsourcing", "public-portal", "London borough and public-body tenders", "Supplier registration and alerts", "Multiple", 1, "not-started", "not-started", "Portal support", "", "https://www.capitalesourcing.com/", "https://www.capitalesourcing.com/", "This month", "Register UCM and configure cleaning/FM alerts for participating London authorities.", ["Company details", "Insurance", "Policies", "Alert profile"], "Relevant authorities include Westminster, Hammersmith & Fulham, Havering, Hillingdon, Newham and Kensington & Chelsea."),
  record("procontract", "ProContract / Due North", "public-portal", "Council, housing and regional tenders", "Supplier registration and opportunity search", "Multiple", 0, "not-started", "not-started", "Portal support", "", official.procontract, official.procontract, "Immediate", "Register and search DN797007 plus London cleaning opportunities.", ["Company profile", "CPV codes", "Email alerts"], "Priority because Kingston directs suppliers to this portal."),
  record("delta", "Delta eSourcing", "public-portal", "Public and regulated-sector tenders", "Supplier registration and alerts", "Multiple", 1, "not-started", "not-started", "Portal support", "", "https://ukifs.delta-esourcing.com/delta/signup.html?userType=supplier", "https://ukifs.delta-esourcing.com/delta/signup.html?userType=supplier", "This month", "Create supplier account and cleaning/FM alert profile.", ["Company identity", "Service categories", "Alerts"], "Widely used portal. Register once, then judge each buyer and contract separately."),
  record("intend", "In-Tend", "public-portal", "Public bodies, universities and local authorities", "Supplier portal network", "Multiple", 1, "not-started", "monitor", "Portal support", "", "https://www.in-tendhost.co.uk/", "https://www.in-tendhost.co.uk/", "This month", "Identify relevant London In-Tend buyer portals and register only where cleaning demand exists.", ["Buyer selection", "Company profile", "Alerts"], "In-Tend hosts separate buyer portals; one generic visit does not necessarily register UCM with every buyer."),
  record("city-london", "City of London Corporation", "public-portal", "City supplier opportunities", "Supplier information and tender portal route", "Multiple", 1, "not-started", "monitor", "Commercial service", "", "https://www.cityoflondon.gov.uk/supporting-businesses/tenders-and-procurement/supplier-information", "https://www.cityoflondon.gov.uk/supporting-businesses/tenders-and-procurement/supplier-information", "This month", "Follow official supplier route and configure cleaning, property and technical-service alerts.", ["Supplier registration", "City delivery evidence", "Compliance"], "High relevance to UCM's office and technical-cleaning history."),
  record("competefor", "CompeteFor", "public-portal", "Supply-chain opportunities from major projects", "Supplier profile and opportunity alerts", "Multiple", 1, "not-started", "monitor", "Portal support", "", "https://www.competefor.com/about/", "https://www.competefor.com/about/", "This month", "Create a detailed SME capability profile using approved evidence and London coverage.", ["Capability statement", "CPV categories", "Case evidence"], "Useful for subcontract opportunities flowing from large public and infrastructure contracts."),
  record("nhs-atamis", "NHS Atamis", "public-portal", "NHS procurement opportunities", "Health Family supplier portal", "Multiple", 3, "not-started", "monitor", "NHS commercial support", "", "https://www.england.nhs.uk/nhs-commercial/supplying-to-the-nhs/", "https://www.england.nhs.uk/nhs-commercial/supplying-to-the-nhs/", "After healthcare readiness", "Research non-clinical opportunities only; do not claim clinical capability.", ["Atamis registration", "NHS standards", "Clinical boundaries", "Workforce checks"], "Future route. UCM should not market hospital-grade delivery until the required evidence, controls and experience are established."),
  record("met-police", "Metropolitan Police", "public-portal", "Met supplier and subcontract opportunities", "Official supplier guidance / CompeteFor", "Multiple", 2, "not-started", "monitor", "Supplier portal", "", "https://www.met.police.uk/police-forces/metropolitan-police/areas/about-us/about-the-met/commercial-services/information-for-suppliers/become-a-met-supplier/", "https://www.met.police.uk/police-forces/metropolitan-police/areas/about-us/about-the-met/commercial-services/information-for-suppliers/become-a-met-supplier/", "Build readiness first", "Review security, vetting and supplier requirements before selecting a realistic route.", ["Security requirements", "Vetting", "Insurance", "CompeteFor profile"], "Potentially attractive but operational and security requirements may exceed current readiness."),

  record("clarion", "Clarion Housing Group", "housing", "Housing cleaning and property-care tenders", "Direct supplier opportunity portal", "Multiple", 1, "not-started", "monitor", "Supplier portal", "", "https://www.clarionhg.com/about-us/partner-with-us/tender-opportunities", "https://www.clarionhg.com/about-us/partner-with-us/tender-opportunities", "This month", "Register interest and build communal-area, void and responsive-care capability pack.", ["Housing evidence", "Resident safety", "Social value", "London coverage"], "Strong buyer fit for recurring communal cleaning and Handover Complete."),
  record("lq", "L&Q", "housing", "Goods and services supplier route", "Direct housing-association registration", "Multiple", 1, "not-started", "monitor", "Supplier portal", "", "https://www.lqgroup.org.uk/contact-us/supplying-goods-and-services-to-lq", "https://www.lqgroup.org.uk/contact-us/supplying-goods-and-services-to-lq", "This month", "Complete supplier route and position cleaning plus minor repairs for London estates.", ["Housing compliance", "Safeguarding", "Social value", "Service evidence"], "High strategic relevance because UCM combines cleaning and maintenance."),
  record("peabody", "Peabody", "housing", "Business with us / estate services", "Direct housing supplier route", "Multiple", 1, "not-started", "monitor", "Supplier portal", "", "https://www.peabodygroup.org.uk/about-us/who-we-are/business-with-us/", "https://www.peabodygroup.org.uk/about-us/who-we-are/business-with-us/", "This month", "Register and monitor estate cleaning, void and responsive-maintenance categories.", ["London estates", "Resident service", "Compliance", "Social value"], "Strong London portfolio fit; use evidence-led local capability, not generic cleaning claims."),
  record("chic", "CHIC", "housing", "Facilities management frameworks", "Framework / member supply chain", "Multiple", 2, "not-started", "monitor", "Supplier portal", "", "https://www.chicltd.co.uk/services/facilities-managment/", "https://www.chicltd.co.uk/services/facilities-managment/", "Monitor framework windows", "Map UCM services to future FM framework lots and supplier engagement.", ["Framework window", "Housing references", "Geographic coverage"], "Useful route when a relevant framework reopens; not an automatic direct opportunity."),
  record("fusion21", "Fusion21", "housing", "Cleaning Services Framework", "Framework monitoring / awarded suppliers", "Closed framework", 3, "not-required", "closed", "Supplier portal", "", "https://www.fusion21.co.uk/lot/cleaning-services", "https://www.fusion21.co.uk/lot/cleaning-services", "Closed; monitor renewal", "Record next framework renewal and identify current prime suppliers for local subcontract discussions.", ["Framework cycle", "Prime mapping"], "Do not spend time trying to apply to a closed framework."),
  record("espo", "ESPO", "housing", "Supplier framework hub", "Framework and tender monitoring", "Multiple", 2, "not-started", "monitor", "Supplier hub", "", "https://www.espo.org/supplier-hub", "https://www.espo.org/supplier-hub", "Monthly", "Register alerts and monitor cleaning, facilities and property-service framework windows.", ["Supplier profile", "Framework alerts"], "Potential national route; prioritise only frameworks with realistic London access."),
  record("ypo", "YPO", "housing", "Public-sector supplier opportunities", "Framework and tender monitoring", "Multiple", 2, "not-started", "monitor", "Supplier portal", "", "https://www.ypo.co.uk/suppliers", "https://www.ypo.co.uk/suppliers", "Monthly", "Register supplier interest and monitor relevant cleaning/FM opportunities.", ["Supplier profile", "Framework alerts"], "Long-term framework route, secondary to live London demand."),
  record("lupc", "London Universities Purchasing Consortium", "housing", "Security and Cleaning Framework", "Awarded framework / subcontract", "Closed / awarded", 3, "not-required", "subcontract", "Procurement portal", "", "https://www.lupc.ac.uk/", "https://www.find-tender.service.gov.uk/procurement/ocds-h6vhtk-0544db", "Monitor renewal", "Identify awarded cleaning suppliers and test a technical or specialist subcontract proposition.", ["Higher education", "Prime onboarding", "Technical cleaning"], "Direct framework entry is closed."),
  record("rm6232", "Government Commercial Agency", "housing", "RM6232 FM and Workplace Services", "Existing framework suppliers only", "Closed to new suppliers", 3, "not-required", "closed", "GCA customer services", "info@gca.gov.uk", "https://www.gca.gov.uk/agreements/RM6232", "https://www.gca.gov.uk/agreements/RM6232", "Closed", "Use RM6264 instead; map RM6232 primes only for subcontract opportunities.", ["Prime mapping"], "Not a route for direct new supplier admission."),
  record("rm6378", "Government Commercial Agency", "housing", "RM6378 Open FM framework", "Future reopening / open-framework monitoring", "Multiple", 2, "not-started", "monitor", "GCA customer services", "info@gca.gov.uk", "https://www.gca.gov.uk/agreements/RM6378", "https://www.gca.gov.uk/agreements/RM6378", "Monitor reopening", "Review official lot structure and next supplier admission window.", ["Admission window", "Financial capacity", "Lot fit"], "Potential future route. Do not divert effort from RM6264 until a real admission window is confirmed."),

  record("ocs", "OCS Group", "fm-prime", "Approved supply-chain / cleaning subcontract", "Supplier onboarding, generally invitation-led", "Subcontract", 1, "not-started", "not-started", "Supplier guidance", "", "https://ocs.com/uk/ocs-procurement-supplier-hub/supplier-guidance/", "https://ocs.com/uk/ocs-procurement-supplier-hub/supplier-guidance/", "After capability pack", "Prepare specialist cleaning capability statement and verify onboarding requirements.", ["SafeContractor may be required", "Insurance", "Policies", "References"], "Approach with a specific gap UCM can fill, not a generic request to be added to a database."),
  record("mitie", "Mitie", "fm-prime", "London specialist cleaning subcontract", "Supply-chain introduction", "Subcontract", 0, "not-started", "not-started", "Supplier / contact route", "", "https://www.mitie.com/contact-us/", "https://www.mitie.com/contact-us/", "Immediate after pack", "Target the awarded Pan-TfL supply chain with technical and reactive-cleaning proof.", ["Supplier onboarding", "Safety", "Technical evidence", "London response"], "High-priority prime because of known TfL cleaning award and UCM's technical background."),
  record("cbre", "CBRE", "fm-prime", "Supplier diversity and local FM supply chain", "Supplier registration", "Subcontract", 1, "not-started", "not-started", "Supplier diversity", "", "https://www.cbre.co.uk/about-us/corporate-responsibility/supplier-diversity-program", "https://www.cbre.co.uk/about-us/corporate-responsibility/supplier-diversity-program", "This month", "Register with a focused office, technical and multi-site London capability profile.", ["Supplier profile", "Diversity data", "Insurance", "Evidence"], "Potential access to large corporate portfolios; onboarding alone does not create work."),
  record("iss", "ISS UK", "fm-prime", "Specialist and local cleaning supply chain", "Supplier relations route", "Subcontract", 1, "not-started", "not-started", "Supplier relations", "", "https://www.issworld.com/our-approach/supplier-relations", "https://www.issworld.com/our-approach/supplier-relations", "This month", "Identify UK onboarding channel and send a role-specific capability introduction.", ["Supplier code", "ESG", "Insurance", "Service evidence"], "Lead with technical cleaning, short-notice recovery and London reach."),
  record("equans", "EQUANS UK", "fm-prime", "London FM supply chain", "Targeted supplier introduction", "Subcontract", 2, "not-started", "not-started", "Contact to verify", "", "https://www.equans.co.uk/", "https://www.equans.co.uk/", "After priority primes", "Find official UK supply-chain onboarding route and identify relevant London contracts.", ["Onboarding route", "Safety", "References"], "Research contact before sending; do not scrape or guess procurement emails."),
  record("wates", "Wates Group", "fm-prime", "Property and facilities supply chain", "Supply-chain registration", "Subcontract", 2, "not-started", "not-started", "Supply chain team", "", "https://www.wates.co.uk/supply-chain/", "https://www.wates.co.uk/supply-chain/", "After capability pack", "Review supply-chain requirements and position Handover Complete and specialist cleaning.", ["Constructionline may be required", "Safety", "Property evidence"], "Good fit for post-construction handover, minor repairs and cleaning."),
  record("atlas", "Atlas FM", "fm-prime", "Regional specialist cleaning support", "Targeted partnership approach", "Subcontract", 2, "not-started", "not-started", "Contact to verify", "", "https://atlasfm.com/", "https://atlasfm.com/", "Build target contact", "Identify London operations or procurement lead and test overflow/specialist need.", ["Capability pack", "References", "Capacity"], "Partnership hypothesis only until buyer need is confirmed."),
  record("bellrock", "Bellrock Property & Facilities Management", "fm-prime", "Specialist service partner", "Targeted supplier introduction", "Subcontract", 2, "not-started", "not-started", "Contact to verify", "", "https://www.bellrockgroup.co.uk/", "https://www.bellrockgroup.co.uk/", "Build target contact", "Find official supplier onboarding and map London managed sites.", ["Supplier onboarding", "Compliance", "Property services"], "Potential fit for combined cleaning and responsive maintenance."),
  record("pinnacle", "Pinnacle Group", "fm-prime", "Housing and community FM supply chain", "Targeted supplier introduction", "Subcontract", 1, "not-started", "not-started", "Contact to verify", "", "https://www.pinnaclegroup.co.uk/", "https://www.pinnaclegroup.co.uk/", "This month", "Target housing estate and communal-area delivery teams with Handover Complete.", ["Housing delivery", "Safeguarding", "Social value"], "Stronger strategic fit than generic corporate FM because of housing and community portfolios."),
  record("pareto", "Pareto FM", "fm-prime", "Technical FM cleaning partner", "Targeted supplier introduction", "Subcontract", 1, "not-started", "not-started", "Contact to verify", "", "https://paretofm.com/", "https://paretofm.com/", "This month", "Present UCM's technical-cleaning origin and data/IT-room capability.", ["Technical evidence", "Insurance", "References"], "Good narrative fit if approved historic evidence is available."),
  record("bam", "BAM FM", "fm-prime", "Construction handover and FM supply chain", "Supplier onboarding research", "Subcontract", 2, "not-started", "not-started", "Contact to verify", "", "https://www.bam.co.uk/", "https://www.bam.co.uk/", "After accreditation review", "Find supplier route and position Handover Complete for London projects.", ["Construction compliance", "Safety", "Handover evidence"], "May require construction-sector accreditations before serious engagement."),
  record("sodexo", "Sodexo UK", "fm-prime", "Specialist cleaning supply chain", "Supplier onboarding research", "Subcontract", 2, "not-started", "not-started", "Contact to verify", "", "https://uk.sodexo.com/", "https://uk.sodexo.com/", "After priority primes", "Find official UK supplier route and select a specific London service proposition.", ["Supplier standards", "ESG", "Insurance"], "Large organisation; generic outreach will be ignored."),
  record("jll", "JLL UK", "fm-prime", "Managed office portfolio supplier", "Targeted local supplier introduction", "Subcontract", 2, "not-started", "not-started", "Contact to verify", "", "https://www.jll.co.uk/", "https://www.jll.co.uk/", "Build account map", "Identify London property-management procurement and pitch measurable Proof Passport delivery.", ["Corporate offices", "ESG evidence", "Reporting", "Insurance"], "Potential route to offices but requires evidence, reporting and enterprise-grade responsiveness."),
  record("savills", "Savills UK", "fm-prime", "Managed property cleaning supplier", "Local property-management introduction", "Subcontract", 1, "not-started", "not-started", "Contact to verify", "", "https://www.savills.co.uk/", "https://www.savills.co.uk/", "This month", "Map London property-management teams and lead with communal, handover and responsive care.", ["Managed properties", "Reporting", "References"], "Strong target for local property and building management relationships."),
  record("cushman", "Cushman & Wakefield UK", "fm-prime", "Managed commercial-property supplier", "Targeted local supplier introduction", "Subcontract", 2, "not-started", "not-started", "Contact to verify", "", "https://www.cushmanwakefield.com/en/united-kingdom", "https://www.cushmanwakefield.com/en/united-kingdom", "Build account map", "Identify London facilities and property teams; prepare office and technical capability case.", ["Commercial property", "Reporting", "Insurance"], "Enterprise route requiring a specific buyer and site opportunity."),

  record("chas", "CHAS", "accreditation", "Health and safety / supply-chain accreditation", "Paid accreditation assessment", "Annual cost", 1, "not-started", "not-started", "Sales / assessment", "", "https://www.chas.co.uk/", "https://www.chas.co.uk/", "Cost and gap review", "Get a written quote and map which target buyers actually require CHAS.", ["Health and safety system", "Insurance", "Policies", "Assessment fee"], "Buy only when it unlocks named opportunities. A badge without a buyer route is overhead."),
  record("safecontractor", "SafeContractor", "accreditation", "Contractor health, safety and sustainability accreditation", "Paid accreditation assessment", "Annual cost", 1, "not-started", "not-started", "Sales / assessment", "", "https://www.safecontractor.com/en-gb/", "https://www.safecontractor.com/en-gb/", "Cost and gap review", "Confirm OCS and other prime requirements, then obtain scope and price.", ["Health and safety", "Insurance", "Assessment", "Sustainability"], "Potentially useful for FM-prime onboarding. Verify demand before paying."),
  record("constructionline", "Constructionline", "accreditation", "Construction and property supply-chain profile", "Paid membership / verification", "Annual cost", 2, "not-started", "not-started", "Membership team", "", "https://www.constructionline.co.uk/", "https://www.constructionline.co.uk/", "After Handover Complete demand", "Assess whether Wates, BAM and handover buyers require a specific membership level.", ["Company verification", "Safety", "Financials", "References"], "Relevant only if UCM actively targets construction handover and minor works."),
  record("achilles", "Achilles UVDB", "accreditation", "Utilities supply-chain qualification", "Paid pre-qualification", "Annual cost", 3, "not-started", "monitor", "Membership team", "", "https://www.achilles.com/uvdb-powered-by-achilles-for-buyers/", "https://www.achilles.com/uvdb-powered-by-achilles-for-buyers/", "Future technical vertical", "Do not buy until UCM has a named utility or infrastructure opportunity.", ["Utility standards", "Safety", "Financials", "Assessment fee"], "Potential future technical-cleaning route, but currently a distraction without buyer demand.")
];

const initialReadiness = [
  { id: "legal", group: "Identity", item: "Legal entity and company number", evidence: "Universal Cleaning & Maintenance Services Ltd, 12265169", status: "complete" },
  { id: "pack", group: "Identity", item: "RM6264 bid pack downloaded", evidence: "Confirm current version and retain source documents", status: "complete" },
  { id: "srs", group: "Identity", item: "Supplier Registration Service account", evidence: "Account, authorised user and recovery details", status: "required" },
  { id: "duns", group: "Identity", item: "D-U-N-S and trading-name match", evidence: "Legal and trading identities must reconcile", status: "required" },
  { id: "vat", group: "Identity", item: "VAT and tax information", evidence: "Confirm status and current certificates", status: "required" },
  { id: "el", group: "Insurance", item: "Employers' liability GBP 5m", evidence: "Current schedule and expiry date", status: "required" },
  { id: "pl", group: "Insurance", item: "Public liability GBP 1m", evidence: "Current schedule and scope", status: "required" },
  { id: "pi", group: "Insurance", item: "Professional indemnity GBP 1m", evidence: "Confirm quotation and appropriate scope", status: "required" },
  { id: "cyber", group: "Security", item: "Cyber Essentials", evidence: "Certificate required for appointment", status: "required" },
  { id: "accounts", group: "Finance", item: "Full financial information", evidence: "2022-2025 accounts plus management context", status: "required" },
  { id: "fvra", group: "Finance", item: "Financial viability assessment", evidence: "Attachment 3a completed with accountant", status: "required" },
  { id: "equality", group: "Policies", item: "Equality and diversity", evidence: "Approved policy, owner and review date", status: "required" },
  { id: "data", group: "Policies", item: "Data protection and security", evidence: "Policy, ICO status and processing controls", status: "required" },
  { id: "slavery", group: "Policies", item: "Modern slavery controls", evidence: "Proportionate policy and supply-chain checks", status: "required" },
  { id: "supplier-code", group: "Policies", item: "Supplier code acceptance", evidence: "Named owner and documented acceptance", status: "required" },
  { id: "carbon", group: "Policies", item: "Carbon reduction and net-zero response", evidence: "Measured baseline or defensible plan; no invented claims", status: "required" },
  { id: "social", group: "Delivery", item: "Social value evidence", evidence: "Specific London jobs, training and community outcomes", status: "required" },
  { id: "filters", group: "Delivery", item: "Service, location and value filters", evidence: "Select only evidenced capabilities and deliverable bands", status: "required" },
  { id: "mi", group: "Delivery", item: "MI, levy and contract administration", evidence: "Owner for monthly returns, including nil returns, and 1% levy", status: "required" },
  { id: "contacts", group: "Delivery", item: "Named operational contacts", evidence: "Commercial, finance, data, contract and escalation owners", status: "required" }
];

let records = loadState();
let readiness = loadReadiness();
let selectedId = null;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved)) return clone(initialRecords);
    return initialRecords.map((base) => ({ ...base, ...(saved.find((item) => item.id === base.id) || {}) }));
  } catch {
    return clone(initialRecords);
  }
}

function loadReadiness() {
  try {
    const saved = JSON.parse(localStorage.getItem(READINESS_KEY));
    if (!Array.isArray(saved)) return clone(initialReadiness);
    return initialReadiness.map((base) => ({ ...base, ...(saved.find((item) => item.id === base.id) || {}) }));
  } catch {
    return clone(initialReadiness);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function saveReadiness() {
  localStorage.setItem(READINESS_KEY, JSON.stringify(readiness));
}

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function displayDate(value) {
  if (!value) return "Not contacted";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.valueOf()) ? value : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function today() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function statusBadge(value, labels) {
  return `<span class="status ${esc(value)}">${esc(labels[value] || value)}</span>`;
}

function filteredRecords() {
  const search = document.querySelector("#searchInput").value.trim().toLowerCase();
  const type = document.querySelector("#typeFilter").value;
  const registration = document.querySelector("#registrationFilter").value;
  const application = document.querySelector("#applicationFilter").value;
  const priority = document.querySelector("#priorityFilter").value;
  return records.filter((item) => {
    const haystack = [item.buyer, item.opportunity, item.route, item.email, item.nextAction, item.notes].join(" ").toLowerCase();
    return (!search || haystack.includes(search))
      && (type === "all" || item.type === type)
      && (registration === "all" || item.registration === registration)
      && (application === "all" || item.application === application)
      && (priority === "all" || String(item.priority) === priority);
  });
}

function renderMetrics() {
  document.querySelector("#metricTotal").textContent = records.length;
  document.querySelector("#metricPriority").textContent = records.filter((item) => item.priority <= 1 && !["closed", "submitted"].includes(item.application)).length;
  document.querySelector("#metricRegistered").textContent = records.filter((item) => item.registration === "registered").length;
  document.querySelector("#metricActive").textContent = records.filter((item) => ["submitted", "ongoing"].includes(item.application)).length;
  document.querySelector("#metricBlocked").textContent = records.filter((item) => item.application === "blocked").length;
}

function renderPriorityQueue() {
  const queue = records
    .filter((item) => item.priority <= 1 && !["closed", "submitted", "ongoing"].includes(item.application))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);
  document.querySelector("#priorityQueue").innerHTML = queue.map((item) => `
    <article class="priority-item">
      <div class="priority-item-top"><span class="priority-code">P${item.priority} / ${esc(routeLabels[item.type])}</span>${statusBadge(item.application, applicationLabels)}</div>
      <h3>${esc(item.buyer)}</h3>
      <p>${esc(item.nextAction)}</p>
      <button type="button" data-open="${esc(item.id)}">Open route</button>
    </article>
  `).join("");
}

function renderTable() {
  const list = filteredRecords();
  document.querySelector("#resultCount").textContent = `${list.length} route${list.length === 1 ? "" : "s"}`;
  document.querySelector("#tenderRows").innerHTML = list.map((item) => `
    <tr data-id="${esc(item.id)}" class="${selectedId === item.id ? "selected" : ""}">
      <td class="buyer-cell"><strong>${esc(item.buyer)}</strong><small>${esc(routeLabels[item.type])} · ${esc(item.route)}</small></td>
      <td class="opportunity-cell"><strong>${esc(item.opportunity)}</strong><small>${esc(item.value)}</small></td>
      <td><span class="priority-pill p${item.priority}">P${item.priority}</span></td>
      <td>${statusBadge(item.registration, registrationLabels)}</td>
      <td>${statusBadge(item.application, applicationLabels)}</td>
      <td class="contact-cell">${item.email ? `<a href="mailto:${esc(item.email)}">${esc(item.email)}</a>` : `<span>Portal contact</span>`}<small>${esc(displayDate(item.lastContacted))}</small></td>
      <td>${esc(item.deadline)}</td>
      <td class="next-cell">${esc(item.nextAction)}</td>
    </tr>
  `).join("") || `<tr><td colspan="8" class="empty">No routes match these filters.</td></tr>`;
}

function selectOptions(options, current) {
  return Object.entries(options).map(([value, label]) => `<option value="${esc(value)}" ${current === value ? "selected" : ""}>${esc(label)}</option>`).join("");
}

function renderDetail() {
  const panel = document.querySelector("#tenderDetail");
  const item = records.find((recordItem) => recordItem.id === selectedId);
  if (!item) {
    panel.hidden = true;
    panel.innerHTML = "";
    return;
  }
  const sourceLinks = [
    item.portal ? `<a href="${esc(item.portal)}" target="_blank" rel="noreferrer">Open portal</a>` : "",
    item.notice && item.notice !== item.portal ? `<a href="${esc(item.notice)}" target="_blank" rel="noreferrer">Official notice / source</a>` : ""
  ].filter(Boolean).join(" · ");
  const activity = item.activity?.length
    ? item.activity.slice().reverse().map((entry) => `<div class="activity-item"><strong>${esc(entry.action)}</strong>${esc(displayDate(entry.date))}${entry.note ? ` · ${esc(entry.note)}` : ""}</div>`).join("")
    : `<p class="empty-activity">No UCM contact or application activity has been recorded.</p>`;
  panel.hidden = false;
  panel.innerHTML = `
    <div class="tender-detail-head">
      <div><p class="eyebrow">P${item.priority} / ${esc(routeLabels[item.type])}</p><h3>${esc(item.buyer)}</h3><p>${esc(item.opportunity)}</p></div>
      <button class="close-detail" type="button" aria-label="Close details"><i data-lucide="x"></i></button>
    </div>
    <div class="tender-detail-body">
      <div class="detail-main">
        <div class="fact-grid">
          <div><span>Route</span><strong>${esc(item.route)}</strong></div>
          <div><span>Value</span><strong>${esc(item.value)}</strong></div>
          <div><span>Deadline / review</span><strong>${esc(item.deadline)}</strong></div>
          <div><span>Contact</span><strong>${esc(item.contact)}</strong></div>
          <div><span>Email</span>${item.email ? `<a href="mailto:${esc(item.email)}">${esc(item.email)}</a>` : "<strong>Use official portal</strong>"}</div>
          <div><span>Official source</span>${sourceLinks || "<strong>Verify source</strong>"}</div>
        </div>
        <div class="requirements"><h4>Requirements and gates</h4><div class="requirement-tags">${item.requirements.map((requirement) => `<span>${esc(requirement)}</span>`).join("")}</div></div>
        <p class="detail-notes">${esc(item.notes)}</p>
      </div>
      <div class="detail-control">
        <div class="control-grid">
          <label><span>Registration</span><select data-field="registration">${selectOptions(registrationLabels, item.registration)}</select></label>
          <label><span>Application</span><select data-field="application">${selectOptions(applicationLabels, item.application)}</select></label>
          <label><span>Priority</span><select data-field="priority">${[0,1,2,3].map((value) => `<option value="${value}" ${item.priority === value ? "selected" : ""}>P${value}</option>`).join("")}</select></label>
          <label><span>Owner</span><input data-field="owner" value="${esc(item.owner)}"></label>
          <label class="wide"><span>Deadline / review point</span><input data-field="deadline" value="${esc(item.deadline)}"></label>
          <label class="wide"><span>Next action</span><input data-field="nextAction" value="${esc(item.nextAction)}"></label>
        </div>
        <div class="contact-actions">
          ${item.email ? `<a href="mailto:${esc(item.email)}?subject=${encodeURIComponent(`UCM supplier enquiry: ${item.opportunity}`)}"><i data-lucide="mail"></i>Email contact</a>` : ""}
          ${item.email ? `<button type="button" data-copy-email="${esc(item.email)}"><i data-lucide="copy"></i>Copy email</button>` : ""}
          <button type="button" data-contacted="${esc(item.id)}"><i data-lucide="check"></i>Mark contacted</button>
        </div>
        <div class="activity-block"><h4>Application history</h4><div class="activity-list">${activity}</div></div>
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function renderReadiness() {
  const counts = {
    complete: readiness.filter((item) => item.status === "complete").length,
    progress: readiness.filter((item) => item.status === "in-progress").length,
    required: readiness.filter((item) => item.status === "required").length
  };
  document.querySelector("#readinessComplete").textContent = counts.complete;
  document.querySelector("#readinessProgress").textContent = counts.progress;
  document.querySelector("#readinessRequired").textContent = counts.required;
  document.querySelector("#readinessRows").innerHTML = readiness.map((item) => `
    <div class="readiness-row">
      <div><strong>${esc(item.item)}</strong><small>${esc(item.group)}</small></div>
      <p>${esc(item.evidence)}</p>
      <select data-readiness="${esc(item.id)}" aria-label="${esc(item.item)} status">
        <option value="required" ${item.status === "required" ? "selected" : ""}>Required</option>
        <option value="in-progress" ${item.status === "in-progress" ? "selected" : ""}>In progress</option>
        <option value="complete" ${item.status === "complete" ? "selected" : ""}>Complete</option>
        <option value="not-applicable" ${item.status === "not-applicable" ? "selected" : ""}>Not applicable</option>
      </select>
    </div>
  `).join("");
}

function renderAll() {
  renderMetrics();
  renderPriorityQueue();
  renderTable();
  renderDetail();
  renderReadiness();
  if (window.lucide) window.lucide.createIcons();
}

function updateSelected(field, value) {
  const item = records.find((recordItem) => recordItem.id === selectedId);
  if (!item) return;
  item[field] = field === "priority" ? Number(value) : value;
  saveState();
  renderMetrics();
  renderPriorityQueue();
  renderTable();
  showToast("Tender route updated locally.");
}

function markContacted(id) {
  const item = records.find((recordItem) => recordItem.id === id);
  if (!item) return;
  const date = today();
  item.lastContacted = date;
  item.activity = item.activity || [];
  item.activity.push({ date, action: "Contact recorded", note: item.email || "Official portal" });
  saveState();
  renderAll();
  showToast(`Contact recorded for ${item.buyer}.`);
}

async function copyEmail(email) {
  try {
    await navigator.clipboard.writeText(email);
    showToast("Email address copied.");
  } catch {
    showToast("Copy failed. Select the email address manually.");
  }
}

function exportCsv() {
  const headers = ["Buyer", "Route type", "Opportunity", "Value", "Priority", "Registration", "Application", "Contact", "Email", "Last contacted", "Deadline", "Owner", "Next action", "Portal", "Official source"];
  const rows = records.map((item) => [
    item.buyer, routeLabels[item.type], item.opportunity, item.value, `P${item.priority}`,
    registrationLabels[item.registration], applicationLabels[item.application], item.contact,
    item.email, item.lastContacted, item.deadline, item.owner, item.nextAction, item.portal, item.notice
  ]);
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `ucm-tender-register-${today()}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("Tender register exported.");
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.hidden = true; }, 2600);
}

document.querySelectorAll("#searchInput, #typeFilter, #registrationFilter, #applicationFilter, #priorityFilter").forEach((control) => {
  control.addEventListener(control.tagName === "INPUT" ? "input" : "change", renderTable);
});

document.querySelector("#tenderRows").addEventListener("click", (event) => {
  const row = event.target.closest("tr[data-id]");
  if (!row) return;
  selectedId = row.dataset.id;
  renderTable();
  renderDetail();
  document.querySelector("#tenderDetail").scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.querySelector("#priorityQueue").addEventListener("click", (event) => {
  const button = event.target.closest("[data-open]");
  if (!button) return;
  selectedId = button.dataset.open;
  renderTable();
  renderDetail();
  document.querySelector("#tenderDetail").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelector("#tenderDetail").addEventListener("click", (event) => {
  if (event.target.closest(".close-detail")) {
    selectedId = null;
    renderTable();
    renderDetail();
    return;
  }
  const contacted = event.target.closest("[data-contacted]");
  if (contacted) markContacted(contacted.dataset.contacted);
  const copy = event.target.closest("[data-copy-email]");
  if (copy) copyEmail(copy.dataset.copyEmail);
});

document.querySelector("#tenderDetail").addEventListener("change", (event) => {
  const field = event.target.dataset.field;
  if (field) updateSelected(field, event.target.value);
});

document.querySelector("#tenderDetail").addEventListener("focusout", (event) => {
  const field = event.target.dataset.field;
  if (field && event.target.tagName === "INPUT") updateSelected(field, event.target.value.trim());
});

document.querySelector("#readinessRows").addEventListener("change", (event) => {
  const id = event.target.dataset.readiness;
  if (!id) return;
  const item = readiness.find((readinessItem) => readinessItem.id === id);
  if (!item) return;
  item.status = event.target.value;
  saveReadiness();
  renderReadiness();
  showToast("RM6264 readiness updated locally.");
});

document.querySelector("#exportCsv").addEventListener("click", exportCsv);
document.querySelector("#resetTracker").addEventListener("click", () => {
  const confirmed = window.confirm("Reset all locally recorded tender and RM6264 progress?");
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(READINESS_KEY);
  records = clone(initialRecords);
  readiness = clone(initialReadiness);
  selectedId = null;
  renderAll();
  showToast("Local tender data reset.");
});

renderAll();
