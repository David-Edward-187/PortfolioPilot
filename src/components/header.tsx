
"use client";

import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { resumeData } from '@/data/resume';
import { List, X, Code } from '@phosphor-icons/react/dist/ssr';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

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
  const [hidden, setHidden] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
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
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
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
              <List className="h-7 w-7" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
          "fixed inset-0 z-[100] bg-background/90 backdrop-blur-lg transition-transform duration-500 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
                <a key={link.href} href={link.href} onClick={handleLinkClick} className="text-3xl font-semibold text-foreground hover:text-primary transition-colors">
                    {link.label}
                </a>
            ))}
            <div className="mt-8">
               <ThemeToggle />
            </div>
        </nav>
      </div>
    </>
  );
}
