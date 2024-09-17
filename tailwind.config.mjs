/** @type {import('tailwindcss').Config} */
import tailwindCssPrimeUI from "tailwindcss-primeui";

export default {
  content: ["./src/**/*.{html,vue,js,ts,jsx,tsx,mjs,mts}", "./lib/**/*.{html,vue,js,ts,jsx,tsx,mjs,mts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [tailwindCssPrimeUI]
};
