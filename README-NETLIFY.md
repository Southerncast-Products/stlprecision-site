# St. Louis Precision Cast Products — Netlify version

Same site, same wording. Everything that depended on Manus (its database, login,
notifications, analytics and CDN) has been replaced with Netlify equivalents.

## What changed

| Was (Manus) | Is now (Netlify) |
| --- | --- |
| Express + tRPC server | none — the site is static |
| MySQL `quoteRequests` table | Netlify Forms submissions |
| Manus notifications / email | Netlify Forms email notification |
| Manus OAuth login for `/admin` | one admin password |
| Status + internal notes in MySQL | Netlify Blobs (built in, no database) |
| Images on `files.manuscdn.com` | `client/public/images`, served from your own domain (already bundled) |
| Manus analytics (umami) tag | removed |

Page content, headings, meta tags, structured data and the blog are untouched.

## Do this before the Manus account is switched off

The ten site images are already in `client/public/images` — nothing to fetch.

1. **Export the existing quote requests** (optional, and only possible while the
   old database is alive):
   ```
   npm i -D mysql2
   DATABASE_URL="<old Manus DATABASE_URL>" node scripts/export-manus-quotes.mjs
   ```
   That writes `netlify/functions/legacy-quotes.json`, and the old requests keep
   showing in the admin dashboard next to new ones.

## Deploy

1. Push this folder to a Git repository (or drag it into Netlify).
2. Netlify picks up `netlify.toml`: build `npm run build`, publish `dist/public`,
   functions in `netlify/functions`.
3. Set environment variables under **Site configuration → Environment variables**:
   - `ADMIN_PASSWORD` — the password for `/admin`
   - `NETLIFY_API_TOKEN` — a personal access token (User settings → Applications),
     used to read form submissions
   `SITE_ID` is provided by Netlify automatically.
4. **Forms → Form notifications → add an email notification** to
   `info@oneoffcastings.com`. That replaces the old server email.
5. **Domain management → add `stlprecision.com`**, then point DNS at Netlify.
   The site is already canonicalised to `https://stlprecision.com/`.

## Site structure

The public site is six pages, one per nav item, implemented from the Claude Design
canvas `STL Precision Site.dc.html`:

| URL | Component |
| --- | --- |
| `/` | `client/src/pages/Home.tsx` — hero, credentials band, section index, recent work |
| `/about` | `client/src/pages/About.tsx` — company, capability specs, industries served |
| `/services` | `client/src/pages/Services.tsx` — short run, prototyping, tooling |
| `/materials` | `client/src/pages/Materials.tsx` — the six alloy families |
| `/quality` | `client/src/pages/Quality.tsx` — inspection, testing, MAGMA, documentation |
| `/contact` | `client/src/pages/Contact.tsx` — contact details and the quote form |
| `/faqs` | `client/src/pages/Faqs.tsx` — the four FAQs, and the source of the FAQ schema |
| `/blog` | `client/src/pages/Blog.tsx` — article index, with search and category filter |
| `/blog/<slug>` | `client/src/pages/BlogPost.tsx` — one article, from `content/blog/<slug>.md` |

`/admin` sits outside the marketing chrome. `/blog` used to as well, which meant the
blog had no navigation at all; it is now inside it like every other page.

Shared pieces:

- `client/src/site/content.ts` — **every piece of copy and every image path**. Edit
  wording here, not in the page components.
- `client/src/site/useDocumentMeta.ts` — per-page `<title>`, description and
  canonical URL. `PAGE_META` at the bottom of that file is where they live.
- `client/src/styles/site.css` — the whole design system: colours, type, the 1px
  "hairline grid" motif the layout is built on, and the responsive breakpoints.
  The design canvas was desktop-only; the media queries at the end of the file are
  additions and nothing above 1240px was changed to add them.
- `client/src/components/site/` — header (with the mobile menu), footer, the red
  CTA band, page headers, and the in-site 404.

Two standing content rules from the client meetings, both still honoured: spell
out "St. Louis" rather than "STL", and say "MEEHANITE® Licensee" rather than
"Partner".

### The site used to be one long page

It was a single scrolling page with `#about` / `#services` / `#materials` /
`#quality` / `#contact` anchors. Those are real URLs now. `App.tsx` redirects each
old anchor to its new page so existing links keep working, and `sitemap.xml` lists
the real URLs instead of the fragments.

## How the pages are prerendered

`npm run build` runs three steps:

1. `build:client` — the normal Vite build.
2. `build:ssr` — the same app built for Node, into `dist/server/entry-server.js`.
3. `prerender` — `scripts/prerender.mjs` renders every public route and writes a
   real HTML file for it: `dist/public/about/index.html`, and so on.

**Why it matters.** Without this, every URL served the same empty
`<div id="root">` and the content only existed after JavaScript ran. Google
executes JavaScript, but most AI crawlers do not, so the site was effectively
invisible to ChatGPT, Perplexity and AI Overviews. Now each page arrives complete,
with its own `<title>`, description, canonical URL, Open Graph tags and structured
data already in the HTML.

