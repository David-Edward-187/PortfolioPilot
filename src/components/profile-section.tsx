
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github } from 'lucide-react';
import type { ResumeData } from '@/types/resume';

interface ProfileSectionProps {
  profile: Pick<ResumeData, 'name' | 'title' | 'bio' | 'headshotUrl' | 'contact'>;
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <Card 
      className="scroll-mt-20 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out" 
      id="profile"
    >
      <CardHeader className="text-center pt-10 pb-6"> {/* Adjusted padding */}
        <div className="flex justify-center mb-6">
            <Image
              src={profile.headshotUrl}
              alt={profile.name}
              width={180} 
              height={180} 
              className="rounded-full border-4 border-primary shadow-lg" 
              data-ai-hint="professional headshot"
              priority 
            />
        </div>
        <CardTitle asChild className="mb-1.5">
          <h1 className="text-h1 text-primary">{profile.name}</h1>
        </CardTitle>
        <CardDescription asChild>
          <h2 className="text-h4 font-medium text-muted-foreground">{profile.title}</h2>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-10"> 
        <p className="text-center text-lg text-foreground/80 mb-10 leading-relaxed max-w-3xl mx-auto">{profile.bio}</p>
        <div className="flex justify-center space-x-5">
          {profile.contact.email && (
            <Button variant="outline" size="lg" asChild className="group hover:bg-primary/5 hover:border-primary/70 hover:text-primary transition-all duration-200 rounded-lg px-4 py-2">
              <a href={`mailto:${profile.contact.email}`} aria-label="Email" title="Email" className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary/80 group-hover:text-primary transition-colors" />
                <span className="font-medium">Email</span>
              </a>
            </Button>
          )}
          {profile.contact.linkedin && (
            <Button variant="outline" size="lg" asChild className="group hover:bg-primary/5 hover:border-primary/70 hover:text-primary transition-all duration-200 rounded-lg px-4 py-2">
              <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-primary/80 group-hover:text-primary transition-colors" />
                 <span className="font-medium">LinkedIn</span>
              </a>
            </Button>
          )}
          {profile.contact.github && (
            <Button variant="outline" size="lg" asChild className="group hover:bg-primary/5 hover:border-primary/70 hover:text-primary transition-all duration-200 rounded-lg px-4 py-2">
              <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className="flex items-center gap-2">
                <Github className="h-5 w-5 text-primary/80 group-hover:text-primary transition-colors" />
                 <span className="font-medium">GitHub</span>
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
