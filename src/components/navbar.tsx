
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
  const isMobile = useIsMobile(); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  React.useEffect(() => {
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

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md shadow-md border-b border-border"> {/* Added border */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <Code2 className="h-7 w-7 text-primary" /> {/* Icon uses primary color (Teal) */}
          <span className="text-xl font-bold text-foreground">Portfolio</span>
        </Link>

        <div className="flex items-center">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu" className="ml-2 text-foreground hover:text-primary"> {/* Text color set */}
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className={cn(
            "absolute top-16 left-0 right-0 bg-card shadow-lg py-4 animate-fadeIn border-b border-border", // Added border
            "flex flex-col items-center space-y-2" 
          )}
        >
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild className="w-full text-center">
              <Link href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary py-2.5" onClick={closeMobileMenu}> {/* text-sm as per PRD body */}
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </header>
  );
}
