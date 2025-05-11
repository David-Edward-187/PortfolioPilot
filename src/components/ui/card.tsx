import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "card", // This class now applies base card styling from globals.css
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6", className)} // Increased space-y for better header spacing
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement, // Changed to HTMLDivElement as it wraps h-tags from globals.css
  React.HTMLAttributes<HTMLHeadingElement> // Kept HTMLHeadingElement for props type
>(({ className, children, asChild, ...props }, ref) => {
  const Comp = asChild ? "div" : "h3"; // Default to h3 or allow asChild prop
  return (
  // Assuming CardTitle will be used with h2 or h3 from globals.css for semantic HTML
  // This component provides styling for that heading.
  <Comp // Changed from h3 to div to allow flexible heading levels
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight", // Base styles, specific text size (e.g. text-h3) comes from usage
      className
    )}
    {...props}
  >
    {children}
  </Comp>
  );
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { asChild?: boolean }
>(({ className, asChild, children, ...props }, ref) => {
  const Comp = asChild ? "div" : "p";
  return (
  <Comp // Changed to p for semantic correctness
    ref={ref}
    className={cn("text-muted-foreground", className)} // text-sm removed, will inherit from body or p
    {...props}
  >
    {children}
  </Comp>
  );
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-4", className)} // Adjusted padding
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
