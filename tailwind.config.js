/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", './public/index.html'],
  theme: {
      extend: {
        backgroundImage: {
          'radial-eclipse-bottom' : 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
          'cyan-gradient' : 'linear-gradient(45deg, rgb(103, 137, 250), rgb(47, 50, 234))',
          'background-gradient' : 'radial-gradient(ellipse at bottom, #262d6a, #3253d6, #07002e)',
          'card-gradient' : 'linear-gradient(45deg, #0e0542, #172286)'
        },
        colors : {
          customSkyblue: '#b8bde3',
          customBlue: 'rgb(36, 57, 149)',
          customCobalt: 'rgba(104, 116, 189, 0.3)'
        },
        screens: {
          sm: {  max: "480px" },
          md: { min: "481px", max: "1080px" },
        },
        fontFamily: {
          sans: ['"Noto Sans KR"', 'sans-serif'],
          serif: ['serif']
        },
        boxShadow: {
          dropboxShadow: '3px 3px 3px 5px rgba(63, 63, 156, 0.04)',
          sortbtnHoverShadow: 'rgba(0, 255, 255, 0.525) 0px 5px 20px',
          cardShadow: '0 10px 25px rgba(51, 51, 51, 0.8)',
          cardHoverShadow: '0px 10px 20px rgba(4, 0, 255)'
        },
        width: {
          'calc-100-minus-200': 'calc(100% - 200px)',
        },
      },
  },
  plugins: [
  ],
};