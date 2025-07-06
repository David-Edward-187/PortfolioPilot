"use client";

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faJs, faHtml5, faCss3Alt, faPython, faReact, faNodeJs,
  faGitAlt, faDocker, faAws, faFigma
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase, faServer, faCloud, faCode, faCube, 
  faNetworkWired, faUsers, faSync
} from '@fortawesome/free-solid-svg-icons';

import { resumeData } from '@/data/resume';
import { cn } from '@/lib/utils';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';

// SVG for Vercel logo
const VercelIcon = () => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
    <path d="M12 2.5L2.5 20h19L12 2.5z"/>
  </svg>
);

// SVG for GraphQL logo
const GraphQLIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" stroke="currentColor" strokeWidth="1" fill="none">
        <path d="M12 2 L3 7 L3 17 L12 22 L21 17 L21 7 Z" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="2" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="3" cy="7" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="3" cy="17" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="22" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="21" cy="17" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="21" cy="7" r="1.5" fill="currentColor" stroke="none" />
        <path d="M3 7L12 12" />
        <path d="M3 17L12 12" />
        <path d="M12 22L12 12" />
        <path d="M21 17L12 12" />
        <path d="M21 7L12 12" />
        <path d="M12 2L12 12" />
    </svg>
);

const TypeScriptIcon = () => (
    <svg role="img" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
      <rect width="100" height="100" rx="8" fill="#3178C6" />
      <path d="M26.4,33.4h19.2v4.8H31.2v11.2h13.6v4.8H31.2v16.4h14.8v4.8H26.4V33.4z M52.4,33.4h12.8l-5.6,22.8l-5.6,22.4h-4.8l9.6-38.4 h11.2l-5.6,22.8l-5.6,22.4h4.8l9.6-38.4H52.4z" fill="white" />
    </svg>
);


const PostgreSqlIcon = () => (
    <svg role="img" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="#336791">
        <path d="M78.2,85.5c-3.2-1.1-6.4,0-8.5,2.3c-2.1,2.3-1.9,5.6,0.5,7.5c2.4,1.9,5.7,1.9,8.1,0c2.4-1.9,3.2-5,1.6-7.1 C79.4,87.4,78.8,86.8,78.2,85.5L78.2,85.5z M66.3,95.2c-0.1-3.2,1.9-5.9,4.7-6.8c2.8-0.9,5.8,0.2,7.5,2.7c1.7,2.5,1.1,5.8-1.2,7.6 c-2.3,1.8-5.5,1.6-7.5-0.7C68,96.6,66.4,96,66.3,95.2z M82,73.5c-0.9-2.9-3.8-4.7-6.8-4.5c-3,0.2-5.5,2.5-5.9,5.5 c-0.4,3,1.6,5.9,4.5,6.5c3,0.6,6-1.1,7.1-4.1C82.1,75.9,82.4,74.7,82,73.5L82,73.5z M49.8,97.7c-2.7,0-5-2.2-5-5V50.1h-8.3v42.5 c0,2.8-2.2,5-5,5s-5-2.2-5-5V50.1h-8.3v42.5c0,2.8-2.2,5-5,5s-5-2.2-5-5V38.4h41.7v54.3C54.8,95.4,52.5,97.7,49.8,97.7z M83.3,38.4v13.3c-3.3-2.9-7.5-4.6-12-4.6c-9.2,0-16.7,7.5-16.7,16.7v33.9c0,2.8-2.2,5-5,5s-5-2.2-5-5V50.1H28v-10h41.7v-1.7 c0,0,0-0.1,0-0.1c0-4.6,3.1-8.5,7.5-9.7c0.2,0,0.3-0.1,0.5-0.1h0.1c0.1,0,0.2,0,0.3,0c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0 c0.1,0,0.2,0,0.3-0.1c0.1,0,0.1,0,0.2,0c0.2,0,0.4,0,0.7,0c0,0,0,0,0.1,0c0.2,0,0.5,0,0.7,0c0,0,0.1,0,0.1,0c0.3,0,0.6,0,0.8,0.1 c0,0,0.1,0,0.1,0c0.2,0,0.5,0.1,0.7,0.1c0.1,0,0.1,0,0.2,0.1c0.2,0.1,0.4,0.1,0.6,0.2c0,0,0,0,0,0c4.1,1.5,6.9,5.4,6.9,9.9V38.4 H58.2v-10h33.4v10H83.3z M83.3,21.8c0,2.8-2.2,5-5,5H21.7c-2.8,0-5-2.2-5-5s2.2-5,5-5h56.6C81.1,16.8,83.3,19,83.3,21.8z" />
    </svg>
);

