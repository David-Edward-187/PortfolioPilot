
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
      <div className="py-16 md:py-20 text-center">
        <Award className="section-icon text-muted-foreground mb-6 mx-auto" />
        <p className="text-lg text-muted-foreground">No certificates to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-20">
      <div className="flex items-center justify-center mb-12 md:mb-16 animate-fadeIn">
        <Award className="section-icon" />
        <h2 className="section-title">Certifications</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {resumeData.certificates.map((cert, index) => (
          <Card 
            key={index} 
            className="flex flex-col bg-card border-border backdrop-blur-md rounded-xl shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-primary/30 hover:border-primary/70 hover:-translate-y-1.5 animate-fadeIn"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            {cert.imageUrl && (
              <div className="relative w-full h-52 md:h-56 group overflow-hidden rounded-t-xl">
                <Image
                  src={cert.imageUrl}
                  alt={`${cert.name} certificate image`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={cert.dataAiHint || "certificate document"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            )}
            <CardHeader className="p-6 md:p-7 pb-3">
              <CardTitle className="text-xl md:text-2xl text-primary group-hover:text-primary/90 transition-colors leading-tight">{cert.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-2">
                Issued by: {cert.issuingOrganization}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-7 pt-2 flex-grow">
               <div className="flex items-center text-sm text-muted-foreground mb-4">
                <CalendarDays className="h-4 w-4 mr-2 opacity-80" />
                {cert.issueDate}
              </div>
              {cert.description && (
                <p className="text-sm text-foreground/90 mb-4 leading-relaxed line-clamp-3">{cert.description}</p>
              )}
            </CardContent>
            <CardFooter className="p-6 md:p-7 pt-0">
              {cert.credentialUrl && (
                <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/80 self-start text-sm font-semibold group-hover:underline">
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    <>
                      View Credential <ExternalLink className="ml-1.5 h-4 w-4" />
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
