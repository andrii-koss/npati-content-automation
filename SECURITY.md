# Security Policy

Security is important for NPATI Content Automation because the plugin connects WordPress to external publishing and marketplace workflows.

## Supported versions

Security updates are provided for the current stable plugin version.

| Version           | Supported |
| ----------------- | --------- |
| 1.0.2             | Yes       |
| 1.0.1 and earlier | No        |

## Reporting a vulnerability

Please do not disclose a suspected vulnerability in a public issue, discussion, pull request, or social media post.

Use the repository's [private vulnerability reporting form](https://github.com/andrii-koss/npati-content-automation/security/advisories/new) when it is available. Include:

- A clear description of the issue and its potential impact.
- The affected plugin version and WordPress version.
- Reproduction steps or a minimal proof of concept.
- Any relevant request, response, log, or configuration details with credentials removed.
- Suggested remediation, if known.

If the private reporting form is unavailable, open a public issue that requests a private contact channel. Do not include vulnerability details in that issue.

Please allow the maintainers time to investigate and prepare a fix before public disclosure.

## Security-sensitive data

Never include passwords, WordPress nonces, NPATI credentials, API keys, OAuth tokens, webhook signatures, private keys, database exports, or personal data in a report.

OpenAI API keys are encrypted and stored locally in WordPress. Social access tokens remain in the NPATI Hub Token Vault and are never stored in WordPress.

## Security design

The plugin uses WordPress capabilities and nonces for administrator actions, validates signed inbound commands, restricts remote publishing by default, sanitizes input, escapes output, and records limited audit activity. More detail is available in the [security model](docs/SECURITY_MODEL.md).
