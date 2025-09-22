/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}', 
    "./app/**/*.{js,jsx,ts,tsx}", 
    './components/**/*.{js,jsx,ts,tsx}' // Adjust path to your component directory
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};