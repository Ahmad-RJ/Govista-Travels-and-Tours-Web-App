import { Link } from "wouter";
import { Plane, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function NavbarGuest() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 font-serif text-2xl font-bold text-primary tracking-tight cursor-pointer">
            <Plane className="h-6 w-6 text-secondary" />
            GoVista
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/">
            <div className="text-sm font-medium transition-colors hover:text-primary cursor-pointer text-muted-foreground">
              Home
            </div>
          </Link>
          <Link href="/about">
            <div className="text-sm font-medium transition-colors hover:text-primary cursor-pointer text-muted-foreground">
              About Us
            </div>
          </Link>
          <Link href="/contact">
            <div className="text-sm font-medium transition-colors hover:text-primary cursor-pointer text-muted-foreground">
              Contact
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth">
            <Button variant="ghost" className="cursor-pointer">Sign In</Button>
          </Link>
          <Link href="/auth">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/">
                  <span className="text-lg font-medium hover:text-primary transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                    Home
                  </span>
                </Link>
                <Link href="/about">
                  <span className="text-lg font-medium hover:text-primary transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                    About Us
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="text-lg font-medium hover:text-primary transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                    Contact
                  </span>
                </Link>
                <Link href="/auth">
                  <Button className="w-full cursor-pointer" onClick={() => setIsOpen(false)}>Get Started</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
