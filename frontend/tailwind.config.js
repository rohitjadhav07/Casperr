/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        casper: {
          red: '#FF0011',
          dark: '#1A1A1A',
          gray: '#2D2D2D',
        },
      },
    },
  },
  plugins: [],
}
