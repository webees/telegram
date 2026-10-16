import './styles.css';

/**
 * Entry point for the local surface rendered inside the Tauri window.
 *
 * The Telegram Web A client is served from its own origin and is intentionally
 * not bundled into this surface. See docs/adr/0001-desktop-shell-architecture.md.
 */
const root = document.getElementById('app');

if (root) {
  root.dataset.surface = 'local';
}
