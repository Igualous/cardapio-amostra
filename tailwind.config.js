/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C8932A",
        "gold-lt": "#E8B84B",
        dark: "#1A1209",
        charcoal: "#2C2216",
        warm: "#F5ECD7",
        muted: "#8C7A5E",
        cream: "#FFFDF8",
      },
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        inter: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
