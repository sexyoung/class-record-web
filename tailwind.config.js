const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      'lavender-200': '#F1EBF2',
      'lavender-500': '#AF8FB6',
      'lavender-700': '#926C9A',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
