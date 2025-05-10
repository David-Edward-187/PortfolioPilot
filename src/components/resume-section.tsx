import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Briefcase, GraduationCap, Lightbulb, ExternalLink, FileText } from 'lucide-react';
import type { ResumeData } from '@/types/resume';

interface ResumeSectionProps {
  resume: Pick<ResumeData, 'education' | 'experience' | 'skills' | 'projects'>;
}

export function ResumeSection({ resume }: ResumeSectionProps) {
  return (
    <Card className="shadow-lg" id="resume">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <FileText className="h-8 w-8 text-primary mr-3" />
            <CardTitle className="text-3xl text-primary">Resume</CardTitle>
          </div>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href="/mycv.pdf" download="resume.pdf">
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-10">
        {/* Experience Section */}
        <section>
          <div className="flex items-center mb-6">
            <Briefcase className="h-7 w-7 text-primary mr-3" />
            <h3 className="text-2xl font-semibold text-foreground">Experience</h3>
          </div>
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div key={index} className="pl-6 border-l-2 border-primary/30 relative">
                <div className="absolute -left-[11px] top-1.5 w-5 h-5 bg-background border-2 border-primary rounded-full"></div>
                <h4 className="text-lg font-medium text-primary">{exp.role}</h4>
                <p className="text-md text-muted-foreground">{exp.company} | {exp.years}</p>
                <p className="mt-1 text-foreground/80 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <div className="flex items-center mb-6">
            <GraduationCap className="h-7 w-7 text-primary mr-3" />
            <h3 className="text-2xl font-semibold text-foreground">Education</h3>
          </div>
          <div className="space-y-6">
            {resume.education.map((edu, index) => (
              <div key={index} className="pl-6 border-l-2 border-primary/30 relative">
                 <div className="absolute -left-[11px] top-1.5 w-5 h-5 bg-background border-2 border-primary rounded-full"></div>
                <h4 className="text-lg font-medium text-primary">{edu.degree}</h4>
                <p className="text-md text-muted-foreground">{edu.institution} | {edu.years}</p>
                {edu.details && <p className="mt-1 text-foreground/80 italic text-sm">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <div className="flex items-center mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-3 lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            <h3 className="text-2xl font-semibold text-foreground">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <div className="flex items-center mb-6">
            <Lightbulb className="h-7 w-7 text-primary mr-3" />
            <h3 className="text-2xl font-semibold text-foreground">Projects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resume.projects.map((project, index) => (
              <Card key={index} className="bg-card hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-3 leading-relaxed">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-3">
                      <h5 className="text-xs font-semibold text-muted-foreground mb-1">Technologies:</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map(tech => (
                           <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.link && project.link !== "#" && (
                    <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/80">
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
      </CardContent>
    </Card>
  );
}
