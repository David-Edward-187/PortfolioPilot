
"use client";

import * as React from 'react';
import Image from 'next/image';
import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink, CalendarDays } from 'lucide-react'; // Removed ShieldCheck

export function CertificatesDisplayPage() {
  if (!resumeData.certificates || resumeData.certificates.length === 0) {
    return (
      <div className="py-12 md:py-16 text-center">
        <Award className="section-icon text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">No certificates to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16">
      <div className="flex items-center justify-center mb-10 md:mb-14 animate-fadeIn">
        <Award className="section-icon" /> {/* Icon color uses --primary from globals.css */}
        <h2 className="section-title">Certifications</h2> {/* Title color uses --primary from globals.css */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {resumeData.certificates.map((cert, index) => (
          <Card 
            key={index} 
            className="flex flex-col bg-card border-border backdrop-blur-md rounded-xl shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-1 animate-fadeIn"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            {cert.imageUrl && (
              <div className="relative w-full h-48 md:h-52 group overflow-hidden rounded-t-xl">
                <Image
                  src={cert.imageUrl}
                  alt={`${cert.name} certificate image`}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={cert.dataAiHint || "certificate document"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            )}
            <CardHeader className="p-5 md:p-6 pb-2">
              <CardTitle className="text-lg md:text-xl text-primary group-hover:text-primary/90 transition-colors leading-tight">{cert.name}</CardTitle> {/* Cert title uses primary color */}
              <CardDescription className="text-xs text-muted-foreground pt-1.5"> {/* Adjusted text size */}
                Issued by: {cert.issuingOrganization}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 md:p-6 pt-2 flex-grow">
               <div className="flex items-center text-xs text-muted-foreground mb-3"> {/* Adjusted text size */}
                <CalendarDays className="h-3.5 w-3.5 mr-1.5 opacity-80" /> {/* Adjusted icon size */}
                {cert.issueDate}
              </div>
              {cert.description && (
                <p className="text-xs text-foreground/80 mb-4 leading-relaxed line-clamp-3">{cert.description}</p> /* Adjusted text size */
              )}
            </CardContent>
            <CardFooter className="p-5 md:p-6 pt-0">
              {cert.credentialUrl && (
                <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/80 self-start text-xs font-medium group-hover:underline"> {/* Link uses accent color, adjusted text size */}
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    View Credential <ExternalLink className="ml-1.5 h-3.5 w-3.5" /> {/* Adjusted icon size */}
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
