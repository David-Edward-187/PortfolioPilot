"use client";
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const projects = [
  { id: "project1", name: "E-commerce Revamp", thumbnail: "https://picsum.photos/seed/ecomrev/400/300", dataAiHint: "e-commerce platform", description: "Led the redesign of a major e-commerce platform, improving user experience and conversion rates by 20%." },
  { id: "project2", name: "SaaS Dashboard UX", thumbnail: "https://picsum.photos/seed/saasdash/400/300", dataAiHint: "dashboard interface", description: "Designed and developed a new UX for a SaaS dashboard, resulting in a 30% increase in user engagement." },
  { id: "project3", name: "InnovApp Mobile", thumbnail: "https://picsum.photos/seed/mobileapp/400/300", dataAiHint: "mobile application", description: "Created a cross-platform mobile app from concept to launch, achieving 50,000+ downloads in the first three months." },
  { id: "project4", name: "Data Analytics Platform", thumbnail: "https://picsum.photos/seed/dataanalytics/400/300", dataAiHint: "data analytics", description: "Built a scalable data analytics platform for a fintech company, enabling real-time data processing and visualization." },
];

export function CaseStudyOverviewPage() {
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  const handleDeepDiveClick = (projectName: string) => {
    // This function would ideally trigger an action in DesktopView
    // e.g., open the 'deepDive' app. For now, it's a placeholder.
    console.log(`Deep Dive clicked for ${projectName} - integrate with DesktopView to open Deep Dive Case Study`);
    // Example of dispatching an event that DesktopView could listen to
    const event = new CustomEvent('openApp', { detail: { appId: 'deepDive', context: { project: projectName } } });
    window.dispatchEvent(event);
  };

  return (
    <section id="case-study-overview" className="bg-transparent py-4 md:py-6 h-full flex flex-col">
      <div className="container mx-auto px-2 md:px-4 flex-grow flex flex-col">
        <div className="flex items-center justify-center mb-6 md:mb-8 animate-fadeIn">
           {/* Removed title as per simplification, or re-add if needed */}
        </div>
        <ScrollArea className="flex-grow pr-1 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fadeIn">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden group cursor-pointer transform transition-all duration-300 hover:shadow-lg flex flex-col animate-fadeIn"
                  style={{animationDelay: `${index * 0.05}s`}}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => handleDeepDiveClick(project.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleDeepDiveClick(project.name)}
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden"> {/* Adjusted aspect ratio for better image display */}
                    <Image
                      src={project.thumbnail}
                      alt={project.name}
                      layout="fill"
                      objectFit="cover"
                      className={`transform transition-transform duration-500 ease-in-out ${hoveredProject === project.id ? 'scale-105' : 'scale-100'}`}
                      data-ai-hint={project.dataAiHint}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-md md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 flex-grow">{project.description}</p>
                    <Button variant="link" className="text-primary p-0 mt-3 h-auto text-xs group-hover:underline self-start">
                      View Details <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
        </ScrollArea>
      </div>
    </section>
  );
}
