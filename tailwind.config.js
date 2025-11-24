/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2fcf5",
          100: "#e1f8e8",
          200: "#c3eed2",
          300: "#94deb2",
          400: "#5bc58e",
          500: "#34a872",
          600: "#268759",
          700: "#226d4b",
          800: "#1f563e",
          900: "#1a4735", // Deep Emerald
        },
        secondary: {
          50: "#fff8f1",
          100: "#ffebd4",
          200: "#ffd4a8",
          300: "#ffb670",
          400: "#ff913d",
          500: "#f96e15", // Burnt Orange
          600: "#ea500c",
          700: "#c23a0c",
          800: "#9a2f12",
          900: "#7c2812",
        },
        dark: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"], // Swapping Inter for Outfit (more modern/geometric)
        serif: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        "hero-pattern":
          "url('https://www.transparenttextures.com/patterns/cubes.png')",
      },
    },
  },
  plugins: [],
};
