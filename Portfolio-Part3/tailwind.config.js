const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./**/*.{html,js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      circle: 'circle',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    }
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}
