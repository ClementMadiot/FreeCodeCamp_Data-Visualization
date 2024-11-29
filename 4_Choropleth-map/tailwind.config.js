/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffffde",
        black: {
          100: "#212121de",
          200: "#121212",
        },
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
