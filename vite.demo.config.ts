import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Demo/development configuration
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'demo-dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
})