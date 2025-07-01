"use client";

import { resumeData } from '@/data/resume';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function HeroSection() {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1 }
      });

      gsap.set('.spline-container', { autoAlpha: 0, x: 100 });
      gsap.set('.hero-content > *', { autoAlpha: 0, y: 50, filter: 'blur(10px)' });

      tl.to('.spline-container', {
        autoAlpha: 1,
        x: 0,
        duration: 1.5,
        delay: 2.5 // Wait for preloader
      })
      .to('.hero-content > *', {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.2,
        duration: 1
      }, "-=1");

    }, component);
    return () => ctx.revert();
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={component} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Spline Background */}
      <div className="spline-container absolute inset-0 z-0 opacity-0">
        <iframe 
          src="https://my.spline.design/3dglassmorphismroom-8cdc7b31b9f6e6f2e5f8c88d5e4b7a34/" 
          width="100%" 
          height="100%"
          className="w-full h-full"
          frameBorder="0"
        />
        <div className="absolute inset-0 bg-background/20 backdrop-blur-sm"></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float-delay"></div>
      </div>
      
      <div className="relative z-10 container mx-auto text-center">
        <div className="hero-content max-w-3xl mx-auto">
          <h1 
            className="text-5xl md:text-7xl font-bold text-white"
          >
            Hi, I’m <span className="text-glow-accent text-accent">{resumeData.name}</span>
          </h1>
          <h2 
            className="mt-4 text-3xl md:text-5xl font-medium text-foreground"
          >
            {resumeData.title}
          </h2>
          <div
            className="mt-10"
          >
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
