import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Single-page внутренний документ. base '/', деплой-ready (npm run build → Vercel).
export default defineConfig({
  plugins: [react()],
})
