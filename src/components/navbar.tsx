"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog"; 
import { Menu, CodeXml } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import * as React from "react";

const navLinks = [
  { href: "#profile", label: "Profile" },
  { href: "#resume", label: "Resume" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <Button 
          key={link.href} 
          variant="ghost" 
          asChild 
          onClick={() => setMobileNavOpen(false)} 
          className="text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-200 px-3 py-2"
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8"> {/* Increased height */}
        <Link href="/" className="flex items-center gap-3 text-primary hover:text-primary/90 transition-colors">
          <CodeXml className="h-9 w-9" /> {/* Increased icon size */}
          <span className="text-2xl font-semibold tracking-tight">PortfolioPilot</span> {/* Increased text size and weight */}
        </Link>
        
        {isMobile ? (
          <div className="flex items-center gap-2.5 ml-auto">
            <ThemeToggle /> 
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-border/70">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-card p-6"> 
                <SheetHeader className="mb-8 text-left border-b pb-4">
                  <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
                   <h3 className="text-xl font-semibold text-primary">Menu</h3>
                </SheetHeader>
                <nav className="flex flex-col gap-4"> 
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
