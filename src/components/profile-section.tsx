"use client";

import { resumeData } from '@/data/resume';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

export function HeroSection() {

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 bg-background overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[150%] bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,hsl(var(--primary)/0.15),transparent)]"></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/30 rounded-full blur-3xl animate-float opacity-50"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/30 rounded-full blur-3xl animate-float-delay opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            Hi, I’m <span className="text-glow-accent text-accent">{resumeData.name}</span>
          </h1>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium text-foreground animate-fade-in-up" style={{animationDelay: '1.0s'}}>
            {resumeData.title}
          </h2>
          <div className="mt-10 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
            <Button
              size="lg"
              onClick={handleContactClick}
              className="bg-primary text-primary-foreground text-lg h-14 px-8 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:glow-shadow-primary active:scale-100 group"
            >
              Hire Me <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
