/**
 * One metal / service landing page (/gray-iron-castings, /short-run-castings, ...).
 * Copy lives in site/castings.ts. Built to turn a search or AI-answer visit into a
 * quote request: direct answer and quote button first, specifics after, and a
 * "what to send" list so the request arrives complete enough to price.
 */
import { Link } from "wouter";
import NotFoundPanel from "@/components/site/NotFoundPanel";
import PageHead from "@/components/site/PageHead";
import { castingPageBySlug } from "@/site/castings";
import { COMPANY } from "@/site/content";
import { useArticleMeta } from "@/site/useDocumentMeta";

const AT_A_GLANCE: [string, string][] = [
  ["Run size", "1 to 500 pieces"],
  ["Casting weight", "Up to 2,000 lbs"],
  ["Molding", "No-bake / air-set sand"],
  ["Simulation", "MAGMA, before the first pour"],
  ["Heat treatment", "Stress relieving and annealing in house"],
  ["Delivered", "Ready for machining, with traceability and certification"],
];

const QUOTE_CHECKLIST = [
  "A drawing or 3D model (PDF, DWG, DXF, STEP or IGES), or photos and measurements of the part",
  "Material and grade, if you know it",
  "Quantity per run, and roughly how many a year",
  "Whether you need it as-cast or ready for machining, and any testing or certification",
];

export default function CastingPage({ slug }: { slug: string }) {
  const page = castingPageBySlug(slug);

  // Meta comes from castings.ts, not PAGE_META, so the full title is set as-is.
  useArticleMeta(
    page ? { path: `/${page.slug}`, title: page.metaTitle, description: page.metaDescription } : null,
    { suffix: false }
  );

  if (!page) return <NotFoundPanel />;

  return (
    <>
      <PageHead eyebrow={page.eyebrow} title={page.h1} />

      <section className="sp-article-wrap">
        <div className="sp-casting-top">
          <div>
            <p className="sp-casting-answer">{page.answer}</p>
            <div className="sp-chips">
              {page.grades.map((grade) => (
                <span className="sp-chip" key={grade}>
                  {grade}
                </span>
              ))}
            </div>
            <div className="sp-hero-actions sp-casting-actions">
              <Link href="/contact" className="sp-btn sp-btn-red" data-umami-event="casting_quote">
                Request a Quote
              </Link>
              <a href={COMPANY.phoneHref} className="sp-btn sp-btn-ghost-dark" data-umami-event="phone_click">
                Call {COMPANY.phone}
              </a>
            </div>
          </div>
          <img className="sp-casting-img" src={page.image} alt={page.imageAlt} loading="lazy" />
        </div>

        <article className="sp-article">
          <h2>At a glance</h2>
          <table>
            <tbody>
              {AT_A_GLANCE.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">Grades</th>
                <td>{page.grades.join(", ")}</td>
              </tr>
            </tbody>
          </table>

          {page.sections.map((section) => (
            <section key={section.h}>
              <h2>{section.h}</h2>
              {section.paras?.map((para) => <p key={para}>{para}</p>)}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <h2>What to send for a quote</h2>
          <ul>
            {QUOTE_CHECKLIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <Link href="/contact">Request a quote</Link> or call{" "}
            <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>, Monday to Friday, 7:00 AM to 4:00 PM
            CST.
          </p>

          <h2>Frequently asked questions</h2>
          {page.faqs.map((faq) => (
            <div key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </article>

        <nav className="sp-casting-related" aria-label="Related castings">
          <div className="sp-eyebrow">Related</div>
          <div className="sp-casting-related-grid">
            {page.related.map((relatedSlug) => {
              const related = castingPageBySlug(relatedSlug);
              if (!related) return null;
              return (
                <Link key={related.slug} href={`/${related.slug}`} className="sp-casting-related-link">
                  {related.name} →
                </Link>
              );
            })}
          </div>
        </nav>
      </section>
    </>
  );
}
