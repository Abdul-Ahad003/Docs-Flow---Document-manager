/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Ops: ["Black Ops One", "sans-serif"],
        abee: ["ABeeZee", "sans-serif"],
        Calistoga: ["Calistoga", "serif"],
        Averia: ["Averia Serif Libre", "cursive"],
        Matemasie: ["Matemasie", "cursive"],
        cursive: ["cursive", "cursive"]
      }
    },
  },
  plugins: [],
}

