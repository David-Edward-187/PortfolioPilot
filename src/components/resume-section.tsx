

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Briefcase, GraduationCap, Lightbulb, ExternalLink, FileText, Sparkles } from 'lucide-react';
import type { ResumeData } from '@/types/resume';

interface ResumeSectionProps {
  resume: Pick<ResumeData, 'education' | 'experience' | 'skills' | 'projects'>;
}

export function ResumeSection({ resume }: ResumeSectionProps) {
  return (
    <Card className="shadow-lg scroll-mt-16" id="resume">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <FileText className="h-8 w-8 text-primary mr-3" />
            <CardTitle className="text-3xl text-primary">Resume</CardTitle>
          </div>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <a href="/mycv.pdf" download="AlexJohnson_Resume.pdf"> {/* Consider a more specific filename */}
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
          <div className="space-y-8">
            {resume.experience.map((exp, index) => (
              <div key={index} className="pl-6 border-l-2 border-primary/30 relative">
                <div className="absolute -left-[11px] top-1.5 w-5 h-5 bg-background border-2 border-primary rounded-full"></div>
                <h4 className="text-lg font-medium text-primary">{exp.role}</h4>
                <p className="text-md text-muted-foreground">{exp.company} | {exp.years}</p>
                <ul className="mt-2 space-y-1 list-disc list-outside ml-5 text-foreground/80 leading-relaxed">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
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
             <Sparkles className="h-7 w-7 text-primary mr-3" />
            <h3 className="text-2xl font-semibold text-foreground">Skills</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(resume.skills).map(([category, skillList]) => (
              <div key={category}>
                <h4 className="text-md font-semibold text-primary mb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-16">
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
                  <ul className="space-y-1 list-disc list-outside ml-5 text-foreground/80 mb-4 leading-relaxed">
                    {project.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
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
                    <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
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

