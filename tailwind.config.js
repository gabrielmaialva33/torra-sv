/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors from Figma
        'torra-orange': '#FF5101',
        'torra-orange-light': '#FF7B3D',
        'torra-dark': '#1A1630',
        'torra-gradient-start': '#42437B',
        'torra-gradient-end': '#181945',
        
        // Grays from Figma
        'torra-gray': {
          100: '#F0F0F2',
          200: '#EBECF1',
          300: '#E3E4E9',
          400: '#DBE2EB',
          500: '#6C757D',
          600: '#495057',
        }
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'torra-card': '0px 6px 8px 0px rgba(4, 4, 7, 0.1)',
        'torra-footer': '16px 0px 16px 0px rgba(24, 23, 38, 0.06)',
        'torra-button': '0px 0px 10px -5px rgba(112, 94, 200, 0.5)',
      },
      borderRadius: {
        'torra-left': '8px 0px 0px 8px',
        'torra-right': '0px 8px 8px 0px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}