
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
      {/* Subtle grid pattern for GTA feel */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" 
        style={{
          backgroundImage: 'radial-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), radial-gradient(hsl(var(--primary) / 0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px, 60px 60px',
          backgroundPosition: '0 0, 15px 15px',
        }}
      ></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="relative w-52 h-52 md:w-64 md:h-64 mb-10 mx-auto group">
          <Image
            src={profile.headshotUrl}
            alt={profile.name}
            width={256} 
            height={256}
            className="rounded-full object-cover border-4 border-primary/80 shadow-2xl group-hover:border-accent transition-all duration-300 transform group-hover:scale-105" 
            data-ai-hint={profile.dataAiHint || "professional headshot urban neon"}
            priority
          />
           {/* Decorative accent for GTA style */}
           <div className="absolute inset-0 rounded-full border-2 border-accent opacity-0 group-hover:opacity-100 group-hover:animate-pulse-once transition-opacity duration-300" style={{animationDelay: '0.2s'}}></div>
           <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:animate-ping group-hover:opacity-70 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-xml">
              <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
            </svg>
           </div>
        </div>

        <h1 className="text-h1 text-foreground mb-3 md:mb-4">{profile.name}</h1>
        <p className="text-3xl md:text-5xl text-primary font-extrabold mb-8 tracking-tight" style={{ textShadow: '0 0 12px hsl(var(--primary) / 0.8), 0 0 20px hsl(var(--primary) / 0.5)' }}>{profile.title}</p> 
        <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
          {profile.bio}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 md:gap-6">
          <Button
            size="lg"
            onClick={handleViewWorkClick}
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-10 py-3.5 text-lg font-bold shadow-lg hover:shadow-primary/60 transform hover:scale-105 transition-all duration-300 group active:scale-95" 
            aria-label="View my work"
          >
            View Work <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-10 py-3.5 text-lg font-bold shadow-md hover:shadow-accent/40 transform hover:scale-105 transition-all duration-300 group active:scale-95" 
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


