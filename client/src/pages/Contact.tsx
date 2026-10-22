import { useRef, useState } from "react";
import type { FormEvent } from "react";
import PageHead from "@/components/site/PageHead";
import { COMPANY, IMAGES } from "@/site/content";
import { PAGE_META, useDocumentMeta } from "@/site/useDocumentMeta";

type Status = { kind: "ok" | "error"; message: string } | null;

// Netlify Forms rejects a submission over 8 MB, so check before sending.
const MAX_DRAWING_BYTES = 8 * 1024 * 1024;
const MATERIAL_OPTIONS = [
  "Gray Iron",
  "Ductile Iron",
  "MEEHANITE® Iron",
  "Steel",
  "Not sure",
];

export default function Contact() {
  useDocumentMeta(PAGE_META.contact);

  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef(false);
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

    // An empty file input still sends a nameless part; drop it so Netlify
    // doesn't record a blank attachment.
    const drawing = data.get("drawing");
    const hasDrawing = drawing instanceof File && drawing.size > 0;
    if (!hasDrawing) data.delete("drawing");
    if (hasDrawing && drawing.size > MAX_DRAWING_BYTES) {
      setStatus({
        kind: "error",
        message: `That file is over 8 MB. Please send a smaller copy, or email it to ${COMPANY.email}.`,
      });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      // Multipart (no Content-Type header) so the drawing file goes with it.
      const res = await fetch("/", { method: "POST", body: data });
      if (!res.ok) throw new Error(`Netlify Forms returned ${res.status}`);
      // Conversion: only inside the res.ok path. Counting a failed submission as a
      // conversion would hide the silent lead-drop this is meant to catch.
      try {
        const umami = (window as unknown as { umami?: { track: (n: string, d?: unknown) => void } }).umami;
        if (umami) {
          let entry = "(unknown)";
          try { entry = sessionStorage.getItem("hawk_entry") || location.pathname; } catch { /* private mode */ }
          umami.track("quote_submit", { entry, drawing: hasDrawing });
        }
      } catch { /* analytics must never break a submission */ }
      formRef.current?.reset();
      setStatus({
        kind: "ok",
        message: "Thank you for your inquiry! We'll review it and get back to you shortly.",
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
              <a className="sp-info-value" href={COMPANY.phoneHref} data-umami-event="phone_click">
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
            onFocus={() => {
              // Fires once per visit: a quote_start with no quote_submit means the
              // form was abandoned or broke mid-flow.
              if (startedRef.current) return;
              startedRef.current = true;
              try {
                (window as unknown as { umami?: { track: (n: string) => void } })
                  .umami?.track("quote_start");
              } catch { /* ignore */ }
            }}
            className="sp-form"
            name="quote-request"
            method="POST"
            data-netlify="true"
            encType="multipart/form-data"
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

            <div className="sp-form-row">
              <label className="sp-field">
                Material
                <select className="sp-input" name="material" defaultValue="">
                  <option value="">Select a material</option>
                  {MATERIAL_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sp-field">
                Quantity
                <input
                  className="sp-input"
                  name="quantity"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 1 prototype, 50/year"
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

            <label className="sp-field">
              Drawing or model (optional)
              <input
                className="sp-input sp-file"
                name="drawing"
                type="file"
                accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.iges,.png,.jpg,.jpeg"
              />
              <span className="sp-field-hint">PDF, DWG, DXF, STEP, IGES or a photo, up to 8 MB</span>
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
