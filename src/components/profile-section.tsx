
"use client";

import Image from 'next/image';
import type { ResumeData } from '@/types/resume'; 
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Keep for "View Work" / "Download CV"
import { Download } from 'lucide-react'; // For Download CV button

interface ProfileSectionProps {
  profile: ResumeData; 
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  const handleViewWorkClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const cvFileName = `${profile.name.replace(/\s+/g, '_')}_CV.pdf`;

  return (
    <section id="profile" className="bg-background text-foreground py-16 md:py-24 animate-fadeIn">
      <div className="container mx-auto">
        <Card className="max-w-3xl mx-auto bg-card/70 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-xl border-border">
          <CardContent className="text-center flex flex-col items-center">
            <div className="relative w-36 h-36 md:w-40 md:h-40 mb-6">
              <Image
                src={profile.headshotUrl}
                alt={profile.name}
                width={160} 
                height={160}
                className="rounded-full object-cover border-4 border-primary shadow-lg"
                data-ai-hint="professional headshot"
                priority
              />
            </div>

            <h1 className="text-h1 text-primary mb-2">{profile.name}</h1>
            <p className="text-h4 text-muted-foreground mb-6">{profile.title}</p>
            <p className="text-base md:text-lg text-foreground/90 dark:text-foreground/80 mb-8 leading-relaxed max-w-xl text-center px-2">
              {profile.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
              <Button
                size="lg"
                onClick={handleViewWorkClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base shadow-md hover:shadow-lg"
                aria-label="View my work"
              >
                View Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-base shadow-sm hover:shadow-md"
              >
                <a href="/mycv.pdf" download={cvFileName}>
                  <Download className="mr-2 h-5 w-5" /> Download CV
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
