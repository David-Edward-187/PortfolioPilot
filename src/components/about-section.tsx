
"use client";

import { resumeData } from '@/data/resume';
import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaReact } from 'react-icons/fa';
import { IoLogoHtml5, IoLogoCss3, IoLogoJavascript } from 'react-icons/io5';
import { About3DScene } from './about-3d-scene';


gsap.registerPlugin(ScrollTrigger);

const skillIcons: { [key: string]: React.ElementType } = {
  "HTML": IoLogoHtml5,
  "CSS": IoLogoCss3,
  "JS": IoLogoJavascript,
  "React": FaReact,
  "Next.js": () => <span className="font-bold text-sm">N</span>, 
  "GSAP": () => <span className="font-bold text-sm">G</span>
};

export function AboutSection() {
  const component = React.useRef(null);

  React.useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set('.about-3d-container', { autoAlpha: 0, x: -50, filter: 'blur(10px)' });
      gsap.set('.about-content > *', { autoAlpha: 0, y: 40, filter: 'blur(10px)' });
      gsap.set('.skill-icon', { autoAlpha: 0, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      });

      tl.to('.about-3d-container', { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' })
        .to('.about-content > *', { autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.2, duration: 0.8 }, "-=0.5")
        .to('.skill-icon', { autoAlpha: 1, scale: 1, stagger: 0.1, duration: 0.5 }, "-=0.5");
      
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={component}
      className="container mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div 
          className="about-3d-container w-full h-80 md:h-96"
        >
            <About3DScene />
        </div>
        <div className="about-content space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {resumeData.bio}
          </p>
          <div className="pt-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {Object.entries(skillIcons).map(([skill, Icon]) => (
                <div 
                  key={skill}
                  className="skill-icon flex flex-col items-center gap-2 p-3 rounded-lg glassmorphic w-24 h-24 justify-center transition-all duration-200 hover:!bg-primary/10 hover:!scale-105"
                >
                  <Icon size={36} className="text-accent" />
                  <span className="text-xs font-medium text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
