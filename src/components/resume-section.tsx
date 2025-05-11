

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Briefcase, GraduationCap, Sparkles, FileText } from 'lucide-react';
import type { ResumeData } from '@/types/resume';
import { resumeData as appResumeData } from '@/data/resume'; // Renamed import to avoid conflict

interface ResumeSectionProps {
  resume: Pick<ResumeData, 'education' | 'experience' | 'skills'>;
}

export function ResumeSection({ resume }: ResumeSectionProps) {
  return (
    <Card className="scroll-mt-16 hover:shadow-xl transition-shadow duration-300 ease-in-out" id="resume"> {/* Added card-like class */}
      <CardHeader className="pt-8"> {/* Added pt-8 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <FileText className="h-10 w-10 text-primary mr-4" /> {/* Increased icon size & margin */}
            <CardTitle asChild>
              <h2 className="text-h2 text-primary">My Resume</h2>
            </CardTitle>
          </div>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-md hover:shadow-lg">
            <a href="/mycv.pdf" download={`${appResumeData.name.replace(/\s+/g, '_')}_Resume.pdf`}> 
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-12"> {/* Increased space-y */}
        {/* Experience Section */}
        <section>
          <div className="flex items-center mb-8"> {/* Increased mb */}
            <Briefcase className="h-8 w-8 text-primary mr-3" /> {/* Increased icon size */}
            <h3 className="text-h3 text-foreground">Experience</h3>
          </div>
          <div className="space-y-10"> {/* Increased space-y */}
            {resume.experience.map((exp, index) => (
              <div key={index} className="pl-8 border-l-4 border-primary/40 relative pb-4 last:pb-0"> {/* Increased pl, thicker border */}
                <div className="absolute -left-[10.5px] top-1 w-5 h-5 bg-background border-4 border-primary rounded-full ring-4 ring-background"></div> {/* Improved timeline dot */}
                <h4 className="text-h4 font-medium text-primary mb-1">{exp.role}</h4>
                <p className="text-md text-muted-foreground mb-1">{exp.company} | {exp.years}</p>
                <ul className="mt-3 space-y-1.5 list-disc list-outside ml-5 text-foreground/80 leading-relaxed">
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
          <div className="flex items-center mb-8"> {/* Increased mb */}
            <GraduationCap className="h-8 w-8 text-primary mr-3" /> {/* Increased icon size */}
            <h3 className="text-h3 text-foreground">Education</h3>
          </div>
          <div className="space-y-8"> {/* Increased space-y */}
            {resume.education.map((edu, index) => (
              <div key={index} className="pl-8 border-l-4 border-primary/40 relative pb-4 last:pb-0">
                 <div className="absolute -left-[10.5px] top-1 w-5 h-5 bg-background border-4 border-primary rounded-full ring-4 ring-background"></div>
                <h4 className="text-h4 font-medium text-primary mb-1">{edu.degree}</h4>
                <p className="text-md text-muted-foreground mb-1">{edu.institution} | {edu.years}</p>
                {edu.details && <p className="mt-2 text-foreground/80 italic text-sm">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <div className="flex items-center mb-8"> {/* Increased mb */}
             <Sparkles className="h-8 w-8 text-primary mr-3" /> {/* Increased icon size */}
            <h3 className="text-h3 text-foreground">Skills</h3>
          </div>
          <div className="space-y-6"> {/* Increased space-y */}
            {Object.entries(resume.skills).map(([category, skillList]) => (
              <div key={category}>
                <h4 className="text-md font-semibold text-primary mb-3">{category}</h4> {/* Increased mb */}
                <div className="flex flex-wrap gap-2.5"> {/* Increased gap */}
                  {skillList.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-3.5 py-1.5 rounded-md shadow-sm"> {/* Larger padding, rounded-md */}
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
```