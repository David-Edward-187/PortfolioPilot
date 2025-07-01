
"use client";

import Image from 'next/image';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, GithubLogo } from '@phosphor-icons/react/dist/ssr';
import { resumeData } from '@/data/resume';
import { Badge } from '@/components/ui/badge';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectImages = [
  "https://placehold.co/600x400.png",
  "https://placehold.co/600x400.png",
  "https://placehold.co/600x400.png",
  "https://placehold.co/600x400.png",
  "https://placehold.co/600x400.png",
  "https://placehold.co/600x400.png"
];

const dataAiHints = [
  "futuristic dashboard dark",
  "modern analytics interface",
  "crypto trading platform",
  "ai application ui",
  "glowing data visualization",
  "tech project screenshot"
];

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

      gsap.from(".project-card", {
        autoAlpha: 0,
        y: 50,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={component} className="container mx-auto py-20 md:py-24">
      <div className="text-center">
        <h2 className="projects-title-anim text-4xl md:text-5xl font-bold mb-4">My Projects</h2>
        <p className="projects-title-anim text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          A selection of my work, demonstrating my skills in creating modern, responsive, and performant web applications.
        </p>
      </div>

      <div className="projects-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {resumeData.projects.map((project, index) => (
          <div
            key={project.name}
            className={`project-card relative rounded-2xl overflow-hidden group transition-all duration-500 ease-in-out hover:scale-[1.02] hover:z-10 shadow-lg hover:shadow-primary/20
              ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              ${index === 3 ? 'md:col-span-2' : ''}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 p-6 flex flex-col justify-end transition-all duration-300">
              <div className="transform transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{project.description[0]}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.slice(0, 4).map(tech => (
                    <Badge key={tech} variant="secondary" className="glassmorphic text-xs !bg-white/10 text-white/90 border-0 backdrop-blur-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" asChild className="glassmorphic h-9 px-3 text-sm border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:text-white">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                       View Live <ArrowRight className="ml-1.5 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" asChild className="h-9 px-3 text-sm text-white hover:bg-white/10 hover:text-white">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <GithubLogo className="mr-1.5 h-5 w-5" /> GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            <Image
              src={projectImages[index % projectImages.length]}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              data-ai-hint={dataAiHints[index % dataAiHints.length]}
            />
            <div className="absolute bottom-0 left-0 p-6 z-10 transition-all duration-300 group-hover:translate-y-4 group-hover:opacity-0">
                <h3 className="text-3xl font-bold text-white drop-shadow-lg">{project.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
