
"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User, FileText, Package, Award, Mail, Code2 } from 'lucide-react'; // Removed Briefcase, GraduationCap, Star, MessageSquare
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
      rootMargin: '0px',
      threshold: 0.4, 
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

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);


  return (
    <aside className="hidden md:flex fixed top-0 left-0 z-40 w-64 h-screen flex-col justify-between border-r border-border bg-card backdrop-blur-lg p-6 shadow-xl"> {/* bg-card for sidebar, increased shadow */}
      <div>
        <Link href="/" className="flex items-center gap-2.5 mb-10">
          <Code2 className="h-8 w-8 text-primary" /> {/* Icon uses primary color (Teal) */}
          <span className="text-2xl font-bold text-foreground">{resumeData.name.split(' ')[0]}</span>
        </Link>
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Button
                key={link.href}
                variant={isActive ? "secondary" : "ghost"} // Active uses secondary variant (defined by theme)
                asChild
                className={cn(
                  "justify-start text-sm py-3 px-4 rounded-md transition-all duration-200", // text-sm as per PRD body
                  isActive ? "text-primary font-semibold bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
                  isActive && "ring-2 ring-accent" // Active link has accent ring (Coral)
                )}
              >
                <Link href={link.href} className="flex items-center gap-3">
                  <link.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                  {link.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </aside>
  );
}
