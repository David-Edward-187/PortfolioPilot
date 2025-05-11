
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink, CalendarDays } from 'lucide-react';
import type { CertificateEntry } from '@/types/resume';

interface CertificatesSectionProps {
  certificates?: CertificateEntry[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <section id="certificates" className="scroll-mt-16 py-8">
      <div className="flex items-center mb-10">
        <Award className="h-10 w-10 text-primary mr-4" />
        <h2 className="text-h2 text-primary">Certificates & Achievements</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert, index) => (
          <Card key={index} className="hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col overflow-hidden">
            {cert.imageUrl && (
              <div className="relative w-full h-52 group">
                <Image
                  src={cert.imageUrl}
                  alt={`${cert.name} certificate image`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="certificate document"
                />
              </div>
            )}
            <CardHeader className="pt-6">
              <CardTitle asChild>
                <h3 className="text-h4 text-primary">{cert.name}</h3>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-1">
                {cert.issuingOrganization}
              </CardDescription>
              <div className="flex items-center text-xs text-muted-foreground pt-1.5">
                <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                Issued: {cert.issueDate}
              </div>
            </CardHeader>
            <CardContent className="flex-grow pb-6 flex flex-col">
              {cert.description && (
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed flex-grow">{cert.description}</p>
              )}
              {cert.credentialUrl && (
                <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/90 mt-auto self-start font-medium">
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    View Credential <ExternalLink className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
