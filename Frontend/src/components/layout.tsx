import { Link, useLocation } from "wouter";
import { Plane, User, Menu, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();

  const navLinks = [
    { href: "/dashboard", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/chatbot", label: "AI Assistant" },
  ];

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const getUserInitials = () => {
    if (!user) return "?";

    // Use name if available, otherwise fall back to username
    const displayName = user.name || user.username;
    if (!displayName) return "?";

    return displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard">
            <div className="flex items-center gap-2 font-serif text-2xl font-bold text-primary tracking-tight cursor-pointer">
              <Plane className="h-6 w-6 text-secondary" />
              GoVista
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === link.href ? "text-primary font-bold" : "text-muted-foreground"
                  }`}>
                  {link.label}
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full cursor-pointer">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  {isAdmin && (
                    <Link href="/admin">
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {user && (
                    <div className="mb-4 pb-4 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  )}
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <div
                        className="text-lg font-medium hover:text-primary transition-colors cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </div>
                    </Link>
                  ))}
                  {user ? (
                    <>
                      <Link href="/profile">
                        <div
                          className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="h-5 w-5" /> Profile
                        </div>
                      </Link>
                      {isAdmin && (
                        <Link href="/admin">
                          <div
                            className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                          >
                            <Settings className="h-5 w-5" /> Admin Dashboard
                          </div>
                        </Link>
                      )}
                      <div
                        className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2 cursor-pointer text-red-600"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5" /> Logout
                      </div>
                    </>
                  ) : (
                    <Link href="/auth">
                      <div
                        className="text-lg font-medium hover:text-primary transition-colors cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </div>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
