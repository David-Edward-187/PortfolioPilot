
"use client";

import { resumeData } from '@/data/resume';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function ExperienceSection() {
    const scrollTargetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: scrollTargetRef,
        offset: ["start center", "end center"],
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        const contentElement = contentRef.current;
        if (!contentElement) return;

        const resizeObserver = new ResizeObserver(() => {
            setContentHeight(contentElement.offsetHeight);
        });

        resizeObserver.observe(contentElement);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const pathLength = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1]), 
        { stiffness: 300, damping: 50, restDelta: 0.001 }
    );
    
    const y = useTransform(pathLength, [0, 1], [0, contentHeight]);
    
    return (
        <section id="experience" className="py-20 md:py-24 bg-secondary">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Work Experience</h2>
                    <p className="text-lg text-muted-foreground mt-2">My professional journey.</p>
                </motion.div>

                <div ref={scrollTargetRef} className="relative w-full max-w-3xl mx-auto">
                    {contentHeight > 0 && (
                        <motion.div 
                            className="absolute left-4 top-0 h-full w-6 flex justify-center"
                            style={{ height: contentHeight }}
                        >
                            <svg
                                viewBox={`0 0 20 ${contentHeight}`}
                                width="20"
                                height={contentHeight}
                                className="block"
                                aria-hidden="true"
                            >
                                <path
                                    d={`M 10,0 V ${contentHeight}`}
                                    fill="none"
                                    stroke="hsl(var(--border))"
                                    strokeOpacity="0.3"
                                    strokeWidth="2"
                                />
                                <motion.path
                                    d={`M 10,0 V ${contentHeight}`}
                                    fill="none"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth="2"
                                    style={{ pathLength }}
                                />
                                <motion.circle
                                    cx="10"
                                    cy={y}
                                    r="4"
                                    fill="hsl(var(--primary))"
                                />
                            </svg>
                        </motion.div>
                    )}

                    <div ref={contentRef} className="ml-12 md:ml-16 space-y-16 relative">
                        {resumeData.experience.map((item, index) => (
                            <motion.div 
                                key={`content-${index}`} 
                                className="relative pl-4"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * index }}
                            >
                                <div className="absolute -left-4 top-1 h-3 w-3 rounded-full bg-secondary border-2 border-primary" />
                                
                                <p className="text-sm font-semibold text-muted-foreground mb-1">{item.years}</p>
                                <h3 className="text-xl font-bold text-primary mb-1">{item.role}</h3>
                                <p className="font-semibold text-foreground mb-4">{item.company}</p>
        
                                <ul className="space-y-2 text-foreground/80 leading-relaxed list-disc list-inside">
                                    {item.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
