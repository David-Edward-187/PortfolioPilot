
"use client";
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { resumeData } from '@/data/resume';
import type { ProjectEntry } from '@/types/resume';
import { Badge } from '@/components/ui/badge';

export function CaseStudyOverviewPage() {
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  if (!resumeData.projects || resumeData.projects.length === 0) {
    return (
      <section id="case-study-overview" className="bg-transparent py-4 md:py-6 h-full flex flex-col items-center justify-center">
        <p className="text-muted-foreground">No projects to display at the moment.</p>
      </section>
    );
  }

  // Function to generate a slug from project name for picsum URL
  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  return (
    <section id="case-study-overview" className="bg-transparent py-4 md:py-6 h-full flex flex-col">
      <div className="container mx-auto px-2 md:px-4 flex-grow flex flex-col">
        {/* Title can be uncommented if needed later
        <div className="flex items-center justify-center mb-6 md:mb-8 animate-fadeIn">
           <h2 className="text-h2 md:text-h1 text-primary">My Projects</h2>
        </div>
        */}
        <ScrollArea className="flex-grow pr-1 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fadeIn">
              {resumeData.projects.map((project: ProjectEntry, index: number) => (
                <div
                  key={project.name}
                  className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden group cursor-default flex flex-col animate-fadeIn"
                  style={{animationDelay: `${index * 0.05}s`}}
                  onMouseEnter={() => setHoveredProject(project.name)}
                  onMouseLeave={() => setHoveredProject(null)}
                  role="article" // Changed from button as it's not a single action anymore
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/${slugify(project.name)}/400/300`}
                      alt={project.name}
                      layout="fill"
                      objectFit="cover"
                      className={`transform transition-transform duration-500 ease-in-out ${hoveredProject === project.name ? 'scale-105' : 'scale-100'}`}
                      data-ai-hint={project.name.toLowerCase().split(' ').slice(0,2).join(' ') || 'application interface'}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-md md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 flex-grow line-clamp-3">
                      {project.description[0] || 'Detailed project description available.'}
                    </p>
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="mt-2 mb-1">
                            <h4 className="text-xs font-medium text-muted-foreground mb-1">Technologies:</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {project.technologies.slice(0, 3).map(tech => ( // Show max 3 for brevity in card
                                    <Badge key={tech} variant="secondary" className="text-[0.65rem] px-1.5 py-0.5">{tech}</Badge>
                                ))}
                                {project.technologies.length > 3 && <Badge variant="secondary" className="text-[0.65rem] px-1.5 py-0.5">...</Badge>}
                            </div>
                        </div>
                    )}
                    {project.link && project.link !== "#" && (
                        <Button variant="link" asChild className="text-primary p-0 mt-3 h-auto text-xs group-hover:underline self-start">
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                View Project <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                        </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
        </ScrollArea>
      </div>
    </section>
  );
}

