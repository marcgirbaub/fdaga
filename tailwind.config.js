/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'landing-bg': "url('/temp-landing-bg.jpg')",
        'services-bg-physioterapy': "url('/physioBg.jpg')",
        'services-bg-dry-needling': "url('/dryNeedlingBg.jpg')",
        'services-bg-deportive-physioterapy': "url('/deportivePhysioBg.jpg')",
      },
      colors: {
        darkBlue: '#335A93',
        lightBlue: '#68b4c4',
        lightGray: '#f3f4f6',
      },
    },
  },
  plugins: [],
};
