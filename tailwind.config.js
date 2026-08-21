/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        tierra: '#2D241E',
        crema: '#fdfbf7',
        rojo: '#C0392B',
        dorado: '#C9972B',
        doradoClaro: '#F0C040',
        oscuro: '#1A1210',
        marron: '#4A3728'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Lato', 'sans-serif']
      }
    }
  },
  plugins: []
};
