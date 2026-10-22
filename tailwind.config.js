/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#060B0C',
          900: '#0B1315', // Базовый глубокий океанический темный
          850: '#101B1E',
          800: '#162327',
          700: '#22353B',
          600: '#2F4850',
        },
        sand: {
          50: '#FDFBF7',
          100: '#F8F6F0', // Теплый песочно-кремовый
          200: '#EFECE3',
          300: '#E2DDD0',
          400: '#CBC3B1',
        },
        amber: {
          500: '#F59E0B',
          600: '#D97706', // Благородный терракотово-янтарный акцент
          700: '#B45309',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 50px rgba(0, 0, 0, 0.45)',
        'glow-amber': '0 0 35px -5px rgba(217, 119, 6, 0.35)',
      },
    },
  },
  plugins: [],
}
