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
        'primary-blue': {
          DEFAULT: '#000000',
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#E0E0E0',
          300: '#C0C0C0',
          400: '#B0B0B0',
          600: '#B0B0B0',
          700: '#000000',
          800: '#000000',
          900: '#000000'
        },
        'primary-green': {
          DEFAULT: '#B0B0B0',
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#E0E0E0',
          300: '#C0C0C0',
          400: '#B0B0B0',
          600: '#B0B0B0',
          700: '#000000',
          800: '#000000',
          900: '#000000'
        },
        primary: {
          blue: '#000000',
          green: '#B0B0B0',
          dark: '#000000',
          light: '#FFFFFF'
        },
        'primary-dark': '#000000',
        slate: {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#E0E0E0',
          300: '#C0C0C0',
          400: '#B0B0B0',
          500: '#B0B0B0',
          600: '#B0B0B0',
          700: '#C0C0C0',
          800: '#E0E0E0',
          900: '#000000'
        }
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