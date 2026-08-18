import { Link } from "wouter";
import PageHead from "@/components/site/PageHead";
import { COMPANY, FAQS } from "@/site/content";
import { PAGE_META, useDocumentMeta } from "@/site/useDocumentMeta";

export default function Faqs() {
  useDocumentMeta(PAGE_META.faqs);

  return (
    <>
      <PageHead
        eyebrow="Common Questions"
        title="Casting FAQs"
        lead="What buyers ask us most often about alloys, order quantities, molding, and certification."
      />

      <section className="sp-section">
        <div className="sp-grid">
          {FAQS.map((faq) => (
            <div className="sp-qrow" key={faq.q}>
              <h2 className="sp-qrow-h sp-faq-q">{faq.q}</h2>
              <p className="sp-qrow-p sp-faq-a">{faq.a}</p>
            </div>
          ))}
        </div>

        <p className="sp-prose sp-faq-tail">
          Still have a question? Call{" "}
          <a href={COMPANY.phoneHref} className="sp-faq-link">
            {COMPANY.phone}
          </a>{" "}
          or <Link href="/contact" className="sp-faq-link">send us your requirements</Link> and we
          will get you an answer.
        </p>
      </section>
    </>
  );
}
