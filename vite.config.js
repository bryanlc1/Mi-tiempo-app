import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import '@jest-environment/jsdom'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  environment: 'jsdom',
})
