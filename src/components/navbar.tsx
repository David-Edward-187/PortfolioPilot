
"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, CodeXml } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import * as React from "react";

const navLinks = [
  { href: "#landing", label: "Home" },
  { href: "#case-study-overview", label: "Case Studies" },
  { href: "#deep-dive-case-study", label: "Deep Dive" },
  { href: "#contact-connect", label: "Contact" },
];

export function Navbar() {
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile) {
      setMobileNavOpen(false);
    }
  };

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <Button 
          key={link.href} 
          variant="ghost" 
          asChild 
          className="text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-200 px-4 py-2"
        >
          <a href={link.href} onClick={(e) => handleScrollTo(e, link.href)}>{link.label}</a>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-6"> {/* Consistent 24px based spacing (h-16 = 4rem = 64px, p-6 = 1.5rem = 24px) */}
        <Link href="/" className="flex items-center gap-2.5 text-primary hover:text-primary/90 transition-colors" onClick={(e) => handleScrollTo(e, '#landing')}>
          <CodeXml className="h-7 w-7" />
          <span className="text-xl font-semibold tracking-tight">PortfolioPilot</span>
        </Link>
        
        {isMobile ? (
          <div className="flex items-center gap-2.5">
            <ThemeToggle /> 
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-border/70">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-card p-6"> 
                <SheetHeader className="mb-6 text-left border-b border-border pb-4">
                   <SheetTitle className="text-lg font-semibold text-primary">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-3"> 
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-2"> 
            <nav className="hidden md:flex items-center gap-1"> 
              <NavItems />
            </nav>
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  );
}
