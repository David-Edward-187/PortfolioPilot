
'use client';

import { Button } from '@/components/ui/button';
import { FaDownload } from 'react-icons/fa';
import { resumeData } from '@/data/resume';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import the PDF viewer to reduce initial bundle size.
// SSR is disabled as this component relies on browser APIs.
const PdfViewer = dynamic(() => 
    import('@/components/pdf-viewer').then(mod => mod.PdfViewer), 
    { 
        ssr: false,
        loading: () => (
            <div className="w-full max-w-4xl mx-auto space-y-4">
                <Skeleton className="h-[80vh] w-full rounded-lg" />
            </div>
        )
    }
);

export default function CVPage() {
    const component = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
        gsap.from(".cv-anim", {
            autoAlpha: 0,
            y: 40,
            filter: 'blur(10px)',
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
        });
        }, component);
        return () => ctx.revert();
    }, []);

  return (
    <div ref={component}>
      <section className="container mx-auto py-8">
        <div className="cv-anim flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Curriculum Vitae
          </h1>
          <Button asChild size="lg">
            <a href="/mycv.pdf" download={`${resumeData.name.replace(/\s/g, '_')}_CV.pdf`}>
              <FaDownload className="mr-2" />
              Download PDF
            </a>
          </Button>
        </div>
        <div className="cv-anim relative w-full flex justify-center">
            <PdfViewer fileUrl="/mycv.pdf" />
        </div>
      </section>
    </div>
  );
}
