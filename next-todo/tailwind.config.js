module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        // Define the columns to be 2fr 1fr 1fr
        custom: "12fr 6fr 1fr",
      },
      width: {
        // Define the width of the grid
        grid: "600px",
      },
      colors: {
        black: "#000000",
        "super-dark-grey": "#1A1B26",
        "very-dark-grey": "#20212C",
        "dark-grey": "#2B2C37",
        "lines-dark": "#3E3F4E",
        grey: "#dbdbdb",
        "medium-grey": "#828FA3",
        "lines-light": "#E4EBFA",
        "light-grey": "#F4F7FD",
        "very-light-grey": "#F9FAFC",
        white: "#FFFFFF",
        "main-purple": "#124ec7",
        "main-purple-hover": "#A8A4FF",
        red: "#EA5555",
        "red-hover": "#FF9898",
      },
    },
  },
  variants: {},
  plugins: [
    function ({ addUtilities, e }) {
      const utilities = {};

      for (let i = 1; i <= 100; i++) {
        // Generating up to 100 for example, change as needed
        utilities[`.${e(`grid-rows-${i}`)}`] = {
          "grid-template-rows": `repeat(${i}, auto)`,
        };
      }

      addUtilities(utilities);
    },
  ],
};
