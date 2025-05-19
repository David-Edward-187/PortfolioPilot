
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
      className="min-h-screen flex flex-col justify-center items-center text-center bg-background text-foreground py-20 md:py-28 animate-fadeIn px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Optional: Subtle background pattern or gradient for GTA feel */}
      <div className="absolute inset-0 opacity-5 dark:opacity-[0.03]" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/argyle.png")'}}></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="relative w-48 h-48 md:w-56 md:h-56 mb-10 mx-auto group">
          <Image
            src={profile.headshotUrl}
            alt={profile.name}
            width={224} 
            height={224}
            className="rounded-full object-cover border-4 border-primary/70 shadow-xl group-hover:border-accent transition-all duration-300 transform group-hover:scale-105" 
            data-ai-hint={profile.dataAiHint || "professional headshot"}
            priority
          />
           <div className="absolute inset-0 rounded-full border-2 border-accent opacity-0 group-hover:opacity-70 group-hover:animate-pulse-once transition-opacity duration-300" style={{animationDelay: '0.2s'}}></div>
        </div>

        <h1 className="text-h1 text-foreground mb-4">{profile.name}</h1>
        <p className="text-3xl md:text-4xl text-primary font-bold mb-8 tracking-tight" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.7)' }}>{profile.title}</p> 
        <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
          {profile.bio}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8">
          <Button
            size="lg"
            onClick={handleViewWorkClick}
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-10 py-3 text-lg shadow-lg hover:shadow-primary/50 transform hover:scale-105 transition-transform duration-300 group active:scale-95" 
            aria-label="View my work"
          >
            View Work <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-accent text-accent hover:bg-accent/10 hover:text-accent px-10 py-3 text-lg shadow-md hover:shadow-accent/30 transform hover:scale-105 transition-transform duration-300 group active:scale-95" 
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

    