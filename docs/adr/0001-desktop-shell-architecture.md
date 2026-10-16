# ADR 0001: Desktop shell architecture

- Status: Accepted
- Date: 2026-10-17
- Deciders: project maintainers

## Context

The goal is a cross-platform application that presents Telegram Web A
(`https://web.telegram.org/a/`) as a native window, without maintaining a fork of the client.

Observed constraints (verified 2026-10-17):

| Constraint                                   | Evidence                                                                                      |
| -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| The official page cannot be framed           | `X-Frame-Options: deny` on `/`, `/a/` and `/k/`                                               |
| The client is a heavy SPA                    | WebAssembly crypto, web workers, IndexedDB, WebAuthn                                          |
| The official build anticipates native shells | bundle contains `window.tauri`, `set_window_title`, `data-tauri-drag-region`, `body.is-tauri` |
| Upstream targets modern engines only         | `browserslist: ["baseline widely available"]`                                                 |
| iOS cannot use a third-party engine          | App Store rules require WebKit for app webviews                                               |

## Decision

1. Use **Tauri v2** with the **system webview** rather than bundling a browser engine.
2. Load the remote origin as a **top-level navigation**, never inside an iframe.
3. Keep the local surface (this repository's `src/`) as the application shell: window chrome,
   native integration and fallback UI.
4. Grant native IPC to the remote origin only through an explicit capability scope, added when the
   remote surface is wired up.
5. Certificate: this repository is MIT while it contains no upstream code.

Implemented in `src-tauri/tauri.conf.json` as `app.windows[].url = "https://web.telegram.org/a/"`.
The window therefore performs a top-level navigation and is unaffected by the origin's
`X-Frame-Options: deny`.

## Consequences

- Rendering depends on the platform webview: WebView2 (Windows), WKWebView (macOS, iOS),
  WebKitGTK (Linux), Android WebView. Linux WebKitGTK is the weakest link and is the most likely
  candidate for a CEF-based desktop build if it proves incompatible.
- Engine versions differ across platforms. Feature detection and a minimum-version gate are
  required; pixel-identical rendering across platforms is explicitly not a goal.
- The Rust shell must be updated to pick up Tauri security fixes, and Chromium/WebKit fixes arrive
  with the operating system.

## Deferred

- The IPC scope that the remote origin needs.
- Notification bridge (web push inside a webview is not reliable).
- `tg://` deep-link handling.
- Replacing the placeholder icon in `assets/icon-source.png` before the first public release
  (`pnpm tauri icon assets/icon-source.png` regenerates `src-tauri/icons/`).

## Alternatives considered

| Alternative                          | Why not now                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------- |
| Electron                             | Consistent Chromium, but 100 MB+ baseline and a heavier runtime for a text-first client     |
| Flutter + CEF / `webview_cef`        | Viable for desktop, but Linux still needs the CEF path and the mobile targets gain nothing  |
| Reverse proxy of the official origin | Breaks origin-bound behavior, adds no capability, and reuses Telegram's own API credentials |
| Bundling a fork of the client        | Requires an own `api_id` and makes the whole distribution GPL-3.0                           |

## License impact

This repository currently contains no Telegram code, so MIT applies. If a future build bundles
artifacts from `Ajaxy/telegram-tt` or `morethanwords/tweb` (both GPL-3.0), the distributed work as
a whole must be GPL-3.0 and the license files must be updated in the same change.

## API credential policy

Using Telegram's own `api_id` from a third-party distribution is not permitted by Telegram. A build
that bundles a client fork must register its own credentials at
<https://my.telegram.org> and inject them at build time. Loading the official origin in a webview
does not change this rule.
