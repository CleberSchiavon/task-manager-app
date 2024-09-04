const defaultTheme = require("tailwindcss/defaultTheme");
const {nextui} = require('@nextui-org/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...defaultTheme,
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      background: {
        DEFAULT: "#15101C",
      }
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  darkMode: "class",
  plugins: [nextui()]
};
