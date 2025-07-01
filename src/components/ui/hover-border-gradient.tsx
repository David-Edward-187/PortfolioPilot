
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
  } & React.HTMLAttributes<HTMLElement>
>) {

  const [hovered, setHovered] = useState(false);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative p-[2px] rounded-full",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "relative bg-card text-foreground rounded-full px-4 py-1.5 text-sm",
          "transition-colors duration-300",
          hovered ? "bg-card/80" : "bg-card",
          className
        )}
      >
        {children}
      </div>

      {/* Gradient border */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
            filter: "blur(3px)",
            zIndex: -1,
        }}
        animate={{
            rotate: 360,
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
        }}
      >
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, hsl(var(--primary) / 0.8) 0deg, hsl(var(--accent)) 180deg, hsl(var(--primary) / 0.8) 360deg)`
          }}
        />
      </motion.div>
    </Tag>
  );
}