const TailwindIcon = () => (
    <svg fill="#38bdf8" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.24 11.38c-.53 1.22-1.88 1.88-3.32 1.88-1.78 0-2.8-1.07-3.48-2.1-1.38-2.07-2.73-4.1-4.1-6.17.53-1.22 1.88-1.88 3.32-1.88 1.78 0 2.8 1.07 3.48 2.1 1.38 2.07 2.73 4.1 4.1 6.17zm-4.24-2.2c.45 0 .8-.35.8-.8s-.35-.8-.8-.8-.8.35-.8.8.35.8.8.8z"></path>
    </svg>
);


// Map skill names to Font Awesome icons and their brand colors
const iconMap: { [key: string]: { icon: React.ReactNode, color: string } } = {
  // Languages
  "JavaScript (ES6+)": { icon: <FontAwesomeIcon icon={faJs} />, color: "#F7DF1E" },
  "TypeScript": { icon: <TypeScriptIcon />, color: "#3178C6" },
  "HTML5": { icon: <FontAwesomeIcon icon={faHtml5} />, color: "#E34F26" },
  "CSS3": { icon: <FontAwesomeIcon icon={faCss3Alt} />, color: "#1572B6" },
  "Python": { icon: <FontAwesomeIcon icon={faPython} />, color: "#3776AB" },

  // Frameworks & Libraries
  "React": { icon: <FontAwesomeIcon icon={faReact} />, color: "#61DAFB" },
  "Next.js": { icon: <span className="font-black text-4xl">N</span>, color: "#FFFFFF" },
  "Node.js": { icon: <FontAwesomeIcon icon={faNodeJs} />, color: "#339933" },
  "Express": { icon: <FontAwesomeIcon icon={faServer} />, color: "#828282" },
  "Tailwind CSS": { icon: <TailwindIcon />, color: "#06B6D4" },
  "GSAP": { icon: <span className="font-black text-4xl">G</span>, color: "#88CE02" },
  "Three.js": { icon: <FontAwesomeIcon icon={faCube} />, color: "#FFFFFF" },

  // Datastores
  "PostgreSQL": { icon: <PostgreSqlIcon />, color: "#336791" },
  "MongoDB": { icon: <FontAwesomeIcon icon={faDatabase} />, color: "#47A248" },
  "Redis": { icon: <FontAwesomeIcon icon={faDatabase} />, color: "#DC382D" },
  "Firebase": { icon: <FontAwesomeIcon icon={faDatabase} />, color: "#FFCA28" },

  // Cloud & DevOps
  "Docker": { icon: <FontAwesomeIcon icon={faDocker} />, color: "#2496ED" },
  "Vercel": { icon: <VercelIcon />, color: "#FFFFFF" },
  "AWS (S3, EC2)": { icon: <FontAwesomeIcon icon={faAws} />, color: "#FF9900" },
  "CI/CD": { icon: <FontAwesomeIcon icon={faSync} />, color: "#6c5ce7" },
  "Git": { icon: <FontAwesomeIcon icon={faGitAlt} />, color: "#F05032" },

  // Other
  "Figma": { icon: <FontAwesomeIcon icon={faFigma} />, color: "#F24E1E" },
  "REST APIs": { icon: <FontAwesomeIcon icon={faNetworkWired} />, color: "#d63031" },
  "GraphQL": { icon: <GraphQLIcon />, color: "#E10098" },
  "Agile/Scrum": { icon: <FontAwesomeIcon icon={faUsers} />, color: "#0984e3" },
};


const SkillCard = ({ skill, className }: { skill: string, className?: string }) => {
    const [hovered, setHovered] = React.useState(false);
    const { icon, color } = iconMap[skill] || { icon: <FontAwesomeIcon icon={faCode} className="h-8 w-8" />, color: "hsl(var(--accent))" };
    const { resolvedTheme } = useTheme();

    const colors = useMemo(() => {
        if (resolvedTheme === 'dark') {
            return [[187, 107, 255], [0, 255, 200]]; // Vibrant Purple, Teal for dark mode
        }
        // Softer, theme-aligned colors for light mode
        return [[187, 107, 255], [0, 255, 200]] // Primary, Accent from light theme
    }, [resolvedTheme]);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "border border-border/20 group/canvas-card flex items-center justify-center",
                "bg-card w-full mx-auto p-4 relative h-36 md:h-48 rounded-3xl overflow-hidden",
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
                            containerClassName="bg-transparent rounded-3xl"
                            colors={colors}
                            dotSize={2}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center transition-all duration-200">
                {/* Text revealed on hover */}
                <h2 className="text-white text-center text-lg sm:text-xl font-bold opacity-0 group-hover/canvas-card:opacity-100 relative z-20 transition-opacity duration-200">
                    {skill}
                </h2>
                {/* Icon visible by default, hidden on hover */}
                <div className="text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 group-hover/canvas-card:opacity-0" style={{ color }}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

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