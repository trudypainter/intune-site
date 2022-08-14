/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      neongreen: "#4AFE2C",
      black: "black",
      white: "white",
    },
    fontFamily: {
      sans: ["Arial Narrow"],
    },
  },
  plugins: [],
};
