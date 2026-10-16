# Contributing

Thanks for taking the time to contribute. This document describes the workflow the project expects.

## Development setup

1. Install the [requirements](README.md#requirements).
2. `pnpm install`
3. `pnpm tauri dev`
4. Before pushing: `pnpm check`

## Workflow

- Branch from `main`, keep branches short-lived and scoped to one change.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/). Allowed types:
  `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.
- Sign off every commit (`git commit -s`) to certify the
  [Developer Certificate of Origin](https://developercertificate.org/). There is no CLA.
- Keep pull requests small. One logical change per pull request.

## Pull request checklist

- [ ] `pnpm check` passes locally.
- [ ] User-visible changes are described in `CHANGELOG.md` under `Unreleased`.
- [ ] New behavior is covered by a test or a documented manual verification.
- [ ] Architecture-affecting changes add or update an ADR in `docs/adr/`.
- [ ] No secrets, tokens or personal data are committed.

## Code style

- TypeScript: strict mode, no `any` unless justified in review, prefer explicit return types on
  exported functions.
- Rust: `rustfmt` defaults, Clippy with `-D warnings`.
- Formatting is enforced by Prettier and `cargo fmt`; do not hand-format around them.

## Testing expectations

- Rust: unit tests next to the module, integration tests under `src-tauri/tests`.
- Front-end: add a unit test runner together with the first non-trivial module.
- Manual checks must name the platform and the exact steps performed.

## Releases

1. Move `Unreleased` entries in `CHANGELOG.md` into a versioned section.
2. Bump versions in `package.json`, `src-tauri/Cargo.toml` and `src-tauri/tauri.conf.json`.
3. Tag `vX.Y.Z` and push the tag; the release workflow drafts bundles for all targets.

## Reporting security issues

Do not open a public issue. Follow [SECURITY.md](SECURITY.md).
