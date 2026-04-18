import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/AdminLayout";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import DashboardPage from "@/pages/dashboard";
import UsersPage from "@/pages/users";
import CoursesPage from "@/pages/courses";
import ContentPage from "@/pages/content";
import AnalyticsPage from "@/pages/analytics";
import SettingsPage from "@/pages/settings";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import PaymentSuccessPage from "@/pages/payment-success";
import PaymentCancelPage from "@/pages/payment-cancel";
import GmailMonitorPage from "@/pages/gmail-monitor";

const queryClient = new QueryClient();

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 border-t-indigo-600" />
        <div className="text-[14px] text-gray-400">Loading...</div>
      </div>
    </div>
  );
}

function UnauthorizedScreen() {
  const { logout } = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-red-500"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" /></svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
      <p className="text-[14px] text-gray-500">You do not have admin access to this panel.</p>
      <button onClick={logout} className="mt-2 rounded-lg border border-gray-200 px-6 py-2.5 text-[13px] font-medium text-gray-600 transition-all hover:bg-gray-50">
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
  return <AdminLayout><Component /></AdminLayout>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/dashboard">{() => <ProtectedRoute component={DashboardPage} />}</Route>
      <Route path="/users">{() => <ProtectedRoute component={UsersPage} />}</Route>
      <Route path="/courses">{() => <ProtectedRoute component={CoursesPage} />}</Route>
      <Route path="/content">{() => <ProtectedRoute component={ContentPage} />}</Route>
      <Route path="/analytics">{() => <ProtectedRoute component={AnalyticsPage} />}</Route>
      <Route path="/settings">{() => <ProtectedRoute component={SettingsPage} />}</Route>
      <Route path="/gmail-monitor">{() => <ProtectedRoute component={GmailMonitorPage} />}</Route>
      <Route path="/payment-success" component={PaymentSuccessPage} />
      <Route path="/payment-cancel" component={PaymentCancelPage} />
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
