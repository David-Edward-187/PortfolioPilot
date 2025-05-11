
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
    <section id="projects" className="scroll-mt-20 py-16 bg-secondary/20 dark:bg-secondary/10 rounded-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-12 text-center flex-col">
          <Lightbulb className="h-14 w-14 text-primary mb-4" />
          <h2 className="text-h2 text-primary font-bold">My Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="bg-card shadow-lg hover:shadow-2xl transform hover:-translate-y-1.5 transition-all duration-300 ease-in-out flex flex-col rounded-xl overflow-hidden group border-border/70 hover:border-primary/50"
            >
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
                    <h5 className="text-sm font-semibold text-muted-foreground mb-3 tracking-wide">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2.5">
                      {project.technologies.map(tech => (
                         <Badge key={tech} variant="outline" className="text-xs px-3 py-1.5 rounded-md shadow-sm border-accent/50 text-accent/90 group-hover:bg-accent/10 group-hover:text-accent transition-colors">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {project.link && project.link !== "#" && (
                  <Button 
                    variant="default" 
                    asChild 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 mt-auto self-start font-medium py-2.5 px-5 rounded-lg text-sm shadow-md hover:shadow-lg"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      View Project <ExternalLink className="ml-2 h-4.5 w-4.5" />
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
