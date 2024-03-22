/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth': "url('./src/assets/backgr.jpg')",
        'user': "url('./src/assets/user.jpg')",
      
      }
    },
  },
  plugins: [],
}