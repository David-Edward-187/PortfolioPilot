
"use client";

import { resumeData } from '@/data/resume';
import { Card } from '@/components/ui/card';
import { Wrench, Code, Library, Database, Cloud, Sparkles } from 'lucide-react';
import type { ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';


gsap.registerPlugin(ScrollTrigger);


const categoryIcons: { [key: string]: ElementType } = {
  "Languages": Code,
  "Frameworks & Libraries": Library,
  "Datastores": Database,
  "Cloud & DevOps": Cloud,
  "Other": Sparkles
};


export function SkillsSection() {
    const component = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".skill-card", {
                autoAlpha: 0,
                y: 50,
                stagger: 0.15,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: component.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
            gsap.from(".skills-title", {
                autoAlpha: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: component.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }, component);
        return () => ctx.revert();
    }, []);

  return (
    <section id="skills" ref={component} className="py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="skills-title text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Skills</h2>
          <p className="text-lg text-muted-foreground mt-2">My technical toolbox.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {Object.entries(resumeData.skills).map(([category, skillsList]) => {
            const Icon = categoryIcons[category] || Wrench; // Fallback icon
            return (
              <div key={category} className="skill-card">
                <Card className="bg-card/80 border-border/50 backdrop-blur-sm p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    <Icon className="w-6 h-6 mr-3 text-accent"/>
                    {category}
                    </h3>
                    <div className="flex flex-wrap gap-2.5 md:gap-3">
                    {skillsList.map((skill) => (
                        <span
                        key={skill}
                        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium shadow-sm border border-transparent hover:border-primary transition-colors duration-200 cursor-default"
                        >
                        {skill}
                        </span>
                    ))}
                    </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
