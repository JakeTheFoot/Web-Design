/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "#000000",
        "very-dark-grey": "#20212C",
        "dark-grey": "#2B2C37",
        "lines-dark": "#3E3F4E",
        "medium-grey": "#828FA3",
        "lines-light": "#E4EBFA",
        "light-grey": "#F4F7FD",
        white: "#FFFFFF",
        "main-purple": "#635FC7",
        "main-purple-hover": "#A8A4FF",
        red: "#EA5555",
        "red-hover": "#FF9898",
      },
    },
  },
  plugins: [],
};
