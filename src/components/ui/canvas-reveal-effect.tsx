
"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (ctx) {
      draw(ctx, x, y);
    }
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
  };

  let LETS_DRAW = true;

  const draw = (context: CanvasRenderingContext2D, x: number, y: number) => {
    if (!LETS_DRAW) return;
    
    const radius = dotSize || 2;
    let r = radius;
    const t = opacities[Math.floor(Math.random() * opacities.length)];
    const c = colors[Math.floor(Math.random() * colors.length)];
    const e = 0.2 * Math.random() + 0.8;
    
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${t * e})`;
    context.fill();
  };

  React.useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        setCtx(context);
      }
    }
  }, []);

  React.useEffect(() => {
    const resize = () => {
      if (!canvasRef.current || !ctx) return;
      canvasRef.current.width = canvasRef.current.parentElement!.offsetWidth;
      canvasRef.current.height = canvasRef.current.parentElement!.offsetHeight;
      if (isAnimating) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [isAnimating, ctx]);

  React.useEffect(() => {
    if (isAnimating && ctx) {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    }
  }, [isAnimating, ctx]);


  const handleMouseEnter = () => {
    setIsAnimating(true);
  }

  return (
    <div
      className={cn("h-full w-full relative rounded-3xl", containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {isAnimating && (
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
        )}
      </AnimatePresence>
    </div>
  );
};
