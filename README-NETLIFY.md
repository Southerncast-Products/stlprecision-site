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

## How the quote form works now

The visible React form in `client/src/pages/Home.tsx` posts to Netlify Forms.
Netlify detects the form from the hidden copy in `client/index.html` at build
time — if you add or rename a field, change it in **both** places.

Submissions appear under **Forms → quote-request** in Netlify, are emailed to
`info@oneoffcastings.com`, and show up at `/admin`.

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
