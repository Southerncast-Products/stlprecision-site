import PageHead from "@/components/site/PageHead";
import { MATERIALS } from "@/site/content";
import { PAGE_META, useDocumentMeta } from "@/site/useDocumentMeta";

export default function Materials() {
  useDocumentMeta(PAGE_META.materials);

  return (
    <>
      <PageHead
        eyebrow="Alloys & Materials"
        title="Metals We Pour"
        lead="We pour a comprehensive range of ferrous and non-ferrous alloys to meet your specific application requirements."
      />

      <section className="sp-section">
        <div className="sp-grid sp-grid-3">
          {MATERIALS.map((material) => (
            <div className="sp-material" key={material.name}>
              <div className="sp-material-img">
                <img src={material.image} alt={material.name} loading="lazy" />
              </div>
              <h2 className="sp-material-h">{material.name}</h2>
              <p className="sp-material-p">{material.description}</p>
              <div className="sp-chips">
                {material.grades.map((grade) => (
                  <span className="sp-chip" key={grade}>
                    {grade}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
