

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Briefcase, GraduationCap, Sparkles, FileText } from 'lucide-react';
import type { ResumeData } from '@/types/resume';
import { resumeData as appResumeData } from '@/data/resume'; 

interface ResumeSectionProps {
  resume: Pick<ResumeData, 'education' | 'experience' | 'skills'>;
}

export function ResumeSection({ resume }: ResumeSectionProps) {
  return (
    <Card 
      className="scroll-mt-20 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out" 
      id="resume"
    >
      <CardHeader className="pt-10 pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <FileText className="h-10 w-10 text-primary mr-4" />
            <CardTitle asChild>
              <h2 className="text-h2 text-primary">My Resume</h2>
            </CardTitle>
          </div>
          <Button 
            asChild 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-md hover:shadow-lg transition-all"
          >
            <a href="/mycv.pdf" download={`${appResumeData.name.replace(/\s+/g, '_')}_Resume.pdf`}> 
              <Download className="mr-2.5 h-5 w-5" />
              Download CV
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-16 pb-10"> {/* Increased space-y and pb */}
        {/* Experience Section */}
        <section>
          <div className="flex items-center mb-10">
            <Briefcase className="h-9 w-9 text-primary mr-4" />
            <h3 className="text-h3 text-foreground font-semibold">Experience</h3>
          </div>
          <div className="space-y-10">
            {resume.experience.map((exp, index) => (
              <div key={index} className="pl-10 border-l-4 border-primary/50 relative pb-6 last:pb-0">
                <div className="absolute -left-[11.5px] top-0.5 w-5 h-5 bg-background border-[3px] border-primary rounded-full ring-4 ring-background"></div>
                <h4 className="text-h4 font-medium text-primary mb-1.5">{exp.role}</h4>
                <p className="text-md text-muted-foreground mb-2">{exp.company} | {exp.years}</p>
                <ul className="mt-3.5 space-y-2 list-disc list-outside ml-5 text-foreground/80 leading-relaxed">
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
          <div className="flex items-center mb-10">
            <GraduationCap className="h-9 w-9 text-primary mr-4" />
            <h3 className="text-h3 text-foreground font-semibold">Education</h3>
          </div>
          <div className="space-y-8">
            {resume.education.map((edu, index) => (
              <div key={index} className="pl-10 border-l-4 border-primary/50 relative pb-6 last:pb-0">
                 <div className="absolute -left-[11.5px] top-0.5 w-5 h-5 bg-background border-[3px] border-primary rounded-full ring-4 ring-background"></div>
                <h4 className="text-h4 font-medium text-primary mb-1.5">{edu.degree}</h4>
                <p className="text-md text-muted-foreground mb-1.5">{edu.institution} | {edu.years}</p>
                {edu.details && <p className="mt-2.5 text-foreground/70 italic text-sm">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <div className="flex items-center mb-10">
             <Sparkles className="h-9 w-9 text-primary mr-4" />
            <h3 className="text-h3 text-foreground font-semibold">Skills</h3>
          </div>
          <div className="space-y-8">
            {Object.entries(resume.skills).map(([category, skillList]) => (
              <div key={category}>
                <h4 className="text-lg font-semibold text-primary mb-4">{category}</h4>
                <div className="flex flex-wrap gap-3">
                  {skillList.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-colors px-4 py-2 rounded-md shadow-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
