"use client";

import { resumeData } from '@/data/resume';
import { motion } from 'framer-motion';
import React from 'react';

export function ExperienceSection() {
  const containerRef = React.useRef(null);

  const itemVariants = {
    offscreen: {
      opacity: 0,
      x: 50,
    },
    onscreen: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }
    })
  };
  
  const titleVariants = {
    offscreen: {
      opacity: 0,
      y: 30,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="experience" ref={containerRef} className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2 variants={titleVariants} className="text-3xl md:text-4xl font-bold text-primary">Work Experience</motion.h2>
          <motion.p variants={titleVariants} className="text-lg text-muted-foreground mt-2">My professional journey.</motion.p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border -translate-x-1/2" />
          
          <div className="space-y-12">
            {resumeData.experience.map((exp, index) => (
              <motion.div
                key={index}
                className="relative"
                custom={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={itemVariants}
              >
                {/* Dot on timeline */}
                <div className="absolute left-4 top-1 -translate-x-1/2 h-3 w-3 rounded-full bg-primary ring-4 ring-secondary" />

                {/* Content */}
                <div className="ml-12">
                  <div className="text-sm font-semibold text-muted-foreground mb-1">{exp.years}</div>
                  <h3 className="text-xl font-bold text-primary mb-1">{exp.role}</h3>
                  <p className="font-semibold text-foreground mb-4">{exp.company}</p>

                  <ul className="space-y-2 text-foreground/80 leading-relaxed">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
