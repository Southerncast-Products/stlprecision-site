import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { COMPANY } from "@/site/content";
import SiteHeader from "./SiteHeader";
import SiteFooter, { CtaBand } from "./SiteFooter";

/** Top bar + header + page + CTA band + footer. Every public page uses this. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="sp-site">
      <a className="sp-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <CtaBand />
      <SiteFooter />
      {/* Phone-only bar pinned to the bottom of the screen. Not on /contact,
          where the form is already in view. */}
      {location !== "/contact" && (
        <div className="sp-mobilebar">
          <a href={COMPANY.phoneHref} className="sp-mobilebar-call" data-umami-event="phone_click">
            Call {COMPANY.phone}
          </a>
          <Link href="/contact" className="sp-mobilebar-quote" data-umami-event="mobilebar_quote">
            Get a Quote
          </Link>
        </div>
      )}
    </div>
  );
}
