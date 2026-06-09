import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        // Target 1: The heavy React app
        main: resolve(__dirname, 'index.html'),
        // Target 2: The lightweight vanilla JS app
        minimal: resolve(__dirname, 'minimal.html')
      }
    }
  }
})
