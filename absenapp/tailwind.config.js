/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'button' : '#93B1A6',
        'button-hover' : '#5C8374'
      }
    },
  },
  plugins: [],
}