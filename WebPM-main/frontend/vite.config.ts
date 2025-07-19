// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin' // <-- Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({ // <-- Add the plugin and its options here
      // Config options...
      // Your `ssr: true` option goes here if needed by the plugin's config.
    }),
  ],
})