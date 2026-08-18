/**
 * Writes a real static HTML file for every public route.
 *
 * Runs after both Vite builds. Takes dist/public/index.html as the shell, renders
 * each route with dist/server/entry-server.js, and drops the result in place of the
 * empty <div id="root">, with that page's own <title>, description, canonical, OG
 * tags and structured data baked into the served HTML.
 *
 * Why: the site is a React SPA. Without this, every URL serves the same shell and
 * the content only exists after JavaScript runs — invisible to AI crawlers, which
 * largely do not execute it. Netlify serves a matching file before it consults the
 * SPA redirect in netlify.toml, so these files simply take precedence.
 *
 * The client still hydrates as normal; this only changes what arrives before it.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "dist/public");
const TEMPLATE = path.join(PUBLIC_DIR, "index.html");

const { render, PAGE_META, SITE_ORIGIN, FAQS, BLOG_POSTS } = await import(
  path.join(ROOT, "dist/server/entry-server.js")
);

const COMPANY_NAME = "St. Louis Precision Cast Products";
const LOGO = SITE_ORIGIN + "/images/logo.png";

const BREADCRUMB_NAMES = {
  "/about": "About",
  "/services": "Services",
  "/materials": "Materials",
  "/quality": "Quality",
  "/contact": "Contact",
  "/faqs": "FAQs",
  "/blog": "Blog",
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const ldjson = (obj) =>
  `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n    </script>`;

/** Replace the content of a tag that already exists in the shell. */
function setTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: shell is missing ${pattern}`);
  return html.replace(pattern, replacement);
}

function buildPage(template, { url, title, description, appHtml, extraHead }) {
  const canonical = SITE_ORIGIN + (url === "/" ? "/" : url);
  let html = template;

  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setTag(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${esc(description)}" />`
  );
  html = setTag(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${esc(canonical)}" />`
  );
  for (const [attr, key, value] of [
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:url", canonical],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
  ]) {
    html = setTag(
      html,
      new RegExp(`<meta ${attr}="${key}" content="[^"]*" \\/>`),
      `<meta ${attr}="${key}" content="${esc(value)}" />`
    );
  }

  if (extraHead) html = html.replace("</head>", `    ${extraHead}\n  </head>`);

  // The shell ships <div id="root"></div>; fill it, leaving hydration untouched.
  html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`);
  return html;
}

const template = await readFile(TEMPLATE, "utf8");
const written = [];

/** Fixed pages, then one page per published article. */
const targets = [
  ...Object.values(PAGE_META).map((m) => ({ ...m, post: null })),
  ...BLOG_POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | ${COMPANY_NAME}`,
    description: post.description,
    post,
  })),
];

for (const meta of targets) {
  const { path: url, title, description, post } = meta;
  const appHtml = render(url);

  const head = [];
  if (url !== "/") {
    const crumbs = [{ name: "Home", item: SITE_ORIGIN + "/" }];
    if (post) {
      crumbs.push({ name: "Blog", item: SITE_ORIGIN + "/blog" });
      crumbs.push({ name: post.title, item: SITE_ORIGIN + url });
    } else {
      crumbs.push({ name: BREADCRUMB_NAMES[url] ?? title, item: SITE_ORIGIN + url });
    }
    head.push(
      ldjson({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.item,
        })),
      })
    );
  }
  if (post) {
    head.push(
      ldjson({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        wordCount: post.words,
        keywords: post.tags.join(", ") || undefined,
        articleSection: post.category.replace(/-/g, " "),
        mainEntityOfPage: { "@type": "WebPage", "@id": SITE_ORIGIN + url },
        image: post.image ? SITE_ORIGIN + post.image : LOGO,
        author: { "@type": "Organization", name: COMPANY_NAME, url: SITE_ORIGIN },
        publisher: {
          "@type": "Organization",
          name: COMPANY_NAME,
          logo: { "@type": "ImageObject", url: LOGO },
        },
      })
    );
  }
  if (url === "/faqs" && FAQS) {
    head.push(
      ldjson({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      })
    );
  }

  const html = buildPage(template, {
    url,
    title,
    description,
    appHtml,
    extraHead: head.join("\n    "),
  });

  const outDir = url === "/" ? PUBLIC_DIR : path.join(PUBLIC_DIR, url.slice(1));
  await mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, "index.html");
  await writeFile(outFile, html);
  written.push([url, path.relative(PUBLIC_DIR, outFile), html.length]);
}

// blog-sitemap.xml is generated, so it always matches the articles that exist.
// The version that shipped before listed /blog six times and no articles at all.
const blogUrls = [
  { loc: SITE_ORIGIN + "/blog", lastmod: BLOG_POSTS[0]?.date, changefreq: "weekly", priority: "0.7" },
  ...BLOG_POSTS.map((p) => ({
    loc: `${SITE_ORIGIN}/blog/${p.slug}`,
    lastmod: p.date,
    changefreq: "monthly",
    priority: "0.6",
  })),
];
const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(PUBLIC_DIR, "blog-sitemap.xml"), blogSitemap);

for (const [url, file, size] of written) {
  console.log(`  ${url.padEnd(24)} -> ${file.padEnd(34)} ${(size / 1024).toFixed(1)} kB`);
}
console.log(`\nprerendered ${written.length} pages`);
console.log(`blog-sitemap.xml: ${blogUrls.length} url(s) (${BLOG_POSTS.length} article(s))`);
