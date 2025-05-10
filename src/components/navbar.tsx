
"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"; // Added SheetTitle
import { Menu, CodeXml } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import * as React from "react";

const navLinks = [
  { href: "#profile", label: "Profile" },
  { href: "#resume", label: "Resume" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <Button key={link.href} variant="ghost" asChild onClick={() => setMobileNavOpen(false)}>
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <CodeXml className="h-7 w-7" />
          <span className="text-xl font-bold">PortfolioPilot</span>
        </Link>
        
        {isMobile ? (
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              {/* Added SheetTitle for accessibility, visually hidden */}
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle> 
              <nav className="flex flex-col gap-4 mt-8">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="hidden md:flex items-center gap-2">
            <NavItems />
          </nav>
        )}
        <div className={isMobile ? "ml-auto pl-2" : ""}>
         <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

