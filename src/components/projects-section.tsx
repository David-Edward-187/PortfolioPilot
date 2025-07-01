
"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { resumeData } from '@/data/resume';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as React from 'react';
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
    const component = React.useRef(null);

    React.useEffect(() => {
        let ctx = gsap.context(() => {
          gsap.from(".projects-title-anim", {
            autoAlpha: 0,
            y: 40,
            filter: 'blur(10px)',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
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
        <p>{project.description[0]}</p>
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map(tech => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </>
    ),
    link: project.link,
  }));

  return (
    <section id="projects" ref={component} className="container mx-auto py-20 md:py-24">
      <div className="text-center">
        <h2 className="projects-title-anim text-4xl md:text-5xl font-bold mb-4">My Projects</h2>
        <p className="projects-title-anim text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Hover over a card to see the effect. Click to view project details.
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={projectsForHoverEffect} />
      </div>
    </section>
  );
}
