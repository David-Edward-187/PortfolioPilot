
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
    <section id="projects" className="scroll-mt-16 py-8">
      <div className="flex items-center mb-8">
        <Lightbulb className="h-8 w-8 text-primary mr-3" />
        <h2 className="text-3xl font-semibold text-primary">Projects</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl text-primary">{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <ul className="space-y-1 list-disc list-outside ml-5 text-foreground/80 mb-4 leading-relaxed flex-grow">
                {project.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-xs font-semibold text-muted-foreground mb-1.5">Technologies:</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map(tech => (
                       <Badge key={tech} variant="outline" className="text-xs px-2 py-0.5">{tech}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {project.link && project.link !== "#" && (
                <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/80 mt-auto self-start">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project <ExternalLink className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
