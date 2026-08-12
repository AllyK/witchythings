# Witchy Things — project notes

A small personal portal of rituals, moon work, and dreamwork by Ally Krupar. Plain static
HTML — **no build step, no dependencies, no tracking**. Each page is a self-contained `.html`
file with inline CSS/JS.

## Structure

- `index.html` — the main portal page (links out to the two sections).
- `moon-majic/` — the Moon Majic portal: `index.html` plus `eclipse.html`, `new-moon.html`,
  `full-moon.html` (rituals keyed to the sign the moon is in).
- `dreamwork/` — `index.html` (the dreamwork method) and `dream-log.html`, an offline dream
  tracker that saves entries to the reader's own browser localStorage; nothing is sent anywhere.
  It includes dashboards (feelings over time, distress trends, recurring images), a weekly review,
  and JSON export/import for backups.

## Content principle

Every page states plainly what is **inherited** from a named tradition or source and what is
**invented** as a personal framework. Nothing is presented as a verdict — only the practitioner
decides what any of it means. Preserve this framing when editing.

## Publishing

This is a **single public repo** (unlike the Yoga project's split public/private setup). The repo
here **is** the public site.

- Remote: `origin` → `github.com/AllyK/witchythings`, branch `main`.
- Intended to be served via **GitHub Pages** (Settings → Pages → Deploy from `main`, root),
  giving `https://allyk.github.io/witchythings/`.
- To publish: commit the changed files and `git push`. There is no separate copy step.
- Use **explicit `git add <files>` — never `git add -A`** (this folder lives under OneDrive; keep
  stray artifacts out of commits).

## OneDrive / Windows note

The folder is under OneDrive on Windows. `.gitattributes` normalizes line endings to LF so editor
re-saves don't show whole files as changed. If a commit ever looks like it touched every line of a
file, it's a line-ending issue, not a real diff.
