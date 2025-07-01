
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
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const mobileMenuOverlayRef = React.useRef<HTMLDivElement>(null);
  const menuTimeline = React.useRef<gsap.core.Timeline | null>(null);

  // GSAP animation to show/hide header on scroll
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

  // GSAP timeline for mobile menu animation
  React.useEffect(() => {
    gsap.set(mobileMenuRef.current, { xPercent: 100, autoAlpha: 0 });
    gsap.set(mobileMenuOverlayRef.current, { autoAlpha: 0 });
    
    menuTimeline.current = gsap.timeline({
      paused: true,
      onStart: () => { document.body.style.overflow = 'hidden'; },
      onReverseComplete: () => { document.body.style.overflow = 'auto'; }
    });

    menuTimeline.current
      .to(mobileMenuOverlayRef.current, { autoAlpha: 1, duration: 0.2 })
      .to(mobileMenuRef.current, { xPercent: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out' }, "-=0.1")
      .fromTo('.mobile-menu-item', { opacity: 0, y: 20, }, {
        opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out'
      }, "-=0.2");
  }, []);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      menuTimeline.current?.play();
    } else {
      menuTimeline.current?.reverse();
    }
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
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild className="text-sm font-medium text-muted-foreground hover:text-primary relative group/nav-link overflow-hidden">
                <Link href={link.href}>
                  {link.label}
                  <span className="absolute bottom-1.5 left-0 h-0.5 w-full bg-primary transform scale-x-0 group-hover/nav-link:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
                </Link>
              </Button>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
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

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuOverlayRef}
        onClick={handleLinkClick}
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:hidden"
      />
      <div 
        ref={mobileMenuRef}
        className={cn(
          "fixed top-0 right-0 z-[110] h-full w-4/5 max-w-[320px] bg-background/95 backdrop-blur-lg border-l border-border md:hidden",
          "invisible" // initially hidden
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border h-20">
          <Link href="/" className="flex items-center gap-2.5" onClick={handleLinkClick}>
              <Code weight="bold" className="h-7 w-7 text-accent" />
          </Link>
          <Button onClick={() => setIsMobileMenuOpen(false)} variant="ghost" size="icon">
              <X className="h-7 w-7" />
              <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <nav className="flex flex-col gap-6 p-8">
            {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={handleLinkClick} className="mobile-menu-item text-2xl font-semibold text-foreground hover:text-primary transition-colors">
                    {link.label}
                </a>
            ))}
            <div className="mobile-menu-item mt-8 border-t border-border pt-8 flex flex-col items-start gap-4">
               <span className="text-sm text-muted-foreground">Theme</span>
               <ThemeToggle />
            </div>
        </nav>
      </div>
    </>
  );
}
