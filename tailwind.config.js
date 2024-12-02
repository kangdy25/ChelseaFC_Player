/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
        backgroundImage: {
          'radial-eclipse-bottom' : 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)'
        },
        colors : {
          customSkyblue: '#b8bde3',
        },
        screens: {
          sm: {  max: "480px" },
          md: { min: "481px", max: "1080px" },
        },
      },
  },
  plugins: [],
};