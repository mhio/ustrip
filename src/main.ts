import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
//import { mdi, aliases } from 'vuetify/iconsets/mdi'
import '@fontsource/roboto/400.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import App from './App.vue'


const vuetify = createVuetify({
  //icons: {
  //  defaultSet: 'mdi',
  //  aliases,
  //  sets: {
  //    mdi,
  //  },
  //}
})

export {}  // Important! See note.

createApp(App)
  .use(vuetify)
  .mount('#app')

