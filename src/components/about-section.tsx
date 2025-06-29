
"use client";

import Image from 'next/image';
import { resumeData } from '@/data/resume';
import * as React from 'react';
import { 
  FileHtml, 
  FileCss, 
  FileJs, 
  Atom
} from '@phosphor-icons/react/dist/ssr';
import { motion } from 'framer-motion';

const skillIcons: { [key: string]: React.ElementType } = {
  "HTML": FileHtml,
  "CSS": FileCss,
  "JS": FileJs,
  "React": Atom,
  "Next.js": () => <span className="font-bold text-sm">N</span>, 
  "GSAP": () => <span className="font-bold text-sm">G</span>
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const skillIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export function AboutSection() {
  return (
    <motion.section 
      id="about" 
      className="container mx-auto"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div 
          className="relative w-64 h-64 md:w-80 md:h-80 mx-auto group"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-300 animate-tilt"></div>
            <Image
              src={resumeData.headshotUrl}
              alt={resumeData.name}
              width={320}
              height={320}
              className="relative rounded-full object-cover border-2 border-primary/50 shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
        </motion.div>
        <motion.div 
            className="space-y-6 text-center md:text-left"
            variants={sectionVariants}
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold" variants={itemVariants}>About Me</motion.h2>
          <motion.p className="text-lg text-muted-foreground leading-relaxed" variants={itemVariants}>
            {resumeData.bio}
          </motion.p>
          <motion.div className="pt-4" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-foreground mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {Object.entries(skillIcons).map(([skill, Icon]) => (
                <motion.div 
                  key={skill}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg glassmorphic w-24 h-24 justify-center"
                  variants={skillIconVariants}
                  whileHover={{ scale: 1.05, backgroundColor: 'hsla(var(--primary-rgb), 0.2)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={36} className="text-accent" weight="light" />
                  <span className="text-xs font-medium text-foreground">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }}
};
