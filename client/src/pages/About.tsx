import { Link } from "wouter";
import PageHead from "@/components/site/PageHead";
import { ABOUT_SPECS, INDUSTRIES } from "@/site/content";
import { PAGE_META, useDocumentMeta } from "@/site/useDocumentMeta";

export default function About() {
  useDocumentMeta(PAGE_META.about);

  return (
    <>
      <PageHead
        eyebrow="About Us"
        title={
          <>
            Your Sand Casting
            <br />
            Foundry
          </>
        }
      />

      <section className="sp-about-grid">
        <div>
          <p className="sp-prose" style={{ margin: "0 0 24px" }}>
            St. Louis Precision Cast Products has been a cornerstone of American manufacturing
            since 1970. As a licensed MEEHANITE® foundry, we specialize in producing high-quality
            gray iron and ductile iron castings for industries ranging from energy to agriculture.
            In addition to MEEHANITE® irons we also pour low-alloy steels and stainless steels.
          </p>
          <p className="sp-prose" style={{ margin: "0 0 44px" }}>
            Our no-bake molding process and air-set sand molds enable us to deliver quality
            castings with excellent surface finish and dimensional accuracy. We use MAGMA
            simulation software for full engineering analysis, ensuring optimal results before the
            first pour. Whether you need a single prototype or a short-run we have the expertise to
            deliver.
          </p>

          <div className="sp-grid sp-grid-2">
            {ABOUT_SPECS.map((spec) => (
              <div className="sp-cell sp-spec" key={spec}>
                {spec}
              </div>
            ))}
          </div>

          <Link href="/contact" className="sp-textlink" style={{ marginTop: 40 }}>
            Request a Quote →
          </Link>
        </div>

        <div className="sp-about-images">
          <div className="sp-tilegrid">
            <div className="sp-tile">
              <img
                src="/images/valve-body-iron-housing.png"
                alt="Sand casting — valve body"
                loading="lazy"
              />
            </div>
            <div className="sp-tile">
              <img
                src="/images/bearing-housing-short-run-steel.png"
                alt="Sand casting — bearing housing"
                loading="lazy"
              />
            </div>
            <div className="sp-tile">
              <img
                src="/images/automotive-tooling.png"
                alt="Sand casting — automotive tooling"
                loading="lazy"
              />
            </div>
            <div className="sp-tile-navy">
              <div className="sp-tile-navy-num">55+</div>
              <div className="sp-tile-navy-label">
                Years of
                <br />
                Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", borderTop: "1px solid var(--sp-line)" }}>
        <div className="sp-band-inner">
          <div className="sp-eyebrow">Industries We Serve</div>
          <h2 className="sp-h2">Trusted Across Industries</h2>
          <p className="sp-page-lead" style={{ margin: "0 0 44px" }}>
            Our castings serve critical applications across diverse industries, from heavy
            construction equipment to precision machine tools.
          </p>
          <div className="sp-grid sp-grid-6">
            {INDUSTRIES.map((industry) => (
              <div className="sp-cell sp-industry" key={industry}>
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
