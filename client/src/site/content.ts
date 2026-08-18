/**
 * Every piece of copy the public site renders, in one place.
 *
 * Wording is carried over verbatim from the live site / the design canvas.
 * Two standing rules from the client meetings (see todo.md): spell out
 * "St. Louis", never "STL", and say "MEEHANITE® Licensee", never "Partner".
 */

export const COMPANY = {
  name: "St. Louis Precision Cast Products",
  nameTop: "St. Louis Precision",
  nameBottom: "Cast Products",
  phone: "314-849-4080",
  phoneHref: "tel:314-849-4080",
  email: "info@oneoffcastings.com",
  emailHref: "mailto:info@oneoffcastings.com",
  street: "10922 Gravois Industrial Court",
  cityLine: "St. Louis, MO 63128-2032",
  hours: "Monday - Friday: 7:00 AM - 4:00 PM CST",
  since: "1970",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Materials", href: "/materials" },
  { label: "Quality", href: "/quality" },
  { label: "Contact", href: "/contact" },
] as const;

/** Footer "Quick Links" = the header nav plus the pages that are not in it. */
export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { label: "FAQs", href: "/faqs" },
] as const;

export const CAPABILITIES = [
  "Steel Castings",
  "Gray Iron Castings",
  "Ductile Iron Castings",
  "No-Bake Sand Molding",
  "Patterns",
  "Pattern Tooling Castings",
  "Low-Volume & Prototype Sand Castings",
  "MEEHANITE Licensee",
  "Stress Relieve & Annealing",
  "Ready for Machining",
] as const;

/** The "Our Products" panel in the hero. */
export const HERO_PRODUCTS = [
  { name: "Short Run Production", desc: "Small batch casting solutions" },
  { name: "Rapid Prototyping", desc: "Quick turnaround times" },
  { name: "Tooling Solutions", desc: "Near-net-shape casting" },
] as const;

export const HOME_CARDS = [
  { num: "01", title: "About", desc: "Your sand casting foundry, since 1970.", href: "/about" },
  { num: "02", title: "Services", desc: "Short run, prototyping, tooling.", href: "/services" },
  { num: "03", title: "Materials", desc: "Every alloy we pour, by grade.", href: "/materials" },
  { num: "04", title: "Quality", desc: "MAGMA simulation and inspection.", href: "/quality" },
] as const;

export const ABOUT_SPECS = [
  "No-Bake Molding",
  "Traditional Patterns",
  "Pattern Storage",
  "MAGMA Simulation",
  "Casting Weight Up To 2,000 lbs",
  "Quality Inspection",
] as const;

export const INDUSTRIES = [
  "Energy & Power",
  "Mining & Aggregate",
  "Construction",
  "Agriculture",
  "Machine Tool",
  "Pump & Valve",
] as const;

export const SERVICES = [
  {
    num: "01",
    title: "Short Run Production",
    description:
      "Economical short-run production castings from 1 to 500 pieces. Ideal for specialized equipment, replacement parts, and limited production runs.",
    image: "/images/bearing-housing-short-run-steel.png",
  },
  {
    num: "02",
    title: "Rapid Prototyping",
    description:
      "Rapid prototype development with quick turnaround times. Perfect for testing designs before committing to full production tooling.",
    image: "/images/valve-body-iron-housing.png",
  },
  {
    num: "03",
    title: "Tooling Solutions",
    description:
      "Complete pattern and tooling services including design assistance, pattern storage, and maintenance for repeat orders. Near-net-shape casting.",
    image: "/images/automotive-tooling.png",
  },
] as const;

