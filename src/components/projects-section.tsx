
"use client";

import Image from 'next/image';
import * as React from 'react';
import Link from 'next/link';
import { resumeData } from '@/data/resume';
import type { ProjectEntry } from '@/types/resume';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectImages = [
  "https://placehold.co/600x400.png",
  "https://placehold.co/600x400.png",
  "https://placehold.co/600x400.png",
  "https://placehold.co/600x400.png",
  "https://placehold.co/600x400.png",
  "https://placehold.co/600x400.png"
];

const dataAiHints = [
  "futuristic dashboard dark",
  "modern analytics interface",
  "crypto trading platform",
  "ai application ui",
  "glowing data visualization",
  "tech project screenshot"
];

let imageIndex = 0;

const ProjectCard = ({ project }: { project: ProjectEntry }) => {
  const currentImageIndex = imageIndex % projectImages.length;
  imageIndex++;
  return (
    <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block relative rounded-2xl overflow-hidden group shadow-lg">
        <Image
            src={projectImages[currentImageIndex]}
            alt={project.name}
            width={600}
            height={400}
            className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            data-ai-hint={dataAiHints[currentImageIndex]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">{project.name}</h3>
        </div>
    </Link>
  );
};

export function ProjectsSection() {
    const mainRef = React.useRef(null);
    const column1Ref = React.useRef(null);
    const column2Ref = React.useRef(null);
    const column3Ref = React.useRef(null);

    const projectsCol1 = resumeData.projects.filter((_, i) => i % 3 === 0);
    const projectsCol2 = resumeData.projects.filter((_, i) => i % 3 === 1);
    const projectsCol3 = resumeData.projects.filter((_, i) => i % 3 === 2);

    React.useEffect(() => {
        let ctx = gsap.context(() => {
            ScrollTrigger.matchMedia({
                "(min-width: 768px)": function() {
                    gsap.to(column1Ref.current, {
                        yPercent: -20,
                        ease: "none",
                        scrollTrigger: {
                            trigger: mainRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        }
                    });
                    gsap.to(column2Ref.current, {
                        yPercent: 10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: mainRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        }
                    });
                    gsap.to(column3Ref.current, {
                        yPercent: -25,
                        ease: "none",
                        scrollTrigger: {
                            trigger: mainRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        }
                    });
                }
            });
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={mainRef} className="container mx-auto py-20 md:py-24 overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">My Projects</h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
                A selection of my work, demonstrating my skills in creating modern, responsive, and performant web applications.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:h-[180vh]">
                {/* Column 1 */}
                <div ref={column1Ref} className="flex flex-col gap-8">
                    {projectsCol1.map((project, index) => (
                        <ProjectCard key={`col1-${index}`} project={project} />
                    ))}
                </div>
                {/* Column 2 */}
                <div ref={column2Ref} className="flex flex-col gap-8 md:mt-[15vh]">
                    {projectsCol2.map((project, index) => (
                        <ProjectCard key={`col2-${index}`} project={project} />
                    ))}
                </div>
                {/* Column 3 */}
                <div ref={column3Ref} className="flex flex-col gap-8">
                    {projectsCol3.map((project, index) => (
                        <ProjectCard key={`col3-${index}`} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
