import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/links': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/api/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/r': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/api/convert': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/api/pdf': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      }
    },
  },
})
