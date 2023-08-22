/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2D9CDB',
        secondary: '#F2994A',
        screen: '#E3F3FF',
        listItem: '#159CFE14',
        input: '#94D0FC4A',
      },
    },
  },
  plugins: [],
};
