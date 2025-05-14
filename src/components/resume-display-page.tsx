
"use client";

import * as React from 'react';
import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, BookOpen, Wrench } from 'lucide-react'; // Removed Star, using Wrench for Skills

export function ResumeDisplayPage() {
  return (
    <div className="space-y-16 md:space-y-20 py-8">
      {/* Experience Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center justify-center mb-8 md:mb-10">
            <Briefcase className="section-icon" /> {/* Icon color uses --primary from globals.css */}
            <h2 className="section-title">Experience</h2> {/* Title color uses --primary from globals.css */}
        </div>
        <div className="space-y-8">
          {resumeData.experience.map((exp, index) => (
            <Card 
              key={index} 
              className="shadow-xl bg-card border-border backdrop-blur-md overflow-hidden hover:border-primary/50 transition-all duration-300" // Ensure bg-card and border-border are used
            >
              <CardHeader className="pb-3 pt-5 px-5 md:px-6 bg-secondary/20"> {/* Using secondary for subtle header background */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle className="text-lg md:text-xl text-primary font-semibold mb-1 sm:mb-0">{exp.role}</CardTitle> {/* Role uses primary color */}
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">{exp.years}</p>
                </div>
                <p className="text-sm md:text-base text-foreground font-medium">{exp.company}</p>
              </CardHeader>
              <CardContent className="px-5 md:px-6 pt-3 pb-5">
                <ul className="list-disc list-outside ml-5 space-y-2 text-sm md:text-base text-foreground/80">
                  {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
        <div className="flex items-center justify-center mb-8 md:mb-10">
            <BookOpen className="section-icon" />
            <h2 className="section-title">Education</h2>
        </div>
        <div className="space-y-8">
          {resumeData.education.map((edu, index) => (
            <Card 
              key={index} 
              className="shadow-xl bg-card border-border backdrop-blur-md overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <CardHeader className="pb-3 pt-5 px-5 md:px-6 bg-secondary/20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle className="text-lg md:text-xl text-primary font-semibold mb-1 sm:mb-0">{edu.degree}</CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">{edu.years}</p>
                </div>
                <p className="text-sm md:text-base text-foreground font-medium">{edu.institution}</p>
              </CardHeader>
              {edu.details && (
                <CardContent className="px-5 md:px-6 pt-3 pb-5">
                  <p className="text-sm md:text-base text-foreground/80">{edu.details}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="animate-fadeIn" style={{animationDelay: '0.3s'}}>
        <div className="flex items-center justify-center mb-8 md:mb-10">
            <Wrench className="section-icon" />
            <h2 className="section-title">Skills</h2>
        </div>
        <Card className="shadow-xl bg-card border-border backdrop-blur-md p-6 md:p-8">
          <CardContent className="space-y-8 pt-0">
            {Object.entries(resumeData.skills).map(([category, skillsList]) => (
              <div key={category}>
                <h4 className="font-semibold text-md md:text-lg text-primary mb-4">{category}</h4> {/* Category title uses primary color */}
                <div className="flex flex-wrap gap-3">
                  {skillsList.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md text-xs shadow-sm hover:bg-accent/20 hover:text-accent-foreground transition-colors cursor-default font-medium border border-border hover:border-accent/30" // Skill tags use secondary bg, hover with accent
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
