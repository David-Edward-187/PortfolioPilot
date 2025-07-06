
"use client";

import { resumeData } from '@/data/resume';
import { FaAward } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { WobbleCard } from '@/components/ui/wobble-card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function CertificatesSection() {
    const component = useRef(null);

    // Animate the section title
    useEffect(() => {
        if (!resumeData.certificates || resumeData.certificates.length === 0) return;
        
        let ctx = gsap.context(() => {
            gsap.from(".certificates-title", {
                autoAlpha: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: component.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }, component);
        return () => ctx.revert();
    }, []);

    if (!resumeData.certificates || resumeData.certificates.length === 0) {
        return null;
    }

    return (
    <section id="certificates" ref={component} className="py-20 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="certificates-title text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Certifications</h2>
                <p className="text-lg text-muted-foreground mt-2">My professional credentials with an interactive wobble.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {resumeData.certificates.map((cert, index) => {
                    const isClickable = cert.credentialUrl && cert.credentialUrl !== '#';
                    const Component = isClickable ? 'a' : 'div';
                    const props = isClickable 
                        ? { 
                            href: cert.credentialUrl!, 
                            target: '_blank', 
                            rel: 'noopener noreferrer',
                            className: 'block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-2xl',
                            'aria-label': `View certificate for ${cert.name}`
                          } 
                        : {};

                    return (
                        <Component key={index} {...props}>
                            <WobbleCard containerClassName="h-full group">
                                <div className="flex flex-col justify-between h-full">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-start gap-4 mb-4">
                                            <FaAward className="h-10 w-10 text-accent flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">{cert.name}</h3>
                                                <p className="text-sm text-muted-foreground">{cert.issuingOrganization} &middot; {cert.issueDate}</p>
                                            </div>
                                        </div>
                                        {isClickable && (
                                            <FiExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                        )}
                                    </div>
                                    
                                    {cert.description && <p className="text-base text-foreground/80 leading-relaxed flex-grow">{cert.description}</p>}
                                </div>
                            </WobbleCard>
                        </Component>
                    );
                })}
            </div>
        </div>
    </section>
    );
}
