# 1-227 AB "First Attack" Deployment Guide

A lightweight, mobile-friendly website version of the 1-227 Attack Battalion
(1st Air Cavalry Brigade, 1st Cavalry Division) family deployment smart guide.
Built as a single static page with an accordion-style expanding menu so
families can quickly find the section they need: contacts, resources, forms,
and the pre-deployment checklist.

**No build step, no frameworks, no dependencies.** It's plain HTML/CSS/JS, so
anyone can open the files and edit the text directly — including straight
from GitHub's web editor.

## Editing content

Everything lives in a few files:

- [`index.html`](index.html) — all page content. Each topic is a
  `<details class="accordion">…</details>` block. To add a new section,
  copy an existing `<details>` block and edit the text inside it. To change
  wording, numbers, or names, just edit the text directly — no special
  syntax required.
- [`assets/css/styles.css`](assets/css/styles.css) — colors, spacing, and
  layout. Brand colors are defined once at the top as CSS variables
  (`--black`, `--gold`, `--white`, etc.). Unit colors are black and white
  (the 1-227 AB guidon); 1st Cavalry Division colors are black and yellow.
  Brown appears only in the crest artwork itself, never as a site color.
- [`assets/js/app.js`](assets/js/app.js) — small vanilla-JS helpers: expand
  all / collapse all, the search box, checklist progress + autosave, the
  print buttons, and the alert banner (below). You shouldn't need to touch
  this to update content.
- [`alert.json`](alert.json) — the editable content for the alert banner
  (see next section). This is the one file meant to be updated often.

## Alert banner (pushing updates / vital info)

The site can show a dismissible banner at the very top of the page — above
the emergency numbers — for things like "Family Day moved to Saturday" or
"Newsletter delayed a week." It's driven entirely by
[`alert.json`](alert.json), so posting or changing it never requires
touching `index.html`, the CSS, or the JS, and there's no backend or build
step involved.

```json
{
  "active": true,
  "id": "2026-11-08-family-day",
  "level": "warning",
  "message": "Family Day has moved to Saturday, 14 Nov at Hood Stadium.",
  "link": { "text": "Details on Facebook", "url": "https://www.facebook.com/..." }
}
```

- **`active`** — `true` shows the banner, `false` (or deleting the file)
  hides it. Set this to `false` when the notice is no longer relevant.
- **`id`** — any short string you change whenever you update the message.
  Visitors who dismissed an earlier notice (clicked the ✕) will see the new
  one once the `id` changes; if you only edit `message` and leave `id` the
  same, people who already dismissed it won't see it again.
- **`level`** — `"info"` (gold), `"warning"` (bright gold/amber), or
  `"urgent"` (red) — controls the banner color.
- **`message`** — the plain-text notice.
- **`link`** — optional; omit it or leave `"url": ""` for no link.

To turn the banner off entirely, set `"active": false` — you don't need to
delete anything. If `alert.json` is ever missing, unreachable, or has a
typo in it, the banner simply doesn't show; it cannot break the rest of the
site.

### Quick edits on GitHub.com (no local setup needed)

1. Open `index.html` in this repository on GitHub.
2. Click the pencil ("Edit this file") icon.
3. Find the section you want to change, edit the text, and commit directly
   to the `main` branch (or open a pull request if you'd like someone to
   review first).
4. GitHub Pages rebuilds automatically within a minute or two.

### Editing locally

No build tools are required. Just open `index.html` in a browser, or run a
tiny local server from this folder so relative links behave the same as on
GitHub Pages:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Hosting (GitHub Pages)

This repo is set up to be served directly by GitHub Pages from the `main`
branch root:

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`.
4. Save. The site will be live at
   `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## A note on the information in this guide

This guide includes unit contact names, and blank fillable forms (Soldier
Information, Family Leave Form) carried over from the original printed
flipbook. Nothing typed into the on-page forms or the pre-deployment
checklist is ever sent anywhere — it's saved only in each visitor's own
browser (`localStorage`), purely as a convenience, and can be cleared with
the "Reset checklist" button or by clearing site data.

**Personal cell numbers for commanders and first sergeants are
intentionally not published** on this public site — only names/titles and
the institutional HSMC Staff Duty lines (24/7) are listed. Keep it that
way when editing: add institutional numbers (Staff Duty lines, company
phone lines) freely, but route anything tied to one person's personal cell
through "contact via Rear Detachment / SFRG" instead of printing the
number.

Because this is published as a public website, treat any updates to names
or unit details the same way you'd treat the original printed guide — keep
it accurate, and remove or update information about people who have left
the unit.

This is an unofficial, volunteer-maintained reference. It does not replace
official information from your company SFRG leadership or the battalion
Rear Detachment.
