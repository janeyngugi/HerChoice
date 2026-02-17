/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Safety Green
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#34D399', // Lighter Green/Teal
          foreground: '#064E3B',
        },
        accent: {
          DEFAULT: '#F59E0B', // Warning/Amber
          foreground: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#F3F4F6', // Cool Gray
          foreground: '#1F2937', // Dark Gray
        },
        danger: {
          DEFAULT: '#EF4444', // Red
          foreground: '#FFFFFF',
        },
        // Keeping legacy colors for backward compatibility until fully refactored
        'brand-purple': '#6D28D9',
        'brand-light': '#F3E8FF',
        'brand-accent': '#EC4899',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
