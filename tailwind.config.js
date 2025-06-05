/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from Figma
        'torra': {
          'orange': {
            DEFAULT: '#FF5101',
            'light': '#FF7B3D',
          },
          'dark': '#1A1630',
          'purple': {
            'light': '#42437B',
            'dark': '#181945',
          },
          'gray': {
            50: '#FFFFFF',
            100: '#F0F0F2',
            150: '#EFEFEF',
            200: '#EBECF1',
            300: '#E3E4E9',
            400: '#DBE2EB',
            500: '#6C757D',
            600: '#495057',
            900: '#000000',
          }
        }
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '1.1', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'input': ['15px', { lineHeight: '1.171875', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '2.8125', fontWeight: '700', letterSpacing: '0.45px' }],
        'footer': ['13px', { lineHeight: '1.21', fontWeight: '400' }],
      },
      boxShadow: {
        'card': '0px 6px 8px 0px rgba(4, 4, 7, 0.1)',
        'footer': '16px 0px 16px 0px rgba(24, 23, 38, 0.06)',
        'button': '0px 0px 10px -5px rgba(112, 94, 200, 0.5)',
      },
      borderRadius: {
        'left-panel': '8px 0px 0px 8px',
        'right-panel': '0px 8px 8px 0px',
        'input-left': '3px 0px 0px 3px',
        'input-right': '0px 5px 5px 0px',
      },
      backgroundImage: {
        'radial-purple': 'radial-gradient(circle at 50% 58%, #42437B 0%, #181945 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '42': '10.5rem',
        '62': '15.5rem',
        '70': '17.5rem',
        '98': '24.5rem',
        '110': '27.5rem',
        '119': '29.75rem',
        '140': '35rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        'screen-min': '1024px',
      },
      width: {
        'login-form': '476.4px',
        'illustration-panel': '443.6px',
      },
      height: {
        'login-panel': '559.7px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
