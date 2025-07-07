
"use client";

import { resumeData } from '@/data/resume';
import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaArrowRight, FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
    const component = React.useRef(null);

    React.useEffect(() => {
        let ctx = gsap.context(() => {
            // Animate section title
            gsap.from(".project-title-anim", {
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
            // Animate project cards
            gsap.from(".project-card-anim", {
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
                <h2 className="project-title-anim text-4xl md:text-5xl font-bold mb-4">My Projects</h2>
                <p className="project-title-anim text-lg text-muted-foreground max-w-2xl mx-auto">
                    A selection of my work, demonstrating my skills in creating modern, responsive, and performant web applications.
                </p>
            </div>
            
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {resumeData.projects.map((project, index) => (
                    <div key={index} className="project-card-anim">
                        <Card className="flex flex-col h-full bg-card/80 border-border/50 backdrop-blur-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">{project.name}</CardTitle>
                                <CardDescription className="pt-2 h-20 line-clamp-3">
                                    {project.description[0]}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm font-semibold mb-3 text-foreground/90">Technologies Used:</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies?.map(tech => (
                                        <Badge key={tech} variant="secondary">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-start gap-4">
                                <Button asChild size="sm" variant="default">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                        <FaArrowRight className="mr-2 h-4 w-4" /> View Live
                                    </a>
                                </Button>
                                {project.githubUrl && project.githubUrl !== '#' && (
                                    <Button asChild size="sm" variant="outline">
                                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                        <FaGithub className="mr-2 h-4 w-4" /> GitHub
                                      </a>
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
}
