
"use client";
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const projects = [
  { id: "project1", name: "E-commerce Revolution", thumbnail: "https://picsum.photos/seed/ecomrev/400/300", dataAiHint: "e-commerce platform" },
  { id: "project2", name: "SaaS Dashboard UI/UX", thumbnail: "https://picsum.photos/seed/saasdash/400/300", dataAiHint: "dashboard interface" },
  { id: "project3", name: "Mobile App Innovation", thumbnail: "https://picsum.photos/seed/mobileapp/400/300", dataAiHint: "mobile application" },
];

export function CaseStudyOverviewPage() {
  const [activeSection, setActiveSection] = React.useState("Projects");
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const currentProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(isNaN(currentProgress) ? 0 : Math.min(100, Math.max(0, currentProgress)));
    }
  };

  React.useEffect(() => {
    const currentRef = contentRef.current;
    currentRef?.addEventListener('scroll', handleScroll);
    return () => currentRef?.removeEventListener('scroll', handleScroll);
  }, []);


  const navItems = ["Projects", "Process", "Results"];

  return (
    <section id="case-study-overview" className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-h1 text-center text-foreground mb-16">Case Studies</h2>
        <div className="md:grid md:grid-cols-12 md:gap-10">
          {/* Left Sidebar Nav */}
          <aside className="md:col-span-3 mb-10 md:mb-0 md:sticky md:top-24 self-start">
            <nav className="space-y-3">
              {navItems.map((item) => (
                <Button
                  key={item}
                  variant={activeSection === item ? "default" : "ghost"}
                  className={`w-full justify-start text-lg py-3 px-4 ${activeSection === item ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                  onClick={() => setActiveSection(item)}
                >
                  {item}
                </Button>
              ))}
            </nav>
          </aside>

          {/* Right Content Area with Sticky Progress Indicator */}
          <main className="md:col-span-9 relative">
             {/* Sticky Progress Indicator - simple version */}
            <div className="sticky top-20 z-10 mb-4 h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-150 ease-linear" 
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div ref={contentRef} className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar"> {/* Added custom-scrollbar for styling if needed */}
              {activeSection === "Projects" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-card rounded-xl shadow-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:shadow-2xl"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => document.getElementById('deep-dive-case-study')?.scrollIntoView({ behavior: 'smooth' })}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && document.getElementById('deep-dive-case-study')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        <Image
                          src={project.thumbnail}
                          alt={project.name}
                          layout="fill"
                          objectFit="cover"
                          className={`transform transition-transform duration-500 ease-in-out ${hoveredProject === project.id ? 'scale-110' : 'scale-100'}`}
                          data-ai-hint={project.dataAiHint}
                        />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-h3 text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mt-2">Brief description of the project outcomes and challenges.</p>
                        <Button variant="link" className="text-primary p-0 mt-4 h-auto group-hover:underline">
                          View Details <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeSection === "Process" && (
                <div className="bg-card p-8 rounded-xl shadow-lg">
                  <h3 className="text-h2 text-foreground mb-6">My Design & Development Process</h3>
                  <p className="text-muted-foreground mb-4">
                    A detailed breakdown of the typical stages I follow, from initial research and discovery through to design, development, testing, and final deployment. 
                    This ensures a structured approach to delivering high-quality, user-centric products.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Discovery & Research</li>
                    <li>Wireframing & Prototyping</li>
                    <li>UI/UX Design</li>
                    <li>Development & Iteration</li>
                    <li>Testing & QA</li>
                    <li>Deployment & Maintenance</li>
                  </ul>
                </div>
              )}
              {activeSection === "Results" && (
                <div className="bg-card p-8 rounded-xl shadow-lg">
                  <h3 className="text-h2 text-foreground mb-6">Achieving Tangible Results</h3>
                  <p className="text-muted-foreground">
                    Focusing on measurable outcomes, such as improved user engagement, increased conversion rates, or enhanced performance metrics. 
                    Each project aims to deliver significant value and a positive return on investment.
                  </p>
                   <p className="text-muted-foreground mt-4">
                    For specific results, please refer to individual case studies.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
