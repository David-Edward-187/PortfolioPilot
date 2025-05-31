
"use client";

import * as React from 'react';
import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, BookOpen, Wrench } from 'lucide-react';

export function ResumeDisplayPage() {
  return (
    <div className="space-y-20 md:space-y-24 py-10"> {/* Reduced space between sections */}
      {/* Experience Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center justify-center mb-12 md:mb-16">
            <Briefcase className="section-icon" />
            <h2 className="section-title">Experience</h2>
        </div>
        <div className="space-y-8 md:space-y-10"> {/* Reduced space between cards */}
          {resumeData.experience.map((exp, index) => (
            <Card 
              key={index} 
              className="bg-card border-border backdrop-blur-sm overflow-hidden hover:border-primary/70 hover:shadow-lg transition-all duration-300 rounded-lg shadow-md"
            >
              <CardHeader className="pb-3 pt-5 px-6 md:px-8 bg-card/90 backdrop-blur-sm border-b border-border/50"> 
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2">
                  <CardTitle className="text-lg md:text-xl lg:text-2xl text-primary font-semibold mb-0.5 sm:mb-0">{exp.role}</CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">{exp.years}</p>
                </div>
                <p className="text-md md:text-lg text-foreground/90 font-medium pt-0.5">{exp.company}</p>
              </CardHeader>
              <CardContent className="px-6 md:px-8 pt-4 pb-6">
                <ul className="list-disc list-outside ml-4 space-y-2 text-sm md:text-base text-foreground/80 leading-relaxed">
                  {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
        <div className="flex items-center justify-center mb-12 md:mb-16">
            <BookOpen className="section-icon" />
            <h2 className="section-title">Education</h2>
        </div>
        <div className="space-y-8 md:space-y-10">
          {resumeData.education.map((edu, index) => (
            <Card 
              key={index} 
              className="bg-card border-border backdrop-blur-sm overflow-hidden hover:border-primary/70 hover:shadow-lg transition-all duration-300 rounded-lg shadow-md"
            >
              <CardHeader className="pb-3 pt-5 px-6 md:px-8 bg-card/90 backdrop-blur-sm border-b border-border/50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2">
                  <CardTitle className="text-lg md:text-xl lg:text-2xl text-primary font-semibold mb-0.5 sm:mb-0">{edu.degree}</CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">{edu.years}</p>
                </div>
                <p className="text-md md:text-lg text-foreground/90 font-medium pt-0.5">{edu.institution}</p>
              </CardHeader>
              {edu.details && (
                <CardContent className="px-6 md:px-8 pt-4 pb-6">
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed">{edu.details}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.3s'}}>
        <div className="flex items-center justify-center mb-12 md:mb-16">
            <Wrench className="section-icon" />
            <h2 className="section-title">Skills</h2>
        </div>
        <Card className="bg-card border-border backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-md">
          <CardContent className="space-y-8 md:space-y-10 pt-3">
            {Object.entries(resumeData.skills).map(([category, skillsList]) => (
              <div key={category}>
                <h4 className="font-semibold text-lg md:text-xl text-primary mb-4">{category}</h4>
                <div className="flex flex-wrap gap-2.5 md:gap-3">
                  {skillsList.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-secondary text-secondary-foreground px-3.5 py-2 rounded-md text-xs md:text-sm shadow-sm hover:bg-secondary/80 transition-all duration-200 cursor-default font-medium border border-border"
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
