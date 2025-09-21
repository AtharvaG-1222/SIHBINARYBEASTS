/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: ["bg-landing"],  // ✅ ensures Tailwind keeps your custom class
  theme: {
    extend: {},
  },
  plugins: [],
};