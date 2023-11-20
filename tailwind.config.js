/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '3.953rem',
      '4xl': '6.441rem',
      '5xl': '9.052rem',
      '9xl': '12.052rem',
    },
    extend: {},
  },
  plugins: [],
}

