
"use client";
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Package } from 'lucide-react';
import { resumeData } from '@/data/resume';
import type { ProjectEntry } from '@/types/resume';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function CaseStudyOverviewPage() {
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  if (!resumeData.projects || resumeData.projects.length === 0) {
    return (
      <div className="py-20 md:py-24 flex flex-col items-center justify-center text-center">
        <Package className="section-icon text-muted-foreground mb-8 mx-auto" />
        <p className="text-xl text-muted-foreground">No projects to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="py-20 md:py-24">
      <div className="flex items-center justify-center mb-14 md:mb-20 animate-fadeIn">
         <Package className="section-icon" />
         <h2 className="section-title">Projects</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {resumeData.projects.map((project: ProjectEntry, index: number) => (
          <Card
            key={project.name}
            className="bg-card border-border/50 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden group flex flex-col transition-all duration-300 hover:border-primary/90 hover:shadow-primary/50 hover:-translate-y-2.5 animate-fadeIn"
            style={{animationDelay: `${index * 0.08}s`}}
            onMouseEnter={() => setHoveredProject(project.name)}
            onMouseLeave={() => setHoveredProject(null)}
            role="article"
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
              <Image
                src={project.imageUrl || `https://placehold.co/600x338.png`}
                alt={project.name}
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover transform transition-transform duration-500 ease-in-out ${hoveredProject === project.name ? 'scale-110' : 'scale-100'}`}
                data-ai-hint={project.dataAiHint || 'application interface urban night'}
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100 group-hover:opacity-70 transition-opacity duration-300"></div>
            </div>
            <CardHeader className="p-6 md:p-7">
              <CardTitle className="text-2xl md:text-3xl font-bold text-primary group-hover:text-accent transition-colors">{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-7 pt-0 flex-grow">
              <ul className="text-base text-muted-foreground mt-1 space-y-2.5 list-disc list-outside ml-4 line-clamp-4 group-hover:text-foreground/90 transition-colors">
                 {project.description.map((desc, i) => <li key={i}>{desc}</li>)}
              </ul>
            </CardContent>
            <CardFooter className="p-6 md:p-7 pt-4 flex flex-col items-start">
              {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-6 w-full">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Built With:</h4>
                      <div className="flex flex-wrap gap-2.5">
                          {project.technologies.slice(0, 5).map(tech => ( 
                              <Badge key={tech} variant="secondary" className="text-xs px-3.5 py-2 bg-secondary/80 border-primary/30 text-secondary-foreground shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 cursor-default">
                                {tech}
                              </Badge>
                          ))}
                          {project.technologies.length > 5 && <Badge variant="secondary" className="text-xs px-3.5 py-2 shadow-lg border-primary/30">...</Badge>}
                      </div>
                  </div>
              )}
              {project.link && project.link !== "#" && (
                  <Button variant="link" asChild className="text-accent p-0 h-auto text-base group-hover:underline self-start font-semibold hover:text-primary transition-colors duration-300">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <>
                              View Project <ExternalLink className="w-4 h-4 ml-2" />
                          </>
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
