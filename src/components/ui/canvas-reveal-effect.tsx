
"use client";
import React from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface CanvasRevealEffectProps {
  animationSpeed?: number;
  containerClassName?: string;
  colors?: number[][];
  opacities?: number[];
  dotSize?: number;
  showGradient?: boolean;
}
export const CanvasRevealEffect = ({
  animationSpeed = 1.5,
  containerClassName,
  colors = [[255, 255, 255]],
  opacities = [0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  dotSize,
  showGradient = true,
}: CanvasRevealEffectProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draw(x, y);
  };

  const handleMouseLeave = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsAnimating(false);
  };

  let LETS_DRAW = false;

  const draw = (x: number, y: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (LETS_DRAW) {
      const radius = dotSize || 2;
      let r = radius;
      const t = opacities[Math.floor(Math.random() * opacities.length)];
      const c = colors[Math.floor(Math.random() * colors.length)];
      const e = 0.2 * Math.random() + 0.8;
      const i = 3.6 * (Math.random() - 0.5);
      const s = 3.6 * (Math.random() - 0.5);

      let n = Math.sqrt(Math.pow(x - r, 2) + Math.pow(y - r, 2));
      let o = 1 - n / (20 * animationSpeed);

      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${t * o * e})`;
      ctx.fill();

      r = x + i * (Math.random() * 2.5 * animationSpeed);
      n = y + s * (Math.random() * 2.5 * animationSpeed);
    }
  };

  React.useEffect(() => {
    const render = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      LETS_DRAW = true;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };
    const resize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = canvasRef.current.parentElement!.offsetWidth;
      canvasRef.current.height = canvasRef.current.parentElement!.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();
    if (!isAnimating) {
      setIsAnimating(true);
      render();
    }
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className={cn("h-full w-full relative rounded-3xl", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full w-full"
        >
          {showGradient && (
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-gradient-to-br from-primary/30 to-accent/30" />
          )}
          <canvas ref={canvasRef} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
