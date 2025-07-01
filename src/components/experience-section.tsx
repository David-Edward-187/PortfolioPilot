
"use client";

import { resumeData } from '@/data/resume';
import { Briefcase, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
    const component = useRef(null);

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

             gsap.from(".experience-tabs", {
                autoAlpha: 0,
                y: 50,
                filter: 'blur(10px)',
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ".experience-tabs",
                    start: "top 85%",
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

        <div className="experience-tabs max-w-4xl mx-auto">
          <Tabs defaultValue={resumeData.experience[0].company} className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 gap-2 h-auto">
              {resumeData.experience.map((exp) => (
                <TabsTrigger key={exp.company} value={exp.company} className="py-3 text-base">
                    {exp.company}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {resumeData.experience.map((exp) => (
                <TabsContent key={exp.company} value={exp.company}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 p-6 md:p-8 bg-card rounded-2xl border border-border/50 shadow-lg"
                  >
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
                  </motion.div>
                </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
