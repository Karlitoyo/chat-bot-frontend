/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6C5CE7',  // Custom primary color
        'secondary': '#FF7675', // Custom secondary color
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: ["dark",
      {
        mytheme: {
          primary: '#6C5CE7',    // Primary color
          secondary: '#FF7675',  // Secondary color
          accent: '#00B894',     // Accent color
          neutral: '#2D3436',    // Neutral background
          'base-100': '#ffffff', // Card background
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}