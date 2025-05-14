
"use client";
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Briefcase, Package } from 'lucide-react';
import { resumeData } from '@/data/resume';
import type { ProjectEntry } from '@/types/resume';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function CaseStudyOverviewPage() {
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  if (!resumeData.projects || resumeData.projects.length === 0) {
    return (
      <div className="py-12 md:py-16 flex flex-col items-center justify-center text-center">
        <Package className="section-icon text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">No projects to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16">
      <div className="flex items-center justify-center mb-10 md:mb-14 animate-fadeIn">
         <Package className="section-icon" />
         <h2 className="section-title">Projects</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {resumeData.projects.map((project: ProjectEntry, index: number) => (
          <Card
            key={project.name}
            className="bg-card/70 border-border/70 backdrop-blur-md rounded-xl shadow-xl overflow-hidden group flex flex-col transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-1 animate-fadeIn"
            style={{animationDelay: `${index * 0.07}s`}}
            onMouseEnter={() => setHoveredProject(project.name)}
            onMouseLeave={() => setHoveredProject(null)}
            role="article"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl">
              <Image
                src={project.imageUrl || `https://placehold.co/400x300.png`}
                alt={project.name}
                layout="fill"
                objectFit="cover"
                className={`transform transition-transform duration-500 ease-in-out ${hoveredProject === project.name ? 'scale-110' : 'scale-100'}`}
                data-ai-hint={project.dataAiHint || project.name.toLowerCase().split(' ').slice(0,2).join(' ') || 'application interface'}
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <CardHeader className="p-5 md:p-6">
              <CardTitle className="text-lg md:text-xl font-semibold text-primary group-hover:text-primary/90 transition-colors">{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-5 md:p-6 pt-0 flex-grow">
              <ul className="text-sm text-muted-foreground mt-1 space-y-1.5 list-disc list-outside ml-4 line-clamp-4">
                 {project.description.map((desc, i) => <li key={i}>{desc}</li>)}
              </ul>
            </CardContent>
            <CardFooter className="p-5 md:p-6 pt-3 flex flex-col items-start">
              {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-4 w-full">
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 5).map(tech => ( 
                              <Badge key={tech} variant="secondary" className="text-xs px-2.5 py-1 bg-secondary/80 text-secondary-foreground/90 shadow-sm">
                                {tech}
                              </Badge>
                          ))}
                          {project.technologies.length > 5 && <Badge variant="secondary" className="text-xs px-2.5 py-1 shadow-sm">...</Badge>}
                      </div>
                  </div>
              )}
              {project.link && project.link !== "#" && (
                  <Button variant="link" asChild className="text-primary p-0 h-auto text-sm group-hover:underline self-start font-medium">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                          View Project <ExternalLink className="w-4 h-4 ml-1.5" />
                      </a>
                  </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
