import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			screens: {
				's': '600px',
				'm': '900px',
				'l': '1200px',
			},
			fontSize: {
				'medium': 'max(1.25rem, 1.8518518519vw)',
				'large': 'max(1.875rem, 5.2083333333vw)',
				'home': 'clamp(3rem, -.057rem + 10.0714vw, 8.5rem)'
			},
			fontFamily: {
				lato: ['Lato', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif'],
			},
		},
	},
  plugins: [],
} satisfies Config