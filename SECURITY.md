# Security Policy

## Supported versions

Only the latest release receives security fixes.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a vulnerability

Report privately through GitHub Security Advisories ("Report a vulnerability" on the Security tab).
Do not open a public issue for a suspected vulnerability.

Please include:

- affected version or commit,
- platform and OS version,
- reproduction steps or a proof of concept,
- impact assessment.

## What to expect

| Stage                  | Target                                     |
| ---------------------- | ------------------------------------------ |
| Acknowledgement        | 3 business days                            |
| Initial assessment     | 10 business days                           |
| Fix or mitigation plan | 30 days for confirmed high/critical issues |

## Scope notes

- The shell embeds a third-party web client over the network. Session material lives in the
  webview data directory; treat local disk access as in scope.
- Vulnerabilities in Telegram's own client or servers must be reported to Telegram, not here.
- Reports about the remote origin's terms of service are out of scope for this security policy.
