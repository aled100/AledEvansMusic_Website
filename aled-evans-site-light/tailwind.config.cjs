
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F1EA',
        gold: '#bda05a',
        coal: '#1d1d1b',
        stone: '#e5dfd6'
      },
      fontFamily: {
        serif: ['"Libre Baskerville"', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
};
