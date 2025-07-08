
'use client';

import { Button } from '@/components/ui/button';
import { FaDownload } from 'react-icons/fa';
import { resumeData } from '@/data/resume';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
      <section className="container mx-auto py-12 md:py-16">
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
        <div className="cv-anim relative w-full max-w-4xl mx-auto aspect-[8.5/11] max-h-[1200px] rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-card">
          <iframe
            src="/mycv.pdf#toolbar=0&navpanes=0"
            title={`${resumeData.name}'s CV`}
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      </section>
    </div>
  );
}
