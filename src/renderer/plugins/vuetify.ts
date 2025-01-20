import { createVuetify } from 'vuetify'
import { ko, en, zhHans, zhHant, de, es, ja, fr, ru, pt, nl } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VTreeview } from 'vuetify/labs/VTreeview'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components: {
    ...components,
    VTreeview,
  },
  directives,
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
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#0d1117',
          surface: '#161b22',
          primary: '#1f6feb',  // Brighter dark mode blue
          secondary: '#8b949e',
          error: '#f85149',
          warning: '#d29922',
          info: '#58a6ff',
          success: '#2ea043',
          text: '#c9d1d9'
        }
      }
    }
  },
  defaults: {
    VTreeview: {
      expandIcon: 'mdi-chevron-right',
      collapseIcon: 'mdi-chevron-down',
      itemHeight: 28,
    },
    VCard: {
      rounded: 'sm',
      elevation: 0,
    },
    VBtn: {
      size: 'small',
      variant: 'text',
    },
    global: {
      density: 'compact',
    }
  },
})
