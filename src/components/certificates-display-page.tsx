
"use client";

import * as React from 'react';
import Image from 'next/image';
import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink, CalendarDays } from 'lucide-react';

export function CertificatesDisplayPage() {
  if (!resumeData.certificates || resumeData.certificates.length === 0) {
    return (
      <div className="py-20 md:py-24 text-center">
        <Award className="section-icon text-muted-foreground mb-8 mx-auto" />
        <p className="text-xl text-muted-foreground">No certificates to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="py-20 md:py-24">
      <div className="flex items-center justify-center mb-14 md:mb-20 animate-fadeIn">
        <Award className="section-icon" />
        <h2 className="section-title">Certifications</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {resumeData.certificates.map((cert, index) => (
          <Card 
            key={index} 
            className="flex flex-col bg-card border-border group transition-all duration-300 hover:border-primary/80 hover:shadow-xl hover:-translate-y-1 animate-fadeIn rounded-lg" // Standard rounded-lg
            style={{animationDelay: `${index * 0.1}s`}}
          >
            {cert.imageUrl && (
              <div className="relative w-full h-52 md:h-56 group overflow-hidden rounded-t-lg"> {/* Match card radius */}
                <Image
                  src={cert.imageUrl}
                  alt={`${cert.name} certificate image`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={cert.dataAiHint || "certificate tech professional abstract"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
            )}
            <CardHeader className="p-6 md:p-7 pb-2.5">
              <CardTitle className="text-lg md:text-xl text-primary group-hover:text-accent transition-colors leading-tight font-semibold">{cert.name}</CardTitle> {/* Slightly smaller title */}
              <CardDescription className="text-sm text-muted-foreground pt-1.5 group-hover:text-foreground/80 transition-colors">
                Issued by: {cert.issuingOrganization}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-7 pt-2 flex-grow">
               <div className="flex items-center text-xs text-muted-foreground mb-3 group-hover:text-foreground/70 transition-colors">
                <CalendarDays className="h-3.5 w-3.5 mr-2 opacity-80" />
                {cert.issueDate}
              </div>
              {cert.description && (
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed line-clamp-3 group-hover:text-foreground/90 transition-colors">{cert.description}</p>
              )}
            </CardContent>
            <CardFooter className="p-6 md:p-7 pt-0">
              {cert.credentialUrl && (
                <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-primary transition-colors self-start text-sm font-medium group-hover:underline duration-300">
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    <>
                      View Credential <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </>
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
