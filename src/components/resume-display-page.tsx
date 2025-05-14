
"use client";

import * as React from 'react';
import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, BookOpen, Wrench,AwardIcon } from 'lucide-react'; // Added AwardIcon

export function ResumeDisplayPage() {
  return (
    <div className="space-y-10 md:space-y-12 py-8">
      {/* Experience Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center justify-center mb-6 md:mb-8">
            <Briefcase className="section-icon" />
            <h2 className="section-title text-left ml-0 pl-0">Experience</h2>
        </div>
        <Card className="shadow-xl bg-card border-border">
          <CardContent className="space-y-6 pt-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-primary/80 pl-5 py-4 bg-secondary/30 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h4 className="font-semibold text-lg md:text-xl text-foreground">{exp.role}</h4>
                <p className="text-sm text-muted-foreground">{exp.company} | {exp.years}</p>
                <ul className="list-disc list-outside ml-5 mt-2.5 space-y-1.5 text-sm md:text-base text-foreground/80">
                  {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Education Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
        <div className="flex items-center justify-center mb-6 md:mb-8">
            <BookOpen className="section-icon" />
            <h2 className="section-title text-left ml-0 pl-0">Education</h2>
        </div>
        <Card className="shadow-xl bg-card border-border">
          <CardContent className="space-y-6 pt-6">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-primary/80 pl-5 py-4 bg-secondary/30 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h4 className="font-semibold text-lg md:text-xl text-foreground">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground">{edu.institution} | {edu.years}</p>
                {edu.details && <p className="text-sm md:text-base text-foreground/80 mt-1.5">{edu.details}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Skills Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.3s'}}>
        <div className="flex items-center justify-center mb-6 md:mb-8">
            <Wrench className="section-icon" />
            <h2 className="section-title text-left ml-0 pl-0">Skills</h2>
        </div>
        <Card className="shadow-xl bg-card border-border">
          <CardContent className="space-y-6 pt-6">
            {Object.entries(resumeData.skills).map(([category, skillsList]) => (
              <div key={category}>
                <h4 className="font-semibold text-lg md:text-xl text-foreground mb-3">{category}</h4>
                <div className="flex flex-wrap gap-2.5">
                  {skillsList.map((skill, index) => (
                    <span key={index} className="bg-secondary text-secondary-foreground px-3.5 py-2 rounded-lg text-sm shadow-sm hover:bg-primary/20 hover:text-primary transition-colors cursor-default font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
