
"use client";

import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu, X, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: "#profile", label: "Profile" },
  { href: "#resume", label: "Resume" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [hasScrolled, setHasScrolled] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        hasScrolled || isMobileMenuOpen 
          ? "bg-card/95 backdrop-blur-lg shadow-xl border-b border-border/70" 
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group" onClick={closeMobileMenu}>
          <Code2 className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
          <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">Portfolio</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild className="text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 px-4 py-2.5 rounded-md">
              <Link href={link.href}>
                {link.label}
              </Link>
            </Button>
          ))}
          <div className="pl-3">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu" className="ml-1 text-foreground hover:text-primary focus-visible:ring-ring h-10 w-10">
            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "md:hidden absolute top-20 left-0 right-0 bg-card shadow-2xl py-4 animate-fadeIn border-t border-border/70",
            "flex flex-col items-stretch space-y-1 px-4 pb-6" 
          )}
        >
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild className="w-full justify-start">
              <Link href={link.href} className="text-lg font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 py-3.5 px-4 rounded-md" onClick={closeMobileMenu}>
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </header>
  );
}

    