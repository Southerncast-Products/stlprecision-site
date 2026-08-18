/**
 * Server entry, used only at build time by scripts/prerender.mjs.
 *
 * Renders each public route to HTML so Netlify serves real content instead of an
 * empty <div id="root">. Search engines and AI crawlers that do not execute
 * JavaScript can then read the whole page.
 */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export { PAGE_META, SITE_ORIGIN } from "./site/useDocumentMeta";
export { FAQS } from "./site/content";
export { BLOG_POSTS } from "./generated/blog";

export function render(url: string): string {
  return renderToString(
    <Router ssrPath={url}>
      <App />
    </Router>
  );
}
