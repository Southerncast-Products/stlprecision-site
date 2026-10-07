# Article backlog

These titles came from the 18 placeholder posts the site shipped with. Each had a
one-sentence body (62-117 characters) and no URL of its own, so none of them was
ever a real page or ever indexed. The stubs are gone; the titles are kept here
because they already map to terms foundry buyers search for.

Nothing here is written yet. To publish one, add `content/blog/<slug>.md` with the
frontmatter described in `content/blog/README.md`. A file with `draft: true` is
excluded from the build entirely, so drafts can sit in the repo awaiting approval.

Treat this as a starting list, not a plan. It was written before anyone looked at
which queries actually bring in buyers who can be quoted, so check it against real
search data before working down it.

Hawk: the assignment below is the plan. The checkbox list is inventory. Do not
write articles from this file until someone asks. Read `.cursor/skills/hawk/SKILL.md`
first — that skill is a pointer back here plus the hard rules.


## Hawk assignment — AI-citation queries

Lauren is standing up a Hawk (SEO / GEO optimizer) for
[stlprecision.com](https://stlprecision.com) so rankings and AI citations move
the same way they did for One Off. This section is that Hawk's brief.

Win remaining citation queries with **dedicated money pages**, **question H2s**,
and **entity-first ledes**. Do not invent ranking positions, search volumes, or
citation share. `SEO_OPTIMIZATION_REPORT.md` has unverified volume labels and
target ranks; treat those as historical notes, not measurements.

Do not write the articles from this brief. Do not redesign the site. Do not
change DNS or Netlify.


### Entity (do not blur)

**St. Louis Precision Cast Products** is a gray iron and ductile iron
**MEEHANITE® licensee** (since 1970) sand foundry at **10922 Gravois Industrial
Court, St. Louis, MO 63128-2032**. Molding is **no-bake / air-set sand** with
**traditional patterns**, MAGMA solidification simulation before the first pour,
castings up to **2,000 lb**, in-house stress relief and annealing, parts supplied
ready for machining.

Services the live site actually offers: short-run production (**1 to 500**
pieces), rapid prototype castings, and pattern / tooling (design assistance,
storage, maintenance, near-net-shape). Alloys on `/materials` and in `llms.txt`:
MEEHANITE® gray, ductile, and wear-resistant irons; abrasion-resistant white
irons (NiHard, ASTM A532 IIB / IIIA); Ni-Resist (ASTM A439 D-2 / D-5); carbon and
low-alloy steels (10XX, WCB, 41XX, 86XX); tool steels (H13, D2); 300/400
stainless; C87500 bronze. Industries named on the site: energy and power, mining
and aggregate, construction, agriculture, machine tool, pump and valve.

This is **not** One Off Castings. One Off is the patternless robotic / 3D-sand
steel shop in Jonesboro, Arkansas (robocasting, ceramic / silica-free sand, ABB
molders, aluminum, no-pattern / no-minimum positioning). Do not let those
process claims, that city, or those specialty alloys leak onto this site. Shared
inbox (`info@oneoffcastings.com`) is operational, not identity. Quote form is
Netlify Forms `quote-request` on `/contact`. Phone is 314-849-4080.

Public copy spells out **St. Louis**, never "STL". Say **MEEHANITE® Licensee**
or **MEEHANITE® licensed foundry**, never "partner". Hold **no ISO**
certification and make **no ISO claim**. Do not use "precision casting" as a
process name. Do not invent client counts, on-time percentages, or other stats.


### What is live vs draft

Confirmed against the repo and the live host (apex `https://stlprecision.com`
returns 200; `www` 301s to apex). No ranking numbers attached.

| Surface | State |
| --- | --- |
| Money pages | `/`, `/about`, `/services`, `/materials`, `/quality`, `/faqs`, `/contact` — real prerendered pages. `/services` and `/materials` are catalogs, not one-query pages. |
| `/faqs` | Four answers only: alloys poured, MOQ 1–500, MEEHANITE® licensee, no-bake + MAGMA. |
| `/blog` | Index exists. `blog-sitemap.xml` lists `/blog` and **no articles**. |
| `content/blog/ductile-vs-gray-iron.md` | **Unpublished draft** (`draft: true`). Written, excluded from the build, not in the sitemap. Backlog slug below was `ductile-vs-gray`; the file slug is `ductile-vs-gray-iron`. Do not open a second URL for the same query. |
| `todo.md` | Stale. It claims twenty published articles and "local Michigan" SEO. Neither is true of this site. |
| GEO already in repo | `client/public/llms.txt`, AI crawlers named in `robots.txt`, prerender so answer engines see HTML, `LocalBusiness` / `FAQPage` / `Article` schema. Do not rip these out. |
| Office DNS | Inside the office, only `www` resolves in a browser because `stlprecision.com` is the Active Directory domain. HTTPS (Let's Encrypt) is live. **Do not change DNS or Netlify.** Netlify project is `stlpre`. |


### How to win a remaining query

1. **One owner URL per cluster.** Prefer a dedicated page over stuffing another
   H2 onto `/services` or `/materials`. Existing thin pages can be the owner
   only when they already answer the question in the first screen.
2. **Entity-first lede.** First paragraph names St. Louis Precision Cast
   Products, the St. Louis sand foundry, gray / ductile iron, and MEEHANITE®
   licensee — then answers the question. Not a generic "iron is an alloy of…"
   opener, and not a One Off lede.
3. **Question H2s.** Buyers ask questions; the heading is the question. Then
   answer in the next sentence.
4. **Ground every claim** in `client/src/site/content.ts`, `llms.txt`, or a
   published page. If the site does not offer it, do not target it.
5. **CTA** is `/contact` (quote-request) or 314-849-4080. Same team reads
   `info@oneoffcastings.com`; the page still belongs to St. Louis Precision.
6. **Publish path** is `content/blog/<slug>.md` per `content/blog/README.md`.
   Leave `draft: true` until someone removes that line. Do not hand-edit
   `client/src/generated/blog.ts`.


### Proposed citation queries

Buyer questions a sourcing engineer or purchaser would actually type into
ChatGPT, Perplexity, Gemini, or Google. Not One Off queries (patternless,
robocasting, 3D-printed sand, Jonesboro, no-tooling steel, aluminum, CA6NM /
CF8M / CD4MCuN, line-down legacy). No volumes or ranks — none were measured
for this brief.

| # | Query | Cluster | Owner today | Gap |
| --- | --- | --- | --- | --- |
| 1 | What is the difference between gray iron and ductile iron for a sand casting? | comparison | Draft only: `content/blog/ductile-vs-gray-iron.md` (`draft: true`) | Publish the draft after review. Do not write a second comparison. |
| 2 | Should I spec ASTM A48 gray iron or ASTM A536 ductile iron? | comparison | Same draft | Same page. Question H2s, not a new slug. |
| 3 | Why is gray iron used for machine-tool bases and housings? | comparison / gray iron | Same draft (damping / machinability) | Keep on the comparison page unless a gray-iron guide ships. |
| 4 | When should a part that sees shock or fatigue be ductile iron instead of gray? | comparison / ductile | Same draft | Same page. |
| 5 | What is a MEEHANITE licensed foundry, and why specify MEEHANITE iron? | MEEHANITE | `/faqs` (one short answer) + `/materials` card | Needs a dedicated money page. Maps to `meehanite-licensed` below. |
| 6 | Where can I get gray iron or ductile iron sand castings in St. Louis? | local | `/` and `/about` | Entity is on those pages; they are not a one-query local page. Spell out St. Louis. |
| 7 | Which St. Louis foundry pours iron sand castings up to 2,000 lb? | local / capacity | `/about` (spec listed) | Keep on `/about` or a local page. Do not invent other weights. |
| 8 | Who pours short-run gray iron castings, as few as one piece? | short-run | `/services` (1–500) + `/faqs` MOQ | Dedicated short-run gray iron page. Do not promise "no minimum" in the One Off sense. |
| 9 | Where can I get prototype iron castings in sand before committing to production tooling? | prototype | `/services` prototyping card | Dedicated prototype-iron page. Maps to `prototype-castings` below. |
| 10 | What pattern tooling does a sand foundry provide for repeat iron orders? | tooling | `/services` tooling card | Dedicated pattern-tooling page. Maps to `pattern-tooling` below. Traditional patterns — not patternless. |
| 11 | What is no-bake / air-set sand molding, and when is it used for iron? | process | `/faqs` + `/about` | Dedicated process page is justified. Do not describe 3D-printed sand or robocasting. |
| 12 | Who pours NiHard or ASTM A532 abrasion-resistant white iron? | white iron | `/materials` card | Dedicated page. Maps to `white-iron-castings` below. |
| 13 | What are Ni-Resist (ASTM A439) iron castings used for? | Ni-Resist | `/materials` card | Dedicated page. Maps to `ni-resist-castings` below. |
| 14 | Why run MAGMA solidification simulation before the first pour? | quality | `/quality` | `/quality` can own this if the first screen answers it; otherwise `magma-simulation` below. |
| 15 | What is the minimum order for gray or ductile iron sand castings? | short-run / MOQ | `/faqs` (1–500) | FAQ can keep this if the answer stays visible. Do not change the 1–500 range. |
| 16 | When is a local iron foundry a better choice than overseas casting? | sourcing | none | Maps to `local-vs-overseas` below. Ground in lead time, pattern control, and St. Louis — no invented cost tables. |
| 17 | Who can pour a replacement or limited-run iron casting from a drawing? | short-run | `/services` | Same cluster as #8. One owner URL. |
| 18 | What alloys does St. Louis Precision Cast Products pour? | entity | `/materials` + `/faqs` | `/materials` is the owner. Do not add aluminum (not listed). Do not claim ISO. |

Suggested first ship, in order, once writing is approved:

1. Publish `ductile-vs-gray-iron.md` (queries 1–4) after a human removes `draft: true`.
2. Dedicated MEEHANITE licensee page (query 5).
3. Dedicated short-run gray iron + prototype iron pages (queries 8–9, 17).
4. Dedicated St. Louis sand-foundry / gray-and-ductile page (queries 6–7) if `/about` cannot carry them.
5. White iron, Ni-Resist, pattern tooling, no-bake, MAGMA, local-vs-overseas as capacity allows.

Do not pursue from this site: ceramic robocasting, patternless / robotic molding,
3D sand printing, Jonesboro, "no patterns required", aluminum castings, ISO 9001,
"precision casting" as a process, Michigan / Holland Alloys leftovers, or One Off
alloy call-outs (CA6NM, CF8M, CD4MCuN, A216 WCB-as-hero). Steel, stainless, tool
steel, and bronze are on `/materials` and may get pages later; they are not the
citation priority. The foundry's public identity is gray iron, ductile iron, and
MEEHANITE® in St. Louis.


### Copy and collision rules (public pages)

- Company name: **St. Louis Precision Cast Products**. Spell out St. Louis.
- Process: no-bake / air-set sand, traditional patterns, MAGMA, up to 2,000 lb.
- License: MEEHANITE® licensee since 1970. Not a partner. Not ISO.
- Sister shop: mention One Off only to *separate* the two (as `llms.txt` already
  does). Never to borrow their process story.
- Email on the site stays `info@oneoffcastings.com` unless someone changes it
  for real. Do not invent `info@stlprecision.com`.
- Inside-the-office `www`-only access is an AD-domain fact. Not a content task.


## Casting types  (`category: casting-types`)

- [ ] **Abrasion Resistant White Iron Castings (NiHard, ASTM A532)**
      `slug: white-iron-castings`  ·  tags: white iron, NiHard, abrasion resistant, ASTM A532
      Hawk: query 12.
- [ ] **Gray Iron Castings: Complete Guide for Industrial Applications**
      `slug: gray-iron-guide`  ·  tags: gray iron, castings, materials
      Hawk: support for queries 1, 3, 6. Do not cannibalize the comparison draft.
- [ ] **Ni-Resist Iron Castings for High-Temperature Applications**
      `slug: ni-resist-castings`  ·  tags: Ni-Resist, high temperature, corrosion resistant
      Hawk: query 13.
- [ ] **Pattern Tooling Castings: Design, Capabilities, and Lead Times**
      `slug: pattern-tooling`  ·  tags: pattern tooling, tooling, design
      Hawk: query 10. Traditional patterns only.
- [ ] **Prototype Castings: Fast Turnaround Sand Casting Solutions**
      `slug: prototype-castings`  ·  tags: prototyping, rapid, sand casting
      Hawk: query 9. Iron sand prototypes, not 3D-printed molds.
- [ ] **Stainless Steel Castings for Corrosion-Resistant Applications**
      `slug: stainless-steel`  ·  tags: stainless steel, corrosion resistant, applications
      Hawk: later. Not a citation priority.
- [ ] **Tool Steel Castings (H13, D2): Heat Treatment and Specifications**
      `slug: tool-steel-castings`  ·  tags: tool steel, H13, D2, heat treatment
      Hawk: later. Not a citation priority.

## Comparisons  (`category: comparison`)

- [ ] **Ductile Iron Castings vs Gray Iron: Which Should You Choose?**
      `slug: ductile-vs-gray`  ·  tags: ductile iron, gray iron, comparison
      **Draft on disk:** `content/blog/ductile-vs-gray-iron.md` (`draft: true`).
      File slug wins. Hawk: queries 1–4. Publish path is removing `draft: true`,
      not writing a new article.
- [ ] **Local Foundry vs Overseas Casting: Cost and Quality Analysis**
      `slug: local-vs-overseas`  ·  tags: sourcing, supply chain, cost analysis
      Hawk: query 16. No invented cost figures.
- [ ] **Why Choose a MEEHANITE Licensed Foundry?**
      `slug: meehanite-licensed`  ·  tags: MEEHANITE, quality assurance, certification
      Hawk: query 5. Licensee, not partner. No ISO.

## Technical  (`category: technical`)

- [ ] **Casting Defect Prevention: Porosity, Shrinkage, and Cracking**
      `slug: casting-defect-prevention`  ·  tags: defects, porosity, shrinkage, quality
- [ ] **MAGMA Simulation in Casting: How Advanced Modeling Improves Quality**
      `slug: magma-simulation`  ·  tags: MAGMA, simulation, quality
      Hawk: query 14.
- [ ] **Sand Casting vs Die Casting: When to Use Each Process**
      `slug: sand-vs-die-casting`  ·  tags: sand casting, die casting, process comparison
      Only if we stay on the sand-foundry side. We do not die-cast.
- [ ] **Sustainable Casting Practices: Recycled Metal and Environmental Benefits**
      `slug: sustainable-casting`  ·  tags: sustainability, recycled metal, environment
      Do not write until someone can source a real claim. The site does not
      currently document recycled-content figures.

## Industry guides  (`category: industry-guides`)

- [ ] **Casting Solutions for Automotive Industry: Materials and Tolerances**
      `slug: automotive-castings`  ·  tags: automotive, engine castings, tolerances
- [ ] **Construction Equipment Castings: Durability and Performance**
      `slug: construction-equipment`  ·  tags: construction equipment, heavy equipment, durability
- [ ] **Energy Sector Castings: Oil & Gas, Power Generation Applications**
      `slug: energy-sector-castings`  ·  tags: energy, oil and gas, power generation
- [ ] **Railroad Casting Specifications and Standards**
      `slug: railroad-castings`  ·  tags: railroad, AAR standards, freight cars
      Do not write until the site (or a customer) actually claims railroad /
      AAR work. It is not in `content.ts` or `llms.txt`.
