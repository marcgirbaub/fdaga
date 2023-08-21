/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'landing-bg': "url('/temp-landing-bg.jpg')",
      },
    },
  },
  plugins: [],
};
