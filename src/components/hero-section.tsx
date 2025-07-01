
"use client";

import { resumeData } from '@/data/resume';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Hero3DScene } from './hero-3d-scene';

export function HeroSection() {
  const component = useRef(null);
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
    let ctx = gsap.context(() => {
      gsap.set('.hero-content > *', { autoAlpha: 0 });

      const tl = gsap.timeline({
        delay: 2.5, // Wait for preloader to finish
        defaults: { ease: 'power3.out', duration: 1 }
      });

      tl.fromTo('.hero-word', { 
        y: 40,
        filter: 'blur(10px)',
        autoAlpha: 0,
      }, {
        y: 0,
        filter: 'blur(0px)',
        autoAlpha: 1,
        stagger: 0.1,
      }, 0.5) // Start slightly after scene appears
      .fromTo('.hero-subtitle', { 
        y: 30,
        autoAlpha: 0,
      }, {
        y: 0,
        autoAlpha: 1,
      }, "-=0.7")
      .fromTo('.hero-cta', {
        scale: 0.8,
        autoAlpha: 0,
      }, {
        scale: 1,
        autoAlpha: 1,
      }, "-=0.8");

    }, component);
    return () => ctx.revert();
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
    <section id="home" ref={component} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      {isMounted && <Hero3DScene />}
      
      {/* Floating Orbs - Kept for extra depth */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float-delay"></div>
      </div>
      
      <div className="relative z-10 container mx-auto text-center">
        <div className="hero-content max-w-3xl mx-auto">
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
              Hire Me <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
