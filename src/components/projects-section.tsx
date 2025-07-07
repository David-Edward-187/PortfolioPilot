
"use client";

import { resumeData } from '@/data/resume';
import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaArrowRight, FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const dataAiHints = [
    "futuristic dashboard dark", "modern analytics interface", "crypto trading platform",
    "ai application ui", "glowing data visualization", "tech project screenshot"
];

export function ProjectsSection() {
    const component = React.useRef(null);

    React.useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".project-title", {
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
            gsap.from(".project-card", {
                autoAlpha: 0,
                y: 50,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ".projects-grid",
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        }, component);
        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={component} className="container mx-auto py-20 md:py-24">
            <div className="text-center mb-16">
                <h2 className="project-title text-4xl md:text-5xl font-bold mb-4">My Projects</h2>
                <p className="project-title text-lg text-muted-foreground max-w-2xl mx-auto">
                    A selection of my work, demonstrating my skills in creating modern, responsive, and performant web applications.
                </p>
            </div>
            
            <div className="projects-grid grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto">
                {resumeData.projects.slice(0, 5).map((project, index) => {
                    const gridClasses = [
                        'md:col-span-4 md:row-span-2', // Project 1
                        'md:col-span-2 md:row-span-1', // Project 2
                        'md:col-span-2 md:row-span-1', // Project 3
                        'md:col-span-3 md:row-span-1', // Project 4
                        'md:col-span-3 md:row-span-1'  // Project 5
                    ];

                    return (
                        <a
                            key={project.name}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`project-card h-[450px] relative rounded-2xl overflow-hidden group transition-all duration-500 ease-in-out hover:scale-[1.02] hover:z-10 shadow-lg hover:shadow-primary/20
                                ${gridClasses[index]}
                            `}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                                    <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{project.description[0]}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies?.slice(0, 3).map(tech => (
                                            <Badge key={tech} variant="secondary" className="glassmorphic text-xs !bg-white/10 text-white/90 border-0">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                      <Button variant="outline" size="sm" asChild className="glassmorphic border-white/20 text-white hover:bg-white/10">
                                          <span className="flex items-center">
                                              <FaArrowRight className="mr-1.5 h-4 w-4" /> View Live
                                          </span>
                                      </Button>
                                      {project.githubUrl && project.githubUrl !== '#' && (
                                        <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/10">
                                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                            <FaGithub className="mr-1.5 h-4 w-4" /> GitHub
                                          </a>
                                        </Button>
                                      )}
                                    </div>
                                </div>
                            </div>
                            <Image
                                src={project.imageUrl!}
                                alt={project.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                data-ai-hint={dataAiHints[index % dataAiHints.length]}
                            />
                            <div className="absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-colors duration-300 pointer-events-none"></div>
                            <h3 className="absolute bottom-6 left-6 text-xl font-bold text-white z-0 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                              {project.name}
                            </h3>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
