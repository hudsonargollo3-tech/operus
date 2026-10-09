import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        operus: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#2766E6', // Electric Cobalt Blue
          600: '#1B58D6', // Authentic Operus Primary Core Blue
          700: '#1646BB', // Deep Royal Sapphire
          800: '#0f172a', // Dark Slate
          900: '#090d16', // Dark Obsidian
          950: '#052035',
        },
        slate: {
          850: '#151f32',
          900: '#0f172a',
          950: '#090d16',
        },
        lime: {
          300: '#a3e635',
          400: '#84cc16',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
        },
        cyan: {
          400: '#06b6d4',
        },
        rose: {
          400: '#f43f5e',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;