"use client";

import { resumeData } from '@/data/resume';
import { Briefcase, Calendar } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
    const component = useRef(null);
    const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
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

            timelineItemsRef.current.forEach((item) => {
                if (!item) return;

                gsap.from(item, {
                    autoAlpha: 0,
                    x: -50, // Animate from left
                    filter: 'blur(10px)',
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }, component);
        return () => ctx.revert();
    }, []);

  return (
    <section id="experience" ref={component} className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="experience-title text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Work Experience</h2>
          <p className="text-lg text-muted-foreground mt-2">My professional journey.</p>
        </div>

        <div className="relative max-w-4xl mx-auto pl-8">
            {/* The vertical timeline bar */}
            <div className="absolute left-0 top-0 h-full w-0.5 bg-border ml-4"></div>

            <div className="space-y-12">
                {resumeData.experience.map((exp, index) => (
                    <div 
                        key={index} 
                        ref={el => timelineItemsRef.current[index] = el}
                        className="relative"
                    >
                        {/* The dot on the timeline */}
                        <div className="absolute left-0 top-1 -translate-x-[calc(50%+1px)] h-4 w-4 rounded-full bg-primary border-4 border-secondary ml-4"></div>

                        <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-lg">
                             <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                                <h3 className="text-2xl font-bold text-primary">{exp.role}</h3>
                                <div className="flex items-center gap-2 text-muted-foreground mt-2 sm:mt-0">
                                    <Calendar className="h-5 w-5" />
                                    <span className="text-sm font-medium">{exp.years}</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-foreground/90 mb-6">
                                <Briefcase className="h-5 w-5 text-accent"/>
                                <span className="font-semibold text-lg">{exp.company}</span>
                            </div>

                            <ul className="space-y-3 list-disc list-outside ml-5 text-foreground/80 leading-relaxed">
                                {exp.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
