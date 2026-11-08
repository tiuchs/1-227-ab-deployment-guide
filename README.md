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

Everything lives in three files:

- [`index.html`](index.html) — all page content. Each topic is a
  `<details class="accordion">…</details>` block. To add a new section,
  copy an existing `<details>` block and edit the text inside it. To change
  wording, numbers, or names, just edit the text directly — no special
  syntax required.
- [`assets/css/styles.css`](assets/css/styles.css) — colors, spacing, and
  layout. Brand colors are defined once at the top as CSS variables
  (`--brown`, `--gold`, `--cream`, etc.) pulled from the unit crest.
- [`assets/js/app.js`](assets/js/app.js) — small vanilla-JS helpers: expand
  all / collapse all, the search box, checklist progress + autosave, and the
  print buttons. You shouldn't need to touch this to update content.

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

This guide includes unit contact names and phone numbers, and blank
fillable forms (Soldier Information, Family Leave Form) carried over from
the original printed flipbook. Nothing typed into the on-page forms or the
pre-deployment checklist is ever sent anywhere — it's saved only in each
visitor's own browser (`localStorage`), purely as a convenience, and can be
cleared with the "Reset checklist" button or by clearing site data.

Because this is published as a public website, treat any updates to names,
phone numbers, or unit details the same way you'd treat the original
printed guide — keep it accurate, and remove or update information about
people who have left the unit.

This is an unofficial, volunteer-maintained reference. It does not replace
official information from your company SFRG leadership or the battalion
Rear Detachment.
