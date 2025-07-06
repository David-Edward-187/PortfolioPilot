
"use client";

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

import { FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt, FaFigma, FaUsers } from 'react-icons/fa';
import { IoLogoJavascript, IoLogoHtml5, IoLogoCss3, IoLogoPython } from 'react-icons/io5';
import { 
  SiTypescript, 
  SiExpress, 
  SiTailwindcss, 
  SiGreensock, 
  SiThreedotjs, 
  SiPostgresql, 
  SiMongodb, 
  SiRedis, 
  SiFirebase, 
  SiVercel, 
  SiGraphql 
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';
import { GoSync } from 'react-icons/go';
import { HiServer } from 'react-icons/hi';
import { LuCode2 } from 'react-icons/lu';

import { resumeData } from '@/data/resume';
import { cn } from '@/lib/utils';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';

// Map skill names to React Icons and their brand colors
const iconMap: { [key: string]: { icon: React.ReactNode, color: string } } = {
  // Languages
  "JavaScript (ES6+)": { icon: <IoLogoJavascript />, color: "#F7DF1E" },
  "TypeScript": { icon: <SiTypescript />, color: "#3178C6" },
  "HTML5": { icon: <IoLogoHtml5 />, color: "#E34F26" },
  "CSS3": { icon: <IoLogoCss3 />, color: "#1572B6" },
  "Python": { icon: <IoLogoPython />, color: "#3776AB" },

  // Frameworks & Libraries
  "React": { icon: <FaReact />, color: "#61DAFB" },
  "Next.js": { icon: <TbBrandNextjs />, color: "#FFFFFF" },
  "Node.js": { icon: <FaNodeJs />, color: "#339933" },
  "Express": { icon: <SiExpress />, color: "#828282" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
  "GSAP": { icon: <SiGreensock />, color: "#88CE02" },
  "Three.js": { icon: <SiThreedotjs />, color: "#FFFFFF" },

  // Datastores
  "PostgreSQL": { icon: <SiPostgresql />, color: "#336791" },
  "MongoDB": { icon: <SiMongodb />, color: "#47A248" },
  "Redis": { icon: <SiRedis />, color: "#DC382D" },
  "Firebase": { icon: <SiFirebase />, color: "#FFCA28" },

  // Cloud & DevOps
  "Docker": { icon: <FaDocker />, color: "#2496ED" },
  "Vercel": { icon: <SiVercel />, color: "#FFFFFF" },
  "AWS (S3, EC2)": { icon: <FaAws />, color: "#FF9900" },
  "CI/CD": { icon: <GoSync />, color: "#6c5ce7" },
  "Git": { icon: <FaGitAlt />, color: "#F05032" },

  // Other
  "Figma": { icon: <FaFigma />, color: "#F24E1E" },
  "REST APIs": { icon: <HiServer />, color: "#d63031" },
  "GraphQL": { icon: <SiGraphql />, color: "#E10098" },
  "Agile/Scrum": { icon: <FaUsers />, color: "#0984e3" },
};


const SkillCard = ({ skill, className }: { skill: string, className?: string }) => {
    const { icon, color } = iconMap[skill] || { icon: <LuCode2 />, color: "hsl(var(--accent))" };
    const { resolvedTheme } = useTheme();

    const colors = useMemo(() => {
        if (resolvedTheme === 'dark') {
            return [[187, 107, 255], [0, 255, 200]]; // Vibrant Purple, Teal for dark mode
        }
        return [[125, 77, 255], [20, 184, 166]] // Primary, Accent from light theme
    }, [resolvedTheme]);

    return (
        <div
            className={cn(
                "border border-border/20 group/canvas-card flex items-center justify-center",
                "bg-card w-full mx-auto p-4 relative h-36 md:h-48 rounded-3xl overflow-hidden"
            )}
        >
            <CanvasRevealEffect
                animationSpeed={5}
                containerClassName="bg-transparent rounded-3xl"
                colors={colors}
                dotSize={2}
            />

            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-white text-center text-lg sm:text-xl font-bold opacity-0 group-hover/canvas-card:opacity-100 relative z-20 transition-opacity duration-200">
                    {skill}
                </h2>
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
