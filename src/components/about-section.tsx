"use client";

import Image from 'next/image';
import { resumeData } from '@/data/resume';
import * as React from 'react';
import { 
  FileHtml, 
  FileCss, 
  FileJs, 
  Atom
} from '@phosphor-icons/react/dist/ssr';

const skillIcons: { [key: string]: React.ElementType } = {
  "HTML": FileHtml,
  "CSS": FileCss,
  "JS": FileJs,
  "React": Atom,
  "Next.js": () => <span className="font-bold text-sm">N</span>, 
  "GSAP": () => <span className="font-bold text-sm">G</span>
};


const useIntersectionObserver = (options: IntersectionObserverInit) => {
    const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(null);
    const elementRef = React.useRef(null);
  
    React.useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setEntry(entry);
          observer.unobserve(entry.target);
        }
      }, options);
  
      const currentElement = elementRef.current;
      if (currentElement) {
        observer.observe(currentElement);
      }
  
      return () => {
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    }, [options]);
  
    return [elementRef, entry?.isIntersecting ?? false] as const;
};


export function AboutSection() {
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="about" ref={sectionRef} className={`container mx-auto section-reveal ${isVisible ? 'visible' : ''}`}>
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto group">
            <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-300 animate-tilt"></div>
            <Image
              src={resumeData.headshotUrl}
              alt={resumeData.name}
              width={320}
              height={320}
              className="relative rounded-full object-cover border-2 border-primary/50 shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint="professional headshot tech"
            />
        </div>
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {resumeData.bio}
          </p>
          <div className="pt-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {Object.entries(skillIcons).map(([skill, Icon], index) => (
                <div 
                  key={skill}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg glassmorphic w-24 h-24 justify-center transition-all duration-300 hover:bg-primary/20 hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms`}}
                >
                  <Icon size={36} className="text-accent" weight="light" />
                  <span className="text-xs font-medium text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
