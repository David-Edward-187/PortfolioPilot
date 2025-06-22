
"use client";

import Image from 'next/image';
import { resumeData } from '@/data/resume';
import { Button } from '@/components/ui/button';
import { Download, Mail, Linkedin, Github } from 'lucide-react';

export function ProfileSection() {
  const profile = resumeData;
  const resumeFileName = `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`;

  const socialLinks = [
    { name: "Email", href: `mailto:${profile.contact.email}`, icon: Mail },
    { name: "LinkedIn", href: profile.contact.linkedin, icon: Linkedin },
    { name: "GitHub", href: profile.contact.github, icon: Github },
  ];

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
                <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                        {profile.name}
                    </h1>
                </div>
                <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-primary">
                        {profile.title}
                    </h2>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                    <Button
                        size="lg"
                        onClick={handleContactClick}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 text-base w-full sm:w-auto shadow-lg"
                    >
                        Let's Connect
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-base w-full sm:w-auto shadow-lg"
                    >
                        <a href="/mycv.pdf" download={resumeFileName}>
                            <Download className="mr-2 h-5 w-5" /> Download CV
                        </a>
                    </Button>
                </div>
                <div className="mt-8 flex justify-center space-x-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                    {socialLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Connect on ${link.name}`}
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                            <link.icon className="w-7 h-7" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
}
