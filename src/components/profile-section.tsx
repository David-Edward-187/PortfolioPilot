
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Github, Linkedin, Mail } from 'lucide-react'; 
import { resumeData } from '@/data/resume';

export function ProfileSection() {
  const profile = resumeData;

  const handleViewWorkClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const cvFileName = `${profile.name.replace(/\s+/g, '_')}_CV.pdf`;

  return (
    <section 
      id="profile" 
      className="min-h-screen flex flex-col justify-center items-center text-center bg-background text-foreground py-16 md:py-24 animate-fadeIn px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="relative w-40 h-40 md:w-48 md:h-48 mb-8 mx-auto">
          <Image
            src={profile.headshotUrl}
            alt={profile.name}
            width={192} 
            height={192}
            className="rounded-full object-cover border-4 border-primary shadow-2xl" 
            data-ai-hint="professional headshot"
            priority
          />
        </div>

        <h1 className="text-h1 text-foreground mb-3">{profile.name}</h1>
        <p className="text-2xl md:text-3xl text-primary font-semibold mb-6">{profile.title}</p> 
        <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
          {profile.bio}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mb-10">
          <Button
            size="lg"
            onClick={handleViewWorkClick}
            className="bg-accent text-accent-foreground hover:bg-accent/80 px-8 py-3 text-base shadow-lg hover:shadow-accent/50 transform hover:scale-105 transition-transform duration-300 group" 
            aria-label="View my work"
          >
            View Work <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-primary/70 text-primary hover:bg-primary/10 hover:text-primary px-8 py-3 text-base shadow-md hover:shadow-primary/30 transform hover:scale-105 transition-transform duration-300" 
          >
            <a href="/mycv.pdf" download={cvFileName}>
              <>
                <Download className="mr-2 h-5 w-5" /> Download CV
              </>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
