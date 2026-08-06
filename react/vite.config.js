import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // app.css uses syntax LightningCSS chokes on — minify with esbuild instead.
  css: { transformer: 'postcss' },
  build: { cssMinify: 'esbuild' },
  server: {
    // superbyte-admin is installed via `file:..` (symlink to the repo root,
    // which sits one level above this project). Allow Vite's dev server to
    // serve those files.
    fs: { allow: ['..'] }
  }
})
