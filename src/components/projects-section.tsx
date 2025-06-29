
"use client";
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, GithubLogo } from '@phosphor-icons/react/dist/ssr';
import { resumeData } from '@/data/resume';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};


export function ProjectsSection() {
  return (
    <motion.section 
        id="projects" 
        className="container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
    >
      <motion.h2 className="text-4xl md:text-5xl font-bold mb-4 text-center" variants={cardVariants}>My Projects</motion.h2>
      <motion.p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto" variants={cardVariants}>
        A selection of my work, demonstrating my skills in creating modern, responsive, and performant web applications.
      </motion.p>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6"
        variants={containerVariants}
      >
        {resumeData.projects.map((project, index) => (
          <motion.div
            key={project.name}
            variants={cardVariants}
            className={`relative rounded-2xl overflow-hidden group
              ${index === 0 ? 'md:col-span-2' : ''}
              ${index === 3 ? 'md:col-span-2' : ''}
            `}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 p-6 flex flex-col justify-end">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.slice(0, 3).map(tech => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" asChild className="glassmorphic h-9 px-3 text-sm border-white/20 text-white hover:bg-white/10">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ArrowRight className="mr-1.5 h-4 w-4" /> View Live
                    </a>
                  </Button>
                  <Button variant="ghost" asChild className="h-9 px-3 text-sm text-white hover:bg-white/10">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <GithubLogo className="mr-1.5 h-4 w-4" /> GitHub
                    </a>

                  </Button>
                </div>
              </div>
            </div>
            <Image
              src={projectImages[index % projectImages.length]}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint={dataAiHints[index % dataAiHints.length]}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
