import PageHead from "@/components/site/PageHead";
import { SERVICES } from "@/site/content";
import { PAGE_META, useDocumentMeta } from "@/site/useDocumentMeta";

export default function Services() {
  useDocumentMeta(PAGE_META.services);

  return (
    <>
      <PageHead
        eyebrow="What We Offer"
        title="Our Casting Services"
        lead="From initial concept to finished casting, we provide comprehensive services to meet your casting needs."
      />

      <section className="sp-section">
        <div className="sp-grid">
          {SERVICES.map((service) => (
            <div className="sp-service" key={service.title}>
              <div className="sp-service-img">
                <img src={service.image} alt={service.title} loading="lazy" />
              </div>
              <div>
                <div className="sp-num">{service.num}</div>
                <h2 className="sp-service-h">{service.title}</h2>
                <p className="sp-service-p">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
