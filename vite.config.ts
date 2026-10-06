import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  base: '/MKTG-project-2/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    // Keep the scroll engine separate from the initial page content.
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['gsap', 'lenis'],
        },
      },
    },
  },
});
