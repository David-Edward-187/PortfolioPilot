"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { resumeData } from '@/data/resume';

export function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderRef.current || !progressBarRef.current || !textRef.current) return;

    const tl = gsap.timeline();

    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power1.out',
    })
    .to(progressBarRef.current, {
        width: '100%',
        duration: 2,
        ease: 'power2.out',
    })
    .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
    }, "-=0.5")
    .to(preloaderRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.inOut',
        onComplete: () => {
            if (preloaderRef.current) {
                preloaderRef.current.style.display = 'none';
            }
        },
    });

  }, []);
  
  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
    >
      <div 
        ref={textRef}
        className="text-4xl font-bold text-foreground opacity-0 mb-4"
      >
        {resumeData.name}
      </div>
      <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-primary"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
}
