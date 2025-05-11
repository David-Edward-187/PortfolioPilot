
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Zap, PenTool, ScreenShare } from 'lucide-react'; // Replaced figma with PenTool
import * as React from 'react';

const skills = [
  { name: "React Native", Icon: Zap, description: "Cross-platform mobile development." },
  { name: "Design Tools", Icon: PenTool, description: "Collaborative interface design." }, // Updated name to reflect PenTool
  { name: "User Testing", Icon: ScreenShare, description: "Insightful user feedback sessions." },
];

export function LandingPage() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Simple way to trigger animation after component mounts
    // For scroll-trigger, IntersectionObserver would be better
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="landing" className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center text-center bg-background p-6 md:p-12">
        <div className="relative w-full max-w-4xl mb-12">
          <Image
            src="https://picsum.photos/seed/devicemockup/1200/600"
            alt="Layered Device Mockup"
            width={1200}
            height={600}
            className="rounded-lg shadow-xl object-cover"
            data-ai-hint="device mockup"
            priority
          />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50"></div>
        </div>
        <h1 className="text-h1 mb-6 text-foreground">
          Crafting Digital Experiences
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          Innovative solutions from concept to deployment. Let&apos;s build something amazing together.
        </p>
        <Button 
          size="lg" 
          className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transform transition-all duration-150 ease-in-out animate-pulse-once px-10 py-6 text-lg"
          onClick={() => document.getElementById('case-study-overview')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="View my work"
        >
          View Work
        </Button>
      </section>

      {/* Featured Skills Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-h2 text-center text-foreground mb-16">Featured Skills</h2>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 stagger-children ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <skill.Icon className="w-16 h-16 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="text-h3 text-foreground mb-3">{skill.name}</h3>
                <p className="text-muted-foreground text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

