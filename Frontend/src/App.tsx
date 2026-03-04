import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import Dashboard from "@/pages/dashboard";
import Destinations from "@/pages/destinations";
import CityDetails from "@/pages/city-details";
import Chatbot from "@/pages/chatbot";
import Profile from "@/pages/profile";
import AuthPage from "@/pages/auth";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminDestinations from "@/pages/admin/AdminDestinations";
import AdminReviews from "@/pages/admin/AdminReviews";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
      {/* Public Routes */}
      <Route path="/" component={LandingPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/auth" component={AuthPage} />

      {/* User Routes - Protected */}
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/destinations">
        <ProtectedRoute>
          <Destinations />
        </ProtectedRoute>
      </Route>
      <Route path="/city/:id">
        <ProtectedRoute>
          <CityDetails />
        </ProtectedRoute>
      </Route>
      <Route path="/chatbot">
        <ProtectedRoute>
          <Chatbot />
        </ProtectedRoute>
      </Route>
      <Route path="/profile">
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/destinations">
        <ProtectedRoute requireAdmin>
          <AdminDestinations />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/reviews">
        <ProtectedRoute requireAdmin>
          <AdminReviews />
        </ProtectedRoute>
      </Route>
      <Route path="/admin">
        <ProtectedRoute requireAdmin>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
