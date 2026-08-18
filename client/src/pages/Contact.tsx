import { useRef, useState } from "react";
import type { FormEvent } from "react";
import PageHead from "@/components/site/PageHead";
import { COMPANY, IMAGES } from "@/site/content";
import { PAGE_META, useDocumentMeta } from "@/site/useDocumentMeta";

type Status = { kind: "ok" | "error"; message: string } | null;

export default function Contact() {
  useDocumentMeta(PAGE_META.contact);

  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  // Posts to Netlify Forms. Netlify discovers the form from the hidden copy in
  // client/index.html at build time — if a field is added or renamed here, change
  // it there too.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("form-name", "quote-request");

    const body = new URLSearchParams();
    data.forEach((value, key) => {
      if (typeof value === "string") body.append(key, value);
    });

    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Netlify Forms returned ${res.status}`);
      formRef.current?.reset();
      setStatus({
        kind: "ok",
        message: "Thank you for your inquiry! We'll respond within 24 hours.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Something went wrong. Please try again or call us directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHead
        eyebrow="Get In Touch"
        title="Contact Us"
        lead="Have questions about our casting services? Ready to request a quote? Our team is here to help. Reach out today and let's discuss your project."
      />

      <section className="sp-contact-grid">
        <div>
          <div className="sp-grid">
            <div className="sp-info">
              <div className="sp-info-label">Address</div>
              <div className="sp-info-value">
                {COMPANY.street}
                <br />
                {COMPANY.cityLine}
              </div>
            </div>
            <div className="sp-info">
              <div className="sp-info-label">Phone</div>
              <a className="sp-info-value" href={COMPANY.phoneHref}>
                {COMPANY.phone}
              </a>
            </div>
            <div className="sp-info">
              <div className="sp-info-label">Email</div>
              <a className="sp-info-value" href={COMPANY.emailHref}>
                {COMPANY.email}
              </a>
            </div>
            <div className="sp-info">
              <div className="sp-info-label">Business Hours</div>
              <div className="sp-info-value">{COMPANY.hours}</div>
            </div>
          </div>

          <div className="sp-badge-inline">
            <img src={IMAGES.meehaniteBadge} alt="MEEHANITE Licensed Foundry" loading="lazy" />
            <div>
              <h2 className="sp-badge-inline-h">MEEHANITE® Licensed Foundry</h2>
              <p className="sp-badge-inline-p">
                Certified to produce MEEHANITE® controlled iron castings
              </p>
            </div>
          </div>
        </div>

        <div className="sp-form-panel">
          <h2 className="sp-form-h">Request a Quote</h2>
          <form
            ref={formRef}
            className="sp-form"
            name="quote-request"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="quote-request" />

            <div className="sp-form-row">
              <label className="sp-field">
                Name *
                <input
                  className="sp-input"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                />
              </label>
              <label className="sp-field">
                Company
                <input
                  className="sp-input"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company name"
                />
              </label>
            </div>

            <div className="sp-form-row">
              <label className="sp-field">
                Email *
                <input
                  className="sp-input"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                />
              </label>
              <label className="sp-field">
                Phone
                <input
                  className="sp-input"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                />
              </label>
            </div>

            <label className="sp-field">
              Project Details *
              <textarea
                className="sp-textarea"
                name="projectDetails"
                required
                rows={6}
                placeholder="Please describe your casting requirements, including material type, quantity, dimensions, and any special requirements..."
              />
            </label>

            <button type="submit" className="sp-submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Request"}
            </button>

            {status ? (
              <div
                className={`sp-status${status.kind === "error" ? " is-error" : ""}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </div>
            ) : null}
          </form>
        </div>
      </section>
    </>
  );
}
