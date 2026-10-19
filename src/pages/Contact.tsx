import React, { FormEvent, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { categories, site } from "../data";
import { submitEnquiry } from "../services/api";
import { CheckCircle2, AlertCircle, Send, ArrowRight, Shield, Sparkles, RefreshCw, Loader2, MailCheck } from "lucide-react";

interface FormState {
  status: "idle" | "submitting" | "success" | "error";
  errorMsg?: string;
  fieldErrors?: Record<string, string[]>;
  submittedId?: string;
  emailed?: boolean;
}

interface SubmittedDetails {
  name: string;
  email: string;
  id: string;
}

export default function Contact() {
  const location = useLocation();
  const prefill = (location.state as any) || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    category: prefill.category || categories[0],
    budget: prefill.budget || "",
    timeline: prefill.timeline || "",
    description: prefill.description || "",
    consent: false,
    website: "", // honeypot
  });

  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [submittedInfo, setSubmittedInfo] = useState<SubmittedDetails | null>(null);

  useEffect(() => {
    if (prefill.category || prefill.description || prefill.budget || prefill.timeline) {
      setFormData(prev => ({
        ...prev,
        category: prefill.category || prev.category,
        budget: prefill.budget || prev.budget,
        timeline: prefill.timeline || prev.timeline,
        description: prefill.description || prev.description,
      }));
    }
  }, [prefill]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate submissions while in progress
    if (formState.status === "submitting") return;

    // Client-side validation
    const errors: Record<string, string[]> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = ["Please enter your full name (at least 2 characters)."];
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = ["Please provide a valid work email address."];
    }

    if (!formData.country.trim() || formData.country.trim().length < 2) {
      errors.country = ["Country or location is required for scheduling."];
    }

    if (!formData.description.trim() || formData.description.trim().length < 20) {
      errors.description = ["Please provide at least 20 characters describing your project requirements."];
    }

    if (!formData.consent) {
      errors.consent = ["You must agree to be contacted regarding this enquiry."];
    }

    if (Object.keys(errors).length > 0) {
      setFormState({
        status: "error",
        errorMsg: "Please complete all required fields correctly before submitting.",
        fieldErrors: errors,
      });
      return;
    }

    setFormState({ status: "submitting", fieldErrors: undefined, errorMsg: undefined });

    const result = await submitEnquiry(formData);

    // Only transition to success if the server explicitly confirms successful email delivery
    if (result.ok && result.emailed) {
      setSubmittedInfo({
        name: formData.name.trim(),
        email: formData.email.trim(),
        id: result.id || "KVX-" + Date.now().toString(36).toUpperCase(),
      });

      // Clear the form fields upon verified delivery
      setFormData({
        name: "",
        email: "",
        company: "",
        country: "",
        category: categories[0],
        budget: "",
        timeline: "",
        description: "",
        consent: false,
        website: "",
      });

      setFormState({
        status: "success",
        submittedId: result.id,
        emailed: true,
      });
    } else {
      // Preserve all entered form data for easy correction or retry
      setFormState({
        status: "error",
        errorMsg: result.error || "Email delivery failed. Please check your information or try again.",
        fieldErrors: result.fields,
      });
    }
  };

  const hasErr = (field: string) => !!formState.fieldErrors?.[field];

  return (
    <div className="contact-page-view">
      {/* Header */}
      <section className="page-hero-header">
        <div className="eyebrow-badge">Engineering Engagement</div>
        <h1>Start a Project Enquiry</h1>
        <p className="page-hero-desc">
          Tell us about what you want to build. Every submission is analyzed by our engineering team
          and stored securely. We reply directly with technical feasibility feedback and scheduling options.
        </p>

        {prefill.category && (
          <div className="prefill-notice-banner">
            <Sparkles size={16} />
            <span>Specifications pre-populated from your project configuration. You can adjust them freely below.</span>
          </div>
        )}
      </section>

      <section className="contact-form-section">
        <div className="contact-form-container">
          {formState.status === "success" && formState.emailed ? (
            <div className="submission-success-card" role="status">
              <div className="success-icon-wrap">
                <CheckCircle2 size={46} />
              </div>
              <h2>Enquiry & Email Dispatched Successfully</h2>
              <p>
                Thank you, <strong>{submittedInfo?.name}</strong>. Your project enquiry has been safely received,
                logged with Reference ID: <strong className="ref-id">#{submittedInfo?.id}</strong>,
                and an instant email notification has been dispatched to <strong>korvextechnologies73@gmail.com</strong>.
              </p>
              <div className="next-steps-box">
                <h4>What happens next?</h4>
                <ol>
                  <li>Our technical leads review your specifications and verify integration requirements.</li>
                  <li>We prepare a preliminary architectural outline and clarifying questions.</li>
                  <li>You will receive a direct reply to <strong>{submittedInfo?.email}</strong> within 1 business day.</li>
                </ol>
              </div>

              <div className="success-actions">
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => {
                    setSubmittedInfo(null);
                    setFormState({ status: "idle" });
                  }}
                >
                  <RefreshCw size={14} /> Submit Another Project
                </button>
                <Link to="/" className="btn">
                  Back to Homepage <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="enquiry-form">
              {/* Form Grid */}
              <div className="form-fields-grid">
                {/* Name */}
                <div className={`form-group ${hasErr("name") ? "has-error" : ""}`}>
                  <label htmlFor="name">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {hasErr("name") && <span className="field-err">Please enter your full name.</span>}
                </div>

                {/* Email */}
                <div className={`form-group ${hasErr("email") ? "has-error" : ""}`}>
                  <label htmlFor="email">
                    Business / Work Email <span className="req">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {hasErr("email") && <span className="field-err">Please enter a valid work email.</span>}
                </div>

                {/* Company */}
                <div className="form-group">
                  <label htmlFor="company">Company / Organization</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name or 'Self'"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                {/* Country */}
                <div className={`form-group ${hasErr("country") ? "has-error" : ""}`}>
                  <label htmlFor="country">
                    Country / Region <span className="req">*</span>
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    required
                    autoComplete="country-name"
                    placeholder="e.g. United States, India, UK, Singapore"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  {hasErr("country") && <span className="field-err">Country is required for scheduling.</span>}
                </div>

                {/* Category */}
                <div className="form-group full-width">
                  <label htmlFor="category">
                    Project Category <span className="req">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div className="form-group">
                  <label htmlFor="budget">Estimated Budget Range</label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    placeholder="e.g. $10,000 - $20,000 USD or ₹8 - 15 Lakh"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>

                {/* Timeline */}
                <div className="form-group">
                  <label htmlFor="timeline">Desired Launch Timeline</label>
                  <input
                    id="timeline"
                    name="timeline"
                    type="text"
                    placeholder="e.g. 2–3 months or Q1 2027"
                    value={formData.timeline}
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className={`form-group full-width ${hasErr("description") ? "has-error" : ""}`}>
                  <label htmlFor="description">
                    Project Requirements & Scope Description <span className="req">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    required
                    placeholder="Describe your system: primary user workflows, intended architecture, key integrations, existing databases, and launch goals..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {hasErr("description") && (
                    <span className="field-err">Please provide at least 20 characters describing your project.</span>
                  )}
                </div>

                {/* Honeypot Spam Defense */}
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="honeypot-input"
                  aria-hidden="true"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              {/* Consent Checkbox */}
              <div className="form-consent-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    I agree to be contacted by Korvex Technologies regarding this engineering enquiry.
                    Your information is strictly protected and never shared.
                  </span>
                </label>
                {hasErr("consent") && <span className="field-err block">Consent is required to submit.</span>}
              </div>

              {/* Error Alert */}
              {formState.status === "error" && (
                <div className="form-alert-bad" role="alert">
                  <AlertCircle size={18} />
                  <span>{formState.errorMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="form-submit-row">
                <button
                  type="submit"
                  className="btn btn-primary-submit"
                  disabled={formState.status === "submitting"}
                >
                  {formState.status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="spin-icon" /> Sending Enquiry & Dispatching Email...
                    </>
                  ) : (
                    <>
                      Submit Project Enquiry <Send size={16} />
                    </>
                  )}
                </button>
                <span className="submit-sec-note">
                  <Shield size={14} /> End-to-end encrypted storage & direct senior engineer review
                </span>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
