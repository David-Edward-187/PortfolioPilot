
"use client";

import { resumeData } from '@/data/resume';
import { Card, CardContent } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

export function SkillsSection() {
  return (
    <div className="py-20 md:py-24">
        <div className="flex items-center justify-center mb-12 md:mb-16 animate-fadeIn">
            <Wrench className="section-icon" />
            <h2 className="section-title">Skills</h2>
        </div>
        <Card className="bg-card border-border backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-md animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <CardContent className="space-y-8 md:space-y-10 pt-3">
            {Object.entries(resumeData.skills).map(([category, skillsList]) => (
              <div key={category}>
                <h4 className="font-semibold text-lg md:text-xl text-primary mb-4">{category}</h4>
                <div className="flex flex-wrap gap-2.5 md:gap-3">
                  {skillsList.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-secondary text-secondary-foreground px-3.5 py-2 rounded-md text-xs md:text-sm shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 cursor-default font-medium border border-border"
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
  );
}
