
"use client";

import Image from 'next/image';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'; // Removed DialogClose, DialogTrigger
import { Button } from '@/components/ui/button';
import { X, Layers } from 'lucide-react'; // Changed XIcon to X

const timelineStages = [
  { name: "Research", image: "https://placehold.co/800x600.png", dataAiHint: "research notes" },
  { name: "Wireframes", image: "https://placehold.co/800x600.png", dataAiHint: "wireframe sketch" },
  { name: "Testing", image: "https://placehold.co/800x600.png", dataAiHint: "usability testing" },
  { name: "Launch", image: "https://placehold.co/800x600.png", dataAiHint: "product launch" },
];

export function DeepDiveCaseStudyPage() {
  const [openLightbox, setOpenLightbox] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState<{src: string; alt: string; hint: string} | null>(null);

  const handleStageClick = (stage: typeof timelineStages[0]) => {
    setCurrentImage({src: stage.image, alt: `${stage.name} Screenshot`, hint: stage.dataAiHint});
    setOpenLightbox(true);
  };

  return (
    <div className="py-12 md:py-16">
      <div className="flex items-center justify-center mb-10 md:mb-14 animate-fadeIn">
        <Layers className="section-icon" />
        <h2 className="section-title">Deep Dive: Project X</h2>
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
                src="https://placehold.co/600x400.png"
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
                src="https://placehold.co/600x400.png"
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
               <Dialog key={stage.name} open={openLightbox && currentImage?.alt.startsWith(stage.name)} onOpenChange={(isOpen) => {
                if (!isOpen) {
                  setOpenLightbox(false);
                  setCurrentImage(null);
                }
              }}>
                {/* Use a simple button to trigger the dialog for each stage */}
                <Button
                  variant="outline"
                  className="flex-1 py-3 text-base hover:bg-primary/10 hover:text-primary hover:border-primary focus:bg-primary/10 focus:text-primary focus:border-primary w-full sm:w-auto shadow-sm hover:shadow-md"
                  onClick={() => handleStageClick(stage)}
                  aria-label={`View details for ${stage.name} stage`}
                  style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                >
                  {stage.name}
                </Button>
                <DialogContent className="max-w-3xl p-0 bg-card border-border shadow-xl rounded-xl">
                  <DialogHeader className="p-4 border-b border-border flex flex-row justify-between items-center">
                    <DialogTitle className="text-lg font-medium text-primary">{currentImage?.alt || "Screenshot"}</DialogTitle>
                    {/* The close button is now part of DialogContent by default */}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
