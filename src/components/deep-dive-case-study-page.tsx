
"use client";

import Image from 'next/image';
import { resumeData } from '@/data/resume';

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16 items-center">
          <div className="md:col-span-1 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="relative w-48 h-48 md:w-60 md:h-60 mx-auto group">
              <Image
                src={resumeData.headshotUrl}
                alt={resumeData.name}
                fill
                sizes="(max-width: 768px) 40vw, 20vw"
                className="rounded-full object-cover border-4 border-background shadow-xl group-hover:border-primary transition-all duration-300 transform group-hover:scale-105"
                data-ai-hint={resumeData.dataAiHint || "professional headshot tech abstract"}
              />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {resumeData.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
