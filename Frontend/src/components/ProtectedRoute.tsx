import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Not authenticated - redirect to auth page
      setLocation("/auth");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Admin trying to access user pages - redirect to admin dashboard
      if (isAdmin && !requireAdmin && location !== "/profile") {
        const userPages = ["/dashboard", "/destinations", "/chatbot", "/city"];
        if (userPages.some(page => location.startsWith(page))) {
          setLocation("/admin/destinations");
        }
      }

      // Regular user trying to access admin pages - redirect to dashboard
      if (!isAdmin && requireAdmin) {
        setLocation("/dashboard");
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, requireAdmin, location, setLocation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Prevent rendering during redirect
  if (isAdmin && !requireAdmin && location !== "/profile") {
    const userPages = ["/dashboard", "/destinations", "/chatbot", "/city"];
    if (userPages.some(page => location.startsWith(page))) {
      return null;
    }
  }

  if (requireAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
