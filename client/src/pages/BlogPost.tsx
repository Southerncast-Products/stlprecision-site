/**
 * One article. Body HTML is produced from markdown at build time by
 * scripts/build-blog.mjs, so nothing untrusted is being injected here — the
 * content is the markdown in this repo.
 */
import { Link } from "wouter";
import { BLOG_POSTS } from "@/generated/blog";
import { COMPANY } from "@/site/content";
import { formatPostDate } from "./Blog";
import NotFoundPanel from "@/components/site/NotFoundPanel";
import { useArticleMeta } from "@/site/useDocumentMeta";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((entry) => entry.slug === params.slug);

  useArticleMeta(post ? { path: `/blog/${post.slug}`, title: post.title, description: post.description } : null);

  if (!post) return <NotFoundPanel />;

  return (
    <>
      <section className="sp-pagehead">
        <div className="sp-pagehead-inner">
          <div className="sp-eyebrow">{post.category.replace(/-/g, " ")}</div>
          <h1 className="sp-page-h1 has-lead sp-article-h1">{post.title}</h1>
          <p className="sp-page-lead">{post.description}</p>
          <div className="sp-article-meta">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="sp-article-meta-sep">·</span>
            <span>{post.author}</span>
            <span className="sp-article-meta-sep">·</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </section>

      <section className="sp-article-wrap">
        <article className="sp-article" dangerouslySetInnerHTML={{ __html: post.html }} />

        {post.tags.length > 0 && (
          <div className="sp-chips sp-article-tags">
            {post.tags.map((tag) => (
              <span className="sp-chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="sp-article-foot">
          <Link href="/blog" className="sp-textlink">
            ← All articles
          </Link>
          <p className="sp-prose sp-article-foot-p">
            Have a casting that fits this? Call{" "}
            <a href={COMPANY.phoneHref} className="sp-faq-link">
              {COMPANY.phone}
            </a>{" "}
            or <Link href="/contact" className="sp-faq-link">request a quote</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
