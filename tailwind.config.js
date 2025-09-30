/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'SF Pro Display',
          'Poppins',
          'system-ui',
          'sans-serif'
        ],
      },
      colors: {
        blue: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#1e3a8a',
          900: '#1e3a8a',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        }
      },
      boxShadow: {
        'soft': '0 4px 15px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};