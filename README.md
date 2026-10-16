# Webees

Cross-platform desktop shell that hosts [Telegram Web A](https://web.telegram.org/a/) inside a
native window, built with [Tauri v2](https://tauri.app).

> Webees is not affiliated with, endorsed by, or sponsored by Telegram. See [Legal](#legal).

## Status

Early skeleton. The main window loads `https://web.telegram.org/a/` directly. Native IPC for the
remote origin, packaging and the remaining work are tracked in
[ADR 0001](docs/adr/0001-desktop-shell-architecture.md#deferred) and the roadmap below.

`pnpm dev` still serves the local surface on its own; it is the fallback shell surface and the
compile-time asset source, not what the main window shows.

## Requirements

| Dependency         | Version  | Notes                                                        |
| ------------------ | -------- | ------------------------------------------------------------ |
| Node.js            | >= 22.12 | see `.nvmrc`                                                 |
| pnpm               | >= 10    | pinned through `packageManager`                              |
| Rust               | >= 1.90  | Tauri 2.12 MSRV                                              |
| Platform toolchain | -        | Xcode CLT (macOS), WebView2 (Windows), WebKitGTK 4.1 (Linux) |

## Quick start

```sh
pnpm install
pnpm tauri dev
```

## Scripts

| Script             | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| `pnpm dev`         | Vite dev server for the local surface           |
| `pnpm build`       | Type-check and build the local surface          |
| `pnpm tauri dev`   | Run the desktop shell                           |
| `pnpm tauri build` | Bundle the desktop application                  |
| `pnpm check`       | Typecheck, ESLint, Prettier, rustfmt and Clippy |

## Project layout

```text
index.html      local surface entry point
src/            local surface (TypeScript, CSS)
src-tauri/      Rust shell, Tauri configuration, capabilities
assets/         icon source used by `pnpm tauri icon`
docs/adr/       architecture decision records
```

The committed icons under `src-tauri/icons/` are generated placeholders. Regenerate them after
replacing `assets/icon-source.png` (1024x1024):

```sh
pnpm tauri icon assets/icon-source.png
```

## Quality gates

- Conventional Commits enforced by commitlint.
- Pre-commit hook runs lint-staged (ESLint, Prettier, rustfmt).
- CI runs the front-end checks plus `cargo fmt`, `cargo clippy` on Linux, macOS and Windows.

## Roadmap

- [x] Load the remote Web A origin in the main window.
- [ ] Grant the remote origin an explicit, minimal IPC scope.
- [ ] Fallback surface when the remote origin fails to load.
- [ ] Native window controls, unread badge, `tg://` deep-link forwarding.
- [ ] Minimum-engine capability detection with a clear fallback surface.
- [ ] Final brand assets, then signed bundles for macOS, Windows and Linux.
- [ ] CODEOWNERS once the maintainer team is defined.

## Legal

- This repository ships **no Telegram source code**. It points a webview at a remote origin.
- Telegram Web A is licensed under **GPL-3.0**. A build that bundles its artifacts must be
  relicensed to GPL-3.0 as a whole; see
  [ADR 0001](docs/adr/0001-desktop-shell-architecture.md#license-impact).
- "Telegram" is a trademark of Telegram FZ-LLC. Do not use it in the product name or branding of
  redistributed builds.

## License

[MIT](LICENSE)
