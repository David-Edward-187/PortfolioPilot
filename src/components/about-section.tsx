
"use client";

import Image from 'next/image';
import { resumeData } from '@/data/resume';
import { User } from 'lucide-react';

export function AboutSection() {
  return (
    <div className="py-20 md:py-24">
      <div className="flex items-center justify-center mb-14 md:mb-20 animate-fadeIn">
        <User className="section-icon" />
        <h2 className="section-title">About Me</h2>
      </div>
      <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
        <div className="md:col-span-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <div className="relative w-full aspect-square max-w-sm mx-auto group">
             <Image
                src={resumeData.headshotUrl}
                alt={resumeData.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rounded-lg object-cover border-4 border-primary/20 shadow-xl group-hover:border-primary transition-all duration-300 transform group-hover:scale-105" 
                data-ai-hint={resumeData.dataAiHint || "professional headshot tech abstract"}
              />
          </div>
        </div>
        <div className="md:col-span-3 space-y-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {resumeData.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
