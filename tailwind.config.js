const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        danger: 'red',
        success: '#16a34a',
        info: '#0070f3',
        warning: '#f5a623',
      },
      animation: {
        slideInUp: 'slideInUp 0.3s ease-in-out',
        slideInDown: 'slideInDown 0.3s ease-in-out',
      },
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(25%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-25%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
