
"use client";

import * as React from 'react';
import Image from 'next/image';
import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink, CalendarDays } from 'lucide-react';

export function CertificatesDisplayPage() {
  if (!resumeData.certificates || resumeData.certificates.length === 0) {
    return (
      <div className="py-8 md:py-12 text-center">
        <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">No certificates to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="flex items-center justify-center mb-8 md:mb-12 animate-fadeIn">
        <Award className="w-10 h-10 md:w-12 md:h-12 mr-4 text-primary" />
        <h2 className="text-h2 md:text-h1 text-primary text-center">Certifications</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {resumeData.certificates.map((cert, index) => (
          <Card 
            key={index} 
            className="flex flex-col overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card rounded-xl animate-fadeIn border-border"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            {cert.imageUrl && (
              <div className="relative w-full h-48 md:h-56">
                <Image
                  src={cert.imageUrl}
                  alt={`${cert.name} certificate image`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                  data-ai-hint="certificate document"
                />
              </div>
            )}
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-lg md:text-xl text-foreground leading-tight">{cert.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-1">
                {cert.issuingOrganization}
              </CardDescription>
               <div className="flex items-center text-xs text-muted-foreground pt-1.5">
                <CalendarDays className="h-4 w-4 mr-1.5 opacity-70" />
                Issued: {cert.issueDate}
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between pt-0 pb-5 px-5">
              {cert.description && (
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">{cert.description}</p>
              )}
              {cert.credentialUrl && (
                <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/90 mt-auto self-start text-sm font-medium">
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    View Credential <ExternalLink className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
