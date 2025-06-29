
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
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-delay': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' },
        },
        'tilt': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'ping-slow': {
          '75%, 100%': {
            transform: 'scale(1.8)',
            opacity: '0',
          },
        },
  		},
  		animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float-delay 8s ease-in-out infinite',
        'tilt': 'tilt 15s ease-in-out infinite',
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
  		},
      boxShadow: {
        'glow-primary': '0 0 20px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--primary) / 0.3)',
        'glow-accent': '0 0 20px hsl(var(--accent) / 0.7), 0 0 40px hsl(var(--accent) / 0.4)',
        'input-focus': '0 0 0 2px hsl(var(--input-border))'
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
