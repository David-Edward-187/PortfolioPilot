
"use client";

import { resumeData } from '@/data/resume';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from 'next-themes';

// Helper to parse HSL strings (e.g., "255 85% 65%") into numbers
const parseHsl = (hsl: string): [number, number, number] | null => {
    if (!hsl) return null;
    const match = hsl.match(/(\d+(\.\d+)?)/g);
    if (!match || match.length < 3) return null;
    return [parseFloat(match[0]), parseFloat(match[1]), parseFloat(match[2])];
};

export function HeroSection() {
  const component = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  // Animation for the Gemini-style canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const primaryColorHslStr = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    const accentColorHslStr = getComputedStyle(document.documentElement).getPropertyValue('--accent');
    
    const primaryHsl = parseHsl(primaryColorHslStr);
    const accentHsl = parseHsl(accentColorHslStr);
    
    const colors = [
        primaryHsl ? `hsl(${primaryHsl[0]}, ${primaryHsl[1]}%, 60%)` : 'hsl(255, 85%, 65%)',
        accentHsl ? `hsl(${accentHsl[0]}, ${accentHsl[1]}%, 55%)` : 'hsl(185, 100%, 50%)',
    ];

    const setCanvasDimensions = () => {
      canvas.width = component.current?.clientWidth || window.innerWidth;
      canvas.height = component.current?.clientHeight || window.innerHeight;
    };

    class Path {
        x: number;
        y: number;
        radius: number;
        speed: number;
        color: string;
        angle: number;
        lineWidth: number;

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * (canvas.width / 8) + (canvas.width / 12);
            this.speed = (Math.random() - 0.5) * 0.005;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.angle = Math.random() * Math.PI * 2;
            this.lineWidth = Math.random() * 2 + 0.5;
        }

        draw(context: CanvasRenderingContext2D) {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, this.angle, this.angle + Math.PI * 1.5);
            context.strokeStyle = this.color;
            context.lineWidth = this.lineWidth;
            context.stroke();
        }

        update() {
            this.angle += this.speed;
            if (this.x > canvas.width + this.radius || this.x < -this.radius || this.y > canvas.height + this.radius || this.y < -this.radius) {
                // Reset particle if it goes off-screen
                if (Math.random() > 0.5) {
                    this.x = Math.random() > 0.5 ? -this.radius : canvas.width + this.radius;
                    this.y = Math.random() * canvas.height;
                } else {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() > 0.5 ? -this.radius : canvas.height + this.radius;
                }
            }
        }
    }

    let paths: Path[] = [];
    const pathCount = 12;

    const init = () => {
      setCanvasDimensions();
      paths = [];
      for (let i = 0; i < pathCount; i++) {
        paths.push(new Path());
      }
    };
    
    const animate = () => {
        const bgColor = resolvedTheme === 'dark' ? 'rgba(3, 8, 21, 0.1)' : 'rgba(255, 255, 255, 0.1)';
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        paths.forEach(path => {
            path.update();
            path.draw(ctx);
        });
        animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
    };
  }, [resolvedTheme]);

  // GSAP animations for the text and CTA
  useEffect(() => {
    gsap.set(".hero-title-line", { y: "100%" });
    gsap.set(".hero-cta", { opacity: 0, scale: 0.8 });
    
    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(".hero-title-line", {
      y: "0%",
      duration: 1,
      ease: "power4.out",
      stagger: 0.15,
    }).to(".hero-cta", {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.8");
  }, []);

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const renderHeadline = () => {
    const nameParts = resumeData.name.split(' ');
    const nameFirst = nameParts[0];
    return `Hi, I’m ${nameFirst}`;
  };

  return (
    <section ref={component} id="home" className="relative h-screen min-h-[700px] w-full bg-background flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70"></canvas>
      <div className="absolute inset-0 z-10 bg-gradient-radial from-transparent via-background/60 to-background"></div>
      
      <div className="relative z-20 container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white overflow-hidden py-2">
            <div className="hero-title-line inline-block">{renderHeadline()}</div>
        </h1>
        <h2 className="text-3xl md:text-5xl font-medium text-foreground overflow-hidden py-1">
          <div className="hero-title-line inline-block">{resumeData.title}</div>
        </h2>
        <div className="hero-cta mt-10">
            <Button
              size="lg"
              onClick={handleContactClick}
              className="bg-primary text-primary-foreground text-lg h-14 px-8 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:glow-shadow-primary active:scale-100 group"
            >
              Let's Connect <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
        </div>
      </div>
    </section>
  );
}
