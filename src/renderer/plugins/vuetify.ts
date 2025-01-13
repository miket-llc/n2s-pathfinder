import { createVuetify } from 'vuetify'
import { ko, en, zhHans, zhHant, de, es, ja, fr, ru, pt, nl } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css'

export default createVuetify({
  locale: {
    messages: { ko, en, zhHans, zhHant, de, es, ja, fr, ru, pt, nl },
    locale: 'en',
    fallback: 'en'
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'githubDark',
    themes: {
      githubLight: {
        dark: false,
        colors: {
          background: '#ffffff',
          surface: '#f6f8fa',
          primary: '#0969DA',  // Light mode blue
          secondary: '#24292f',
          error: '#cf222e',
          warning: '#dba617',
          info: '#58a6ff',
          success: '#2da44e',
          text: '#24292f'
        }
      },
      githubDark: {
        dark: true,
        colors: {
          background: '#0d1117',
          surface: '#161b22',
          primary: '#1f6feb',  // Dark mode blue
          secondary: '#8b949e',
          error: '#f85149',
          warning: '#d29922',
          info: '#58a6ff',
          success: '#2ea043',
          text: '#c9d1d9'
        }
      }
    }
  }
})
