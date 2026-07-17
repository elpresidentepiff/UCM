import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

type CleanScopePayload = {
  buyerType?: string;
  serviceCode?: string;
  postcode?: string;
  addressLine?: string;
  propertyType?: string;
  sizeEstimate?: string;
  frequency?: string;
  urgency?: string;
  preferredDate?: string;
  accessNotes?: string;
  areas?: string[];
  scopeDetails?: string;
  organisationName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  preferredContact?: string;
  privacyConsent?: boolean;
  marketingConsent?: boolean;
  mediaConsent?: boolean;
  sourceChannel?: string;
  sourceCampaign?: string;
  sourceContent?: string;
  sourceTerm?: string;
  landingPath?: string;
  companyWebsite?: string;
  turnstileToken?: string;
};

const buyers = new Set(["homeowner_tenant", "landlord_agent", "office_facilities", "property_manager", "other_business"]);
const services = new Set(["office_cleaning", "commercial_cleaning", "property_care", "end_of_tenancy", "deep_cleaning", "technical_cleaning", "responsive_maintenance", "handover_complete"]);
const urgencyValues = new Set(["planned", "within_30_days", "within_7_days", "urgent_48_hours"]);
const contactMethods = new Set(["phone", "email", "whatsapp"]);
const postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

function allowedOrigins() {
  return new Set((Deno.env.get("ALLOWED_ORIGINS") || "").split(",").map((value) => value.trim()).filter(Boolean));
}

function cors(origin: string | null) {
  const allowed = allowedOrigins();
  return {
    "Access-Control-Allow-Origin": origin && allowed.has(origin) ? origin : "null",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin"
  };
}

function json(origin: string | null, body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(origin), "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}

function text(value: unknown, max: number) {
  return String(value || "").trim().slice(0, max);
}

function responseDue() {
  const due = new Date();
  const weekday = due.getUTCDay() >= 1 && due.getUTCDay() <= 5;
  if (weekday && due.getUTCHours() < 14) {
    due.setUTCHours(16, 30, 0, 0);
    return due.toISOString();
  }
  do due.setUTCDate(due.getUTCDate() + 1);
  while (due.getUTCDay() === 0 || due.getUTCDay() === 6);
  due.setUTCHours(11, 0, 0, 0);
  return due.toISOString();
}

async function verifyTurnstile(token: string, remoteIp: string | null) {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) throw new Error("FORM_PROTECTION_NOT_CONFIGURED");
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const result = await response.json() as { success?: boolean };
  return result.success === true;
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const originAllowed = Boolean(origin && allowedOrigins().has(origin));
  if (req.method === "OPTIONS") return new Response(null, { status: originAllowed ? 204 : 403, headers: cors(origin) });
  if (req.method !== "POST") return json(origin, { error: "METHOD_NOT_ALLOWED" }, 405);
  if (!originAllowed) return json(origin, { error: "ORIGIN_NOT_ALLOWED" }, 403);
  if (Number(req.headers.get("content-length") || 0) > 65536) return json(origin, { error: "PAYLOAD_TOO_LARGE" }, 413);

  let body: CleanScopePayload;
  try {
    const rawBody = await req.text();
    if (rawBody.length > 65536) return json(origin, { error: "PAYLOAD_TOO_LARGE" }, 413);
    body = JSON.parse(rawBody) as CleanScopePayload;
  } catch {
    return json(origin, { error: "INVALID_JSON" }, 400);
  }

  if (text(body.companyWebsite, 200)) return json(origin, { ok: true }, 202);
  try {
    const turnstileValid = await verifyTurnstile(text(body.turnstileToken, 2048), req.headers.get("cf-connecting-ip"));
    if (!turnstileValid) return json(origin, { error: "FORM_VERIFICATION_FAILED" }, 403);
  } catch (error) {
    if (error instanceof Error && error.message === "FORM_PROTECTION_NOT_CONFIGURED") {
      return json(origin, { error: "SERVICE_NOT_READY" }, 503);
    }
    return json(origin, { error: "FORM_VERIFICATION_FAILED" }, 403);
  }

  const buyerType = text(body.buyerType, 40);
  const serviceCode = text(body.serviceCode, 50);
  const postcode = text(body.postcode, 10).toUpperCase();
  const urgency = text(body.urgency, 40);
  const preferredContact = text(body.preferredContact, 20);
  const contactName = text(body.contactName, 100);
  const email = text(body.email, 160).toLowerCase();
  const phone = text(body.phone, 32);
  const scopeDetails = text(body.scopeDetails, 1600);

  const valid = buyers.has(buyerType)
    && services.has(serviceCode)
    && postcodePattern.test(postcode)
    && urgencyValues.has(urgency)
    && contactMethods.has(preferredContact)
    && contactName.length > 1
    && /^\S+@\S+\.\S+$/.test(email)
    && phone.replace(/\D/g, "").length >= 9
    && scopeDetails.length >= 20
    && body.privacyConsent === true;
  if (!valid) return json(origin, { error: "VALIDATION_FAILED" }, 422);

  const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}") as Record<string, string>;
  const secretKey = secretKeys.default;
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  if (!secretKey || !supabaseUrl) return json(origin, { error: "SERVICE_NOT_READY" }, 503);
  const supabase = createClient(supabaseUrl, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });

  const reference = `UCM-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 5).toUpperCase()}`;
  const lead = {
    reference,
    response_due_at: responseDue(),
    buyer_type: buyerType,
    service_code: serviceCode,
    organisation_name: text(body.organisationName, 120) || null,
    contact_name: contactName,
    email,
    phone,
    preferred_contact: preferredContact,
    postcode,
    address_line: text(body.addressLine, 160) || null,
    property_type: text(body.propertyType, 100),
    size_estimate: text(body.sizeEstimate, 80) || null,
    frequency: text(body.frequency, 40),
    urgency,
    preferred_date: text(body.preferredDate, 10) || null,
    areas: Array.isArray(body.areas) ? body.areas.map((area) => text(area, 40)).slice(0, 20) : [],
    scope_details: scopeDetails,
    access_notes: text(body.accessNotes, 240) || null,
    media_consent: body.mediaConsent === true,
    privacy_consent: true,
    marketing_consent: body.marketingConsent === true,
    source_channel: text(body.sourceChannel, 80) || "direct",
    source_campaign: text(body.sourceCampaign, 120) || "unattributed",
    source_content: text(body.sourceContent, 120) || null,
    source_term: text(body.sourceTerm, 120) || null,
    landing_path: text(body.landingPath, 300) || null,
    completeness_score: body.mediaConsent ? 100 : 90,
    user_agent: text(req.headers.get("user-agent"), 300) || null
  };

  const { error } = await supabase.from("lead_enquiries").insert(lead);
  if (error) return json(origin, { error: "ENQUIRY_NOT_SAVED" }, 500);
  return json(origin, { reference, responseDueAt: lead.response_due_at }, 201);
});
