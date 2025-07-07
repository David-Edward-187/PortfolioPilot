
"use client";

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FiMenu, FiX } from 'react-icons/fi';
import { ThemeToggle } from './theme-toggle';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { resumeData } from '@/data/resume';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // Prevent hiding if the mobile menu is open
    if (isMobileMenuOpen) {
      setHidden(false);
      return;
    }

    // Hide navbar when scrolling down, show when scrolling up
    if (previous && latest > previous && latest > 150) {
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
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          // The y translation now accounts for the element's height AND its top offset (top-4 = 1rem)
          // to ensure it slides completely out of view.
          hidden: { y: "calc(-100% - 1rem)" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn("sticky top-4 inset-x-0 max-w-4xl mx-auto z-50")}
      >
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center">
            <nav className="relative rounded-full border border-border bg-background/50 backdrop-blur-md shadow-input flex justify-center items-center space-x-1 px-3 py-2">
                {navLinks.map((link) => (
                    <Button key={link.href} variant="ghost" asChild className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-transparent">
                        <a href={link.href}>{link.label}</a>
                    </Button>
                ))}
                <div className='pl-2'>
                    <ThemeToggle />
                </div>
            </nav>
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border border-border rounded-2xl mx-4">
             <Link href="/" className="text-lg font-bold text-foreground">
                {resumeData.name.split(' ')[0]}
             </Link>
             <div className='flex items-center gap-2'>
                <ThemeToggle />
                <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} variant="ghost" size="icon">
                    {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                    <span className="sr-only">Toggle menu</span>
                </Button>
             </div>
        </div>
      </motion.header>
      
      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
         <div 
         className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
         onClick={handleLinkClick}
        >
            <div className="flex justify-end p-4 absolute top-4 right-4">
                 {/* This space is intentionally left for the close button which is part of the mobile header now */}
            </div>
            <nav className="flex flex-col gap-8 pt-28 items-center text-center">
                {navLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={handleLinkClick} className="text-3xl font-semibold text-foreground hover:text-primary transition-colors">
                        {link.label}
                    </a>
                ))}
            </nav>
        </div>
      )}
    </>
  );
}
