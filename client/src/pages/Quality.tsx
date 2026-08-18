import PageHead from "@/components/site/PageHead";
import { IMAGES, QUALITY_ITEMS } from "@/site/content";
import { PAGE_META, useDocumentMeta } from "@/site/useDocumentMeta";

export default function Quality() {
  useDocumentMeta(PAGE_META.quality);

  return (
    <>
      <PageHead
        eyebrow="Quality Assurance"
        title="Commitment to Excellence"
        wideLead
        lead="Quality is at the heart of everything we do. Our comprehensive quality management system ensures every casting meets or exceeds your specifications. With MAGMA simulation technology, we optimize designs before production begins."
      />

      <section className="sp-split">
        <div className="sp-grid">
          {QUALITY_ITEMS.map((item) => (
            <div className="sp-qrow" key={item.title}>
              <h2 className="sp-qrow-h">{item.title}</h2>
              <p className="sp-qrow-p">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="sp-stack">
          <div className="sp-tilegrid">
            <div className="sp-tile">
              <img
                src="/images/stainless-steel-bronze.png"
                alt="Steel casting"
                loading="lazy"
              />
            </div>
            <div className="sp-tile">
              <img
                src="/images/tool-steels-h13-insert.png"
                alt="H13 insert casting"
                loading="lazy"
              />
            </div>
          </div>

          <div className="sp-badge-card">
            <img src={IMAGES.meehaniteBadge} alt="MEEHANITE Licensed Foundry" loading="lazy" />
            <div>
              <h2 className="sp-badge-h">MEEHANITE® Licensed Foundry</h2>
              <p className="sp-badge-p">
                Certified to produce MEEHANITE® controlled iron castings with superior mechanical
                properties and consistent quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
