/**
 * Home — hero, trust band, section index, recent work.
 *
 * Ported from the Claude Design canvas "STL Precision Site.dc.html".
 */

import { Link } from "wouter";
import {
  CAPABILITIES,
  COMPANY,
  HERO_PRODUCTS,
  HOME_CARDS,
  SHOWCASE,
} from "@/site/content";
import { PAGE_META, useDocumentMeta } from "@/site/useDocumentMeta";

export default function Home() {
  useDocumentMeta(PAGE_META.home);

  return (
    <>
      <section className="sp-hero">
        <div className="sp-hero-mesh" aria-hidden="true" />

        <div className="sp-hero-inner">
          <div>
            <div className="sp-hero-badge">Speciality Foundry Since {COMPANY.since}</div>
            <h1 className="sp-hero-h1">
              <span className="sp-hero-h1-soft">Dedicated to</span>
              <br />
              Quality Metal Casting
            </h1>
            <p className="sp-hero-lead">
              {COMPANY.name} has been serving American industry since {COMPANY.since}. We
              specialize in gray iron castings, ductile iron castings, and steel castings, as well
              as short runs and prototypes with quick turnaround.
            </p>
            <div className="sp-hero-actions">
              <Link href="/contact" className="sp-btn sp-btn-red">
                Request Quote
              </Link>
              <Link href="/services" className="sp-btn sp-btn-ghost">
                Our Services
              </Link>
            </div>
          </div>

          <div className="sp-products">
            <h2 className="sp-products-title">Our Products</h2>
            <div className="sp-products-rule" />
            <div className="sp-products-list">
              {HERO_PRODUCTS.map((product) => (
                <div key={product.name}>
                  <div className="sp-product-name">{product.name}</div>
                  <div className="sp-product-desc">{product.desc}</div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="sp-products-cta">
              Get Started
            </Link>
          </div>
        </div>

        <div className="sp-caps">
          <div className="sp-container">
            <ul className="sp-caps-grid">
              {CAPABILITIES.map((capability) => (
                <li className="sp-cap" key={capability}>
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sp-hero-accent" />
      </section>

      <section className="sp-stats" aria-label="Credentials">
        <div className="sp-stats-grid">
          <div className="sp-stat-a">
            <div className="sp-stat-num">55+</div>
            <div className="sp-stat-label">Years of Excellence</div>
          </div>
          <div className="sp-stat-b">
            <div className="sp-stat-word">MEEHANITE® Licensee</div>
            <div className="sp-stat-label">Certified Foundry</div>
          </div>
          <div className="sp-stat-c">
            <div className="sp-stat-word">Made in the USA</div>
            <div className="sp-stat-label">St. Louis, Missouri</div>
          </div>
        </div>
      </section>

      <section className="sp-section" aria-label="Explore the site">
        <div className="sp-grid sp-grid-4">
          {HOME_CARDS.map((card) => (
            <Link key={card.href} href={card.href} className="sp-navcard">
              <div className="sp-navcard-num">{card.num}</div>
              <div className="sp-navcard-title">{card.title}</div>
              <div className="sp-navcard-desc">{card.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="sp-showcase">
        <div className="sp-showcase-inner">
          <div className="sp-eyebrow-light">Casting Showcase</div>
          <h2 className="sp-h2-light">Recent Work</h2>
          <div className="sp-showcase-grid">
            {SHOWCASE.map((item) => (
              <div key={item.label}>
                <div className="sp-shot-frame">
                  <img src={item.image} alt={item.label} loading="lazy" />
                </div>
                <div className="sp-shot-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
