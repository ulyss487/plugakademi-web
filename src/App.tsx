import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/AdminLayout";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import UsersPage from "@/pages/users";
import CoursesPage from "@/pages/courses";
import ContentPage from "@/pages/content";
import AnalyticsPage from "@/pages/analytics";
import SettingsPage from "@/pages/settings";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function LoadingScreen() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", background: "#0A0A14",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 40, height: 40, border: "3px solid rgba(245,158,11,0.2)",
          borderTopColor: "#F59E0B", borderRadius: "50%",
          animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
        }} />
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Loading...</div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function UnauthorizedScreen() {
  const { logout } = useAuth();
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", background: "#0A0A14", flexDirection: "column", gap: 16,
    }}>
      <div style={{ fontSize: 48 }}>🚫</div>
      <h2 style={{ color: "#EF4444", fontSize: 20, fontWeight: 700 }}>Access Denied</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
        You do not have admin access to this panel.
      </p>
      <button onClick={logout} style={{
        padding: "10px 24px", borderRadius: 8, border: "none",
        background: "rgba(255,255,255,0.1)", color: "#fff",
        fontSize: 13, cursor: "pointer", marginTop: 8,
      }}>
        Sign Out
      </button>
    </div>
  );
}

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, profile, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <Redirect to="/login" />;
  if (profile && !["admin", "owner"].includes(profile.role)) return <UnauthorizedScreen />;

  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard">{() => <ProtectedRoute component={DashboardPage} />}</Route>
      <Route path="/users">{() => <ProtectedRoute component={UsersPage} />}</Route>
      <Route path="/courses">{() => <ProtectedRoute component={CoursesPage} />}</Route>
      <Route path="/content">{() => <ProtectedRoute component={ContentPage} />}</Route>
      <Route path="/analytics">{() => <ProtectedRoute component={AnalyticsPage} />}</Route>
      <Route path="/settings">{() => <ProtectedRoute component={SettingsPage} />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
