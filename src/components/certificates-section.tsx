
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
    <section id="certificates" className="scroll-mt-20 py-16">
      <div className="flex items-center mb-12 text-center flex-col">
        <Award className="h-14 w-14 text-primary mb-4" />
        <h2 className="text-h2 text-primary font-bold">Certificates & Achievements</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {certificates.map((cert, index) => (
          <Card 
            key={index} 
            className="bg-card shadow-lg hover:shadow-2xl transform hover:-translate-y-1.5 transition-all duration-300 ease-in-out flex flex-col rounded-xl overflow-hidden group border-border/70 hover:border-primary/50"
          >
            {cert.imageUrl && (
              <div className="relative w-full h-56 group overflow-hidden rounded-t-xl">
                <Image
                  src={cert.imageUrl}
                  alt={`${cert.name} certificate image`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                  data-ai-hint="certificate document"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/10 transition-opacity duration-300"></div>
              </div>
            )}
            <CardHeader className="pt-6 pb-3 px-6">
              <CardTitle asChild>
                <h3 className="text-h4 text-primary group-hover:text-accent transition-colors">{cert.name}</h3>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-1.5">
                {cert.issuingOrganization}
              </CardDescription>
              <div className="flex items-center text-xs text-muted-foreground pt-2">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground/80" />
                Issued: {cert.issueDate}
              </div>
            </CardHeader>
            <CardContent className="flex-grow pb-6 px-6 flex flex-col">
              {cert.description && (
                <p className="text-sm text-foreground/75 mb-5 leading-relaxed flex-grow">{cert.description}</p>
              )}
              {cert.credentialUrl && (
                <Button 
                  variant="link" 
                  asChild 
                  className="p-0 h-auto text-accent hover:text-accent/80 mt-auto self-start font-semibold text-sm group-hover:underline"
                >
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
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
