
"use client";

import Link from 'next/link';
import { resumeData } from '@/data/resume';
import { GithubLogo, LinkedinLogo, Code } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
    const component = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".footer-item", {
                autoAlpha: 0,
                y: 60,
                filter: 'blur(10px)',
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: component.current,
                    start: 'top 95%',
                    toggleActions: 'play none none none',
                }
            });
        }, component);
        return () => ctx.revert();
    }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: resumeData.contact.github, icon: GithubLogo, name: "GitHub" },
    { href: resumeData.contact.linkedin, icon: LinkedinLogo, name: "LinkedIn" },
  ];

  return (
    <footer 
        ref={component}
        className="relative mt-24 py-12 border-t border-white/10 overflow-hidden"
    >
        <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/10 rounded-full blur-3xl opacity-30 animate-float"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-full bg-accent/10 rounded-full blur-3xl opacity-30 animate-float-delay"></div>
        </div>
        <div className="container mx-auto relative z-10 text-center">
            <div className="footer-item flex justify-center items-center mb-6">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <Code weight="bold" className="h-7 w-7 text-accent" />
                    <span className="text-lg font-bold text-foreground">{resumeData.name}</span>
                </Link>
            </div>
            <div className="footer-item flex justify-center gap-6 mb-6">
                {navLinks.map(link => (
                    <Link key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                    </Link>
                ))}
            </div>
            <div className="footer-item flex justify-center gap-6 mb-8">
                {socialLinks.map(link => (
                    <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-muted-foreground hover:text-primary transition-colors">
                        <link.icon size={24} />
                    </a>
                ))}
            </div>
            <p className="footer-item text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} {resumeData.name}. All Rights Reserved.
            </p>
        </div>
    </footer>
  );
}
