import { useEffect } from "react";

export const SITE_ORIGIN = "https://www.stlprecision.com";
export const COMPANY_NAME = "St. Louis Precision Cast Products";

function setMeta(selector: string, attr: "content" | "href", value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Keeps <title>, the description, and the canonical/OG URLs in step with the
 * current route.
 *
 * The site is a client-rendered SPA, so index.html ships the home page's head
 * and this swaps it per route once React mounts. Search engines that execute
 * JavaScript pick it up; a prerender step would be needed to put per-route
 * metadata in the served HTML itself (see README-NETLIFY.md).
 */
export function useDocumentMeta(opts: {
  title: string;
  description: string;
  path: string;
}) {
  const { title, description, path } = opts;

  useEffect(() => {
    const url = SITE_ORIGIN + path;
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
  }, [title, description, path]);
}

/**
 * Metadata for an article, which is not in PAGE_META because the set of articles
 * comes from content/blog. Pass null when the slug does not resolve, so a bad URL
 * does not overwrite the head with a half-built title.
 */
export function useArticleMeta(
  opts: { path: string; title: string; description: string } | null
) {
  const title = opts ? `${opts.title} | ${COMPANY_NAME}` : null;
  useEffect(() => {
    if (!opts || !title) return;
    const url = SITE_ORIGIN + opts.path;
    document.title = title;
    setMeta('meta[name="description"]', "content", opts.description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", opts.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", opts.description);
  }, [opts, title]);
}

export const PAGE_META = {
  home: {
    path: "/",
    title:
      "St. Louis Precision Cast Products | Gray Iron & Ductile Iron Sand Casting Foundry Since 1970",
    description:
      "MEEHANITE® licensed sand casting foundry in St. Louis. Gray iron, ductile iron, steel castings. Short runs, prototypes & tooling since 1970.",
  },
  about: {
    path: "/about",
    title: "About Our Sand Casting Foundry | St. Louis Precision Cast Products",
    description:
      "A MEEHANITE® licensed foundry serving American industry since 1970. No-bake molding, air-set sand molds, MAGMA simulation, castings up to 2,000 lbs.",
  },
  services: {
    path: "/services",
    title: "Casting Services: Short Run, Prototyping & Tooling | St. Louis Precision",
    description:
      "Short-run production castings, rapid prototyping, and complete pattern and tooling services with pattern storage for repeat orders.",
  },
  materials: {
    path: "/materials",
    title: "Metals We Pour: MEEHANITE®, White Iron, Steel, Stainless | St. Louis Precision",
    description:
      "MEEHANITE® irons, abrasion resistant white irons, Ni-Resist, carbon and low alloy steels, tool steels, stainless steel and bronze castings.",
  },
  quality: {
    path: "/quality",
    title: "Quality Assurance & MAGMA Simulation | St. Louis Precision Cast Products",
    description:
      "Dimensional inspection, material testing, MAGMA casting simulation and full documentation from a MEEHANITE® licensed foundry.",
  },
  faqs: {
    path: "/faqs",
    title: "Casting FAQs: Alloys, Minimum Orders & Molding | St. Louis Precision",
    description:
      "Answers on the alloys we pour, minimum order quantities (as few as 1 piece), our no-bake molding process, and MEEHANITE® licensing.",
  },
  contact: {
    path: "/contact",
    title: "Contact Us & Request a Casting Quote | St. Louis Precision Cast Products",
    description:
      "Request a quote on gray iron, ductile iron, or steel castings. Call 314-849-4080 or send your casting requirements to our St. Louis foundry.",
  },
  blog: {
    path: "/blog",
    title: "Casting Guides & Technical Resources | St. Louis Precision Cast Products",
    description:
      "Technical guides on gray iron, ductile iron, MEEHANITE® irons, tool steels, casting defects and MAGMA simulation from a foundry running since 1970.",
  },
} as const;
