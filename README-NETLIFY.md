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

`/blog` and `/admin` are unchanged and sit outside the marketing chrome.

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

### One SEO caveat worth knowing

Page metadata is applied by JavaScript after React mounts, because the site is a
client-rendered SPA — `client/index.html` only ships the home page's head. Google
executes JavaScript and will pick up the per-page titles; crawlers that do not
(some AI crawlers, older Bing behaviour) see the home page metadata on all six
URLs. Fixing that properly means adding a prerender step to the build so each
route is written out as real static HTML. That is a build change, not a content
change, and it has not been done here.

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
