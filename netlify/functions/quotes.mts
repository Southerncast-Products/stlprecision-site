/**
 * Quote inbox API for the admin dashboard.
 *
 * Reads submissions from Netlify Forms, merges in status + internal notes kept
 * in Netlify Blobs, and merges in quotes exported from the old Manus database
 * (legacy-quotes.json). No external database required.
 *
 * Environment variables (Site configuration -> Environment variables):
 *   ADMIN_PASSWORD     password for the /admin dashboard
 *   NETLIFY_API_TOKEN  personal access token, used to read form submissions
 *   SITE_ID            provided automatically by Netlify
 */
import { getStore } from "@netlify/blobs";
import legacyQuotes from "./legacy-quotes.json";

const FORM_NAME = "quote-request";
const STATUSES = ["new", "contacted", "quoted", "closed"] as const;

type Status = (typeof STATUSES)[number];

type Quote = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  projectDetails: string;
  status: Status;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

function authorized(req: Request) {
  const supplied = req.headers.get("x-admin-password") ?? "";
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  if (supplied.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= supplied.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

async function fetchFormSubmissions() {
  const token = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.SITE_ID;
  if (!token || !siteId) return [];

  const res = await fetch(
    "https://api.netlify.com/api/v1/sites/" + siteId + "/submissions?per_page=200",
    { headers: { authorization: "Bearer " + token } }
  );
  if (!res.ok) {
    console.warn("[quotes] Netlify Forms API returned " + res.status);
    return [];
  }
  const all = (await res.json()) as any[];
  return all.filter((s) => !s.form_name || s.form_name === FORM_NAME);
}

const field = (data: Record<string, unknown>, ...keys: string[]) => {
  for (const k of keys) {
    const v = data?.[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
};

export default async (req: Request) => {
  if (!authorized(req)) {
    return json({ error: "Not authorized" }, 401);
  }

  const meta = getStore({ name: "quote-meta", consistency: "strong" });

  if (req.method === "POST") {
    const body = (await req.json().catch(() => ({}))) as {
      id?: string;
      status?: string;
      notes?: string;
    };
    if (!body.id) return json({ error: "Missing id" }, 400);

    const current =
      ((await meta.get(body.id, { type: "json" })) as Partial<Quote> | null) ?? {};

    if (body.status !== undefined) {
      if (!STATUSES.includes(body.status as Status)) {
        return json({ error: "Unknown status" }, 400);
      }
      current.status = body.status as Status;
    }
    if (body.notes !== undefined) {
      current.notes = String(body.notes).slice(0, 5000);
    }
    current.updatedAt = new Date().toISOString();

    await meta.setJSON(body.id, current);
    return json({ success: true });
  }

  // GET — list, filter, paginate
  const url = new URL(req.url);
  const statusFilter = url.searchParams.get("status") ?? "all";
  const search = (url.searchParams.get("search") ?? "").toLowerCase();
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const limit = Math.min(100, Number(url.searchParams.get("limit") ?? 20));

  const submissions = await fetchFormSubmissions();

  const fromForms: Quote[] = submissions.map((s) => {
    const data = (s.data ?? {}) as Record<string, unknown>;
    return {
      id: String(s.id),
      name: field(data, "name") ?? s.name ?? "(no name)",
      company: field(data, "company"),
      email: field(data, "email") ?? s.email ?? "",
      phone: field(data, "phone"),
      projectDetails: field(data, "projectDetails", "project_details", "message") ?? "",
      status: "new",
      notes: null,
      createdAt: s.created_at,
      updatedAt: s.created_at,
    };
  });

  const fromLegacy: Quote[] = (legacyQuotes as any[]).map((q) => ({
    id: String(q.id),
    name: q.name,
    company: q.company ?? null,
    email: q.email,
    phone: q.phone ?? null,
    projectDetails: q.projectDetails ?? "",
    status: (STATUSES.includes(q.status) ? q.status : "new") as Status,
    notes: q.notes ?? null,
    createdAt: q.createdAt,
    updatedAt: q.createdAt,
  }));

  let quotes = [...fromForms, ...fromLegacy];

  quotes = await Promise.all(
    quotes.map(async (q) => {
      const stored = (await meta.get(q.id, { type: "json" })) as Partial<Quote> | null;
      return stored ? { ...q, ...stored, id: q.id } : q;
    })
  );

  quotes.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  const stats = { total: quotes.length, new: 0, contacted: 0, quoted: 0, closed: 0 };
  for (const q of quotes) stats[q.status] = (stats[q.status] ?? 0) + 1;

  let filtered = quotes;
  if (statusFilter !== "all") filtered = filtered.filter((q) => q.status === statusFilter);
  if (search) {
    filtered = filtered.filter((q) =>
      [q.name, q.company, q.email].some((v) => (v ?? "").toLowerCase().includes(search))
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;

  return json({ quotes: filtered.slice(start, start + limit), total, stats });
};
