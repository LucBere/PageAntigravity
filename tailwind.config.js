/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gymPrimary: '#f97316', // Orange/red commonly used in fitness
        gymDark: '#0a0a0a',
        gymGray: '#171717',
        gymBorder: '#262626',
      }
    },
  },
  plugins: [],
}
