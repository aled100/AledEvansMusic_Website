/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F1EA',
        gold: '#bda05a',
        coal: '#1d1d1b',
        stone: '#e5dfd6',
      },
      fontFamily: {
        sans: [
          'Montserrat',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
        serif: [
          '"Libre Baskerville"',
          'Georgia',
          'serif',
        ],
      },
    },
  },
  plugins: [],
};