"use client";

import { resumeData } from '@/data/resume';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function HeroSection() {

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://placehold.co/1920x1080/010816/010816.png" // Placeholder poster matching background
        >
          <source src="https://cdn.coverr.co/videos/coverr-digital-data-spheres-5743/1080p.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background"></div>
      </div>
      
      <div className="relative z-10 container mx-auto text-center">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Hi, I’m <span className="text-glow-accent text-accent">{resumeData.name}</span>
          </h1>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium text-foreground">
            {resumeData.title}
          </h2>
          <div className="mt-10">
            <Button
              size="lg"
              onClick={handleContactClick}
              className="bg-primary text-primary-foreground text-lg h-14 px-8 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-glow-primary active:scale-100 group"
            >
              Hire Me <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
