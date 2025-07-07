
"use client";

import { resumeData } from '@/data/resume';
import { Button } from '@/components/ui/button';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { Hero3DScene } from './hero-3d-scene';
import Link from 'next/link';

export function HeroSection() {
  const component = useRef<HTMLElement>(null);

  const typewriterWords = [
    { text: "I" },
    { text: "build" },
    { text: "modern" },
    { text: "web" },
    { text: "applications.", className: "text-primary" },
  ];

  // GSAP animations for the text and CTA
  useEffect(() => {
    gsap.set(".hero-title-line", { y: "100%", opacity: 0 });
    gsap.set(".hero-cta", { opacity: 0, scale: 0.8 });
    
    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(".hero-title-line", {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      stagger: 0.2,
    }).to(".hero-cta", {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.8");
  }, []);

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const renderHeadline = () => {
    const nameParts = resumeData.name.split(' ');
    const nameFirst = nameParts[0];
    return `Hi, I’m ${nameFirst}`;
  };

  return (
    <section ref={component} id="home" className="relative h-screen min-h-[700px] w-full bg-background flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-100">
        <Hero3DScene />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-radial from-transparent via-background/60 to-background"></div>
      
      <div className="relative z-20 container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground overflow-hidden py-2">
            <div className="hero-title-line inline-block">{renderHeadline()}</div>
        </h1>
        <div className="hero-title-line mt-4 h-[4rem] md:h-[5rem]">
            <TypewriterEffect words={typewriterWords} />
        </div>
        <div className="hero-cta mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={handleContactClick}
              className="bg-primary text-primary-foreground text-lg h-14 px-8 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-glow-primary active:scale-100 group w-full sm:w-auto"
            >
              Let's Connect <FaArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-lg h-14 px-8 rounded-full transition-all duration-300 ease-in-out hover:scale-105 active:scale-100 group w-full sm:w-auto"
            >
              <Link href="/cv">
                View CV <FaDownload className="ml-2 h-5 w-5" />
              </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
