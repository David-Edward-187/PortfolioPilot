
"use client";

import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
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
      setHasScrolled(window.scrollY > 30); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        hasScrolled || isMobileMenuOpen 
          ? "bg-card/90 backdrop-blur-xl shadow-2xl border-b border-border/50" 
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 md:h-24 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group" onClick={closeMobileMenu}>
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" 
               className="transform group-hover:scale-110 transition-transform duration-300">
            <path d="M20 80L35 20L50 80L65 20L80 80" stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" 
                  style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)/0.8)) drop-shadow(0 0 15px hsl(var(--primary)/0.5))' }}/>
            <path d="M27.5 50H72.5" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" 
                  style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)/0.8))' }}/>
          </svg>
          <span className="text-2xl md:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors duration-300"
                style={{ textShadow: '0 0 5px hsl(var(--primary) / 0.6), 0 0 10px hsl(var(--primary) / 0.3)' }}>
            Portfolio
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1.5 lg:space-x-2">
          {navLinks.map((link) => (
            <Button 
              key={link.href} 
              variant="ghost" 
              asChild 
              className="text-base lg:text-lg font-semibold text-muted-foreground hover:text-primary hover:bg-primary/15 px-4 py-3 rounded-md transition-all duration-200"
            >
              <Link href={link.href}>
                {link.label}
              </Link>
            </Button>
          ))}
          <div className="pl-3 md:pl-4">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle menu" 
            className="ml-1.5 text-foreground hover:text-primary focus-visible:ring-ring h-10 w-10"
          >
            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-card shadow-2xl py-4 animate-fadeIn border-t border-border/50", 
            "flex flex-col items-stretch space-y-1 px-4 pb-6" 
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
                className="text-lg font-semibold text-muted-foreground hover:text-primary hover:bg-primary/15 py-4 px-4 rounded-md transition-all duration-200" 
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
