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
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        }
      },
      boxShadow: {
        'soft': '0 4px 15px rgba(0, 0, 0, 0.05)',
      },
      backgroundColor: {
        'amber-50': '#fffbeb',
        'amber-100': '#fef3c7',
        'amber-200': '#fde68a',
        'amber-300': '#fcd34d',
        'amber-400': '#fbbf24',
        'amber-500': '#f59e0b',
        'amber-600': '#d97706',
        'amber-700': '#b45309',
        'amber-800': '#92400e',
        'amber-900': '#78350f',
        'amber-950': '#451a03',
      },
    },
  },
  plugins: [],
};