
"use client";

import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function CertificatesSection() {
    const component = useRef(null);

    useEffect(() => {
        if (!resumeData.certificates || resumeData.certificates.length === 0) return;
        
        let ctx = gsap.context(() => {
            gsap.from(".certificate-card", {
                autoAlpha: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: component.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
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
        <div
            className="certificates-title text-center mb-12"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Certifications</h2>
            <p className="text-lg text-muted-foreground mt-2">My professional credentials.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {resumeData.certificates.map((cert, index) => (
            <div
                key={index}
                className="certificate-card"
            >
                <Card
                className="bg-card/80 border-border/50 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300 rounded-lg shadow-md h-full flex flex-col"
                >
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <Award className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                        <div>
                        <CardTitle className="text-lg md:text-xl font-semibold mb-1">{cert.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{cert.issuingOrganization} &middot; {cert.issueDate}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                    {cert.description && <p className="text-sm text-foreground/80 leading-relaxed mb-4">{cert.description}</p>}
                    {cert.credentialUrl && cert.credentialUrl !== '#' && (
                        <Button asChild variant="link" className="p-0 h-auto text-accent self-start">
                            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                                View Credential <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </CardContent>
                </Card>
            </div>
            ))}
        </div>
        </div>
    </section>
    );
}
