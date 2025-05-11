"use client";
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const projects = [
  { id: "project1", name: "E-commerce Revamp", thumbnail: "https://picsum.photos/seed/ecomrev/400/300", dataAiHint: "e-commerce platform" },
  { id: "project2", name: "SaaS Dashboard UX", thumbnail: "https://picsum.photos/seed/saasdash/400/300", dataAiHint: "dashboard interface" },
  { id: "project3", name: "InnovApp Mobile", thumbnail: "https://picsum.photos/seed/mobileapp/400/300", dataAiHint: "mobile application" },
];

export function CaseStudyOverviewPage() {
  const [activeSection, setActiveSection] = React.useState("Projects");
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  const handleScroll = React.useCallback(() => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const currentProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(isNaN(currentProgress) ? 0 : Math.min(100, Math.max(0, currentProgress)));
    }
  }, []);

  React.useEffect(() => {
    const currentRef = contentRef.current;
    currentRef?.addEventListener('scroll', handleScroll);
    // Initial scroll check
    handleScroll();
    return () => currentRef?.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  const navItems = ["Projects", "Process", "Results"];

  const handleDeepDiveClick = () => {
    // This function would ideally trigger an action in DesktopView
    // e.g., open the 'deepDive' app. For now, it's a placeholder.
    console.log("Deep Dive clicked - integrate with DesktopView to open Deep Dive Case Study");
    const event = new CustomEvent('dockitemselect', { detail: 'deepDive' });
    window.dispatchEvent(event);
  };

  return (
    <section id="case-study-overview" className="bg-transparent py-4 md:py-6">
      <div className="container mx-auto px-2 md:px-4">
        <h2 className="text-h2 md:text-h1 text-center text-foreground mb-8 md:mb-10">Case Studies</h2>
        <div className="md:grid md:grid-cols-12 md:gap-6">
          {/* Left Sidebar Nav */}
          <aside className="md:col-span-3 mb-6 md:mb-0 md:sticky md:top-6 self-start bg-sidebar-background p-3 rounded-md shadow-sm">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item}
                  variant={activeSection === item ? "default" : "ghost"}
                  className={`w-full justify-start text-sm py-2 px-3 ${activeSection === item ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
                  onClick={() => setActiveSection(item)}
                >
                  {item}
                </Button>
              ))}
            </nav>
          </aside>

          {/* Right Content Area */}
          <main className="md:col-span-9 relative">
            {/* Sticky Progress Indicator */}
            <div className="sticky top-2 z-10 mb-3 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-150 ease-linear" 
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div ref={contentRef} className="max-h-[calc(70vh-80px)] md:max-h-[calc(60vh-50px)] overflow-y-auto pr-1 custom-scrollbar">
              {activeSection === "Projects" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden group cursor-pointer transform transition-all duration-300 hover:shadow-lg"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={handleDeepDiveClick}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleDeepDiveClick()}
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
                      <div className="p-4">
                        <h3 className="text-md md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">Brief description of outcomes.</p>
                        <Button variant="link" className="text-primary p-0 mt-2 h-auto text-xs group-hover:underline">
                          View Details <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeSection === "Process" && (
                <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-md animate-fadeIn">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">My Design & Development Process</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    A detailed breakdown of the typical stages I follow, ensuring high-quality, user-centric products.
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
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
                <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-md animate-fadeIn">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">Achieving Tangible Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Focusing on measurable outcomes like improved user engagement, increased conversion rates, or enhanced performance. 
                  </p>
                   <p className="text-sm text-muted-foreground mt-3">
                    Specific results are detailed in individual case studies.
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
