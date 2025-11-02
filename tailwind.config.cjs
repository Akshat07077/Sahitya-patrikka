/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/styles/**/*.{ts,tsx,css}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5f0',
          100: '#f5ebe0',
          200: '#ead7c0',
          300: '#d4b896',
          400: '#b88b5c',
          500: '#a8703d',
          600: '#8b5a2f',
          700: '#6d4426',
          800: '#4f2f1c',
          900: '#321f12',
        },
        accent: {
          50: '#fef9e7',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        literary: {
          50: '#faf5f3',
          100: '#f3e8e3',
          200: '#e7d0c7',
          300: '#d4b4a5',
          400: '#b8907a',
          500: '#9d6b55',
          600: '#7d5545',
          700: '#5d3f35',
          800: '#3d2a24',
          900: '#1d1513',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'elegant': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

