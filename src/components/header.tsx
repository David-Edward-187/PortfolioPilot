"use client";

import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { resumeData } from '@/data/resume';
import { List, X, Code } from '@phosphor-icons/react/dist/ssr';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const showAnim = gsap.from(headerRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.2
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
      }
    });
  }, []);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to('.mobile-menu', { autoAlpha: 1, duration: 0.3 });
      gsap.from('.mobile-menu-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.2
      });
    } else {
      gsap.to('.mobile-menu', { autoAlpha: 0, duration: 0.3, onComplete: () => {
        document.body.style.overflow = 'auto';
      }});
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Code weight="bold" className="h-8 w-8 text-accent transition-transform duration-300 group-hover:rotate-[-15deg] group-hover:scale-110" />
            <span className="text-xl font-bold text-foreground">{resumeData.name}</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild className="text-sm font-medium text-muted-foreground hover:text-primary">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Nav Trigger */}
          <div className="md:hidden">
            <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} variant="ghost" size="icon">
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <List className="h-7 w-7" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
          "mobile-menu fixed inset-0 z-[100] bg-background/95 backdrop-blur-lg md:hidden invisible"
      )}>
        <div className="container mx-auto flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5" onClick={handleLinkClick}>
                <Code weight="bold" className="h-8 w-8 text-accent" />
                <span className="text-xl font-bold text-foreground">{resumeData.name}</span>
            </Link>
            <Button onClick={() => setIsMobileMenuOpen(false)} variant="ghost" size="icon">
                <X className="h-7 w-7" />
                <span className="sr-only">Close menu</span>
            </Button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 mt-16">
            {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={handleLinkClick} className="mobile-menu-item text-3xl font-semibold text-foreground hover:text-primary transition-colors">
                    {link.label}
                </a>
            ))}
            <div className="mobile-menu-item mt-8">
               <ThemeToggle />
            </div>
        </nav>
      </div>
    </>
  );
}
