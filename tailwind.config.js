module.exports = {
  purge: {
    enabled: true,
    content: [
      './client/src/**/*.html',
      './client/src/**/*.jsx',
    ],
},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    inset: {
      '25': 25
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
