"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Zap, PenTool, ScreenShare } from 'lucide-react';
import * as React from 'react';

const skills = [
  { name: "React Native", Icon: Zap, description: "Cross-platform mobile apps." },
  { name: "Design Tools", Icon: PenTool, description: "UI/UX Prototyping." },
  { name: "User Testing", Icon: ScreenShare, description: "Valuable user feedback." },
];

export function LandingPage() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // In a real app, this would likely be passed via props or context
  const handleViewWorkClick = () => {
    // This function would ideally trigger an action in DesktopView
    // e.g., open the 'caseStudies' app. For now, it's a placeholder.
    console.log("View Work clicked - integrate with DesktopView to open Case Studies");
    const event = new CustomEvent('dockitemselect', { detail: 'caseStudies' });
    window.dispatchEvent(event);
  };

  return (
    <div className="flex flex-col items-center text-center p-2 md:p-4">
      {/* Hero Section Content */}
      <div className="relative w-full max-w-3xl mb-8">
        <Image
          src="https://picsum.photos/seed/devicemockup/1200/600"
          alt="Layered Device Mockup"
          width={1200}
          height={600}
          className="rounded-md shadow-lg object-cover"
          data-ai-hint="device mockup app"
          priority
        />
      </div>
      <h1 className="text-h2 md:text-h1 mb-4 text-foreground">
        Crafting Digital Experiences
      </h1>
      <p className="text-sm md:text-base text-muted-foreground max-w-xl mb-6">
        Innovative solutions from concept to deployment. Let&apos;s build something amazing together.
      </p>
      <Button
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transform transition-all duration-150 ease-in-out px-8 py-3 text-base"
        onClick={handleViewWorkClick}
        aria-label="View my work"
      >
        View Work
      </Button>

      {/* Featured Skills Section */}
      <section className="py-10 md:py-12 w-full">
        <h2 className="text-h3 md:text-h2 text-center text-foreground mb-8 md:mb-10">Featured Skills</h2>
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <skill.Icon className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3" strokeWidth={1.5} />
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">{skill.name}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
