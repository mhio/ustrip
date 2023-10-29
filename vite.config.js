import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { execSync } from 'node:child_process'

const commit_hash_short = execSync('git rev-parse --short HEAD').toString().trim()
console.log(`running on commit #${commit_hash_short}`)
if (!commit_hash_short) throw new Error('no commit hash could be found')

export default ({mode}) => defineConfig({
  define: {
    __GIT_COMMIT__: (mode === 'production') ? JSON.stringify(commit_hash_short) : JSON.stringify('dev'),
  },
  server: {
    // This allows browser debugging to match lines properly
    hmr: (process.env.DEBUG) ? false : true
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
