import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // or whatever port your backend runs on
        changeOrigin: true,
        secure: false,
      },
    },
  },
})