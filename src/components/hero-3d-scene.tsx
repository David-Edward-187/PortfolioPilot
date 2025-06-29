@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

html {
  scroll-behavior: smooth;
}

@keyframes pan-grid {
  0% { background-position: 0% 0%; }
  100% { background-position: 40px 40px; }
}

@layer base {
  :root {
    /* Futuristic Dark Theme */
    --background: 224 71% 4%;    /* #010816 - Very Dark Blue */
    --foreground: 220 20% 90%;    /* #dce1e9 - Light Grayish Blue */
    
    --card: 224 50% 12%;           /* #0f172a - Dark Slate Blue */
    --card-foreground: 220 20% 90%; 
    
    --popover: 224 71% 4%;         
    --popover-foreground: 220 20% 90%; 
    
    --primary: 250 80% 60%;     /* #8c66ff - Vibrant Violet */
    --primary-foreground: 0 0% 100%; /* White */
    
    --secondary: 220 40% 20%;    /* #26314a - Muted Dark Blue */
    --secondary-foreground: 220 15% 75%; /* #b1b8c5 - Muted Light Gray */
    
    --muted: 220 40% 15%;        /* #1c2539 - Darker Muted */
    --muted-foreground: 220 15% 55%;  /* #7c8596 - Muted Gray */
    
    --accent: 190 90% 50%;      /* #19e3ff - Bright Cyan/Neon Blue */
    --accent-foreground: 224 71% 4%;   /* Dark Blue for text on accent */
    
    --destructive: 0 75% 55%;    
    --destructive-foreground: 0 0% 100%; 
    
    --border: 220 30% 25%;       /* #2e3a59 - Subtle Blue Border */
    --input: 220 40% 10%;        /* #131a29 - Very Dark Input */
    --input-border: 250 80% 60%;   /* Primary Violet for input focus */
    --ring: 190 90% 50%;          /* Accent Cyan for focus ring */
    
    --radius: 0.5rem;

    --chart-1: hsl(var(--primary));
    --chart-2: hsl(var(--accent));
    --chart-3: hsl(var(--primary) / 0.7);
    --chart-4: hsl(220 10% 50%);
    --chart-5: hsl(220 10% 70%);
  }

  .dark {
    /* Same as root for a dark-only theme */
    --background: 224 71% 4%;
    --foreground: 220 20% 90%;
    --card: 224 50% 12%;
    --card-foreground: 220 20% 90%;
    --popover: 224 71% 4%;
    --popover-foreground: 220 20% 90%;
    --primary: 250 80% 60%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 40% 20%;
    --secondary-foreground: 220 15% 75%;
    --muted: 220 40% 15%;
    --muted-foreground: 220 15% 55%;
    --accent: 190 90% 50%;
    --accent-foreground: 224 71% 4%;
    --destructive: 0 75% 55%;
    --destructive-foreground: 0 0% 100%;
    --border: 220 30% 25%;
    --input: 220 40% 10%;
    --input-border: 250 80% 60%;
    --ring: 190 90% 50%;
    --radius: 0.5rem;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .glassmorphic {
    @apply bg-card/50 backdrop-blur-lg border border-white/10;
  }
  
  .glow-shadow-primary {
    box-shadow: 0 0 15px hsl(var(--primary) / 0.4), 0 0 30px hsl(var(--primary) / 0.2);
  }

  .glow-shadow-accent {
    box-shadow: 0 0 15px hsl(var(--accent) / 0.5), 0 0 30px hsl(var(--accent) / 0.3);
  }

  .text-glow-accent {
    text-shadow: 0 0 8px hsl(var(--accent) / 0.8);
  }

  /* Section Fade In Animation */
  .section-reveal {
    opacity: 0;
    transform: translateY(40px);
    filter: blur(10px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out;
  }
  
  .section-reveal.visible {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }

  section { 
    @apply py-24 md:py-32; 
  }

  .container {
    @apply px-6 sm:px-8; 
  }
}

@layer utilities {
  .bg-grid-pattern {
    background-image:
      linear-gradient(to right, hsl(var(--border) / 0.4) 1px, transparent 1px),
      linear-gradient(to bottom, hsl(var(--border) / 0.4) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: pan-grid 30s linear infinite;
  }
  .bg-gradient-radial {
     background-image: radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 70%);
  }
}