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

const { render, PAGE_META, SITE_ORIGIN, FAQS } = await import(
  path.join(ROOT, "dist/server/entry-server.js")
);

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

for (const meta of Object.values(PAGE_META)) {
  const { path: url, title, description } = meta;
  const appHtml = render(url);

  const head = [];
  if (url !== "/") {
    head.push(
      ldjson({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN + "/" },
          {
            "@type": "ListItem",
            position: 2,
            name: BREADCRUMB_NAMES[url] ?? title,
            item: SITE_ORIGIN + url,
          },
        ],
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

for (const [url, file, size] of written) {
  console.log(`  ${url.padEnd(11)} -> ${file.padEnd(22)} ${(size / 1024).toFixed(1)} kB`);
}
console.log(`\nprerendered ${written.length} pages`);
