/**
 * Article index. Content comes from content/blog/*.md via the generated module.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import PageHead from "@/components/site/PageHead";
import { BLOG_POSTS, type BlogCategory } from "@/generated/blog";
import { PAGE_META, useDocumentMeta } from "@/site/useDocumentMeta";

const CATEGORIES: { value: "all" | BlogCategory; label: string }[] = [
  { value: "all", label: "All Articles" },
  { value: "casting-types", label: "Casting Types" },
  { value: "industry-guides", label: "Industry Guides" },
  { value: "technical", label: "Technical Resources" },
  { value: "comparison", label: "Comparisons" },
];

/** "2026-08-18" -> "Aug 18, 2026", without dragging in a date library. */
export function formatPostDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function Blog() {
  useDocumentMeta(PAGE_META.blog);

  const [category, setCategory] = useState<"all" | BlogCategory>("all");
  const [search, setSearch] = useState("");

  const posts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return BLOG_POSTS.filter((post) => {
      if (category !== "all" && post.category !== category) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [category, search]);

  const hasPosts = BLOG_POSTS.length > 0;

  return (
    <>
      <PageHead
        eyebrow="Casting Guides"
        title="Technical Resources"
        lead="Guides on the metals we pour, how sand casting behaves, and how to specify a casting that comes out right the first time."
      />

      <section className="sp-section">
        {hasPosts ? (
          <>
            <div className="sp-blog-controls">
              <label className="sp-field sp-blog-search">
                Search articles
                <input
                  className="sp-input"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Gray iron, MAGMA, tolerances..."
                />
              </label>
              <label className="sp-field sp-blog-filter">
                Category
                <select
                  className="sp-input"
                  value={category}
                  onChange={(event) => setCategory(event.target.value as "all" | BlogCategory)}
                >
                  {CATEGORIES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {posts.length > 0 ? (
              <div className="sp-cardgrid">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="sp-card">
                    <div className="sp-card-meta">
                      <span className="sp-card-cat">{post.category.replace(/-/g, " ")}</span>
                      <span>{post.readTime} min</span>
                    </div>
                    <h2 className="sp-card-title">{post.title}</h2>
                    <p className="sp-card-desc">{post.description}</p>
                    <div className="sp-card-date">{formatPostDate(post.date)}</div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="sp-prose">
                Nothing matches that search. Try a different term or choose another category.
              </p>
            )}
          </>
        ) : (
          <div className="sp-empty">
            <h2 className="sp-empty-h">Articles are on the way</h2>
            <p className="sp-prose">
              We are writing up the technical guides that answer what buyers ask us most. In the
              meantime, the <Link href="/materials" className="sp-faq-link">metals we pour</Link>{" "}
              and the <Link href="/faqs" className="sp-faq-link">FAQs</Link> cover most
              specification questions, and we are happy to talk a casting through with you.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
