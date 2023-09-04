import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
export default defineConfig({
  build: {
    target: 'es2017',
  },
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
  ],
  resolve: {
    alias: {
      "@": __dirname +'/../src',
    },
  },
})
