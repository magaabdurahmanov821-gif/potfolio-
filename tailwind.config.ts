import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#09090b',
        cyan: '#5eead4',
        violet: '#a78bfa',
        acid: '#b8ff65',
      },
      fontFamily: {
        display: ['Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 32px rgba(94,234,212,.18)',
      },
    },
  },
  plugins: [],
} satisfies Config
