import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFoundPanel from "./components/site/NotFoundPanel";
import SiteLayout from "./components/site/SiteLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Materials from "./pages/Materials";
import NotFound from "./pages/NotFound";
import Quality from "./pages/Quality";
import Services from "./pages/Services";
import "./styles/site.css";

/**
 * The site used to be one long page with #about / #services anchors. Those links
 * are still in the wild (the old sitemap listed them, people bookmarked them), so
 * send each one to the page that replaced it.
 */
const LEGACY_HASHES: Record<string, string> = {
  "#about": "/about",
  "#services": "/services",
  "#materials": "/materials",
  "#quality": "/quality",
  "#contact": "/contact",
};

function useLegacyHashRedirect() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const redirect = () => {
      const target = LEGACY_HASHES[window.location.hash];
      if (target) navigate(target, { replace: true });
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, [navigate]);
}

/** Land at the top of each new page, the way a server-rendered site would. */
function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
}

/**
 * The marketing site. Mounted once for every public URL so navigating between
 * pages swaps only the page body, not the header and footer.
 */
function PublicSite() {
  useLegacyHashRedirect();
  useScrollToTop();

  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/materials" component={Materials} />
        <Route path="/quality" component={Quality} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFoundPanel} />
      </Switch>
    </SiteLayout>
  );
}

function Router() {
  return (
    <Switch>
      {/* Tools, outside the marketing chrome. */}
      <Route path="/blog" component={Blog} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      <Route component={PublicSite} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
