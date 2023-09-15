import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { execSync } from 'node:child_process'

const commit_hash_short = execSync('git rev-parse --short HEAD').toString().trim()
console.log(`running on commit #${commit_hash_short}`)
export default ({mode}) => defineConfig({
  define: {
    __GIT_COMMIT__: JSON.stringify(commit_hash_short),
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
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
