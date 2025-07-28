import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 300, // check less often
      ignored: ['**/node_modules/**', '**/dist/**'],
    },    
  },
});
