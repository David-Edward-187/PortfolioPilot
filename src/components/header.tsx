
"use client";

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { resumeData } from '@/data/resume';
import { List, X, Code } from '@phosphor-icons/react/dist/ssr';
import { Menu, MenuItem, ProductItem } from '@/components/ui/navbar-menu';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [active, setActive] = React.useState<string | null>(null);

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

  const navLinksForMobile = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={cn("sticky top-4 inset-x-0 max-w-2xl mx-auto z-50")}
      >
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center">
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="About">
                    <div className="flex flex-col space-y-4 text-sm p-4">
                        <p className='max-w-xs text-muted-foreground'>{resumeData.bio.substring(0, 120)}...</p>
                        <a href="#about" onClick={() => setActive(null)} className='font-bold text-primary hover:underline'>Learn More →</a>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Projects">
                    <div className="text-sm grid grid-cols-2 gap-10 p-4">
                        {resumeData.projects.slice(0, 4).map((p) => (
                            <ProductItem
                                key={p.name}
                                title={p.name}
                                href={p.link}
                                src={`https://placehold.co/280x140.png`}
                                description={p.description[0]}
                            />
                        ))}
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Contact" href="#contact"/>
            </Menu>
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border border-border rounded-2xl mx-4">
             <Link href="/" className="flex items-center gap-2.5 group">
                <Code weight="bold" className="h-7 w-7 text-accent" />
             </Link>
             <div className='flex items-center gap-2'>
                <ThemeToggle />
                <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} variant="ghost" size="icon">
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
                    <span className="sr-only">Toggle menu</span>
                </Button>
             </div>
        </div>
      </header>
      
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
                {navLinksForMobile.map((link) => (
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
