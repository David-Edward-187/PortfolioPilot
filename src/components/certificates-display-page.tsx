
"use client";

import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Skills</h2>
          <p className="text-lg text-muted-foreground mt-2">My technical toolbox.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {Object.entries(resumeData.skills).map(([category, skillsList], index) => (
            <div key={category} className="animate-fadeIn" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
              <h3 className="text-xl font-semibold text-foreground mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2.5 md:gap-3">
                {skillsList.map((skill) => (
                  <span
                    key={skill}
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium shadow-sm border border-transparent hover:border-primary transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
