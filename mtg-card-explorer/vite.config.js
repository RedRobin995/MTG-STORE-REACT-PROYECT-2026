import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required for GitHub Pages: asset paths must be relative so they work at
  // https://<user>.github.io/<repo>/ instead of breaking at /
  base: './',
})
