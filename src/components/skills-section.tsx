
"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Code, Database, Cloud, Library, GitMerge, Wind, Server, Box,
  PenTool, Network, Share2, Users, RefreshCw, Triangle, Package, Palette
} from "lucide-react";

import { resumeData } from '@/data/resume';
import { cn } from '@/lib/utils';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';

const iconMap: { [key: string]: React.ReactNode } = {
  "JavaScript (ES6+)": <Code className="h-8 w-8" />,
  "TypeScript": <Code className="h-8 w-8" />,
  "HTML5": <Code className="h-8 w-8" />,
  "CSS3": <Palette className="h-8 w-8" />,
  "Python": <Code className="h-8 w-8" />,
  "React": <Library className="h-8 w-8" />,
  "Next.js": <span className="font-black text-4xl">N</span>,
  "Node.js": <Server className="h-8 w-8" />,
  "Express": <span className="font-bold text-2xl">Express</span>,
  "Tailwind CSS": <Wind className="h-8 w-8" />,
  "GSAP": <span className="font-black text-4xl">G</span>,
  "Three.js": <Box className="h-8 w-8" />,
  "PostgreSQL": <Database className="h-8 w-8" />,
  "MongoDB": <Database className="h-8 w-8" />,
  "Redis": <Database className="h-8 w-8" />,
  "Firebase": <Database className="h-8 w-8" />,
  "Docker": <Package className="h-8 w-8" />,
  "Vercel": <Triangle className="h-8 w-8" />,
  "AWS (S3, EC2)": <Cloud className="h-8 w-8" />,
  "CI/CD": <RefreshCw className="h-8 w-8" />,
  "Git": <GitMerge className="h-8 w-8" />,
  "Figma": <PenTool className="h-8 w-8" />,
  "REST APIs": <Network className="h-8 w-8" />,
  "GraphQL": <Share2 className="h-8 w-8" />,
  "Agile/Scrum": <Users className="h-8 w-8" />,
};

const SkillCard = ({ skill, className }: { skill: string, className?: string }) => {
    const [hovered, setHovered] = React.useState(false);
    const Icon = iconMap[skill] || <Code className="h-8 w-8" />;

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
                <div className="text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 group-hover/canvas-card:opacity-0">
                    {Icon}
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
