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
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#006948', // CitasYa Emerald Primary
          900: '#064e3b',
          950: '#022c22',
        },
        cyan: {
          500: '#06b6d4',
          600: '#0891b2',
        },
        slate: {
          850: '#151f32',
          900: '#0f172a',
          950: '#090d16',
        },
        lime: {
          400: '#a3e635',
          500: '#84cc16', // Electric Lime
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
};

export default config;
