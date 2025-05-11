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
>(({ className, children, ...props }, ref) => (
  // Assuming CardTitle will be used with h2 or h3 from globals.css for semantic HTML
  // The actual heading tag (h2, h3) should be used where CardTitle is implemented.
  // This component provides styling for that heading.
  <div // Changed from h3 to div to allow flexible heading levels
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight", // Base styles, specific text size (e.g. text-h3) comes from usage
      className
    )}
    {...props}
  >
    {children}
  </div>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p // Changed to p for semantic correctness
    ref={ref}
    className={cn("text-muted-foreground", className)} // text-sm removed, will inherit from body or p
    {...props}
  />
))
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
```