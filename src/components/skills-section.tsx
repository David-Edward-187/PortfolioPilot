
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { resumeData } from '@/data/resume';

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

gsap.registerPlugin(ScrollTrigger);

// Map skill names to React Icons and their brand colors
const iconMap: { [key: string]: { icon: React.ComponentType, color: string } } = {
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
            A showcase of the technologies and tools I'm proficient in.
          </p>
        </div>
        <div className="space-y-12">
          {Object.entries(resumeData.skills).map(([category, skills]) => (
            <div key={category} className="skill-anim">
              <h3 className="text-2xl font-semibold text-center mb-8 text-primary">{category}</h3>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {skills.map(skill => {
                  const { icon: Icon, color } = iconMap[skill] || { icon: LuCode2, color: 'hsl(var(--accent))' };
                  return (
                    <div
                      key={skill}
                      className="group flex flex-col items-center justify-center gap-2 p-4 w-28 h-28 rounded-2xl glassmorphic transition-all duration-300 hover:!scale-105 hover:bg-primary/10"
                      title={skill}
                    >
                      <Icon className="text-4xl transition-colors duration-300" style={{ color }} />
                      <span className="text-xs font-medium text-foreground text-center">
                        {skill}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
