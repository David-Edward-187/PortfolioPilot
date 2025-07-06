"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { createNoise3D } from "simplex-noise";

export const Vortex = ({
  children,
  className,
  containerClassName,
  particleCount = 500,
  rangeY = 100,
  baseHue = 220,
  baseSpeed = 0.1,
  rangeSpeed = 0.2,
  baseRadius = 1,
  rangeRadius = 2,
  backgroundColor = "black",
  particleColors,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
  particleColors?: string[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlePool = useRef<Particle[]>([]);
  const particles = useRef<Particle[]>([]);
  const center = useRef([0, 0]);
  const noise3D = createNoise3D();
  let tick = 0;

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const onResize = () => {
          if (canvasRef.current && containerRef.current) {
            const { offsetWidth, offsetHeight } = containerRef.current;
            canvasRef.current.width = offsetWidth;
            canvasRef.current.height = offsetHeight;
            center.current = [offsetWidth * 0.5, offsetHeight * 0.5];
          }
        };
        window.addEventListener("resize", onResize);
        onResize();
        initParticles();
        const animationFrame = requestAnimationFrame(loop);
        return () => {
          window.removeEventListener("resize", onResize);
          cancelAnimationFrame(animationFrame);
        };
      }
    }
  }, [backgroundColor, particleColors]);

  const initParticles = () => {
    particlePool.current = [];
    for (let i = 0; i < particleCount; i++) {
        const p = new Particle();
        particlePool.current.push(p.init());
    }
  };

  const loop = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d")!;
    if (!ctx) return;

    tick++;
    
    while (particles.current.length < particleCount && particlePool.current.length > 0) {
        const p = particlePool.current.pop();
        if(p) particles.current.push(p);
    }
    
    particles.current = particles.current.filter((p) => {
      const isAlive = p.update();
      if (!isAlive) {
        particlePool.current.push(p.init());
      }
      return isAlive;
    });

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    for (const p of particles.current) {
      p.draw(ctx);
    }
    
    requestAnimationFrame(loop);
  };
  
  class Particle {
    x: number = 0;
    y: number = 0;
    angle: number = 0;
    speed: number = 0;
    radius: number = 0;
    color: string = "";
    birth: number = 0;
    death: number = 0;

    constructor() {}

    init() {
      this.x = center.current[0];
      this.y = center.current[1];
      this.angle = Math.random() * Math.PI * 2;
      this.speed = baseSpeed + Math.random() * rangeSpeed;
      this.radius = baseRadius + Math.random() * rangeRadius;
      this.birth = tick;
      this.death = this.birth + (Math.random() * rangeY * 2 - rangeY) / this.speed;

      if (particleColors && particleColors.length > 0) {
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      } else {
        this.color = `hsla(${baseHue + this.x * 0.1}, 100%, 70%, ${0.4 + Math.random() * 0.5})`;
      }
      return this;
    }

    update() {
      const isAlive = tick < this.death;
      if (!isAlive) return false;

      const noise =
        noise3D(this.x * 0.0025, this.y * 0.0025, tick * 0.001) * Math.PI * 2;
      this.x += Math.cos(this.angle + noise) * this.speed * 5;
      this.y += Math.sin(this.angle + noise) * this.speed * 5;
      this.radius *= 0.985;
      
      return this.radius > 0.1;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  return (
    <div className={cn("relative h-full w-full", containerClassName)}>
        <canvas ref={canvasRef} className="absolute h-full w-full inset-0 z-0" />
        <div ref={containerRef} className={cn("relative z-10 flex h-full w-full items-center justify-center", className)}>
            {children}
        </div>
    </div>
  );
};
