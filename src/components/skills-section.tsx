
"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faJs, faHtml5, faCss3Alt, faPython, faReact, faNodeJs,
  faGitAlt, faDocker, faAws, faFigma
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase, faServer, faCloud, faWind, faCode, faCube, 
  faNetworkWired, faUsers, faSync, faPalette 
} from '@fortawesome/free-solid-svg-icons';

import { resumeData } from '@/data/resume';
import { cn } from '@/lib/utils';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';

// Map skill names to Font Awesome icons and their brand colors
const iconMap: { [key: string]: { icon: React.ReactNode, color: string } } = {
  // Languages
  "JavaScript (ES6+)": { icon: <FontAwesomeIcon icon={faJs} />, color: "#F7DF1E" },
  "TypeScript": { icon: <FontAwesomeIcon icon={faCode} />, color: "#3178C6" }, // Generic code icon, but colored for TS
  "HTML5": { icon: <FontAwesomeIcon icon={faHtml5} />, color: "#E34F26" },
  "CSS3": { icon: <FontAwesomeIcon icon={faCss3Alt} />, color: "#1572B6" },
  "Python": { icon: <FontAwesomeIcon icon={faPython} />, color: "#3776AB" },

  // Frameworks & Libraries
  "React": { icon: <FontAwesomeIcon icon={faReact} />, color: "#61DAFB" },
  "Next.js": { icon: <span className="font-black text-4xl">N</span>, color: "#FFFFFF" }, // Custom text for Next.js
  "Node.js": { icon: <FontAwesomeIcon icon={faNodeJs} />, color: "#339933" },
  "Express": { icon: <span className="font-bold text-2xl">Express</span>, color: "#828282" }, // Custom text for Express
  "Tailwind CSS": { icon: <FontAwesomeIcon icon={faWind} />, color: "#06B6D4" },
  "GSAP": { icon: <span className="font-black text-4xl">G</span>, color: "#88CE02" }, // Custom text for GSAP
  "Three.js": { icon: <FontAwesomeIcon icon={faCube} />, color: "#FFFFFF" },

  // Datastores
  "PostgreSQL": { icon: <FontAwesomeIcon icon={faDatabase} />, color: "#336791" },
  "MongoDB": { icon: <FontAwesomeIcon icon={faDatabase} />, color: "#47A248" },
  "Redis": { icon: <FontAwesomeIcon icon={faDatabase} />, color: "#DC382D" },
  "Firebase": { icon: <FontAwesomeIcon icon={faDatabase} />, color: "#FFCA28" },

  // Cloud & DevOps
  "Docker": { icon: <FontAwesomeIcon icon={faDocker} />, color: "#2496ED" },
  "Vercel": { icon: <FontAwesomeIcon icon={faCube} />, color: "#FFFFFF" }, // Using a generic cube for Vercel
  "AWS (S3, EC2)": { icon: <FontAwesomeIcon icon={faAws} />, color: "#FF9900" },
  "CI/CD": { icon: <FontAwesomeIcon icon={faSync} />, color: "#6c5ce7" },
  "Git": { icon: <FontAwesomeIcon icon={faGitAlt} />, color: "#F05032" },

  // Other
  "Figma": { icon: <FontAwesomeIcon icon={faFigma} />, color: "#F24E1E" },
  "REST APIs": { icon: <FontAwesomeIcon icon={faNetworkWired} />, color: "#d63031" },
  "GraphQL": { icon: <FontAwesomeIcon icon={faNetworkWired} />, color: "#E10098" },
  "Agile/Scrum": { icon: <FontAwesomeIcon icon={faUsers} />, color: "#0984e3" },
};


const SkillCard = ({ skill, className }: { skill: string, className?: string }) => {
    const [hovered, setHovered] = React.useState(false);
    const { icon, color } = iconMap[skill] || { icon: <FontAwesomeIcon icon={faCode} className="h-8 w-8" />, color: "hsl(var(--accent))" };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "border border-border/20 group/canvas-card flex items-center justify-center",
                "bg-card w-full mx-auto p-4 relative h-36 md:h-48 rounded-2xl",
                className
            )}
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full absolute inset-0"
                    >
                        <CanvasRevealEffect
                            animationSpeed={5}
                            containerClassName="bg-transparent rounded-2xl"
                            colors={[[187, 107, 255], [0, 255, 200]]} // Primary & Accent as RGB
                            dotSize={2}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center transition-all duration-200">
                {/* Icon visible by default, hidden on hover */}
                <div className="text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 group-hover/canvas-card:opacity-0" style={{ color }}>
                    {icon}
                </div>
                
                {/* Text revealed on hover */}
                <h2 className="text-white text-center text-lg sm:text-xl font-bold opacity-0 group-hover/canvas-card:opacity-100 relative z-20 transition-opacity duration-200">
                    {skill}
                </h2>
            </div>
        </div>
    );
}

export function SkillsSection() {
    const skills = {
        languages: resumeData.skills["Languages"] || [],
        frameworks: resumeData.skills["Frameworks & Libraries"] || [],
        datastores: resumeData.skills["Datastores"] || [],
        devops: resumeData.skills["Cloud & DevOps"] || [],
        other: resumeData.skills["Other"] || [],
    };
    
    // Ensure we don't try to access skills that don't exist
    const getSkill = (arr: string[], index: number) => arr[index] || `Skill ${index + 1}`;

    return (
        <section id="skills" className="py-20 md:py-24 bg-secondary">
             <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">My Technical Skills</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">A modern showcase of my technical abilities. Hover over any skill to see the magic happen.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
                    <SkillCard skill={getSkill(skills.frameworks, 1)} className="md:col-span-3 lg:col-span-4" />
                    <SkillCard skill={getSkill(skills.frameworks, 0)} className="md:col-span-3 lg:col-span-4" />
                    <SkillCard skill={getSkill(skills.languages, 1)} className="md:col-span-6 lg:col-span-4" />

                    <SkillCard skill={getSkill(skills.languages, 0)} className="md:col-span-6 lg:col-span-6" />
                    <SkillCard skill={getSkill(skills.frameworks, 4)} className="md:col-span-3 lg:col-span-3" />
                    <SkillCard skill={getSkill(skills.frameworks, 2)} className="md:col-span-3 lg:col-span-3" />
                    
                    <SkillCard skill={getSkill(skills.datastores, 0)} className="md:col-span-2 lg:col-span-3" />
                    <SkillCard skill={getSkill(skills.datastores, 1)} className="md:col-span-2 lg:col-span-3" />
                    <SkillCard skill={getSkill(skills.devops, 4)} className="md:col-span-2 lg:col-span-2" />
                    <SkillCard skill={getSkill(skills.devops, 0)} className="md:col-span-3 lg:col-span-2" />
                    <SkillCard skill={getSkill(skills.devops, 1)} className="md:col-span-3 lg:col-span-2" />
                </div>
             </div>
        </section>
    );
}
