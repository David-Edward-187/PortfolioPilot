"use client";

import { resumeData } from '@/data/resume';
import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
    const component = React.useRef(null);

    React.useEffect(() => {
        let ctx = gsap.context(() => {
            // Animate section title and the project grid container
            gsap.from(".project-anim", {
                autoAlpha: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.2,
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

    const projectsForHoverEffect = resumeData.projects.map(project => ({
        title: project.name,
        description: (
            <>
                <p className="line-clamp-3">{project.description[0]}</p>
                {project.technologies && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.slice(0, 4).map(tech => (
                            <Badge key={tech} variant="secondary" className="font-normal">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                )}
            </>
        ),
        link: project.link || "#",
    }));

    return (
        <section id="projects" ref={component} className="container mx-auto py-20 md:py-24">
            <div className="text-center mb-12">
                <h2 className="project-anim text-4xl md:text-5xl font-bold mb-4">My Projects</h2>
                <p className="project-anim text-lg text-muted-foreground max-w-2xl mx-auto">
                    A selection of my work. Hover over a card to see the magic.
                </p>
            </div>
            
            <div className="project-anim max-w-5xl mx-auto px-8">
                <HoverEffect items={projectsForHoverEffect} />
            </div>
        </section>
    );
}
