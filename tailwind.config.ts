
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
        'input-border': 'hsl(var(--input-border))', 
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: { 
  			xl: 'calc(var(--radius) + 4px)', 
        lg: 'var(--radius)', /* Uses CSS variable for consistency: 0.5rem */
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
        'fade-in': { /* Simplified fade-in */
          '0%': { opacity: '0', transform: 'translateY(10px)' }, 
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-once': { /* Kept for potential subtle uses, but not primary glow */
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.8' }, /* Softer pulse */
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'pulse-once': 'pulse-once 0.5s ease-in-out',
  		},
      boxShadow: { // More professional, subtle shadows
        'input-focus': '0 0 0 2px hsl(var(--ring))', 
        'sm': '0 1px 2px 0 hsl(var(--foreground) / 0.04)',
        'md': '0 3px 5px -1px hsl(var(--foreground) / 0.05), 0 2px 3px -2px hsl(var(--foreground) / 0.05)',
        'lg': '0 8px 12px -3px hsl(var(--foreground) / 0.06), 0 3px 5px -4px hsl(var(--foreground) / 0.06)',
        'xl': '0 15px 20px -5px hsl(var(--foreground) / 0.07), 0 6px 8px -6px hsl(var(--foreground) / 0.07)',
        '2xl': '0 20px 30px -12px hsl(var(--foreground) / 0.1)',
        'inner': 'inset 0 1px 2px 0 hsl(var(--foreground) / 0.03)',
        // Removed glow shadows, can be added if specific neon highlights are desired later
      },
      spacing: { 
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem', 
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
