import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Library build configuration
  if (mode === 'library') {
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
          include: ['src/components/**/*', 'src/types/**/*', 'src/lib/**/*'],
          exclude: ['src/pages/**/*', 'src/main.tsx', 'src/App.tsx', '**/*.test.*', '**/*.spec.*']
        })
      ],
      build: {
        lib: {
          entry: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/lib/index.ts'),
          name: 'ReactWYSIWYGEditor',
          formats: ['es'],
          fileName: 'index'
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM'
            }
          }
        },
        cssCodeSplit: false
      }
    }
  }

  // Development build configuration
  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    }
  }
}) 