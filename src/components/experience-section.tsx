"use client";

import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
    const component = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const timelineItems = gsap.utils.toArray('.timeline-item');
            
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

            gsap.from(".timeline-line", {
                scaleY: 0,
                duration: 1,
                ease: 'power3.inOut',
                transformOrigin: 'top',
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top 70%",
                    end: "bottom 70%",
                    scrub: 1
                }
            });

            timelineItems.forEach((item) => {
                gsap.from(item as gsap.TweenTarget, {
                    autoAlpha: 0,
                    y: 100,
                    scale: 0.9,
                    scrollTrigger: {
                        trigger: item as gsap.TweenTarget,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: true,
                        toggleActions: "play none none none",
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
        
        <div className="timeline-container relative max-w-3xl mx-auto">
            <div className="timeline-line absolute top-0 left-4 md:left-1/2 w-0.5 h-full bg-border/70 -translate-x-1/2"></div>
            
            <div className="relative space-y-12">
                {resumeData.experience.map((exp, index) => (
                    <div key={index} className="timeline-item pl-12 md:pl-0 relative">
                        <div className="absolute top-1 left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-secondary"></div>
                        
                        <div className={cn(
                            "md:w-1/2",
                            index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8 md:text-right"
                        )}>
                            <Card className="bg-card/80 border-border/50 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300 rounded-lg shadow-md group">
                                <CardHeader className="pb-3 pt-5 px-6 md:px-8">
                                    <div className={cn(
                                        "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2",
                                        index % 2 !== 0 && "md:flex-row-reverse"
                                    )}>
                                        <CardTitle className="text-lg md:text-xl text-primary font-semibold mb-0.5 sm:mb-0">{exp.role}</CardTitle>
                                        <p className="text-sm text-muted-foreground font-medium flex-shrink-0">{exp.years}</p>
                                    </div>
                                    <p className={cn(
                                        "text-md text-foreground/90 font-medium pt-0.5 flex items-center gap-2",
                                        index % 2 !== 0 && "md:justify-end md:flex-row-reverse"
                                    )}>
                                        <Briefcase className="h-4 w-4 text-primary/70" />
                                        {exp.company}
                                    </p>
                                </CardHeader>
                                <CardContent className={cn("px-6 md:px-8 pt-2 pb-6", index % 2 !== 0 && "md:text-left")}>
                                    <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-foreground/80 leading-relaxed">
                                        {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
