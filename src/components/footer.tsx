
"use client";

import Link from 'next/link';
import { resumeData } from '@/data/resume';
import { GithubLogo, LinkedinLogo, Code } from '@phosphor-icons/react/dist/ssr';

export function Footer() {
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: resumeData.contact.github, icon: GithubLogo, name: "GitHub" },
    { href: resumeData.contact.linkedin, icon: LinkedinLogo, name: "LinkedIn" },
  ];

  return (
    <footer className="relative mt-24 py-12 border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/10 rounded-full blur-3xl opacity-30 animate-float"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-full bg-accent/10 rounded-full blur-3xl opacity-30 animate-float-delay"></div>
        </div>
        <div className="container mx-auto relative z-10 text-center">
            <div className="flex justify-center items-center mb-6">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <Code weight="bold" className="h-7 w-7 text-accent" />
                    <span className="text-lg font-bold text-foreground">{resumeData.name}</span>
                </Link>
            </div>
            <div className="flex justify-center gap-6 mb-6">
                {navLinks.map(link => (
                    <Link key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                    </Link>
                ))}
            </div>
            <div className="flex justify-center gap-6 mb-8">
                {socialLinks.map(link => (
                    <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-muted-foreground hover:text-primary transition-colors">
                        <link.icon size={24} />
                    </a>
                ))}
            </div>
            <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} {resumeData.name}. All Rights Reserved.
            </p>
        </div>
    </footer>
  );
}
