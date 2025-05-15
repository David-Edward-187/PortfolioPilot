
"use client";

import * as React from 'react';
import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, BookOpen, Wrench } from 'lucide-react';

export function ResumeDisplayPage() {
  return (
    <div className="space-y-20 md:space-y-24 py-10">
      {/* Experience Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center justify-center mb-10 md:mb-12">
            <Briefcase className="section-icon" />
            <h2 className="section-title">Experience</h2>
        </div>
        <div className="space-y-10">
          {resumeData.experience.map((exp, index) => (
            <Card 
              key={index} 
              className="shadow-xl bg-card border-border backdrop-blur-md overflow-hidden hover:border-primary/60 hover:shadow-2xl transition-all duration-300 rounded-xl"
            >
              <CardHeader className="pb-4 pt-6 px-6 md:px-7 bg-card"> 
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle className="text-xl md:text-2xl text-primary font-semibold mb-1 sm:mb-0">{exp.role}</CardTitle>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">{exp.years}</p>
                </div>
                <p className="text-base md:text-lg text-foreground font-medium">{exp.company}</p>
              </CardHeader>
              <CardContent className="px-6 md:px-7 pt-2 pb-6">
                <ul className="list-disc list-outside ml-5 space-y-2.5 text-sm md:text-base text-foreground/90">
                  {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
        <div className="flex items-center justify-center mb-10 md:mb-12">
            <BookOpen className="section-icon" />
            <h2 className="section-title">Education</h2>
        </div>
        <div className="space-y-10">
          {resumeData.education.map((edu, index) => (
            <Card 
              key={index} 
              className="shadow-xl bg-card border-border backdrop-blur-md overflow-hidden hover:border-primary/60 hover:shadow-2xl transition-all duration-300 rounded-xl"
            >
              <CardHeader className="pb-4 pt-6 px-6 md:px-7 bg-card">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle className="text-xl md:text-2xl text-primary font-semibold mb-1 sm:mb-0">{edu.degree}</CardTitle>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">{edu.years}</p>
                </div>
                <p className="text-base md:text-lg text-foreground font-medium">{edu.institution}</p>
              </CardHeader>
              {edu.details && (
                <CardContent className="px-6 md:px-7 pt-2 pb-6">
                  <p className="text-sm md:text-base text-foreground/90">{edu.details}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.3s'}}>
        <div className="flex items-center justify-center mb-10 md:mb-12">
            <Wrench className="section-icon" />
            <h2 className="section-title">Skills</h2>
        </div>
        <Card className="shadow-xl bg-card border-border backdrop-blur-md p-6 md:p-8 rounded-xl">
          <CardContent className="space-y-10 pt-0">
            {Object.entries(resumeData.skills).map(([category, skillsList]) => (
              <div key={category}>
                <h4 className="font-semibold text-lg md:text-xl text-primary mb-5">{category}</h4>
                <div className="flex flex-wrap gap-3">
                  {skillsList.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-accent/20 hover:text-accent-foreground transition-colors cursor-default font-medium border border-border hover:border-accent/40"
                    >
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
