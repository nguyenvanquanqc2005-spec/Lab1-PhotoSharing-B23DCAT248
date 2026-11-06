import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite handles React locally; no API proxy or backend is needed in Problem 1.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
});
