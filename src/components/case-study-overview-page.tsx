
"use client";
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Briefcase } from 'lucide-react'; // Added Briefcase icon
import { ScrollArea } from '@/components/ui/scroll-area';
import { resumeData } from '@/data/resume';
import type { ProjectEntry } from '@/types/resume';
import { Badge } from '@/components/ui/badge';

export function CaseStudyOverviewPage() {
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  if (!resumeData.projects || resumeData.projects.length === 0) {
    return (
      <div className="py-8 md:py-12 flex flex-col items-center justify-center text-center">
        <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">No projects to display at the moment.</p>
      </div>
    );
  }

  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  return (
    <div className="py-8 md:py-12">
      <div className="flex items-center justify-center mb-8 md:mb-12 animate-fadeIn">
         <Briefcase className="w-10 h-10 md:w-12 md:h-12 mr-4 text-primary" />
         <h2 className="text-h2 md:text-h1 text-primary text-center">My Projects</h2>
      </div>
      <ScrollArea className="flex-grow pr-2 custom-scrollbar" style={{ height: 'calc(100vh - 200px)' }}> {/* Adjust height as needed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fadeIn">
            {resumeData.projects.map((project: ProjectEntry, index: number) => (
              <div
                key={project.name}
                className="bg-card rounded-xl shadow-xl overflow-hidden group cursor-default flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fadeIn border-border"
                style={{animationDelay: `${index * 0.07}s`}}
                onMouseEnter={() => setHoveredProject(project.name)}
                onMouseLeave={() => setHoveredProject(null)}
                role="article"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${slugify(project.name)}/400/300`}
                    alt={project.name}
                    layout="fill"
                    objectFit="cover"
                    className={`transform transition-transform duration-500 ease-in-out ${hoveredProject === project.name ? 'scale-110' : 'scale-100'}`}
                    data-ai-hint={project.name.toLowerCase().split(' ').slice(0,2).join(' ') || 'application interface'}
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 flex-grow line-clamp-3">
                    {project.description[0] || 'Detailed project description available.'}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                      <div className="mt-3 mb-2">
                          <h4 className="text-xs font-medium text-muted-foreground mb-1.5">Key Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 4).map(tech => ( 
                                  <Badge key={tech} variant="secondary" className="text-xs px-2.5 py-1">{tech}</Badge>
                              ))}
                              {project.technologies.length > 4 && <Badge variant="secondary" className="text-xs px-2.5 py-1">...</Badge>}
                          </div>
                      </div>
                  )}
                  {project.link && project.link !== "#" && (
                      <Button variant="link" asChild className="text-primary p-0 mt-4 h-auto text-sm group-hover:underline self-start font-medium">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                              View Project <ExternalLink className="w-4 h-4 ml-1.5" />
                          </a>
                      </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
      </ScrollArea>
    </div>
  );
}
