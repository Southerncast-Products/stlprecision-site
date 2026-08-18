/**
 * Turns content/blog/*.md into client/src/generated/blog.ts.
 *
 * Runs before the Vite builds. Markdown is converted here, at build time, so the
 * parser never ships to the browser — the app imports plain data.
 *
 * Front matter (see content/blog/README.md):
 *   title, description, category, date   required
 *   tags, author, image, readTime        optional
 *   draft: true                          excluded from the build entirely
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content/blog");
const OUT = path.join(ROOT, "client/src/generated/blog.ts");

const CATEGORIES = ["casting-types", "industry-guides", "technical", "comparison"];

/**
 * YAML turns an unquoted `2026-08-18` into a Date at UTC midnight. Formatting that
 * with anything local-timezone-aware moves it back a day west of Greenwich, so
 * normalise through UTC. Quoted strings pass through untouched.
 */
function isoDate(value) {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? "" : value.toISOString().slice(0, 10);
  }
  return String(value ?? "").slice(0, 10);
}
const WORDS_PER_MINUTE = 225;

marked.setOptions({ gfm: true, breaks: false });

// README.md documents the format; `_name.md` is the convention for notes that are
// not articles. Neither is content.
const isArticle = (f) =>
  f.endsWith(".md") && f !== "README.md" && !f.startsWith("_") && !f.startsWith(".");

const files = (await readdir(CONTENT).catch(() => [])).filter(isArticle);

const posts = [];
const drafts = [];
const problems = [];

for (const file of files.sort()) {
  const slug = file.replace(/\.md$/, "");
  const raw = await readFile(path.join(CONTENT, file), "utf8");
  const { data, content } = matter(raw);

  if (data.draft === true) {
    drafts.push(slug);
    continue;
  }

  for (const field of ["title", "description", "category", "date"]) {
    if (!data[field]) problems.push(`${file}: missing required front matter "${field}"`);
  }
  if (data.category && !CATEGORIES.includes(data.category)) {
    problems.push(`${file}: category "${data.category}" is not one of ${CATEGORIES.join(", ")}`);
  }
  const date = isoDate(data.date);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    problems.push(`${file}: date must be YYYY-MM-DD, got "${data.date}"`);
  }
  if (!content.trim()) problems.push(`${file}: body is empty`);

  const words = content.trim().split(/\s+/).filter(Boolean).length;

  posts.push({
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    category: String(data.category ?? ""),
    author: String(data.author ?? "St. Louis Precision"),
    date,
    readTime: Number(data.readTime) || Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    image: data.image ? String(data.image) : null,
    words,
    html: marked.parse(content).trim(),
  });
}

if (problems.length) {
  console.error("\nblog content is invalid:\n" + problems.map((p) => "  - " + p).join("\n") + "\n");
  process.exit(1);
}

// newest first
posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));

const banner = `/**
 * GENERATED FILE — do not edit.
 *
 * Written by scripts/build-blog.mjs from content/blog/*.md. Edit the markdown.
 */`;

const body = `${banner}

export type BlogCategory = ${CATEGORIES.map((c) => JSON.stringify(c)).join(" | ")};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  author: string;
  /** YYYY-MM-DD */
  date: string;
  readTime: number;
  tags: string[];
  image: string | null;
  words: number;
  /** Pre-rendered HTML from the markdown body. */
  html: string;
};

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(posts, null, 2)};
`;

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, body);

console.log(`  blog: ${posts.length} published, ${drafts.length} draft(s) skipped`);
for (const p of posts) console.log(`    ${p.date}  ${p.slug}  (${p.words} words, ${p.readTime} min)`);
for (const d of drafts) console.log(`    draft   ${d}  (not built)`);
