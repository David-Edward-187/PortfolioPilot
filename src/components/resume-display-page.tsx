
"use client";

import * as React from 'react';
import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, BookOpen, Wrench } from 'lucide-react';

export function ResumeDisplayPage() {
  return (
    <div className="space-y-24 md:space-y-28 py-10">
      {/* Experience Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center justify-center mb-12 md:mb-16">
            <Briefcase className="section-icon" />
            <h2 className="section-title">Experience</h2>
        </div>
        <div className="space-y-10 md:space-y-12">
          {resumeData.experience.map((exp, index) => (
            <Card 
              key={index} 
              className="bg-card border-border/50 backdrop-blur-sm overflow-hidden hover:border-primary/80 hover:shadow-primary/30 transition-all duration-300 rounded-md shadow-xl"
            >
              <CardHeader className="pb-4 pt-6 px-6 md:px-8 bg-card/90 backdrop-blur-sm border-b border-border/30"> 
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-3">
                  <CardTitle className="text-xl md:text-2xl lg:text-3xl text-primary font-bold mb-1 sm:mb-0">{exp.role}</CardTitle>
                  <p className="text-sm md:text-base text-muted-foreground font-semibold">{exp.years}</p>
                </div>
                <p className="text-lg md:text-xl text-foreground/90 font-semibold pt-1">{exp.company}</p>
              </CardHeader>
              <CardContent className="px-6 md:px-8 pt-5 pb-7">
                <ul className="list-disc list-outside ml-5 space-y-3 text-base md:text-lg text-foreground/80 leading-relaxed">
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
        <div className="space-y-10 md:space-y-12">
          {resumeData.education.map((edu, index) => (
            <Card 
              key={index} 
              className="bg-card border-border/50 backdrop-blur-sm overflow-hidden hover:border-primary/80 hover:shadow-primary/30 transition-all duration-300 rounded-md shadow-xl"
            >
              <CardHeader className="pb-4 pt-6 px-6 md:px-8 bg-card/90 backdrop-blur-sm border-b border-border/30">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-3">
                  <CardTitle className="text-xl md:text-2xl lg:text-3xl text-primary font-bold mb-1 sm:mb-0">{edu.degree}</CardTitle>
                  <p className="text-sm md:text-base text-muted-foreground font-semibold">{edu.years}</p>
                </div>
                <p className="text-lg md:text-xl text-foreground/90 font-semibold pt-1">{edu.institution}</p>
              </CardHeader>
              {edu.details && (
                <CardContent className="px-6 md:px-8 pt-5 pb-7">
                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed">{edu.details}</p>
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
        <Card className="bg-card border-border/50 backdrop-blur-sm p-6 md:p-10 rounded-md shadow-xl">
          <CardContent className="space-y-10 md:space-y-12 pt-4">
            {Object.entries(resumeData.skills).map(([category, skillsList]) => (
              <div key={category}>
                <h4 className="font-bold text-xl md:text-2xl text-primary mb-6">{category}</h4>
                <div className="flex flex-wrap gap-3.5 md:gap-4">
                  {skillsList.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-secondary/90 text-secondary-foreground px-4 py-2.5 rounded-md text-sm md:text-base shadow-md hover:bg-primary hover:text-primary-foreground hover:shadow-primary/50 transition-all duration-200 cursor-default font-semibold border border-primary/40 hover:border-primary"
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
