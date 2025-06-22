
"use client";

import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export function ExperienceSection() {
  return (
    <div className="py-20 md:py-24">
      <div className="flex items-center justify-center mb-12 md:mb-16 animate-fadeIn">
        <Briefcase className="section-icon" />
        <h2 className="section-title">Experience</h2>
      </div>
      <div className="space-y-8 md:space-y-10">
        {resumeData.experience.map((exp, index) => (
          <Card 
            key={index} 
            className="bg-card border-border backdrop-blur-sm overflow-hidden hover:border-primary/70 hover:shadow-lg transition-all duration-300 rounded-lg shadow-md animate-fadeIn"
            style={{animationDelay: `${index * 0.1}s`}}
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
  );
}
