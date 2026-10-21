/**
 * One landing page per metal / service, at /<slug>. Rendered by
 * pages/CastingPage.tsx; prerender.mjs bakes each one into static HTML with its
 * own FAQPage and Service structured data.
 *
 * Why separate pages: every search term used to land on the home page, and the
 * buyer questions AI engines get ("who pours Ni-Resist D-2?", "H13 tool steel
 * castings in the US?") had nothing specific to quote.
 *
 * Copy rules (same as content.ts and the Hawk STL guardrails): company facts only
 * from the live site / llms.txt. No ISO claims, no lead times or turnaround
 * promises, no customer names. Spell out "St. Louis". "MEEHANITE® Licensee",
 * never "partner". Metallurgy stated here is general, standard-level fact.
 */

export type CastingPage = {
  slug: string;
  /** Short name for links, breadcrumbs and related-page cards. */
  name: string;
  eyebrow: string;
  h1: string;
  /** First paragraph: the direct answer AI engines quote. 2-3 sentences. */
  answer: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  /** Grades / specs shown as chips and in the at-a-glance table. */
  grades: string[];
  sections: { h: string; paras?: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const CASTING_PAGES: CastingPage[] = [
  {
    slug: "meehanite-castings",
    name: "MEEHANITE® Castings",
    eyebrow: "MEEHANITE® Licensee",
    h1: "MEEHANITE® Iron Castings",
    answer:
      "St. Louis Precision Cast Products is a licensed MEEHANITE® foundry in St. Louis, Missouri, certified to produce MEEHANITE® controlled iron castings. We pour MEEHANITE® gray, ductile and wear resistant irons in no-bake sand molds, in runs from 1 to 500 pieces and castings up to 2,000 lbs.",
    metaTitle: "MEEHANITE® Iron Castings | Licensed Foundry in St. Louis, MO",
    metaDescription:
      "Licensed MEEHANITE® foundry pouring MEEHANITE® gray, ductile and wear resistant iron castings. Runs of 1 to 500 pieces, up to 2,000 lbs. Request a quote.",
    image: "/images/meehanite-irons.png",
    imageAlt: "MEEHANITE® iron castings",
    grades: ["MEEHANITE® Gray Iron", "MEEHANITE® Ductile Iron", "MEEHANITE® Wear Resistant"],
    sections: [
      {
        h: "What MEEHANITE® means on a print",
        paras: [
          "MEEHANITE® is a licensed system of metallurgical process control for cast iron. A casting called out as MEEHANITE® has to come from a licensed foundry working to that system, which controls the graphite structure so the mechanical properties are consistent from casting to casting and run to run.",
          "If your drawing calls for MEEHANITE® iron, you need a licensee. We are one, and we can quote the part as drawn.",
        ],
      },
      {
        h: "MEEHANITE® irons we pour",
        list: [
          "MEEHANITE® gray iron, for housings, bases and machine components",
          "MEEHANITE® ductile iron, where the part needs more strength and toughness",
          "Wear resistant MEEHANITE® grades, for parts that see abrasion",
        ],
      },
      {
        h: "How we make them",
        paras: [
          "Every MEEHANITE® casting is poured in no-bake, air-set sand molds for surface finish and dimensional accuracy. We run MAGMA solidification simulation before the first pour, stress relieve and anneal in house, and ship castings ready for machining with full traceability and certification.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is St. Louis Precision a licensed MEEHANITE® foundry?",
        a: "Yes. St. Louis Precision Cast Products is a licensed MEEHANITE® foundry, certified to produce MEEHANITE® controlled iron castings.",
      },
      {
        q: "Can I order a small quantity of MEEHANITE® castings?",
        a: "Yes. We specialize in short runs, from a single piece up to 500 pieces per run, including prototypes.",
      },
      {
        q: "How big a MEEHANITE® casting can you pour?",
        a: "We pour castings up to 2,000 lbs.",
      },
    ],
    related: ["gray-iron-castings", "ductile-iron-castings", "short-run-castings"],
  },
  {
    slug: "gray-iron-castings",
    name: "Gray Iron Castings",
    eyebrow: "Gray Iron",
    h1: "Gray Iron Castings",
    answer:
      "St. Louis Precision Cast Products pours gray iron castings (ASTM A48) and MEEHANITE® gray iron in no-bake sand molds at our St. Louis, Missouri foundry. We cast from 1 to 500 pieces per run, up to 2,000 lbs each, and ship them stress relieved and ready for machining.",
    metaTitle: "Gray Iron Castings (ASTM A48) | Sand Casting Foundry, St. Louis",
    metaDescription:
      "Gray iron castings to ASTM A48 and MEEHANITE® gray iron. Short runs of 1 to 500 pieces, up to 2,000 lbs, ready for machining. Request a quote.",
    image: "/images/valve-body-iron-housing.png",
    imageAlt: "Gray iron housing casting",
    grades: ["ASTM A48", "MEEHANITE® Gray Iron"],
    sections: [
      {
        h: "When gray iron is the right choice",
        paras: [
          "Gray iron gets its name from the flake graphite in its structure. Those flakes make it easy to machine, give it excellent vibration damping and good heat conduction, and keep it economical to cast. It is the usual choice for housings, machine bases, pump and valve bodies, and other parts that need stiffness and stability more than impact toughness.",
          "If the part has to take shock loads or bend before it breaks, look at ductile iron instead.",
        ],
      },
      {
        h: "Where our gray iron castings go",
        list: [
          "Machine tool bases and housings",
          "Pump and valve bodies",
          "Energy and power equipment",
          "Agricultural and construction equipment",
          "Replacement parts for equipment no longer supported by the original maker",
        ],
      },
      {
        h: "How we make them",
        paras: [
          "No-bake, air-set sand molds for surface finish and dimensional accuracy, MAGMA simulation before the first pour, stress relieving and annealing in house, and dimensional inspection with full documentation.",
        ],
      },
    ],
    faqs: [
      {
        q: "What gray iron specifications do you pour?",
        a: "We pour gray iron to ASTM A48, and MEEHANITE® gray iron as a licensed MEEHANITE® foundry. Put the class or grade on your drawing or quote request.",
      },
      {
        q: "What is the minimum order for gray iron castings?",
        a: "One piece. We run 1 to 500 pieces per run, so prototypes, replacement parts and small batches are what we do every day.",
      },
      {
        q: "Gray iron or ductile iron: which do I need?",
        a: "Gray iron machines easily and damps vibration well, which suits housings and bases. Ductile iron is stronger and tougher, which suits parts that take impact or bending loads. If you are not sure, send the drawing and the application and we will advise.",
      },
    ],
    related: ["ductile-iron-castings", "meehanite-castings", "short-run-castings"],
  },
  {
    slug: "ductile-iron-castings",
    name: "Ductile Iron Castings",
    eyebrow: "Ductile Iron",
    h1: "Ductile Iron Castings",
    answer:
      "St. Louis Precision Cast Products pours ductile iron castings (ASTM A536) and MEEHANITE® ductile iron at our St. Louis, Missouri foundry. We make short runs from 1 to 500 pieces, plus prototypes, with castings up to 2,000 lbs supplied ready for machining.",
    metaTitle: "Ductile Iron Castings (ASTM A536) | Short Run Foundry, St. Louis",
    metaDescription:
      "Ductile iron castings to ASTM A536 and MEEHANITE® ductile iron. Short runs of 1 to 500 pieces and prototypes, up to 2,000 lbs. Request a quote.",
    image: "/images/bearing-housing-short-run-steel.png",
    imageAlt: "Ductile iron bearing housing casting",
    grades: ["ASTM A536", "MEEHANITE® Ductile Iron"],
    sections: [
      {
        h: "When ductile iron is the right choice",
        paras: [
          "In ductile iron the graphite forms round nodules instead of flakes. That gives it much higher tensile strength and the ability to stretch before it breaks, so it takes impact and bending loads that would crack gray iron. It can often replace fabrications and steel castings at a lower cost.",
        ],
      },
      {
        h: "Short runs and prototypes",
        paras: [
          "Many ductile iron jobs are small: a prototype to prove a design, a few replacement parts, or a limited production run. We are set up for exactly that, from a single piece to 500 per run, with pattern storage and maintenance so repeat orders are simple.",
        ],
      },
      {
        h: "How we make them",
        paras: [
          "No-bake, air-set sand molds, MAGMA simulation before the first pour, stress relieving and annealing in house, chemical analysis and mechanical property verification, and full traceability and certification.",
        ],
      },
    ],
    faqs: [
      {
        q: "What ductile iron specifications do you pour?",
        a: "We pour ductile iron to ASTM A536, and MEEHANITE® ductile iron as a licensed MEEHANITE® foundry. Put the grade on your drawing or quote request.",
      },
      {
        q: "Can you make a single ductile iron prototype?",
        a: "Yes. Our runs start at one piece, and rapid prototyping is one of our core services.",
      },
      {
        q: "How large can a ductile iron casting be?",
        a: "We pour castings up to 2,000 lbs.",
      },
    ],
    related: ["gray-iron-castings", "meehanite-castings", "ni-resist-castings"],
  },
  {
    slug: "white-iron-castings",
    name: "Abrasion Resistant White Iron",
    eyebrow: "Wear Parts",
    h1: "Abrasion Resistant White Iron Castings (NiHard, ASTM A532)",
    answer:
      "St. Louis Precision Cast Products pours abrasion resistant white iron castings, including NiHard and ASTM A532 Class IIB and IIIA, for mining, aggregate and material handling wear parts. Our St. Louis, Missouri foundry makes short runs from 1 to 500 pieces, up to 2,000 lbs per casting.",
    metaTitle: "NiHard & ASTM A532 White Iron Castings | Wear Parts Foundry",
    metaDescription:
      "Abrasion resistant white iron castings: NiHard, ASTM A532 IIB and IIIA for mining, aggregate and material handling wear parts. Short runs. Request a quote.",
    image: "/images/abrasion-resistant-white-irons.png",
    imageAlt: "Abrasion resistant white iron wear casting",
    grades: ["NiHard", "ASTM A532 IIB", "ASTM A532 IIIA"],
    sections: [
      {
        h: "What abrasion resistant white iron is for",
        paras: [
          "White irons are extremely hard alloyed cast irons built to survive sliding and gouging abrasion. ASTM A532 covers them in three classes: Class I nickel-chromium irons (the NiHard family), Class II chromium-molybdenum irons such as IIB, and Class III high-chromium irons such as IIIA.",
          "They are the material for liners, wear plates, pump parts and other components that are worn away by rock, ore, sand or slurry.",
        ],
      },
      {
        h: "Industries we cast wear parts for",
        list: ["Mining and aggregate", "Material handling", "Pump and valve", "Energy and power"],
      },
      {
        h: "Short runs of wear parts",
        paras: [
          "Wear parts are often needed a few at a time, or to replace a part that is no longer available. We pour from 1 to 500 pieces per run and keep your patterns stored and maintained for the next order.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which ASTM A532 grades do you pour?",
        a: "We pour NiHard and ASTM A532 Class IIB and Class IIIA abrasion resistant white irons.",
      },
      {
        q: "Can you cast replacement wear parts in small quantities?",
        a: "Yes. We run from a single piece to 500 pieces per run.",
      },
    ],
    related: ["ni-resist-castings", "steel-castings", "short-run-castings"],
  },
  {
    slug: "ni-resist-castings",
    name: "Ni-Resist Castings",
    eyebrow: "Corrosion & Heat Resistant",
    h1: "Ni-Resist Iron Castings (ASTM A439 D-2 & D-5)",
    answer:
      "St. Louis Precision Cast Products pours Ni-Resist austenitic ductile iron castings to ASTM A439 Type D-2 and D-5 at our St. Louis, Missouri foundry. Ni-Resist is used where parts need corrosion and heat resistance, such as pumps, valves and compressor components. We pour runs of 1 to 500 pieces, up to 2,000 lbs.",
    metaTitle: "Ni-Resist Castings, ASTM A439 D-2 & D-5 | St. Louis Foundry",
    metaDescription:
      "Ni-Resist austenitic ductile iron castings to ASTM A439 D-2 and D-5 for pumps, valves and heat-resistant parts. Runs of 1 to 500 pieces. Request a quote.",
    image: "/images/ni-resist-irons.png",
    imageAlt: "Ni-Resist iron casting",
    grades: ["ASTM A439 D-2", "ASTM A439 D-5"],
    sections: [
      {
        h: "What Ni-Resist is",
        paras: [
          "Ni-Resist irons are austenitic cast irons alloyed with a high percentage of nickel. ASTM A439 covers the ductile (nodular graphite) versions. They hold up to corrosion, heat and erosion far better than ordinary gray or ductile iron while still casting like iron.",
          "Type D-2 is the general-purpose grade, widely used for pump and valve parts. Type D-5 carries more nickel and has a very low rate of thermal expansion, for parts that must stay dimensionally stable as temperature changes.",
        ],
      },
      {
        h: "Typical Ni-Resist parts",
        list: [
          "Pump casings, impellers and bowls",
          "Valve bodies and components",
          "Parts exposed to seawater, brine or corrosive process fluids",
          "Components that run hot",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you pour Ni-Resist D-2 castings for pumps?",
        a: "Yes. We pour ASTM A439 Type D-2 and Type D-5 Ni-Resist, and pump and valve is one of the industries we serve.",
      },
      {
        q: "What is the difference between Ni-Resist D-2 and D-5?",
        a: "Both are austenitic ductile irons. D-2 is the general-purpose corrosion and heat resistant grade. D-5 has more nickel and very low thermal expansion, for parts that must hold dimensions through temperature changes.",
      },
    ],
    related: ["white-iron-castings", "ductile-iron-castings", "steel-castings"],
  },
  {
    slug: "steel-castings",
    name: "Steel Castings",
    eyebrow: "Steel & Stainless",
    h1: "Steel Castings: Carbon, Low Alloy & Stainless",
    answer:
      "St. Louis Precision Cast Products pours carbon and low alloy steel castings (10XX, WCB, 41XX, 86XX), 300 and 400 series stainless steel, and C87500 bronze at our St. Louis, Missouri foundry. We cast short runs of 1 to 500 pieces, up to 2,000 lbs, heat treated in house and ready for machining.",
    metaTitle: "Steel Castings: Carbon, Low Alloy, WCB & Stainless | St. Louis",
    metaDescription:
      "Carbon and low alloy steel castings (10XX, WCB, 41XX, 86XX), 300/400 stainless and C87500 bronze. Short runs of 1 to 500 pieces. Request a quote.",
    image: "/images/stainless-steel-bronze.png",
    imageAlt: "Steel casting",
    grades: ["10XX Series", "WCB", "41XX Series", "86XX Series", "300 Series SS", "400 Series SS", "C87500 Bronze"],
    sections: [
      {
        h: "Steels we pour",
        list: [
          "Plain carbon steels: 10XX series and WCB, the ASTM A216 grade common in valve and pressure-containing parts",
          "Low alloy steels: 41XX chromium-molybdenum and 86XX nickel-chromium-molybdenum series, for higher strength and hardenability",
          "Stainless steels: 300 series and 400 series",
          "C87500 bronze",
          "Tool steels H13 and D2 (see tool steel castings)",
        ],
      },
      {
        h: "When to cast in steel",
        paras: [
          "Steel castings are used for structural and mechanical parts that need strength and toughness beyond what iron offers, or where a part is welded into an assembly. Stainless is the choice for corrosive environments.",
        ],
      },
      {
        h: "How we make them",
        paras: [
          "No-bake, air-set sand molds, MAGMA simulation before the first pour, stress relieving and annealing in house, and chemical analysis and mechanical property verification with full traceability.",
        ],
      },
    ],
    faqs: [
      {
        q: "What steel grades do you cast?",
        a: "Plain carbon steels (10XX, WCB), low alloy steels (41XX, 86XX), tool steels (H13, D2), and 300 and 400 series stainless steel. We also pour C87500 bronze.",
      },
      {
        q: "Do you make small runs of steel castings?",
        a: "Yes, from a single piece up to 500 pieces per run.",
      },
    ],
    related: ["tool-steel-castings", "ni-resist-castings", "short-run-castings"],
  },
  {
    slug: "tool-steel-castings",
    name: "Tool Steel Castings",
    eyebrow: "H13 & D2",
    h1: "H13 & D2 Tool Steel Castings",
    answer:
      "St. Louis Precision Cast Products pours H13 and D2 tool steel castings in the United States, at our St. Louis, Missouri foundry. They are used for die casting dies, forging dies and other tooling, and we cast them near net shape in runs of 1 to 500 pieces, up to 2,000 lbs.",
    metaTitle: "H13 & D2 Tool Steel Castings | US Foundry in St. Louis, MO",
    metaDescription:
      "H13 and D2 tool steel castings for die casting dies, forging dies and tooling. Near-net-shape sand castings, 1 to 500 pieces. Request a quote.",
    image: "/images/tool-steels-h13-insert.png",
    imageAlt: "H13 tool steel insert casting",
    grades: ["H13", "D2"],
    sections: [
      {
        h: "H13 and D2",
        paras: [
          "H13 is a chromium hot-work tool steel. It keeps its strength and resists heat checking at high temperature, which is why it is the standard for die casting dies and hot forging tooling.",
          "D2 is a high-carbon, high-chromium cold-work tool steel with very high wear resistance, used for tooling that cuts, forms or wears at room temperature.",
        ],
      },
      {
        h: "Why cast tooling near net shape",
        paras: [
          "Casting a die block or insert close to its finished shape removes a large share of the machining and material that cutting it from solid bar or plate would take. We can also make and store the pattern so the next die is a repeat order.",
        ],
      },
    ],
    faqs: [
      {
        q: "Where can I get H13 tool steel castings made in the US?",
        a: "St. Louis Precision Cast Products pours H13 and D2 tool steel castings at its foundry in St. Louis, Missouri, in runs from 1 to 500 pieces.",
      },
      {
        q: "What are cast H13 and D2 used for?",
        a: "Die casting dies, forging dies and other tooling. H13 is a hot-work steel; D2 is a wear resistant cold-work steel.",
      },
    ],
    related: ["steel-castings", "short-run-castings", "white-iron-castings"],
  },
  {
    slug: "short-run-castings",
    name: "Short Run & Prototype Castings",
    eyebrow: "1 to 500 Pieces",
    h1: "Short Run, Prototype & Replacement Part Castings",
    answer:
      "St. Louis Precision Cast Products specializes in short-run sand castings, from a single piece up to 500 pieces per run, in iron and steel. We make rapid prototypes, replacement parts for specialized and older equipment, and limited production runs at our MEEHANITE® licensed foundry in St. Louis, Missouri.",
    metaTitle: "Short Run & Prototype Castings, 1 to 500 Pieces | St. Louis Foundry",
    metaDescription:
      "Short-run and prototype sand castings from 1 to 500 pieces in gray iron, ductile iron and steel. Replacement parts for specialized equipment. Request a quote.",
    image: "/images/automotive-tooling.png",
    imageAlt: "Short run sand casting",
    grades: ["1 to 500 pieces", "Prototypes", "Replacement parts"],
    sections: [
      {
        h: "What we mean by short run",
        paras: [
          "Many foundries want long production runs. We are built for the opposite: one prototype, a handful of replacement parts, or a few hundred castings for specialized equipment. Runs go from 1 to 500 pieces.",
        ],
      },
      {
        h: "Prototypes",
        paras: [
          "Prove a design in the real alloy before committing to production tooling. We run MAGMA solidification simulation before the first pour, so problems show up on the screen instead of in the casting.",
        ],
      },
      {
        h: "Replacement parts for older equipment",
        paras: [
          "When a cast part on a machine fails and the original maker no longer supplies it, a short-run foundry is often the only way to get it made. Send us a drawing, a model, or photos and measurements of the part, with the material if you know it, and we will tell you what it will take.",
        ],
      },
      {
        h: "Patterns and repeat orders",
        paras: [
          "We provide pattern and tooling services, including design assistance, and we store and maintain your patterns so a repeat order does not start from scratch.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is your minimum order quantity?",
        a: "One piece. We produce from 1 to 500 pieces per run.",
      },
      {
        q: "Can you cast a replacement for an obsolete machine part?",
        a: "We make replacement parts for specialized equipment as short runs. Send a drawing, model, or photos and measurements of the part and we will review what is needed.",
      },
      {
        q: "Which metals can you use for a short run?",
        a: "MEEHANITE® gray and ductile irons, abrasion resistant white irons, Ni-Resist, carbon and low alloy steels, tool steels, stainless steel and C87500 bronze.",
      },
    ],
    related: ["gray-iron-castings", "ductile-iron-castings", "steel-castings"],
  },
];

export const castingPageBySlug = (slug: string) => CASTING_PAGES.find((p) => p.slug === slug);
