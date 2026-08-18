import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter, { CtaBand } from "./SiteFooter";

/** Top bar + header + page + CTA band + footer. Every public page uses this. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="sp-site">
      <a className="sp-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <CtaBand />
      <SiteFooter />
    </div>
  );
}
