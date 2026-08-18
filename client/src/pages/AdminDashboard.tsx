import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ChevronLeft,
  Search,
  Mail,
  Phone,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
  LogOut,
} from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";
import {
  clearAdminPassword,
  getAdminPassword,
  listQuotes,
  setAdminPassword,
  updateQuote,
  type Quote,
  type QuoteStats,
  type Status,
} from "@/lib/adminApi";

const STATUS_COLORS: Record<Status, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  quoted: "bg-purple-100 text-purple-800",
  closed: "bg-green-100 text-green-800",
};

const STATUS_ICONS: Record<Status, React.ReactNode> = {
  new: <AlertCircle className="w-4 h-4" />,
  contacted: <Clock className="w-4 h-4" />,
  quoted: <Mail className="w-4 h-4" />,
  closed: <CheckCircle2 className="w-4 h-4" />,
};

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [checking, setChecking] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setAdminPassword(value);
    try {
      await listQuotes({ limit: 1 });
      onUnlock();
    } catch {
      clearAdminPassword();
      toast.error("Incorrect password");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Quote Requests</CardTitle>
          <CardDescription>Enter the admin password to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <Input
              type="password"
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Password"
            />
            <Button type="submit" className="w-full" disabled={checking || !value}>
              {checking ? "Checking..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [unlocked, setUnlocked] = useState(() => Boolean(getAdminPassword()));
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [stats, setStats] = useState<QuoteStats | null>(null);
  const [total, setTotal] = useState(0);
  const [quotesLoading, setQuotesLoading] = useState(true);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setQuotesLoading(true);
    try {
      const data = await listQuotes({
        status: statusFilter === "all" ? undefined : statusFilter,
        search: searchTerm || undefined,
        page,
        limit: 20,
      });
      setQuotes(data.quotes);
      setTotal(data.total);
      setStats(data.stats);
    } catch (err) {
      if ((err as Error).message === "Not authorized") {
        clearAdminPassword();
        setUnlocked(false);
      } else {
        toast.error("Could not load quote requests");
      }
    } finally {
      setQuotesLoading(false);
    }
  }, [statusFilter, searchTerm, page]);

  useEffect(() => {
    if (!unlocked) return;
    const t = setTimeout(load, searchTerm ? 300 : 0);
    return () => clearTimeout(t);
  }, [unlocked, load, searchTerm]);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  const selectedQuote = quotes.find((q) => q.id === selectedQuoteId) ?? null;
  const totalPages = Math.ceil(total / 20);

  const setStatus = async (id: string, status: Status) => {
    try {
      await updateQuote(id, { status });
      toast.success("Status updated");
      load();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const setNotes = async (id: string, notes: string) => {
    try {
      await updateQuote(id, { notes });
      toast.success("Notes saved");
      load();
    } catch {
      toast.error("Failed to save notes");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
              <p className="text-sm text-gray-600">Manage incoming quote requests</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              clearAdminPassword();
              setUnlocked(false);
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-600">New</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.new}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-yellow-600">Contacted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.contacted}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-600">Quoted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.quoted}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-600">Closed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.closed}</div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quote List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quotes</CardTitle>
                <CardDescription>
                  Showing {quotes.length} of {total} requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search by name, company, or email..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setPage(1);
                        }}
                        className="pl-10"
                      />
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={(v) => {
                        setStatusFilter(v);
                        setPage(1);
                      }}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Quote List */}
                {quotesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : quotes.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No quote requests found</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {quotes.map((quote) => (
                      <div
                        key={quote.id}
                        onClick={() => setSelectedQuoteId(quote.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedQuoteId === quote.id
                            ? "bg-blue-50 border-blue-300"
                            : "bg-white hover:bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 truncate">{quote.name}</h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap ${STATUS_COLORS[quote.status]}`}
                              >
                                {STATUS_ICONS[quote.status]}
                                {quote.status}
                              </span>
                            </div>
                            {quote.company && (
                              <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                                <Building2 className="w-3 h-3" />
                                {quote.company}
                              </p>
                            )}
                            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                              <Mail className="w-3 h-3" />
                              {quote.email}
                            </p>
                            {quote.phone && (
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {quote.phone}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(quote.createdAt), "MMM d, yyyy h:mm a")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {page} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quote Detail */}
          <div className="lg:col-span-1">
            {selectedQuote ? (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedQuote.name}</CardTitle>
                      <CardDescription>{selectedQuote.company || "No company"}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedQuoteId(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                    <Select
                      value={selectedQuote.status}
                      onValueChange={(status) => setStatus(selectedQuote.id, status as Status)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Email</p>
                      <a
                        href={`mailto:${selectedQuote.email}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {selectedQuote.email}
                      </a>
                    </div>
                    {selectedQuote.phone && (
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Phone</p>
                        <a
                          href={`tel:${selectedQuote.phone}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {selectedQuote.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Project Details
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 max-h-40 overflow-y-auto whitespace-pre-line">
                      {selectedQuote.projectDetails}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Internal Notes
                    </label>
                    <Textarea
                      key={selectedQuote.id}
                      placeholder="Add internal notes about this quote..."
                      defaultValue={selectedQuote.notes || ""}
                      onBlur={(e) => {
                        const notes = e.target.value;
                        if (notes !== (selectedQuote.notes || "")) {
                          setNotes(selectedQuote.id, notes);
                        }
                      }}
                      className="min-h-24"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="space-y-1 text-xs text-gray-600 p-3 bg-gray-50 rounded-lg">
                    <p>Created: {format(new Date(selectedQuote.createdAt), "MMM d, yyyy h:mm a")}</p>
                    <p>Updated: {format(new Date(selectedQuote.updatedAt), "MMM d, yyyy h:mm a")}</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">Select a quote to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
