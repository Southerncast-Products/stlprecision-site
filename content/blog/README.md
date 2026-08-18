# Articles

One markdown file per article. The filename is the URL: `gray-iron-guide.md`
becomes `/blog/gray-iron-guide`.

`scripts/build-blog.mjs` converts these into `client/src/generated/blog.ts` at
build time, so no markdown parser is shipped to the browser. It runs automatically
as part of `npm run dev` and `npm run build`.

## Front matter

```markdown
---
title: "Gray Iron Castings: A Complete Guide for Industrial Applications"
description: "One or two sentences. Used as the meta description and the card blurb, so keep it under about 160 characters."
category: casting-types      # casting-types | industry-guides | technical | comparison
date: 2026-08-18             # YYYY-MM-DD
tags: [gray iron, ASTM A48, machinability]
author: "St. Louis Precision"   # optional
image: /images/meehanite-irons.png   # optional, shown on the card
readTime: 8                  # optional, otherwise calculated from length
draft: true                  # optional; a draft is left out of the build entirely
---

Body in markdown. Start with a paragraph, not a heading — the title is already
rendered as the page's H1. Use `##` for sections.
```

The build **fails** on a missing `title`, `description`, `category` or `date`, on a
category outside the four above, on a malformed date, or on an empty body. That is
deliberate: a broken article should stop the deploy rather than publish badly.

## Drafts

`draft: true` keeps a file out of the built site completely — no page, no entry in
the index, no sitemap line. So a finished article can sit in the repo waiting for
sign-off, and goes live by deleting that one line.

## What gets generated

Each published article gets its own prerendered URL with `Article` and
`BreadcrumbList` structured data, an entry on `/blog`, and a line in
`blog-sitemap.xml`.

## Before writing

`content/BACKLOG.md` holds the titles carried over from the placeholder posts the
site launched with. Check them against real search data first — that list predates
knowing which queries bring in buyers who can actually be quoted.
