/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'usmc-scarlet': '#CC0000',
        'usmc-gold': '#FFC300',
        'navy-blue': '#000080',
        'light-bg': '#F5F5F5',
        'light-text': '#333333',
        'light-text-secondary': '#666666',
        'dark-bg': '#1A202C',
        'dark-text': '#F0F4F8',
        'dark-text-secondary': '#A0AEC0',
        'light-accent': '#E2E8F0',
        'dark-accent': '#2D3748',
      },
      transition: {
        'colors': 'color 0.3s ease, background-color 0.3s ease',
      },
      animation: {
        'pulse-fade': 'pulse-fade 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-fade': {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}