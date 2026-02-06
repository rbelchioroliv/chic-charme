/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#72dcc9',
          DEFAULT: '#4cbfa6', // Cor da logo Chic & Charm
          dark: '#3aa088',
          bg: '#f0fdfa', // Fundo suave
        },
        dark: {
          900: '#1a1a1a',
          800: '#2d2d2d'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'slow-spin': 'spin 10s linear infinite',
      }
    },
  },
  plugins: [],
}