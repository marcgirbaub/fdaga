/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'landing-bg': "url('/assets/temp-landing-bg.jpg')",
      },
    },
  },
  plugins: [],
};
