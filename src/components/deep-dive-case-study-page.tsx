
"use client";

import Image from 'next/image';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'; // Removed DialogTrigger
import { Button } from '@/components/ui/button';
import { XIcon, Layers } from 'lucide-react'; // Added Layers icon

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

  // This component is a placeholder and might not be used if Projects are shown in CaseStudyOverviewPage
  // It's kept here for potential future use or if a single project deep-dive is desired.
  // For now, it's not directly linked from the main navigation.

  return (
    <div className="py-8 md:py-12">
      <div className="flex items-center justify-center mb-8 md:mb-12 animate-fadeIn">
        <Layers className="w-10 h-10 md:w-12 md:h-12 mr-4 text-primary" />
        <h2 className="text-h2 md:text-h1 text-primary text-center">Deep Dive: Project X</h2>
      </div>
      <p className="text-base md:text-lg text-center text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-12">
        Exploring the challenges, process, and solutions for Project X. This is a sample deep-dive page.
      </p>

      <div className="space-y-10 md:space-y-12">
        {/* Before/After Showcase */}
        <div className="bg-card/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl border-border animate-fadeIn" style={{animationDelay: '0.1s'}}>
          <h3 className="text-h3 md:text-h2 text-foreground mb-6 text-center">Transformation Showcase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            <div>
              <h4 className="text-lg font-semibold text-primary mb-3 text-center md:text-left">Before</h4>
              <Image
                src="https://picsum.photos/seed/beforeimg/600/400"
                alt="Before Project X"
                width={600}
                height={400}
                className="rounded-lg shadow-md object-cover w-full"
                data-ai-hint="old interface design"
              />
              <p className="text-sm text-muted-foreground mt-3 text-center md:text-left">Initial state highlighting pain points.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary mb-3 text-center md:text-left">After</h4>
              <Image
                src="https://picsum.photos/seed/afterimg/600/400"
                alt="After Project X"
                width={600}
                height={400}
                className="rounded-lg shadow-md object-cover w-full"
                data-ai-hint="new interface design"
              />
              <p className="text-sm text-muted-foreground mt-3 text-center md:text-left">Redesigned interface with improvements.</p>
            </div>
          </div>
           <p className="text-center mt-8 text-sm text-muted-foreground italic">
            (Placeholder for an interactive "Before/After" slider component)
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="bg-card/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl border-border animate-fadeIn" style={{animationDelay: '0.2s'}}>
          <h3 className="text-h3 md:text-h2 text-foreground mb-8 text-center">Project Timeline & Milestones</h3>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {timelineStages.map((stage, index) => (
              <Button 
                key={stage.name}
                variant="outline" 
                className="flex-1 py-3 text-base hover:bg-primary/10 hover:text-primary hover:border-primary focus:bg-primary/10 focus:text-primary focus:border-primary w-full sm:w-auto shadow-sm hover:shadow-md"
                onClick={() => handleStageClick(stage)}
                aria-label={`View details for ${stage.name} stage`}
                style={{animationDelay: `${0.2 + index * 0.05}s`}}
              >
                {stage.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

        {/* Lightbox Dialog */}
        <Dialog open={openLightbox} onOpenChange={setOpenLightbox}>
          <DialogContent className="max-w-3xl p-0 bg-card border-border shadow-xl rounded-xl">
            <DialogHeader className="p-4 border-b border-border flex flex-row justify-between items-center">
              <DialogTitle className="text-lg font-medium text-primary">{currentImage?.alt || "Screenshot"}</DialogTitle>
               <DialogClose asChild>
                 <Button variant="ghost" size="icon" className="rounded-full">
                    <XIcon className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                 </Button>
              </DialogClose>
            </DialogHeader>
            <div className="p-2 bg-black/5 max-h-[80vh] overflow-auto">
              {currentImage && (
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={1200} 
                  height={900} 
                  className="rounded-lg object-contain w-full h-auto"
                  data-ai-hint={currentImage.hint}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
    </div>
  );
}
