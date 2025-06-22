
"use client";

import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Work Experience</h2>
          <p className="text-lg text-muted-foreground mt-2">My professional journey.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          {resumeData.experience.map((exp, index) => (
            <Card
              key={index}
              className="bg-card border-border backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300 rounded-lg shadow-md animate-fadeIn"
              style={{animationDelay: `${0.1 * (index + 1)}s`}}
            >
              <CardHeader className="pb-3 pt-5 px-6 md:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2">
                  <CardTitle className="text-lg md:text-xl text-primary font-semibold mb-0.5 sm:mb-0">{exp.role}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">{exp.years}</p>
                </div>
                <p className="text-md text-foreground/90 font-medium pt-0.5">{exp.company}</p>
              </CardHeader>
              <CardContent className="px-6 md:px-8 pt-4 pb-6">
                <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-foreground/80 leading-relaxed">
                  {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
