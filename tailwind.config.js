module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html',
      './src/**/*.vue',
      './src/**/*.js',
      './src/**/*.ts'
    ]
  },
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      borderColor:     ['disabled'],
      cursor:          ['disabled'],
      opacity:         ['disabled'],
      textColor:       ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  darkMode: 'class'
}
