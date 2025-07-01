
"use client";

import { resumeData } from '@/data/resume';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function HeroSection() {
  const component = useRef(null);
  const heroContentRef = useRef(null);

  // GSAP animations on component mount
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate text and CTA
      gsap.fromTo('.hero-word', 
        { autoAlpha: 0, y: 40, filter: 'blur(10px)' }, 
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.1, delay: 0.2, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-subtitle', 
        { autoAlpha: 0, y: 30 }, 
        { autoAlpha: 1, y: 0, delay: 0.5, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-cta', 
        { autoAlpha: 0, scale: 0.8 }, 
        { autoAlpha: 1, scale: 1, delay: 0.7, duration: 1, ease: 'power3.out' }
      );
    }, component);
    
    return () => ctx.revert();
  }, []);

  // Mouse move parallax effect
  useEffect(() => {
    const el = heroContentRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = el as HTMLElement;
      
      const x = (clientX / offsetWidth - 0.5) * 30; // Multiplier for effect intensity
      const y = (clientY / offsetHeight - 0.5) * 30;

      gsap.to(el, {
        x: -x,
        y: -y,
        rotationY: x / 15,
        rotationX: -y / 15,
        duration: 0.8,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);

  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const renderHeadline = () => {
    const nameParts = resumeData.name.split(' ');
    const nameFirst = nameParts[0];
    const words = `Hi, I’m ${nameFirst}`.split(' ');
    return words.map((word, index) => (
      <span key={index} className="hero-word inline-block mr-[0.25em] last:mr-0">
        {word === nameFirst ? <span className="text-glow-accent text-accent">{word}</span> : word}
      </span>
    ));
  };

  return (
    <section id="home" ref={component} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-grid-pattern">
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background"></div>
      
      <div className="relative z-10 container mx-auto text-center">
        <div ref={heroContentRef} className="hero-content max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            {renderHeadline()}
          </h1>
          <h2 className="hero-subtitle mt-4 text-3xl md:text-5xl font-medium text-foreground">
            {resumeData.title}
          </h2>
          <div className="hero-cta mt-10">
            <Button
              size="lg"
              onClick={handleContactClick}
              className="bg-primary text-primary-foreground text-lg h-14 px-8 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:glow-shadow-primary active:scale-100 group"
            >
              Let's Connect <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
