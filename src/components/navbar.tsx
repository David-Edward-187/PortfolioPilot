
"use client";

import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu, X, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
// useIsMobile hook is no longer needed here as Navbar is always visible

const navLinks = [
  { href: "#profile", label: "Profile" },
  { href: "#resume", label: "Resume" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg shadow-lg border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={closeMobileMenu}>
          <Code2 className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">Portfolio</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary/80 px-3 py-2">
              <Link href={link.href}>
                {link.label}
              </Link>
            </Button>
          ))}
          <div className="pl-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu" className="ml-1 text-foreground hover:text-primary focus-visible:ring-ring">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "md:hidden absolute top-16 left-0 right-0 bg-card shadow-xl py-4 animate-fadeIn border-b border-border",
            "flex flex-col items-stretch space-y-1 px-4" 
          )}
        >
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild className="w-full justify-start">
              <Link href={link.href} className="text-base font-medium text-muted-foreground hover:text-primary hover:bg-secondary/80 py-3 px-3 rounded-md" onClick={closeMobileMenu}>
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </header>
  );
}
