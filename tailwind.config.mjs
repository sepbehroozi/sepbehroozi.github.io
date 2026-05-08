/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        ink: {
          base: '#0a0a18',
          elev: '#12122a',
        },
        accent: {
          from: '#c4b5fd',
          to: '#f9a8d4',
        },
      },
    },
  },
  plugins: [],
};
