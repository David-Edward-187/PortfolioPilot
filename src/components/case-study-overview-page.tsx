
"use client";
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Briefcase } from 'lucide-react';
import { resumeData } from '@/data/resume';
import type { ProjectEntry } from '@/types/resume';
import { Badge } from '@/components/ui/badge';

export function CaseStudyOverviewPage() {
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  if (!resumeData.projects || resumeData.projects.length === 0) {
    return (
      <div className="py-12 md:py-16 flex flex-col items-center justify-center text-center">
        <Briefcase className="section-icon text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">No projects to display at the moment.</p>
      </div>
    );
  }

  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  return (
    <div className="py-12 md:py-16">
      <div className="flex items-center justify-center mb-10 md:mb-14 animate-fadeIn">
         <Briefcase className="section-icon" />
         <h2 className="section-title">My Projects</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 animate-fadeIn">
        {resumeData.projects.map((project: ProjectEntry, index: number) => (
          <div
            key={project.name}
            className="bg-card rounded-xl shadow-xl overflow-hidden group cursor-default flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 animate-fadeIn border-border"
            style={{animationDelay: `${index * 0.07}s`}}
            onMouseEnter={() => setHoveredProject(project.name)}
            onMouseLeave={() => setHoveredProject(null)}
            role="article"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <Image
                src={project.imageUrl || `https://placehold.co/400x300.png`}
                alt={project.name}
                layout="fill"
                objectFit="cover"
                className={`transform transition-transform duration-500 ease-in-out ${hoveredProject === project.name ? 'scale-110' : 'scale-100'}`}
                data-ai-hint={project.dataAiHint || project.name.toLowerCase().split(' ').slice(0,2).join(' ') || 'application interface'}
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
            </div>
            <div className="p-5 md:p-6 flex flex-col flex-grow">
              <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
              <p className="text-sm text-muted-foreground mt-2 flex-grow line-clamp-3">
                {project.description[0] || 'Detailed project description available.'}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-4 mb-3">
                      <h4 className="text-xs font-medium text-muted-foreground mb-2">Key Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map(tech => ( 
                              <Badge key={tech} variant="secondary" className="text-xs px-2.5 py-1 shadow-sm">{tech}</Badge>
                          ))}
                          {project.technologies.length > 4 && <Badge variant="secondary" className="text-xs px-2.5 py-1 shadow-sm">...</Badge>}
                      </div>
                  </div>
              )}
              {project.link && project.link !== "#" && (
                  <Button variant="link" asChild className="text-primary p-0 mt-auto h-auto text-sm group-hover:underline self-start font-medium">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                          View Project <ExternalLink className="w-4 h-4 ml-1.5" />
                      </a>
                  </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
