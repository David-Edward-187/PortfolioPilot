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
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: { 
  				DEFAULT: 'hsl(var(--card))', 
  				foreground: 'hsl(var(--card-foreground))', 
  				primary: 'hsl(var(--primary))',
  				'primary-foreground': 'hsl(var(--primary-foreground))',
  				accent: 'hsl(var(--accent))',
  				'accent-foreground': 'hsl(var(--accent-foreground))',
  				border: 'hsl(var(--border))',
  				ring: 'hsl(var(--ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)', /* 0.5rem from globals.css */
  			md: 'calc(var(--radius) - 0.125rem)', /* 0.375rem */
  			sm: 'calc(var(--radius) - 0.25rem)' /* 0.25rem */
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
      boxShadow: {
        'input-focus': '0 0 0 2px hsl(var(--ring))',
        'card-hover': '0 14px 28px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.08)', // Enhanced shadow
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.05)', // Adjusted default lg shadow
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.07), 0 8px 10px -6px rgba(0, 0, 0, 0.05)', // Adjusted default xl shadow
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)', // Adjusted default 2xl shadow
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
