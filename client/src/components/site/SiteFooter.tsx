import { Link } from "wouter";
import { COMPANY, FOOTER_CAPABILITIES, FOOTER_LINKS, IMAGES } from "@/site/content";

/** Red call-to-action band. Sits above the footer on every page. */
export function CtaBand() {
  return (
    <section className="sp-cta" aria-label="Request a quote">
      <div className="sp-cta-inner">
        <div>
          <h2 className="sp-cta-h2">Ready to Start Your Project?</h2>
          <p className="sp-cta-p">
            Contact us today for a quote on your casting needs. Our team is ready to help bring
            your designs to life.
          </p>
        </div>
        <div className="sp-cta-actions">
          <Link href="/contact" className="sp-btn sp-btn-white">
            Request a Quote
          </Link>
          <a href={COMPANY.phoneHref} className="sp-btn sp-btn-outline-white">
            {COMPANY.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function SiteFooter() {
  return (
    <footer className="sp-footer">
      <div className="sp-footer-grid">
        <div>
          <div className="sp-footer-brand">
            <img className="sp-footer-logo" src={IMAGES.logo} alt={COMPANY.name} />
            <span>
              <span className="sp-footer-name">{COMPANY.nameTop}</span>
              <span className="sp-footer-sub">{COMPANY.nameBottom}</span>
            </span>
          </div>
          <p className="sp-footer-about">
            Serving American industry with precision sand castings since {COMPANY.since}.
            MEEHANITE® licensed foundry specializing in gray iron and ductile iron castings.
          </p>
        </div>

        <div>
          <h4 className="sp-footcol-h">Quick Links</h4>
          <div className="sp-footcol-list">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="sp-footlink">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="sp-footcol-h">Capabilities</h4>
          <div className="sp-footcol-list">
            {FOOTER_CAPABILITIES.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="sp-footcol-h">Contact</h4>
          <div className="sp-footcol-list">
            <span>{COMPANY.street}</span>
            <span>{COMPANY.cityLine}</span>
            <a href={COMPANY.phoneHref} className="sp-footlink">
              {COMPANY.phone}
            </a>
            <a href={COMPANY.emailHref} className="sp-footlink">
              {COMPANY.email}
            </a>
            <Link href="/blog" className="sp-footlink">
              Blog &amp; Articles
            </Link>
          </div>
        </div>
      </div>

      <div className="sp-footer-bottom">
        <div className="sp-footer-bottom-inner">
          <span>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </span>
          <span className="sp-footer-meta">
            <span>MEEHANITE® Licensed Foundry</span>
            <span className="sp-footer-meta-sep">|</span>
            <span>Made in USA</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
