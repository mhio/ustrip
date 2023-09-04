import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { mdi } from 'vuetify/iconsets/mdi-svg'
import "@fontsource/roboto/400.css"
//import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import App from './App.vue'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  }
})

export {}  // Important! See note.

createApp(App)
  .use(vuetify)
  .mount('#app')

