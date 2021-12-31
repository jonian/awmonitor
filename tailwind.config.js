module.exports = {
  content: [
    './index.html',
    './src/**/*.vue',
    './src/**/*.js',
    './src/**/*.ts'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      borderColor: {
        DEFAULT: '#E0E0E0'
      }
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px'
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',

      black: '#1A1A1A',
      white: '#FFFFFF',

      gray: {
        lightest: '#F2F2F2',
        lighter: '#E6E6E6',
        light: '#B3B3B3',
        dark: '#808080',
        darker: '#4D4D4D',
        darkest: '#333333'
      },

      primary: '#6563FF',
      cyan: '#29DCB6',
      orange: '#FF684D',
      yellow: '#FAC685',

      success: '#00D455',
      danger: '#FF5555',
      warning: '#FF7F2A',
      info: '#2A7FFF'
    },
    container: {
      center: true,
      padding: '1rem'
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  darkMode: 'class'
}
