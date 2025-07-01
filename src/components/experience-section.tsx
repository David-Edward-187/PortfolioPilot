
"use client";

import { resumeData } from '@/data/resume';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function ExperienceSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const [svgHeight, setSvgHeight] = useState(0);

    useEffect(() => {
        // Function to update SVG height based on content
        const updateSvgHeight = () => {
            if (contentRef.current) {
                setSvgHeight(contentRef.current.offsetHeight);
            }
        };

        // Initial measurement
        updateSvgHeight();

        // Re-measure on window resize
        window.addEventListener("resize", updateSvgHeight);

        // Use MutationObserver to watch for content changes that might affect height
        const observer = new MutationObserver(updateSvgHeight);
        if (contentRef.current) {
            observer.observe(contentRef.current, { childList: true, subtree: true, characterData: true });
        }

        return () => {
            window.removeEventListener("resize", updateSvgHeight);
            observer.disconnect();
        };
    }, []);

    // Spring-animated pathLength for the SVG line
    const pathLength = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1]), 
        { stiffness: 400, damping: 90 }
    );
    
    // Animate the top dot's properties based on scroll progress
    const topDotBoxShadow = useTransform(
        scrollYProgress,
        [0, 0.05],
        ["0 0 8px 2px hsl(var(--primary) / 0.6)", "0 0 0 0px hsl(var(--primary) / 0)"]
    );
    const topDotBg = useTransform(
        scrollYProgress,
        [0, 0.05],
        ["hsl(var(--background))", "hsl(var(--primary))"]
    );

    return (
        <section id="experience" className="py-20 md:py-24 bg-secondary">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Work Experience</h2>
                    <p className="text-lg text-muted-foreground mt-2">My professional journey.</p>
                </motion.div>

                <div ref={ref} className="relative w-full max-w-3xl mx-auto h-full">
                    {/* The animated SVG beam */}
                    <div className="absolute left-4 top-1 h-full w-6 flex justify-center">
                        <svg
                            viewBox={`0 0 20 ${svgHeight}`}
                            width="20"
                            height={svgHeight}
                            className="block"
                            aria-hidden="true"
                        >
                            {/* Static background line */}
                            <path
                                d={`M 10,0 V ${svgHeight}`}
                                fill="none"
                                stroke="hsl(var(--border))"
                                strokeOpacity="0.3"
                                strokeWidth="1"
                            />
                            {/* Animated foreground line */}
                            <motion.path
                                d={`M 10,0 V ${svgHeight}`}
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="2"
                                style={{ pathLength }}
                                className="motion-reduce:hidden"
                            />
                        </svg>
                    </div>

                    {/* Timeline content */}
                    <div ref={contentRef} className="ml-12 md:ml-16 space-y-12">
                        {resumeData.experience.map((item, index) => (
                            <motion.div 
                                key={`content-${index}`} 
                                className="relative"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                {/* Dot on the timeline */}
                                <div className="absolute -left-[calc(3.5rem)] md:-left-[calc(4.5rem)] top-1">
                                    {index === 0 ? (
                                         <motion.div style={{boxShadow: topDotBoxShadow}} className="h-4 w-4 rounded-full border-2 border-primary flex items-center justify-center">
                                            <motion.div style={{backgroundColor: topDotBg}} className="h-2 w-2 rounded-full" />
                                         </motion.div>
                                    ) : (
                                        <div className="h-3 w-3 rounded-full bg-secondary border-2 border-primary" />
                                    )}
                                </div>
                                
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
