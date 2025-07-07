
"use client";

import { resumeData } from '@/data/resume';
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';
import { WobbleCard } from '@/components/ui/wobble-card';

gsap.registerPlugin(ScrollTrigger);

export function CertificatesSection() {
    const component = useRef(null);

    // GSAP animations for the section and cards
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
            gsap.from(".certificate-card", {
                autoAlpha: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ".certificates-grid",
                    start: "top 85%",
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
                <p className="text-lg text-muted-foreground mt-2">My professional credentials.</p>
            </div>
            <div className="certificates-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {resumeData.certificates.map((cert, index) => {
                    const isClickable = cert.credentialUrl && cert.credentialUrl !== '#';
                    const Component = isClickable ? 'a' : 'div';
                    const props = isClickable 
                        ? { 
                            href: cert.credentialUrl!, 
                            target: '_blank', 
                            rel: 'noopener noreferrer',
                            className: 'block group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-2xl certificate-card',
                            'aria-label': `View certificate for ${cert.name}`
                          } 
                        : {
                            className: 'certificate-card rounded-2xl'
                        };

                    return (
                        <Component key={index} {...props}>
                            <WobbleCard containerClassName="h-full">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex items-start gap-4">
                                        <FaAward className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold text-foreground">{cert.name}</h4>
                                            <p className="text-sm text-muted-foreground mt-1">{cert.issuingOrganization} &middot; {cert.issueDate}</p>
                                        </div>
                                    </div>
                                    {isClickable && (
                                        <FaExternalLinkAlt className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                    )}
                                </div>
                                {cert.description && (
                                    <div className="mt-4">
                                        <p className="text-sm text-foreground/80 leading-relaxed">{cert.description}</p>
                                    </div>
                                )}
                            </WobbleCard>
                        </Component>
                    );
                })}
            </div>
        </div>
    </section>
    );
}
