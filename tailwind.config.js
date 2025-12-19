/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Accessible color scales for light/dark variants */
        'primary-blue': {
          50: '#f0f9ff',
          100: '#e6f4ff',
          200: '#bae6ff',
          300: '#7cc8ff',
          400: '#60A5FA',
          DEFAULT: '#60A5FA',
          600: '#3b82f6',
          700: '#2563eb',
          800: '#1e40af',
          900: '#172554'
        },
        'primary-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#34D399',
          DEFAULT: '#34D399',
          600: '#10b981',
          700: '#059669',
          800: '#047857',
          900: '#064e3b'
        },
        /* Backwards-compatible shorthand tokens */
        primary: {
          blue: '#60A5FA',
          green: '#34D399',
          dark: '#0f172a',
          light: '#f8fafc'
        },
        'primary-dark': '#0f172a'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}