export const MATERIALS = [
  {
    name: "MEEHANITE® Irons",
    description:
      "Full complement of licensed MEEHANITE® irons with controlled graphite structure for superior mechanical properties.",
    grades: ["Gray Iron", "Ductile Iron", "Wear Resistant"],
    image: "/images/meehanite-irons.png",
  },
  {
    name: "Abrasion Resistant White Irons",
    description:
      "Extremely hard irons designed for high-wear applications in mining, aggregate, and material handling.",
    grades: ["NiHard", "ASTM A532 IIB", "ASTM A532 IIIA"],
    image: "/images/abrasion-resistant-white-irons.png",
  },
  {
    name: "Ni-Resist Irons",
    description:
      "Austenitic nickel-alloyed ductile irons with excellent corrosion and heat resistance.",
    grades: ["ASTM A439 D-2", "ASTM A439 D-5"],
    image: "/images/ni-resist-irons.png",
  },
  {
    name: "Carbon & Low Alloy Steels",
    description:
      "Versatile steel castings for structural and mechanical applications requiring strength and toughness.",
    grades: ["10XX Series", "WCB", "41XX Series", "86XX Series"],
    image: "/images/bearing-housing-short-run-steel.png",
  },
  {
    name: "Tool Steels",
    description:
      "High-performance tool steels for die casting, forging dies, and tooling applications.",
    grades: ["H13", "D2"],
    image: "/images/tool-steels-h13-insert.png",
  },
  {
    name: "Stainless Steel & Bronze",
    description:
      "Corrosion-resistant alloys for demanding environments and specialized applications.",
    grades: ["300 Series SS", "400 Series SS", "C87500 Bronze"],
    image: "/images/stainless-steel-bronze.png",
  },
] as const;

export const QUALITY_ITEMS = [
  {
    title: "Dimensional Inspection",
    desc: "Precision measurement and verification of all critical dimensions",
  },
  {
    title: "Material Testing",
    desc: "Chemical analysis and mechanical property verification",
  },
  {
    title: "MAGMA Simulation",
    desc: "Full engineering analysis with advanced casting simulation software",
  },
  {
    title: "Documentation",
    desc: "Complete traceability and certification for all castings",
  },
] as const;

/** Home page "Recent Work" strip. */
export const SHOWCASE = [
  { image: "/images/automotive-tooling.png", label: "Automotive Tooling" },
  { image: "/images/stainless-steel-bronze.png", label: "Steel Permanent Mold" },
  { image: "/images/valve-body-iron-housing.png", label: "Iron Housing" },
  { image: "/images/abrasion-resistant-white-irons.png", label: "Bearing Housing" },
] as const;

export const FOOTER_CAPABILITIES = [
  "Gray Iron Castings",
  "Ductile Iron Castings",
  "Pattern Tooling",
  "Prototype Castings",
  "MEEHANITE® Irons",
] as const;

/**
 * Answers shown on /faqs. The FAQPage structured data is generated from this same
 * list at build time (scripts/prerender.mjs), so the page text and the markup are
 * always identical — Google requires the answer to be visible on the page.
 */
export const FAQS = [
  {
    q: "What types of metal castings does St. Louis Precision produce?",
    a:
      "We produce a full range of ferrous and non-ferrous castings including gray iron (ASTM A48), ductile iron (ASTM A536), MEEHANITE® irons, abrasion resistant white irons (NiHard, ASTM A532), Ni-Resist irons (ASTM A439 D-2 & D-5), plain carbon steels (10XX, WCB), low alloy steels (41XX, 86XX), tool steels (H13, D2), stainless steel (300 and 400 series), and C87500 bronze.",
  },
  {
    q: "What is the minimum order quantity for castings?",
    a:
      "We specialize in short-run production and can produce as few as 1 piece up to 500 pieces per run. We also offer rapid prototyping services for testing designs before full production.",
  },
  {
    q: "Is St. Louis Precision a MEEHANITE® licensed foundry?",
    a:
      "Yes, St. Louis Precision Cast Products is a licensed MEEHANITE® foundry, certified to produce MEEHANITE® controlled iron castings with superior mechanical properties and consistent quality.",
  },
  {
    q: "What molding processes does St. Louis Precision use?",
    a:
      "We use no-bake molding and air-set sand mold processes, which provide excellent surface finish and dimensional accuracy. We also utilize MAGMA simulation software for full engineering analysis to optimize casting designs before production.",
  },
] as const;

export const IMAGES = {
  logo: "/images/logo.png",
  meehaniteBadge: "/images/meehanite-licensed-foundry-badge.jpg",
} as const;
