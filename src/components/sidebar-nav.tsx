
"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User, FileText, Package, Award, Mail, Code2 } from 'lucide-react';
import { resumeData } from '@/data/resume';

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { href: "#profile", label: "Profile", icon: User },
  { href: "#resume", label: "Resume", icon: FileText },
  { href: "#projects", label: "Projects", icon: Package },
  { href: "#certificates", label: "Certificates", icon: Award },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function SidebarNav() {
  const pathname = usePathname(); 
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px', // Adjust margins to trigger earlier/later
      threshold: 0.1, // Trigger when 10% of the section is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    // Initial check for active section on page load
     const currentHash = window.location.hash.substring(1);
     if (currentHash && sections.some(s => s?.id === currentHash)) {
       setActiveSection(currentHash);
     } else if (sections[0]) { // Default to first section if no hash
       // Check if first section is in view
        const firstSectionEntry = sections[0] ? new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) setActiveSection(sections[0]!.id);
            firstSectionEntry.disconnect();
        }, {threshold: 0.1}) : null;
        if(firstSectionEntry && sections[0]) firstSectionEntry.observe(sections[0]);
     }


    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);


  return (
    <aside className="hidden md:flex fixed top-0 left-0 z-40 w-64 h-screen flex-col justify-between border-r border-border bg-card/80 backdrop-blur-lg p-6 shadow-xl">
      <div>
        <Link href="/" className="flex items-center gap-3 mb-12">
          <Code2 className="h-9 w-9 text-primary" />
          <span className="text-2xl font-bold text-foreground">{resumeData.name.split(' ')[0]}</span>
        </Link>
        <nav className="flex flex-col space-y-2.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Button
                key={link.href}
                variant="ghost"
                asChild
                className={cn(
                  "justify-start text-base py-3.5 px-4 rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-primary/15 text-primary font-semibold ring-2 ring-primary/70 shadow-md" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
                )}
              >
                <Link href={link.href} className="flex items-center gap-3.5">
                  <link.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                  {link.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto flex justify-center">
        <ThemeToggle />
      </div>
    </aside>
  );
}
