
"use client";

import Image from 'next/image';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

const timelineStages = [
  { name: "Research", image: "https://picsum.photos/seed/research/800/600", dataAiHint: "research notes" },
  { name: "Wireframes", image: "https://picsum.photos/seed/wireframes/800/600", dataAiHint: "wireframe sketch" },
  { name: "Testing", image: "https://picsum.photos/seed/testing/800/600", dataAiHint: "usability testing" },
  { name: "Launch", image: "https://picsum.photos/seed/launch/800/600", dataAiHint: "product launch" },
];

export function DeepDiveCaseStudyPage() {
  const [openLightbox, setOpenLightbox] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState<{src: string; alt: string; hint: string} | null>(null);

  const handleStageClick = (stage: typeof timelineStages[0]) => {
    setCurrentImage({src: stage.image, alt: `${stage.name} Screenshot`, hint: stage.dataAiHint});
    setOpenLightbox(true);
  };

  return (
    <section id="deep-dive-case-study" className="bg-transparent py-4 md:py-6">
      <div className="container mx-auto px-2 md:px-4">
        <h2 className="text-h2 md:text-h1 text-center text-foreground mb-6">Deep Dive: Project X</h2>
        <p className="text-base text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Exploring the challenges, process, and solutions for Project X.
        </p>

        {/* Before/After Showcase */}
        <div className="mb-10 bg-card/70 backdrop-blur-sm p-4 md:p-8 rounded-lg shadow-md">
          <h3 className="text-h3 md:text-h2 text-foreground mb-5 text-center">Transformation Showcase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
            <div>
              <h4 className="text-lg font-medium text-primary mb-2 text-center md:text-left">Before</h4>
              <Image
                src="https://picsum.photos/seed/beforeimg/600/400"
                alt="Before Project X"
                width={600}
                height={400}
                className="rounded-md shadow-sm object-cover w-full"
                data-ai-hint="old interface design"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center md:text-left">Initial state highlighting pain points.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-primary mb-2 text-center md:text-left">After</h4>
              <Image
                src="https://picsum.photos/seed/afterimg/600/400"
                alt="After Project X"
                width={600}
                height={400}
                className="rounded-md shadow-sm object-cover w-full"
                data-ai-hint="new interface design"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center md:text-left">Redesigned interface with improvements.</p>
            </div>
          </div>
           <p className="text-center mt-6 text-xs text-muted-foreground italic">
            (Interactive "Before/After" slider here)
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="bg-card/70 backdrop-blur-sm p-4 md:p-8 rounded-lg shadow-md">
          <h3 className="text-h3 md:text-h2 text-foreground mb-6 text-center">Project Timeline & Milestones</h3>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-3">
            {timelineStages.map((stage) => (
              <Dialog key={stage.name} onOpenChange={open => !open && setCurrentImage(null)}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex-1 py-2.5 text-sm hover:bg-primary/10 hover:text-primary hover:border-primary focus:bg-primary/10 focus:text-primary focus:border-primary w-full sm:w-auto"
                    onClick={() => handleStageClick(stage)}
                    aria-label={`View details for ${stage.name} stage`}
                  >
                    {stage.name}
                  </Button>
                </DialogTrigger>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={openLightbox} onOpenChange={setOpenLightbox}>
          <DialogContent className="max-w-2xl p-0 bg-card border-border shadow-xl rounded-lg">
            <DialogHeader className="p-3 border-b border-border flex flex-row justify-between items-center">
              <DialogTitle className="text-base font-medium text-primary">{currentImage?.alt || "Screenshot"}</DialogTitle>
               <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="p-1 bg-black/10"> {/* Reduced padding around image container */}
              {currentImage && (
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={800}
                  height={600}
                  className="rounded-b-md object-contain max-h-[75vh] w-full"
                  data-ai-hint={currentImage.hint}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
