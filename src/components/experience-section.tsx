
"use client";

import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
    const component = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".experience-card", {
                autoAlpha: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: component.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
             gsap.from(".experience-title", {
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
    <section id="experience" ref={component} className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="experience-title text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Work Experience</h2>
          <p className="text-lg text-muted-foreground mt-2">My professional journey.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          {resumeData.experience.map((exp, index) => (
            <div
              key={index}
              className="experience-card"
            >
                <Card
                className="bg-card/80 border-border/50 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300 rounded-lg shadow-md group"
                >
                <CardHeader className="pb-3 pt-5 px-6 md:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2">
                    <CardTitle className="text-lg md:text-xl text-primary font-semibold mb-0.5 sm:mb-0">{exp.role}</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium flex-shrink-0">{exp.years}</p>
                    </div>
                    <p className="text-md text-foreground/90 font-medium pt-0.5 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary/70" />
                    {exp.company}
                    </p>
                </CardHeader>
                <CardContent className="px-6 md:px-8 pt-2 pb-6">
                    <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-foreground/80 leading-relaxed">
                    {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                </CardContent>
                </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
