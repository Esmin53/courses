/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple':'#8071F1',
        'secondary-purple': '#daccff'
      },
      maxWidth: {
        '8xl': '87.5rem'
      },
      screens: {
        'xs': '460px'
      }
    },
  },
  plugins: [],
}