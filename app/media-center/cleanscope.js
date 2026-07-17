(function () {
  "use strict";

  const form = document.querySelector("#cleanScopeForm");
  const steps = [...document.querySelectorAll(".form-step")];
  const progress = [...document.querySelectorAll(".progress-item")];
  const backButton = document.querySelector("#backButton");
  const nextButton = document.querySelector("#nextButton");
  const submitButton = document.querySelector("#submitButton");
  const workflowLayout = document.querySelector("#workflowLayout");
  const successView = document.querySelector("#successView");
  const filesInput = document.querySelector("#mediaFiles");
  const fileList = document.querySelector("#fileList");
  const toast = document.querySelector("#toast");
  const config = window.UCM_CONFIG || {};
  let currentStep = 1;
  let selectedFiles = [];

  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "video/mp4", "video/quicktime"]);
  const maxFileSize = 25 * 1024 * 1024;

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.setTimeout(() => { toast.hidden = true; }, 2800);
  }

  function textValue(name) {
    return String(new FormData(form).get(name) || "").trim();
  }

  function checkedValue(name) {
    return form.querySelector(`[name="${name}"]:checked`)?.value || "";
  }

  function setError(name, message) {
    const target = document.querySelector(`[data-error-for="${name}"]`);
    if (target) target.textContent = message;
    const field = form.elements[name];
    if (field && field instanceof HTMLElement) field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function clearStepErrors(step) {
    step.querySelectorAll(".field-error").forEach((item) => { item.textContent = ""; });
    step.querySelectorAll("[aria-invalid]").forEach((item) => item.setAttribute("aria-invalid", "false"));
  }

  function validPostcode(value) {
    return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(value.trim());
  }

  function validateStep(stepNumber) {
    const step = steps[stepNumber - 1];
    clearStepErrors(step);
    let valid = true;

    if (stepNumber === 1) {
      if (!checkedValue("buyerType")) {
        setError("buyerType", "Choose the type of buyer.");
        valid = false;
      }
      if (!checkedValue("serviceCode")) {
        setError("serviceCode", "Choose the primary service.");
        valid = false;
      }
    }

    if (stepNumber === 2) {
      const postcode = textValue("postcode");
      if (!validPostcode(postcode)) {
        setError("postcode", "Enter a valid UK postcode.");
        valid = false;
      }
      ["propertyType", "frequency", "urgency"].forEach((name) => {
        if (!textValue(name)) {
          setError(name, "Select an option.");
          valid = false;
        }
      });
    }

    if (stepNumber === 3 && textValue("scopeDetails").length < 20) {
      setError("scopeDetails", "Add at least 20 characters about the required result.");
      valid = false;
    }

    if (stepNumber === 4) {
      if (selectedFiles.length > 0 && !form.elements.mediaConsent.checked) {
        setError("mediaFiles", "Confirm authority to share the selected files for scoping.");
        valid = false;
      }
      if (selectedFiles.length > 6 || selectedFiles.some((file) => file.size > maxFileSize || !allowedTypes.has(file.type))) {
        setError("mediaFiles", "Remove unsupported files before continuing.");
        valid = false;
      }
    }

    if (stepNumber === 5) {
      const email = textValue("email");
      const phone = textValue("phone");
      if (!textValue("contactName")) {
        setError("contactName", "Enter a contact name.");
        valid = false;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError("email", "Enter a valid email address.");
        valid = false;
      }
      if (phone.replace(/\D/g, "").length < 9) {
        setError("phone", "Enter a valid phone number.");
        valid = false;
      }
      if (!textValue("preferredContact")) {
        setError("preferredContact", "Select a contact method.");
        valid = false;
      }
      if (!form.elements.privacyConsent.checked) {
        setError("privacyConsent", "Consent is required to respond to the enquiry.");
        valid = false;
      }
      if (config.cleanScopeEndpoint && !textValue("turnstileToken")) {
        setError("turnstileToken", "Complete the security check before sending.");
        valid = false;
      }
    }

    if (!valid) {
      const firstError = step.querySelector(".field-error:not(:empty)");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return valid;
  }

  function renderStep() {
    steps.forEach((step, index) => { step.hidden = index !== currentStep - 1; });
    progress.forEach((item, index) => {
      item.classList.toggle("active", index === currentStep - 1);
      item.classList.toggle("complete", index < currentStep - 1);
    });
    backButton.hidden = currentStep === 1;
    nextButton.hidden = currentStep === steps.length;
    submitButton.hidden = currentStep !== steps.length;
    document.querySelector(".progress-wrap").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function label(group, value, fallback = "Not selected") {
    return window.UCMHub.labels[group]?.[value] || value || fallback;
  }

  function collectLead() {
    const data = new FormData(form);
    return {
      buyerType: checkedValue("buyerType"),
      serviceCode: checkedValue("serviceCode"),
      postcode: textValue("postcode").toUpperCase(),
      addressLine: textValue("addressLine"),
      propertyType: textValue("propertyType"),
      sizeEstimate: textValue("sizeEstimate"),
      frequency: textValue("frequency"),
      urgency: textValue("urgency"),
      preferredDate: textValue("preferredDate"),
      accessNotes: textValue("accessNotes"),
      areas: data.getAll("areas"),
      scopeDetails: textValue("scopeDetails"),
      files: selectedFiles.map((file) => ({ name: file.name, type: file.type, size: file.size })),
      mediaConsent: form.elements.mediaConsent.checked,
      marketingMediaConsent: form.elements.marketingMediaConsent.checked,
      organisationName: textValue("organisationName"),
      contactName: textValue("contactName"),
      email: textValue("email").toLowerCase(),
      phone: textValue("phone"),
      preferredContact: textValue("preferredContact"),
      privacyConsent: form.elements.privacyConsent.checked,
      marketingConsent: form.elements.marketingConsent.checked,
      companyWebsite: textValue("companyWebsite"),
      turnstileToken: textValue("turnstileToken"),
      ...window.UCMHub.attribution()
    };
  }

  function updateSummary() {
    const lead = collectLead();
    document.querySelector("#summaryBuyer").textContent = label("buyerType", lead.buyerType);
    document.querySelector("#summaryService").textContent = label("serviceCode", lead.serviceCode);
    document.querySelector("#summaryPostcode").textContent = lead.postcode || "Not added";
    document.querySelector("#summaryUrgency").textContent = label("urgency", lead.urgency);
    document.querySelector("#summaryFiles").textContent = selectedFiles.length ? `${selectedFiles.length} selected` : "No files";
    const score = window.UCMHub.completeness(lead);
    document.querySelector("#completionFill").style.width = `${score}%`;
    document.querySelector("#completionValue").textContent = `${score}%`;
  }

  function renderFiles() {
    fileList.innerHTML = "";
    selectedFiles.forEach((file, index) => {
      const row = document.createElement("div");
      row.className = "file-item";
      const meta = document.createElement("span");
      meta.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`;
      const remove = document.createElement("button");
      remove.className = "table-link";
      remove.type = "button";
      remove.textContent = "Remove";
      remove.addEventListener("click", () => {
        selectedFiles.splice(index, 1);
        renderFiles();
        updateSummary();
      });
      row.append(meta, remove);
      fileList.append(row);
    });
  }

  async function submitLead(lead) {
    const endpoint = config.cleanScopeEndpoint;
    if (!endpoint) return window.UCMHub.saveLead(lead);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead)
    });
    if (!response.ok) throw new Error("UCM could not receive this enquiry. Please call or try again.");
    return response.json();
  }

  function initialiseLiveMode() {
    if (!config.cleanScopeEndpoint) return;
    const banner = document.querySelector("#modeBanner");
    banner.textContent = "Live enquiry endpoint configured. Files remain on this device until secure media upload is enabled.";
    document.querySelector("#turnstileWrap").hidden = false;
    if (!config.turnstileSiteKey) {
      banner.textContent = "Configuration incomplete: the live endpoint requires a Turnstile site key.";
      return;
    }
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => {
      window.turnstile.render("#turnstileWidget", {
        sitekey: config.turnstileSiteKey,
        callback(token) {
          form.elements.turnstileToken.value = token;
          setError("turnstileToken", "");
        },
        "expired-callback"() {
          form.elements.turnstileToken.value = "";
        }
      });
    });
    document.head.append(script);
  }

  nextButton.addEventListener("click", () => {
    if (!validateStep(currentStep)) return;
    currentStep += 1;
    renderStep();
  });

  backButton.addEventListener("click", () => {
    currentStep = Math.max(1, currentStep - 1);
    renderStep();
  });

  filesInput.addEventListener("change", () => {
    const incoming = [...filesInput.files];
    selectedFiles = incoming.slice(0, 6);
    if (incoming.length > 6) showToast("Only the first 6 files were selected.");
    renderFiles();
    updateSummary();
  });

  form.elements.scopeDetails.addEventListener("input", () => {
    document.querySelector("#scopeCount").textContent = String(form.elements.scopeDetails.value.length);
  });

  form.addEventListener("input", updateSummary);
  form.addEventListener("change", updateSummary);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateStep(5)) return;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    try {
      const saved = await submitLead(collectLead());
      workflowLayout.hidden = true;
      document.querySelector(".progress-wrap").hidden = true;
      document.querySelector("#successReference").textContent = saved.reference;
      document.querySelector("#successMessage").textContent = "UCM will review the requirement before confirming scope, availability or price.";
      successView.hidden = false;
      successView.focus();
    } catch (error) {
      showToast(error.message || "The enquiry could not be sent.");
      submitButton.disabled = false;
      submitButton.textContent = "Send for human review";
    }
  });

  initialiseLiveMode();
  updateSummary();
})();
