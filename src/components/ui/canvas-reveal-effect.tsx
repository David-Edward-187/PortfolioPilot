
"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const CanvasRevealEffect = ({
  animationSpeed = 1.5,
  containerClassName,
  colors = [[255, 255, 255]],
  opacities = [0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  dotSize,
  showGradient = true,
}: {
  /**
   * @description The speed of the animation, default is 1.5
   */
  animationSpeed?: number;
  /**
   * @description Classname for the container
   */
  containerClassName?: string;
  /**
   * @description Colors array for the dots
   */
  colors?: number[][];
  /**
   * @description Opacities array for the dots
   */
  opacities?: number[];
  /**
   * @description Size of the dots
   */
  dotSize?: number;
  /**
   * @description Whether to show the gradient
   */
  showGradient?: boolean;
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>(null);
  const [isMouseEntered, setIsMouseEntered] = React.useState(false);

  React.useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        setCtx(context);
      }
    }
  }, []);

  React.useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        canvasRef.current.width = canvasRef.current.parentElement.offsetWidth;
        canvasRef.current.height = canvasRef.current.parentElement.offsetHeight;
      }
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ctx) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const radius = dotSize || 2;
    const r = radius;
    const t = opacities[Math.floor(Math.random() * opacities.length)];
    const c = colors[Math.floor(Math.random() * colors.length)];
    const opacityModifier = 0.2 * Math.random() + 0.8;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${t * opacityModifier})`;
    ctx.fill();
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={cn(
        "h-full w-full relative",
        containerClassName
      )}
    >
      <AnimatePresence>
        {isMouseEntered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            {showGradient && (
              <div
                className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)]"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--primary), var(--accent))",
                  opacity: 0.3,
                }}
              />
            )}
            <canvas ref={canvasRef} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
