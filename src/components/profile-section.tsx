
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react'; 
import { resumeData } from '@/data/resume';

export function ProfileSection() {
  const profile = resumeData;

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const resumeFileName = `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`;

  return (
    <section 
      id="profile" 
      className="min-h-screen flex flex-col justify-center items-center text-center bg-background text-foreground py-24 md:py-32 animate-fadeIn px-4 sm:px-6 lg:px-8 relative"
    >
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="relative w-48 h-48 md:w-60 md:h-60 mb-10 mx-auto group">
          <Image
            src={profile.headshotUrl}
            alt={profile.name}
            width={240} 
            height={240}
            className="rounded-full object-cover border-4 border-primary/80 shadow-xl group-hover:border-primary transition-all duration-300 transform group-hover:scale-105" 
            data-ai-hint={profile.dataAiHint || "professional headshot tech abstract"}
            priority
          />
        </div>

        <h1 className="text-h1 text-foreground mb-3 md:mb-4">{profile.name}</h1>
        <p className="text-2xl md:text-4xl text-primary font-semibold mb-8 tracking-tight">{profile.title}</p> 
        <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
          {profile.bio}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 md:gap-6">
          <Button
            size="lg"
            onClick={handleContactClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-3 text-base font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group active:scale-95" 
            aria-label="Contact Me"
          >
            Contact Me <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-10 py-3 text-base font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group active:scale-95" 
          >
            <a href="/mycv.pdf" download={resumeFileName}>
              <>
                <Download className="mr-2.5 h-5 w-5 group-hover:animate-pulse-once" /> Download Resume
              </>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
