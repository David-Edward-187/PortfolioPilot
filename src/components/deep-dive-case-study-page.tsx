
"use client";

import Image from 'next/image';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
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
    <section id="deep-dive-case-study" className="min-h-screen bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-h1 text-center text-foreground mb-10">Deep Dive: Project X</h2>
        <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-16">
          Exploring the challenges, process, and solutions involved in delivering a successful outcome for Project X.
        </p>

        {/* Before/After Slider Placeholder */}
        <div className="mb-16 bg-card p-6 md:p-10 rounded-xl shadow-xl">
          <h3 className="text-h2 text-foreground mb-6 text-center">Transformation Showcase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <h4 className="text-h3 text-primary mb-3 text-center md:text-left">Before</h4>
              <Image
                src="https://picsum.photos/seed/beforeimg/600/400"
                alt="Before Project X"
                width={600}
                height={400}
                className="rounded-lg shadow-md object-cover w-full"
                data-ai-hint="old interface design"
              />
              <p className="text-sm text-muted-foreground mt-3 text-center md:text-left">Initial state of the application interface highlighting key pain points.</p>
            </div>
            <div>
              <h4 className="text-h3 text-primary mb-3 text-center md:text-left">After</h4>
              <Image
                src="https://picsum.photos/seed/afterimg/600/400"
                alt="After Project X"
                width={600}
                height={400}
                className="rounded-lg shadow-md object-cover w-full"
                data-ai-hint="new interface design"
              />
              <p className="text-sm text-muted-foreground mt-3 text-center md:text-left">Redesigned interface showcasing improvements in usability and aesthetics.</p>
            </div>
          </div>
           <p className="text-center mt-8 text-muted-foreground italic">
            (Interactive "Before/After" slider component with draggable handle and annotated hotspots would be here.)
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="bg-card p-6 md:p-10 rounded-xl shadow-xl">
          <h3 className="text-h2 text-foreground mb-8 text-center">Project Timeline & Milestones</h3>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6">
            {timelineStages.map((stage) => (
              <Dialog key={stage.name} onOpenChange={open => !open && setCurrentImage(null)}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex-1 py-4 text-lg hover:bg-primary/10 hover:text-primary hover:border-primary focus:bg-primary/10 focus:text-primary focus:border-primary w-full md:w-auto"
                    onClick={() => handleStageClick(stage)}
                    aria-label={`View details for ${stage.name} stage`}
                  >
                    {stage.name}
                  </Button>
                </DialogTrigger>
                {/* Lightbox Content is outside the loop, controlled by state */}
              </Dialog>
            ))}
          </div>
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={openLightbox} onOpenChange={setOpenLightbox}>
          <DialogContent className="max-w-3xl p-0 bg-card border-none">
            <DialogHeader className="p-4 border-b">
              <DialogTitle className="text-h3 text-primary">{currentImage?.alt || "Screenshot"}</DialogTitle>
               <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <XIcon className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="p-1"> {/* Reduced padding around image container */}
              {currentImage && (
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={800}
                  height={600}
                  className="rounded-b-md object-contain max-h-[80vh] w-full"
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
