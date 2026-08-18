const KEY = "stlp-admin-password";

export const getAdminPassword = () => sessionStorage.getItem(KEY) ?? "";
export const setAdminPassword = (value: string) => sessionStorage.setItem(KEY, value);
export const clearAdminPassword = () => sessionStorage.removeItem(KEY);

export type Status = "new" | "contacted" | "quoted" | "closed";

export type Quote = {
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

export type QuoteStats = {
  total: number;
  new: number;
  contacted: number;
  quoted: number;
  closed: number;
};

const request = async (path: string, init?: RequestInit) => {
  const res = await fetch(path, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-admin-password": getAdminPassword(),
      ...(init?.headers ?? {}),
    },
  });
  if (res.status === 401) throw new Error("Not authorized");
  if (!res.ok) throw new Error("Request failed (" + res.status + ")");
  return res.json();
};

export const listQuotes = (params: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const q = new URLSearchParams();
  if (params.status) q.set("status", params.status);
  if (params.search) q.set("search", params.search);
  q.set("page", String(params.page ?? 1));
  q.set("limit", String(params.limit ?? 20));
  return request("/api/quotes?" + q.toString()) as Promise<{
    quotes: Quote[];
    total: number;
    stats: QuoteStats;
  }>;
};

export const updateQuote = (id: string, patch: { status?: Status; notes?: string }) =>
  request("/api/quotes", {
    method: "POST",
    body: JSON.stringify({ id, ...patch }),
  }) as Promise<{ success: true }>;
