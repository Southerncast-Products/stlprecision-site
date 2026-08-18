import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { COMPANY, IMAGES, NAV_LINKS } from "@/site/content";

export default function SiteHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <div className="sp-topbar">
        <div className="sp-topbar-inner">
          <div className="sp-topbar-meta">
            <span>Serving American Industry Since {COMPANY.since}</span>
            <span className="sp-topbar-sep" />
            <span>MEEHANITE® Licensee</span>
          </div>
          <a className="sp-topbar-phone" href={COMPANY.phoneHref}>
            {COMPANY.phone}
          </a>
        </div>
      </div>

      <header className="sp-header">
        <div className="sp-header-inner">
          <Link href="/" className="sp-brand" aria-label={`${COMPANY.name} home`}>
            <img
              className="sp-brand-logo"
              src={IMAGES.logo}
              alt={`${COMPANY.name} — sand casting foundry`}
            />
            <span>
              <span className="sp-brand-name">{COMPANY.nameTop}</span>
              <span className="sp-brand-sub">{COMPANY.nameBottom}</span>
            </span>
          </Link>

          <nav className="sp-nav" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`sp-nav-link${location === link.href ? " is-active" : ""}`}
                aria-current={location === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="sp-nav-cta">
              Get a Quote
            </Link>
          </nav>

          <button
            type="button"
            className="sp-navtoggle"
            aria-expanded={menuOpen}
            aria-controls="sp-mobilenav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav
          id="sp-mobilenav"
          className={`sp-mobilenav${menuOpen ? " is-open" : ""}`}
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`sp-mobilenav-link${location === link.href ? " is-active" : ""}`}
              aria-current={location === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="sp-mobilenav-cta">
            Get a Quote
          </Link>
        </nav>
      </header>
    </>
  );
}
