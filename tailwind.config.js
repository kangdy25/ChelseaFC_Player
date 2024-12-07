/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
        backgroundImage: {
          'radial-eclipse-bottom' : 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
          'cyan-gradient' : 'linear-gradient(45deg, rgb(103, 137, 250), rgb(47, 50, 234))'

        },
        colors : {
          customSkyblue: '#b8bde3',
          customBlue: 'rgb(36, 57, 149)'
        },
        screens: {
          sm: {  max: "480px" },
          md: { min: "481px", max: "1080px" },
        },
        fontFamily: {
          sans: ['"Noto Sans KR"', 'sans-serif'],
        },
        boxShadow: {
          dropboxShadow: '3px 3px 3px 5px rgba(63, 63, 156, 0.04)',
          sortbtnHoverShadow: 'rgba(0, 255, 255, 0.525) 0px 5px 20px;'
        },
      },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.w-calc-full-200px': {
          width: 'calc(100% - 200px)',
        },
      });
    },
  ],
};