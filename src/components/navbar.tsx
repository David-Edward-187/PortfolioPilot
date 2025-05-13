
"use client";

import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu, X, Code2 } from 'lucide-react'; // Added Code2 for logo
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
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  React.useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);
  
  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <Code2 className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">PortfolioPilot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary">
                {link.label}
              </Link>
            </Button>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg py-4 animate-fadeIn",
            "flex flex-col items-center space-y-4" 
          )}
        >
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild className="w-full text-center">
              <Link href={link.href} className="text-base font-medium text-muted-foreground hover:text-primary py-2" onClick={closeMobileMenu}>
                {link.label}
              </Link>
            </Button>
          ))}
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
