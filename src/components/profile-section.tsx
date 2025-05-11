
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
    <Card className="scroll-mt-16 hover:shadow-xl transition-shadow duration-300 ease-in-out" id="profile"> {/* Added card-like class and hover effect */}
      <CardHeader className="text-center pt-8"> {/* Added pt-8 */}
        <div className="flex justify-center mb-6">
            <Image
              src={profile.headshotUrl}
              alt={profile.name}
              width={180} // Increased size
              height={180} // Increased size
              className="rounded-full border-4 border-primary/80 shadow-lg" // Thicker border, slightly different color
              data-ai-hint="professional headshot"
              priority // Eager load profile image
            />
        </div>
        {/* Using h1 for the main name on the page */}
        <CardTitle asChild className="mb-1">
          <h1 className="text-h1 text-primary">{profile.name}</h1>
        </CardTitle>
        {/* Using h2 for the title/subtitle */}
        <CardDescription asChild>
          <h2 className="text-h4 text-muted-foreground">{profile.title}</h2>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8"> {/* Added pb-8 */}
        <p className="text-center text-foreground/90 mb-10 leading-relaxed max-w-2xl mx-auto">{profile.bio}</p> {/* Increased mb and foreground opacity */}
        <div className="flex justify-center space-x-4">
          {profile.contact.email && (
            <Button variant="outline" size="icon" asChild className="hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-200">
              <a href={`mailto:${profile.contact.email}`} aria-label="Email" title="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          )}
          {profile.contact.linkedin && (
            <Button variant="outline" size="icon" asChild className="hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-200">
              <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          )}
          {profile.contact.github && (
            <Button variant="outline" size="icon" asChild className="hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-200">
              <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
