import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['/src/details.css', '/src/add.css'], // Exclude the CSS file from Rollup
    },
  },
})