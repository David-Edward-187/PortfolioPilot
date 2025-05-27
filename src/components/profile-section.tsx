
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
      className="min-h-screen flex flex-col justify-center items-center text-center bg-background text-foreground py-24 md:py-32 animate-fadeIn px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Subtle grid pattern for Rockstar/GTA feel - more pronounced */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
        style={{
          backgroundImage: 'radial-gradient(hsl(var(--primary) / 0.15) 0.5px, transparent 0.5px), radial-gradient(hsl(var(--primary) / 0.08) 0.5px, transparent 0.5px)',
          backgroundSize: '20px 20px, 40px 40px',
          backgroundPosition: '0 0, 10px 10px',
        }}
      ></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="relative w-56 h-56 md:w-72 md:h-72 mb-12 mx-auto group">
          <Image
            src={profile.headshotUrl}
            alt={profile.name}
            width={288} 
            height={288}
            className="rounded-full object-cover border-4 border-primary/90 shadow-2xl group-hover:border-accent transition-all duration-300 transform group-hover:scale-105" 
            data-ai-hint={profile.dataAiHint || "professional headshot urban neon"}
            priority
          />
           {/* Rockstar style decorative accent - more pronounced */}
           <div className="absolute inset-0 rounded-full border-2 border-accent opacity-0 group-hover:opacity-100 group-hover:animate-pulse-once transition-opacity duration-300" style={{animationDelay: '0.2s', animationDuration: '0.8s'}}></div>
           <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:animate-ping group-hover:opacity-80 transition-all duration-300 ease-out">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-xml">
              <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
            </svg>
           </div>
        </div>

        <h1 className="text-h1 text-foreground mb-4 md:mb-5">{profile.name}</h1>
        <p className="text-3xl md:text-5xl text-primary font-extrabold mb-10 tracking-tight" style={{ textShadow: '0 0 15px hsl(var(--primary) / 0.9), 0 0 25px hsl(var(--primary) / 0.6)' }}>{profile.title}</p> 
        <p className="text-lg md:text-xl text-muted-foreground mb-14 leading-relaxed max-w-3xl mx-auto">
          {profile.bio}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8">
          <Button
            size="lg"
            onClick={handleViewWorkClick}
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-12 py-4 text-lg font-bold shadow-glow-primary-sm hover:shadow-glow-primary-md transform hover:scale-105 transition-all duration-200 group active:scale-95" 
            aria-label="View my work"
          >
            View Work <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-12 py-4 text-lg font-bold shadow-glow-accent-sm hover:shadow-glow-accent-md transform hover:scale-105 transition-all duration-200 group active:scale-95" 
          >
            <a href="/mycv.pdf" download={cvFileName}>
              <>
                <Download className="mr-3 h-6 w-6 group-hover:animate-pulse-once" /> Download CV
              </>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
