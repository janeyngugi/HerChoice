/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#6D28D9',
        'brand-light': '#F3E8FF',
        'brand-accent': '#EC4899',
      }
    },
  },
  plugins: [],
}
