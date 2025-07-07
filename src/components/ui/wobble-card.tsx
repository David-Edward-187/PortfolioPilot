
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={cn(
        "mx-auto w-full bg-card border border-border/50 backdrop-blur-sm relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300",
        containerClassName
      )}
    >
      <div
        className="absolute inset-0 h-full w-full transition-opacity duration-300"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.1), transparent)",
          opacity: isHovering ? 1 : 0.5,
        }}
      />
      <motion.div
        style={{
          transform: isHovering
            ? `translate3d(${-mousePosition.x * 0.25}px, ${
                -mousePosition.y * 0.25
              }px, 0)`
            : "translate3d(0px, 0px, 0)",
          transition: "transform 0.3s ease-out",
        }}
        className={cn("h-full p-6 sm:p-8 relative z-10", className)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
