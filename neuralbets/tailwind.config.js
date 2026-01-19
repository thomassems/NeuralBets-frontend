/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainblue': '#07050D',
        'custred': '#3F3',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideDown': 'slideDown 0.3s ease-out',
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scaleIn': 'scaleIn 0.3s ease-out',
        'bounce': 'bounce 1s infinite',
        'betPop': 'betPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(-10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        betPop: {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.8) translateY(20px)',
            borderColor: 'rgba(6, 182, 212, 0.1)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            borderColor: 'rgba(6, 182, 212, 0.6)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1) translateY(0)',
            borderColor: 'rgba(6, 182, 212, 0.1)'
          },
        },
      }
    },
  },
  plugins: [],
}

