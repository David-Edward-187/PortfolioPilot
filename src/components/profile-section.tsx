
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, User } from 'lucide-react';
import type { ResumeData } from '@/types/resume';

interface ProfileSectionProps {
  profile: Pick<ResumeData, 'name' | 'title' | 'bio' | 'headshotUrl' | 'contact'>;
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <Card className="shadow-lg scroll-mt-16" id="profile">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-6">
            <Image
              src={profile.headshotUrl}
              alt={profile.name}
              width={160}
              height={160}
              className="rounded-full border-4 border-primary shadow-md"
              data-ai-hint="professional headshot"
            />
        </div>
        <CardTitle className="text-3xl text-primary">{profile.name}</CardTitle>
        <CardDescription className="text-lg text-muted-foreground mt-1">{profile.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-foreground/80 mb-8 leading-relaxed">{profile.bio}</p>
        <div className="flex justify-center space-x-4">
          {profile.contact.email && (
            <Button variant="outline" size="icon" asChild className="hover:bg-accent/20 hover:border-accent transition-colors">
              <a href={`mailto:${profile.contact.email}`} aria-label="Email">
                <Mail className="h-5 w-5 text-primary group-hover:text-accent-foreground" />
              </a>
            </Button>
          )}
          {profile.contact.linkedin && (
            <Button variant="outline" size="icon" asChild className="hover:bg-accent/20 hover:border-accent transition-colors">
              <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-primary group-hover:text-accent-foreground" />
              </a>
            </Button>
          )}
          {profile.contact.github && (
            <Button variant="outline" size="icon" asChild className="hover:bg-accent/20 hover:border-accent transition-colors">
              <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 text-primary group-hover:text-accent-foreground" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

