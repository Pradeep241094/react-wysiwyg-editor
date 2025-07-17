import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'WYSIWYGEditor',
      formats: ['es', 'cjs'],
      fileName: (format) => `wysiwyg-editor.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-image-crop'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-image-crop': 'ReactImageCrop'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'wysiwyg-editor.css';
          return assetInfo.name || '';
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: false
  }
})