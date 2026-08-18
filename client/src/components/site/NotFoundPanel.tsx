import { Link } from "wouter";
import { COMPANY } from "@/site/content";

/** 404 shown inside the site chrome, so visitors keep the nav and phone number. */
export default function NotFoundPanel() {
  return (
    <>
      <section className="sp-pagehead">
        <div className="sp-pagehead-inner">
          <div className="sp-eyebrow">Error 404</div>
          <h1 className="sp-page-h1 has-lead">Page Not Found</h1>
          <p className="sp-page-lead">
            That page has moved or no longer exists. Start from the sections below, or call us at{" "}
            {COMPANY.phone} and we will point you to what you need.
          </p>
        </div>
      </section>

      <section className="sp-section">
        <div className="sp-grid sp-grid-4">
          <Link href="/about" className="sp-navcard">
            <div className="sp-navcard-num">01</div>
            <div className="sp-navcard-title">About</div>
            <div className="sp-navcard-desc">Your sand casting foundry, since 1970.</div>
          </Link>
          <Link href="/services" className="sp-navcard">
            <div className="sp-navcard-num">02</div>
            <div className="sp-navcard-title">Services</div>
            <div className="sp-navcard-desc">Short run, prototyping, tooling.</div>
          </Link>
          <Link href="/materials" className="sp-navcard">
            <div className="sp-navcard-num">03</div>
            <div className="sp-navcard-title">Materials</div>
            <div className="sp-navcard-desc">Every alloy we pour, by grade.</div>
          </Link>
          <Link href="/quality" className="sp-navcard">
            <div className="sp-navcard-num">04</div>
            <div className="sp-navcard-title">Quality</div>
            <div className="sp-navcard-desc">MAGMA simulation and inspection.</div>
          </Link>
        </div>
      </section>
    </>
  );
}
