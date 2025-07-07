
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { resumeData } from '@/data/resume';
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { useIsMobile } from "@/hooks/use-mobile";

import { FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt, FaFigma, FaUsers, FaCode } from 'react-icons/fa';
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


gsap.registerPlugin(ScrollTrigger);

const iconMap: { [key: string]: { icon: React.ComponentType<any>, color: string } } = {
  // Languages
  "JavaScript (ES6+)": { icon: IoLogoJavascript, color: "#F7DF1E" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "HTML5": { icon: IoLogoHtml5, color: "#E34F26" },
  "CSS3": { icon: IoLogoCss3, color: "#1572B6" },
  "Python": { icon: IoLogoPython, color: "#3776AB" },

  // Frameworks & Libraries
  "React": { icon: FaReact, color: "#61DAFB" },
  "Next.js": { icon: TbBrandNextjs, color: "hsl(var(--foreground))" },
  "Node.js": { icon: FaNodeJs, color: "#339933" },
  "Express": { icon: SiExpress, color: "hsl(var(--foreground))" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "GSAP": { icon: SiGreensock, color: "#88CE02" },
  "Three.js": { icon: SiThreedotjs, color: "hsl(var(--foreground))" },

  // Datastores
  "PostgreSQL": { icon: SiPostgresql, color: "#336791" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Redis": { icon: SiRedis, color: "#DC382D" },
  "Firebase": { icon: SiFirebase, color: "#FFCA28" },

  // Cloud & DevOps
  "Docker": { icon: FaDocker, color: "#2496ED" },
  "Vercel": { icon: SiVercel, color: "hsl(var(--foreground))" },
  "AWS (S3, EC2)": { icon: FaAws, color: "#FF9900" },
  "CI/CD": { icon: GoSync, color: "#6c5ce7" },
  "Git": { icon: FaGitAlt, color: "#F05032" },

  // Other
  "Figma": { icon: FaFigma, color: "#F24E1E" },
  "REST APIs": { icon: HiServer, color: "#d63031" },
  "GraphQL": { icon: SiGraphql, color: "#E10098" },
  "Agile/Scrum": { icon: FaUsers, color: "#0984e3" },
};

const SkillCard = ({ skill }: { skill: string }) => {
    const [hovered, setHovered] = useState(false);
    const { icon: Icon, color } = iconMap[skill] || { icon: FaCode, color: 'hsl(var(--accent))' };
    const canvasColors = [[125, 77, 255], [20, 184, 166]];
    const isMobile = useIsMobile();

    const handleMouseEnter = () => {
        if (!isMobile) {
            setHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setHovered(false);
        }
    };

    const handleClick = () => {
        if (isMobile) {
            setHovered(!hovered);
        }
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="border border-border/20 group/canvas-card flex items-center justify-center bg-card w-60 h-32 p-4 relative rounded-2xl transition-all duration-300 hover:border-primary/50 overflow-hidden"
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
                            containerClassName="bg-background"
                            colors={canvasColors}
                            dotSize={2}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: hovered ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center gap-2"
                >
                    <Icon className="text-4xl" style={{ color }} />
                    <span className="text-sm font-medium text-foreground">{skill}</span>
                </motion.div>
                
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-lg text-foreground font-bold"
                >
                    {skill}
                </motion.h3>
            </div>
        </div>
    );
};


export function SkillsSection() {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".skill-anim", {
        autoAlpha: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: component.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={component} className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="skill-anim text-4xl md:text-5xl font-bold mb-4">My Skills</h2>
          <p className="skill-anim text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of the technologies and tools I'm proficient in. Hover over a card to reveal the magic.
          </p>
        </div>
        <div className="space-y-12">
          {Object.entries(resumeData.skills).map(([category, skills]) => (
            <div key={category} className="skill-anim">
              <h3 className="text-2xl font-semibold text-center mb-8 text-primary">{category}</h3>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                {skills.map(skill => (
                  <SkillCard key={skill} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
