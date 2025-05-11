
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
      <div className="flex items-center mb-8">
        <Award className="h-8 w-8 text-primary mr-3" />
        <h2 className="text-3xl font-semibold text-primary">Certificates</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            {cert.imageUrl && (
              <div className="relative w-full h-48">
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
            <CardHeader>
              <CardTitle className="text-xl text-primary">{cert.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {cert.issuingOrganization}
              </CardDescription>
              <div className="flex items-center text-xs text-muted-foreground pt-1">
                <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                Issued: {cert.issueDate}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {cert.description && (
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">{cert.description}</p>
              )}
              {cert.credentialUrl && (
                <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/80">
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
