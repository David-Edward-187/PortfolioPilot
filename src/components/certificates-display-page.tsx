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
      <section id="certificates-display" className="bg-transparent py-4 md:py-6">
        <div className="container mx-auto px-2 md:px-4 text-center">
          <Award className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No certificates to display at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="certificates-display" className="bg-transparent py-4 md:py-6">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center mb-6 md:mb-8 animate-fadeIn">
          <Award className="w-8 h-8 md:w-10 md:h-10 mr-3 text-primary" />
          <h2 className="text-h2 md:text-h1 text-primary">Certificates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {resumeData.certificates.map((cert, index) => (
            <Card 
              key={index} 
              className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm animate-fadeIn"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {cert.imageUrl && (
                <div className="relative w-full h-40 md:h-48">
                  <Image
                    src={cert.imageUrl}
                    alt={`${cert.name} certificate image`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                    data-ai-hint="certificate document"
                  />
                </div>
              )}
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl text-foreground leading-tight">{cert.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground pt-1">
                  {cert.issuingOrganization}
                </CardDescription>
                 <div className="flex items-center text-xs text-muted-foreground pt-1">
                  <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                  Issued: {cert.issueDate}
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between pt-0">
                {cert.description && (
                  <p className="text-xs text-foreground/80 mb-3 leading-relaxed">{cert.description}</p>
                )}
                {cert.credentialUrl && (
                  <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/80 mt-auto self-start text-xs">
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      View Credential <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