The client still boots and takes over as normal. It uses `createRoot` rather than
`hydrateRoot` on purpose: unknown URLs fall through to the shell, where the client
renders the 404, and hydration would flag that as a mismatch.

**Adding a page?** Add it to `PAGE_META` in `client/src/site/useDocumentMeta.ts`
and it is prerendered automatically — that object is the list the script walks.
Add it to `client/public/sitemap.xml` too.

**Don't add `force = true`** to the catch-all redirect in `netlify.toml`. Without
it, Netlify serves the prerendered file for each URL; with it, every URL would be
shadowed by the home page. There is a comment there saying so.

## GEO / AI answer engines

- `client/public/llms.txt` describes the company, services, alloys and process for
  AI answer engines, in the format they read. It closes with a citation note
  covering the standing rules: "St. Louis" not "STL", "MEEHANITE® Licensee" not
  "partner", and no ISO claim.
- `client/public/robots.txt` names the AI crawlers explicitly and allows them
  (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended and others).
  A named user-agent group replaces the `*` group for that crawler, so the
  `/api/` and `/admin` rules are repeated inside it deliberately. Removing them
  would expose the admin path to those crawlers.
- Structured data is per page: `LocalBusiness` sitewide, `BreadcrumbList` on every
  page except home, and `FAQPage` on `/faqs` only.
- `/faqs` renders `FAQS` from `client/src/site/content.ts`, and the prerender step
  generates the `FAQPage` schema from that same list. Google requires the answers
  to be visible on the page, so they cannot drift apart. Previously the schema
  shipped on every page while the answers appeared on none of them.

## Articles

Articles are markdown files in `content/blog/`. One file per article, and the
filename is the URL: `content/blog/gray-iron-guide.md` becomes
`/blog/gray-iron-guide`.

`scripts/build-blog.mjs` converts them into `client/src/generated/blog.ts` before
each build, so no markdown parser is shipped to the browser and the app just
imports data. That generated file is gitignored — `npm run dev` and `npm run build`
both regenerate it.

Each published article gets its own prerendered page with `Article` and
`BreadcrumbList` structured data, a card on `/blog`, and a line in the generated
`blog-sitemap.xml`. Full format documentation is in `content/blog/README.md`.

**Drafts.** `draft: true` in the front matter keeps a file out of the build
completely: no page, no index entry, no sitemap line. So a finished article can sit
in the repo awaiting sign-off and goes live by deleting that one line. There is one
draft in the repo now, `ductile-vs-gray-iron.md`, written as a worked example of the
format. Nothing publishes until someone removes that line.

**The build fails on bad content** — a missing title, description, category or date,
a category outside the four allowed, a malformed date, or an empty body. That is
deliberate: a broken article should stop the deploy rather than publish badly.

`blog-sitemap.xml` is generated rather than hand-maintained. The version that
shipped before listed `/blog` six times and no articles at all.

### The 18 placeholder posts

The site launched with 18 hardcoded blog entries whose bodies were a single
truncated sentence each, and none had a URL of its own — they were all rendered at
`/blog` by swapping React state, so nothing was ever indexable. They are gone.
Their titles are kept in `content/BACKLOG.md`, because they map to terms foundry
buyers search for, and they are worth checking against real search data before
anyone writes them.

## How the quote form works now

The visible React form in `client/src/pages/Home.tsx` posts to Netlify Forms.
Netlify detects the form from the hidden copy in `client/index.html` at build
time — if you add or rename a field, change it in **both** places.

Submissions appear under **Forms → quote-request** in Netlify, are emailed to
`info@oneoffcastings.com`, and show up at `/admin`.

> **Netlify has to run the build for this to work.** Form detection happens during
> Netlify's own build and post-processing, so it must deploy from Git (or from
> `netlify deploy --build`). Uploading a pre-built folder with
> `netlify deploy --dir=dist/public` skips detection entirely and every quote is
> silently dropped with a 404 — the same trap the One Off Castings site fell into.
> After the first deploy, send a real test submission and confirm it lands.

## The admin dashboard

`/admin` asks for `ADMIN_PASSWORD`, then lists every request with the same
statuses (new, contacted, quoted, closed), search, filters and internal notes as
before. Status and notes are stored in Netlify Blobs, keyed by submission id.

## Local development

```
npm install
npm run dev          # site only, at http://localhost:5173
netlify dev          # site + /api/quotes function (needs the Netlify CLI)
```

## Notes

- `client/public/sitemap.xml`, `blog-sitemap.xml`, `robots.txt` and
  `BingSiteAuth.xml` carried over unchanged.
- The `og:image` and JSON-LD logo now point at
  `https://stlprecision.com/images/logo.png`; update if the domain changes.
- No database, no server to run, no per-seat cost. Netlify Forms is limited to
  100 submissions/month on the free tier.
