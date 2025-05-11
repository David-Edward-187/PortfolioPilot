
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
      <div className="flex items-center mb-10"> {/* Increased mb */}
        <Lightbulb className="h-10 w-10 text-primary mr-4" /> {/* Increased icon size & margin */}
        <h2 className="text-h2 text-primary">My Projects</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Increased gap */}
        {projects.map((project, index) => (
          <Card key={index} className="hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col"> {/* Added card-like class */}
            <CardHeader className="pt-6"> {/* Added pt-6 */}
              <CardTitle asChild>
                <h3 className="text-h3 text-primary">{project.name}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col pb-6"> {/* Added pb-6 */}
              <ul className="space-y-2 list-disc list-outside ml-5 text-foreground/80 mb-6 leading-relaxed flex-grow"> {/* Increased space-y, mb */}
                {project.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6"> {/* Increased mb */}
                  <h5 className="text-sm font-semibold text-muted-foreground mb-2">Technologies Used:</h5> {/* Increased mb */}
                  <div className="flex flex-wrap gap-2"> {/* Increased gap */}
                    {project.technologies.map(tech => (
                       <Badge key={tech} variant="outline" className="text-xs px-2.5 py-1 rounded-md shadow-sm">{tech}</Badge> // Rounded-md
                    ))}
                  </div>
                </div>
              )}
              {project.link && project.link !== "#" && (
                <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/90 mt-auto self-start font-medium">
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
```