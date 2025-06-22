
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
    <div className="py-20 md:py-24">
      <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
        <div className="md:col-span-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <div className="relative w-full aspect-square max-w-sm mx-auto group">
            <Image
              src={profile.headshotUrl}
              alt={profile.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="rounded-lg object-cover border-4 border-primary/20 shadow-xl group-hover:border-primary transition-all duration-300 transform group-hover:scale-105"
              data-ai-hint={profile.dataAiHint || "professional headshot tech abstract"}
              priority
            />
          </div>
        </div>
        <div className="md:col-span-3 space-y-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{profile.name}</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">{profile.title}</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {profile.bio}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <Button
              size="lg"
              onClick={handleContactClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base w-full sm:w-auto"
            >
              Contact Me
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-base w-full sm:w-auto"
            >
              <a href="/mycv.pdf" download={resumeFileName}>
                <Download className="mr-2 h-5 w-5" /> Download CV
              </a>
            </Button>
          </div>
          <div className="flex justify-start space-x-4 pt-4">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect on ${link.name}`}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
