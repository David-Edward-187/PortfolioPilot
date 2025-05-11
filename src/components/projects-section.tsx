
"use client";

import type { ProjectEntry } from '@/types/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Lightbulb } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectEntry[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-8 md:py-12 scroll-mt-16">
        <div className="container mx-auto px-4 text-center">
          <Lightbulb className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No projects to display at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-8 md:py-12 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6 md:mb-8 animate-fadeIn">
          <Lightbulb className="w-8 h-8 md:w-10 md:h-10 mr-3 text-primary" />
          <h2 className="text-h2 md:text-h1 text-primary">Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm animate-fadeIn"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl text-foreground leading-tight">{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between pt-0">
                <div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-foreground/80 mb-4 leading-relaxed">
                    {project.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-muted-foreground mb-1.5">Technologies:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs px-2 py-0.5">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {project.link && project.link !== "#" && (
                  <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/80 mt-4 self-start text-xs">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
