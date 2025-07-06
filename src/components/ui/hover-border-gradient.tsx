
"use client";
import React, { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type HoverBorderGradientProps = {
  children?: React.ReactNode;
  containerClassName?: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  clockwise?: boolean;
  forceDeactivated?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const HoverBorderGradient = forwardRef<
  HTMLElement,
  HoverBorderGradientProps
>(
  (
    {
      children,
      containerClassName,
      className,
      as: Tag = "button",
      duration = 1,
      clockwise = true,
      forceDeactivated = false,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const rotateDirection = clockwise ? 360 : -360;

    const isAnimationActive = hovered && !forceDeactivated;

    return (
      <Tag
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative p-[2px] w-fit h-fit rounded-full",
          containerClassName
        )}
        {...props}
      >
        <div
          className={cn(
            "relative bg-card text-foreground w-full h-full rounded-full px-4 py-1.5 text-sm",
            className
          )}
        >
          {children}
        </div>

        {/* Gradient border */}
        <motion.div
          className={cn("absolute inset-0 rounded-full z-0")}
          style={{
            filter: "blur(2px)",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: isAnimationActive ? 1 : 0,
            rotate: rotateDirection,
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
              background: `conic-gradient(from 0deg at 50% 50%, hsl(var(--primary) / 0.8) 0deg, hsl(var(--accent)) 180deg, hsl(var(--primary) / 0.8) 360deg)`,
            }}
          />
        </motion.div>
      </Tag>
    );
  }
);

HoverBorderGradient.displayName = "HoverBorderGradient";
