
"use client";

import * as React from 'react';
import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, BookOpen, Wrench } from 'lucide-react';

export function ResumeDisplayPage() {
  return (
    <div className="space-y-8 md:space-y-10 py-8">
      {/* Experience Section */}
      <Card className="animate-fadeIn shadow-lg bg-card/90 backdrop-blur-sm border-border" style={{animationDelay: '0.1s'}}>
        <CardHeader>
          <div className="flex items-center">
            <Briefcase className="w-7 h-7 mr-3 text-primary" />
            <CardTitle className="text-h2 md:text-h1 text-primary">Experience</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="border-l-4 border-primary/70 pl-4 py-3 bg-secondary/50 rounded-r-lg shadow-sm">
              <h4 className="font-semibold text-lg text-foreground">{exp.role}</h4>
              <p className="text-sm text-muted-foreground">{exp.company} | {exp.years}</p>
              <ul className="list-disc list-outside ml-5 mt-2 space-y-1.5 text-sm text-foreground/80">
                {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="animate-fadeIn shadow-lg bg-card/90 backdrop-blur-sm border-border" style={{animationDelay: '0.2s'}}>
        <CardHeader>
           <div className="flex items-center">
            <BookOpen className="w-7 h-7 mr-3 text-primary" />
            <CardTitle className="text-h2 md:text-h1 text-primary">Education</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="border-l-4 border-primary/70 pl-4 py-3 bg-secondary/50 rounded-r-lg shadow-sm">
              <h4 className="font-semibold text-lg text-foreground">{edu.degree}</h4>
              <p className="text-sm text-muted-foreground">{edu.institution} | {edu.years}</p>
              {edu.details && <p className="text-sm text-foreground/80 mt-1.5">{edu.details}</p>}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="animate-fadeIn shadow-lg bg-card/90 backdrop-blur-sm border-border" style={{animationDelay: '0.3s'}}>
        <CardHeader>
          <div className="flex items-center">
            <Wrench className="w-7 h-7 mr-3 text-primary" />
            <CardTitle className="text-h2 md:text-h1 text-primary">Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(resumeData.skills).map(([category, skillsList]) => (
            <div key={category}>
              <h4 className="font-semibold text-lg text-foreground mb-2">{category}</h4>
              <div className="flex flex-wrap gap-2.5">
                {skillsList.map((skill, index) => (
                  <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md text-sm shadow-sm hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
