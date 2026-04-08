# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static HTML website for **Toploader Trading Co.**, a Pokémon card shop in Owensboro, KY. Hosted on GitHub Pages (`elijaheckstein-droid.github.io`). No build process, no dependencies, no package manager.

## Development

Open files directly in a browser — there is no dev server or build step. Changes to `.html` files are immediately reflected when the page is refreshed.

## Pages

- `index.html` — Main landing page: hero, card showcase grid, event schedule, contact section, mobile nav, phone popup overlay
- `bulk.html` — Bulk card price estimator: calculator with per-category inputs, live price breakdown in a sticky result panel
- `appointment.html` — Appointment booking form for selling singles/slabs/sealed product; submits via `mailto:` link to `info@toploadertrading.com`

## Design System

All CSS lives inline in `<style>` blocks within each HTML file. The design uses CSS custom properties defined in `:root`:

- **Colors:** `--accent: #c8102e` (red), `--black / --black-2 / --black-3` (dark backgrounds), `--off-white / --light` (light backgrounds)
- **Fonts:** `Bebas Neue` (display/headings via `--font-display`), `DM Sans` (body via `--font-body`) — loaded from Google Fonts
- **Layout:** `.container` constrains width to `--max` (1160px on index, 900px on bulk), centered with `margin: 0 auto`

## JavaScript

Vanilla JS only, inline in `<script>` tags at the bottom of each page:
- `index.html`: hamburger menu toggle, phone popup open/close, smooth scroll behavior
- `bulk.html`: `calcTotal()` reads `data-rate` attributes from `.ct-input` elements and updates the live estimate panel
- `appointment.html`: `submitForm()` builds a `mailto:` URL from form fields and redirects; no backend involved

## Deployment

Push to `main` — GitHub Pages auto-deploys. The `CNAME` file sets the custom domain.


## AI Rules
Never run any git commands other than git diff and git status.

You should use Opus 4.6 in medium effort mode for all queries unless otherwise specified.