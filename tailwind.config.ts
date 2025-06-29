
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
        'progress-bar': {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        'fade-in': { 
          from: { opacity: '0' }, 
          to: { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'blur-clear': {
          from: { filter: 'blur(10px)', opacity: '0' },
          to: { filter: 'blur(0)', opacity: '1' },
        },
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
  		},
  		animation: {
        'progress-bar': 'progress-bar 1.5s ease-out forwards',
        'fade-in': 'fade-in 1s ease-in-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'blur-clear': 'blur-clear 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float-delay 8s ease-in-out infinite',
        'tilt': 'tilt 15s ease-in-out infinite',
  		},
      boxShadow: {
        'glow-primary': '0 0 20px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--primary) / 0.3)',
        'glow-accent': '0 0 20px hsl(var(--accent) / 0.7), 0 0 40px hsl(var(--accent) / 0.4)',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
