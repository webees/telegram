import { defineConfig } from 'vite';

/**
 * The window loads this local surface. The remote Telegram Web A origin is not
 * bundled here; see docs/adr/0001-desktop-shell-architecture.md.
 */
export default defineConfig({
  clearScreen: false,
  server: {
    host: '127.0.0.1',
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
