import type { ReactNode } from "react";

/** The white banner every interior page opens with: eyebrow, H1, optional lead. */
export default function PageHead({
  eyebrow,
  title,
  lead,
  wideLead = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  wideLead?: boolean;
}) {
  return (
    <section className="sp-pagehead">
      <div className="sp-pagehead-inner">
        <div className="sp-eyebrow">{eyebrow}</div>
        <h1 className={`sp-page-h1${lead ? " has-lead" : ""}`}>{title}</h1>
        {lead ? (
          <p className={`sp-page-lead${wideLead ? " is-wide" : ""}`}>{lead}</p>
        ) : null}
      </div>
    </section>
  );
}
