
"use client";

import * as React from 'react';
import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Briefcase, BookOpen, Wrench, Users, CheckSquare } from 'lucide-react';

export function ResumeDisplayPage() {
  const cvFileName = `${resumeData.name.replace(/\s+/g, '_')}_CV.pdf`;
  return (
    <section id="resume-display" className="bg-transparent py-4 md:py-6 space-y-6 md:space-y-8">
      <div className="container mx-auto px-2 md:px-4">
        {/* Download CV Button */}
        <div className="text-center mb-6 md:mb-8 animate-fadeIn">
          <Button 
            asChild 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transform transition-all duration-150 ease-in-out px-8 py-3 text-base"
          >
            <a href="/mycv.pdf" download={cvFileName}>
              <Download className="mr-2 h-5 w-5" /> Download CV
            </a>
          </Button>
        </div>

        {/* Experience Section */}
        <Card className="animate-fadeIn shadow-md bg-card/80 backdrop-blur-sm" style={{animationDelay: '0.1s'}}>
          <CardHeader>
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 mr-3 text-primary" />
              <CardTitle className="text-h3 md:text-h2 text-primary">Experience</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-2 bg-secondary/30 rounded-r-md">
                <h4 className="font-semibold text-md text-foreground">{exp.role}</h4>
                <p className="text-sm text-muted-foreground">{exp.company} | {exp.years}</p>
                <ul className="list-disc list-outside ml-5 mt-1.5 space-y-1 text-xs text-foreground/80">
                  {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="mt-6 animate-fadeIn shadow-md bg-card/80 backdrop-blur-sm" style={{animationDelay: '0.2s'}}>
          <CardHeader>
             <div className="flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-primary" />
              <CardTitle className="text-h3 md:text-h2 text-primary">Education</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-2 bg-secondary/30 rounded-r-md">
                <h4 className="font-semibold text-md text-foreground">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground">{edu.institution} | {edu.years}</p>
                {edu.details && <p className="text-xs text-foreground/80 mt-1">{edu.details}</p>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="mt-6 animate-fadeIn shadow-md bg-card/80 backdrop-blur-sm" style={{animationDelay: '0.3s'}}>
          <CardHeader>
            <div className="flex items-center">
              <Wrench className="w-6 h-6 mr-3 text-primary" />
              <CardTitle className="text-h3 md:text-h2 text-primary">Skills</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(resumeData.skills).map(([category, skillsList]) => (
              <div key={category}>
                <h4 className="font-semibold text-md text-foreground mb-1.5">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill, index) => (
                    <span key={index} className="bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md text-xs shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

