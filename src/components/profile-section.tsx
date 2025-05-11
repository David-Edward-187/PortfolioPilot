
"use client";

import Image from 'next/image';
import type { ResumeData } from '@/types/resume';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github } from 'lucide-react';

interface ProfileSectionProps {
  profile: Pick<ResumeData, 'name' | 'title' | 'bio' | 'headshotUrl' | 'contact'>;
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <Card id="profile" className="w-full max-w-2xl mx-auto card-like animate-fadeIn">
      <CardContent className="p-6 md:p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src={profile.headshotUrl}
              alt={profile.name}
              width={160}
              height={160}
              className="rounded-full object-cover border-4 border-primary shadow-md"
              data-ai-hint="professional headshot"
              priority
            />
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-primary mb-1">{profile.name}</h1>
        <p className="text-lg text-muted-foreground mb-6">{profile.title}</p>
        <p className="text-sm md:text-base text-foreground/80 mb-8 leading-relaxed max-w-xl mx-auto">
          {profile.bio}
        </p>

        <div className="flex justify-center space-x-3">
          <Button variant="outline" size="icon" asChild className="hover:bg-accent/20 hover:border-accent transition-colors group">
            <a href={`mailto:${profile.contact.email}`} aria-label="Email">
              <Mail className="h-5 w-5 text-primary group-hover:text-accent-foreground transition-colors" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild className="hover:bg-accent/20 hover:border-accent transition-colors group">
            <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-primary group-hover:text-accent-foreground transition-colors" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild className="hover:bg-accent/20 hover:border-accent transition-colors group">
            <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-primary group-hover:text-accent-foreground transition-colors" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
