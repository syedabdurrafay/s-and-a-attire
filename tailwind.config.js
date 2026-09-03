/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14110E",
        paper: "#F1ECE1",
        paperDim: "#E7E0D0",
        indigo: {
          DEFAULT: "#1F2A44",
          dark: "#141B2E",
        },
        rust: {
          DEFAULT: "#9C3B26",
          light: "#B8532E",
        },
        sand: "#DDD3BE",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};
