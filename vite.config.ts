import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/art-courses/', // match your repo name exactly
   build: {
    outDir: 'build' // Optional — only if you want `build` instead of `dist`
  },
  plugins: [react()],
})
