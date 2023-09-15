import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { mdi, aliases } from 'vuetify/iconsets/mdi-svg'
import '@fontsource/roboto/400.css'
import './styles/main.scss'

import { mdiContentCopy, mdiOpenInNew, mdiMenu, mdiLightbulb } from './icons'
import App from './App.vue'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      'content-copy': mdiContentCopy,
      'open-in-new': mdiOpenInNew,
      'menu': mdiMenu,
      'lightbulb': mdiLightbulb,
    },
    sets: {
      mdi,
    },
  }
})

export {}  // Important! See note.

createApp(App)
  .use(vuetify)
  .mount('#app')
