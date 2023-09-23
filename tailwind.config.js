/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          red: "#78002C",
          brown: "#AE4E38",
          peach: "#FFB1A7",
          cream: "#F0D9C7",
          pink: "#FDD5D3",
          error: "#FF5858",
        },
      },
    },
  },
  plugins: [],
};
