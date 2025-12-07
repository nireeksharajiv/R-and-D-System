import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/R-and-D-System/',   // 👈 IMPORTANT: repo name with slashes
})
