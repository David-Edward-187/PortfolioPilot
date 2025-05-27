
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
        lg: 'var(--radius)', 
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
        'fade-in': { 
          '0%': { opacity: '0', transform: 'translateY(15px) scale(0.98)' }, 
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'pulse-once': { 
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.7' }, 
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out forwards', /* Faster fade-in */
        'pulse-once': 'pulse-once 0.6s ease-in-out', /* Slightly adjusted pulse */
  		},
      boxShadow: {
        'input-focus': '0 0 0 2px hsl(var(--ring))', 
        'sm': '0 1px 2px 0 hsl(var(--foreground) / 0.03)',
        'md': '0 4px 6px -1px hsl(var(--foreground) / 0.05), 0 2px 4px -2px hsl(var(--foreground) / 0.05)',
        'lg': '0 10px 15px -3px hsl(var(--foreground) / 0.07), 0 4px 6px -4px hsl(var(--foreground) / 0.07)',
        'xl': '0 20px 25px -5px hsl(var(--foreground) / 0.1), 0 8px 10px -6px hsl(var(--foreground) / 0.1)',
        '2xl': '0 25px 50px -12px hsl(var(--foreground) / 0.15)',
        'inner': 'inset 0 2px 4px 0 hsl(var(--foreground) / 0.03)',
        // GTA Style Glows - more pronounced
        'glow-primary-sm': '0 0 12px hsl(var(--primary) / 0.7), 0 0 22px hsl(var(--primary) / 0.5)',
        'glow-primary-md': '0 0 20px hsl(var(--primary) / 0.8), 0 0 35px hsl(var(--primary) / 0.6)',
        'glow-accent-sm': '0 0 12px hsl(var(--accent) / 0.7), 0 0 22px hsl(var(--accent) / 0.5)',
        'glow-accent-md': '0 0 20px hsl(var(--accent) / 0.8), 0 0 35px hsl(var(--accent) / 0.6)',
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
