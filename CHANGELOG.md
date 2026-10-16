# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Tauri v2 desktop shell skeleton with a local surface.
- Tooling: TypeScript, Vite, ESLint, Prettier, commitlint, lint-staged and Husky.
- CI for front-end checks plus rustfmt and Clippy on Linux, macOS and Windows.
- Release workflow drafting bundles per target.
- Project documentation: README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY and ADR 0001.

### Changed

- The main window loads the remote Telegram Web A origin (`https://web.telegram.org/a/`).
- Bundle identifier changed to `telegram.itok.desktop`.

### Notes

- Native IPC is not granted to the remote origin yet; the capability only covers the local surface.
