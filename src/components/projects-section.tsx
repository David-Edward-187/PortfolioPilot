
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, ExternalLink } from 'lucide-react';
import type { ProjectEntry } from '@/types/resume';

interface ProjectsSectionProps {
  projects?: ProjectEntry[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="scroll-mt-16 py-12 bg-secondary/50 dark:bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-12">
          <Lightbulb className="h-12 w-12 text-primary mr-5" />
          <h2 className="text-h2 text-primary font-bold">My Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <Card key={index} className="bg-card hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col rounded-xl overflow-hidden group border-2 border-primary/10 hover:border-primary/30">
              <CardHeader className="pb-4 pt-6 px-6">
                <CardTitle asChild>
                  <h3 className="text-h3 text-primary group-hover:text-accent transition-colors">{project.name}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col px-6 pb-6">
                <ul className="space-y-2.5 list-disc list-outside ml-5 text-foreground/80 mb-6 leading-relaxed flex-grow text-sm">
                  {project.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-6">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-2.5 tracking-wider uppercase">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2.5">
                      {project.technologies.map(tech => (
                         <Badge key={tech} variant="secondary" className="text-xs px-3 py-1 rounded-md shadow-sm border border-transparent group-hover:border-accent/50 group-hover:text-accent transition-colors">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {project.link && project.link !== "#" && (
                  <Button variant="outline" asChild className="p-0 h-auto text-accent hover:text-accent-foreground hover:bg-accent/10 border-accent/50 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 mt-auto self-start font-medium py-2 px-4 rounded-md text-sm">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
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
