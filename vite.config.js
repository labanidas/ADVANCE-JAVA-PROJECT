import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/Medicine': 'http://localhost:9080', // Forward requests to the backend server
    },
  },
})
