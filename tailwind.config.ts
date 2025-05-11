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
  			},
        'toolbar-background': 'var(--toolbar-background)', // For macOS like toolbars
        'sidebar-background': 'var(--sidebar-background)', // For macOS like sidebars
  			sidebar: { // This seems to be from a previous 'sidebar' component, might need review if that component is still used
  				DEFAULT: 'hsl(var(--card))', 
  				foreground: 'hsl(var(--card-foreground))', 
  				border: 'hsl(var(--border))',
          accent: 'hsl(var(--accent))',
          'accent-foreground': 'hsl(var(--accent-foreground))',
          ring: 'hsl(var(--ring))',
  			}
  		},
  		borderRadius: { 
  			lg: 'var(--window-radius)', // For windows
  			md: 'var(--radius)',  // Default for most elements
  			sm: 'calc(var(--radius) - 2px)' 
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
        'fade-in': { /* Updated in globals.css for consistency */
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'pulse-once': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' }, // Slightly less pulse
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out forwards', // Matched globals.css
        'pulse-once': 'pulse-once 0.4s ease-in-out',
  		},
      boxShadow: {
        'input-focus': '0 0 0 2px hsl(var(--ring))',
        'window': 'var(--window-shadow)', // Centralized window shadow
        'dock': 'var(--dock-shadow)',     // Centralized dock shadow
        'lg': '0 8px 25px -5px rgba(0,0,0,0.07), 0 3px 5px -3px rgba(0,0,0,0.05)', 
        'xl': '0 15px 35px -5px rgba(0,0,0,0.08), 0 8px 15px -5px rgba(0,0,0,0.04)',
      },
      spacing: { // Consistent 24px spacing system (example: 1.5rem = 24px, values are illustrative)
        '0.5': '0.125rem', // 2px
        '1': '0.25rem',   // 4px
        '1.5': '0.375rem',// 6px
        '2': '0.5rem',    // 8px
        '2.5': '0.625rem',// 10px
        '3': '0.75rem',   // 12px
        '3.5': '0.875rem',// 14px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '7': '1.75rem',   // 28px
        '8': '2rem',      // 32px
        '9': '2.25rem',   // 36px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
