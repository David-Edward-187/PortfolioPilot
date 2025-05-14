
"use client";

import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu, X, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const navLinks = [
  { href: "#profile", label: "Profile" },
  { href: "#resume", label: "Resume" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isMobile = useIsMobile(); // This hook might need adjustment if not working as expected

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  React.useEffect(() => {
    // Ensure isMobile is resolved before using it
    if (typeof window !== 'undefined') {
      if (!isMobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  }, [isMobile, isMobileMenuOpen]);
  
  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // This Navbar is now primarily for mobile.
  // It will be hidden on desktop (md screens and up) by the `md:hidden` class.
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <Code2 className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">Portfolio</span>
        </Link>

        <div className="flex items-center">
          <ThemeToggle /> {/* Theme toggle can be here for mobile too */}
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu" className="ml-2">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "absolute top-16 left-0 right-0 bg-card shadow-lg py-4 animate-fadeIn",
            "flex flex-col items-center space-y-2" 
          )}
        >
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild className="w-full text-center">
              <Link href={link.href} className="text-base font-medium text-muted-foreground hover:text-primary py-2.5" onClick={closeMobileMenu}>
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </header>
  );
}
