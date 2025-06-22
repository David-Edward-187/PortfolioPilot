
"use client";

import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu, X, Code2 } from 'lucide-react'; 
import { cn } from '@/lib/utils';

const navLinks = [
  { href: "#profile", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
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
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out", 
        hasScrolled || isMobileMenuOpen 
          ? "bg-card/85 backdrop-blur-lg shadow-lg border-b border-border/60" 
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-2 sm:px-4">
        <Link href="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
          <Code2 className="h-8 w-8 text-primary transform group-hover:scale-105 transition-transform duration-300" />
          <span className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            Portfolio
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
          {navLinks.map((link) => (
            <Button 
              key={link.href} 
              variant="ghost" 
              asChild 
              className="text-sm lg:text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 px-3.5 py-2.5 rounded-md transition-all duration-200 focus-visible:text-primary focus-visible:bg-primary/15"
            >
              <Link href={link.href}>
                {link.label}
              </Link>
            </Button>
          ))}
          <div className="pl-2 md:pl-3">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle menu" 
            className="ml-1 text-foreground hover:text-primary focus-visible:ring-ring h-9 w-9"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-card shadow-xl py-3 animate-fadeIn border-t border-border/60", 
            "flex flex-col items-stretch space-y-0.5 px-3 pb-4" 
          )}
        >
          {navLinks.map((link) => (
            <Button 
              key={link.href} 
              variant="ghost" 
              asChild 
              className="w-full justify-start"
            >
              <Link 
                href={link.href} 
                className="text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 py-3.5 px-3 rounded-md transition-all duration-200 focus-visible:text-primary focus-visible:bg-primary/15" 
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </header>
  );
}
