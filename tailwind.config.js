/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1B1824",
        text: "#C9C9C9",
        accent: "#50FFD5",
        green: "#00C637",
        red: "#C21717",
        yellow: "#FFBD44",
      },
    },
  },
  plugins: [],
};
