
"use client";

import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function EducationSection() {
    const component = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".education-card", {
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
            gsap.from(".education-title", {
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
    <section id="education" ref={component} className="py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="education-title text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Education</h2>
            <p className="text-lg text-muted-foreground mt-2">My academic background.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
            {resumeData.education.map((edu, index) => (
            <div
                key={index}
                className="education-card"
            >
                <Card
                className="bg-card/80 border-border/50 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300 rounded-lg shadow-md group"
                >
                <CardHeader className="pb-3 pt-5 px-6 md:px-8">
                    <div className="flex justify-between items-start">
                        <div className="flex-grow">
                        <CardTitle className="text-lg md:text-xl text-primary font-semibold mb-1">{edu.degree}</CardTitle>
                        <p className="text-md text-foreground/90 font-medium">{edu.institution}</p>
                        </div>
                        <div className="text-sm text-muted-foreground font-medium text-right flex-shrink-0 ml-4 flex items-center gap-2">
                        <GraduationCap className="inline-block h-4 w-4 text-primary/70" />
                        {edu.years}
                        </div>
                    </div>
                </CardHeader>
                {edu.details && (
                    <CardContent className="px-6 md:px-8 pt-2 pb-5">
                        <p className="text-sm text-foreground/80 leading-relaxed">{edu.details}</p>
                    </CardContent>
                )}
                </Card>
            </div>
            ))}
        </div>
        </div>
    </section>
    );
}
