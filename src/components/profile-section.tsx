"use client";

import Image from 'next/image';
import type { ResumeData } from '@/types/resume'; // Ensure this uses the full ResumeData
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github } from 'lucide-react';

interface ProfileSectionProps {
  profile: ResumeData; // Using full ResumeData type
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <Card id="profile" className="w-full max-w-xl mx-auto bg-transparent border-none shadow-none animate-fadeIn">
      <CardContent className="p-6 md:p-8 text-center flex flex-col items-center">
        <div className="relative w-32 h-32 md:w-36 md:h-36 mb-6">
          <Image
            src={profile.headshotUrl}
            alt={profile.name}
            width={144} 
            height={144}
            className="rounded-full object-cover border-4 border-primary shadow-md"
            data-ai-hint="professional headshot"
            priority
          />
        </div>

        <h1 className="text-3xl font-semibold text-primary mb-1">{profile.name}</h1>
        <p className="text-md text-muted-foreground mb-6">{profile.title}</p>
        <p className="text-sm text-foreground/90 dark:text-foreground/80 mb-8 leading-relaxed max-w-md text-center">
          {profile.bio}
        </p>

        <div className="flex justify-center space-x-3">
          <Button variant="outline" size="icon" asChild className="rounded-lg border-border hover:bg-primary/10 hover:border-primary transition-colors group">
            <a href={`mailto:${profile.contact.email}`} aria-label="Email">
              <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild className="rounded-lg border-border hover:bg-primary/10 hover:border-primary transition-colors group">
            <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild className="rounded-lg border-border hover:bg-primary/10 hover:border-primary transition-colors group">
            <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
