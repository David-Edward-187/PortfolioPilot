
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react'; 
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
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-background via-background to-secondary/30 dark:to-secondary/10 text-foreground py-20 md:py-28 animate-fadeIn px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative w-44 h-44 md:w-52 md:h-52 mb-8 mx-auto group">
          <Image
            src={profile.headshotUrl}
            alt={profile.name}
            width={208} 
            height={208}
            className="rounded-full object-cover border-4 border-primary/80 shadow-2xl group-hover:border-primary transition-all duration-300 transform group-hover:scale-105" 
            data-ai-hint={profile.dataAiHint || "professional headshot"}
            priority
          />
           <div className="absolute inset-0 rounded-full border-2 border-accent/50 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-once transition-opacity duration-300"></div>
        </div>

        <h1 className="text-h1 text-foreground mb-3">{profile.name}</h1>
        <p className="text-2xl md:text-3xl text-primary font-semibold mb-6">{profile.title}</p> 
        <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
          {profile.bio}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 md:gap-6 mb-10">
          <Button
            size="lg"
            onClick={handleViewWorkClick}
            className="bg-accent text-accent-foreground hover:bg-accent/80 px-10 py-3 text-base shadow-lg hover:shadow-accent/50 transform hover:scale-105 transition-transform duration-300 group" 
            aria-label="View my work"
          >
            View Work <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-primary/70 text-primary hover:bg-primary/10 hover:text-primary px-10 py-3 text-base shadow-md hover:shadow-primary/30 transform hover:scale-105 transition-transform duration-300 group" 
          >
            <a href="/mycv.pdf" download={cvFileName}>
              <>
                <Download className="mr-2.5 h-5 w-5 group-hover:animate-pulse-once" /> Download CV
              </>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
