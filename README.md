# Apex Coaching — Website

A multi-page marketing website for Apex Coaching, a strength & conditioning coaching brand. Static HTML/CSS/JS — no build step, no framework, no dependencies beyond Google Fonts.

## Quick start

No installation needed. Two ways to view it:

1. **Double-click `index.html`** to open it directly in a browser.
2. **Local server (recommended)**, since some browsers restrict local file access:
   ```bash
   cd fitness-site
   python3 -m http.server 8000
   # then open http://localhost:8000
   ```

To deploy, upload the whole folder as-is to any static host (Netlify, Vercel, GitHub Pages, S3, cPanel, etc.) — there's nothing to build or compile.

## File structure

```
fitness-site/
├── index.html              Homepage
├── about.html               Coach bio, timeline, certifications
├── programs.html             Pricing tiers + full comparison table
├── program-details.html      Deep-dive page for a single program
├── results.html               Client transformations (filterable)
├── testimonials.html          Client reviews + featured review
├── blog.html                   Article grid
├── contact.html                 Contact form
├── booking.html                  Consultation booking form
├── 404.html                       Error page
├── css/
│   └── style.css                 All styles (single shared stylesheet)
├── js/
│   └── main.js                     All interactivity (single shared script)
└── images/
    ├── hero/                         Homepage hero background
    ├── coach/                         Coach portrait, certifications wall
    ├── transformations/                 Before/after client photos
    ├── workouts/                          Coaching action shots
    ├── nutrition/                          Meal prep photography
    └── lifestyle/                           App mockup, testimonial graphic,
                                              awards, candid photos
```

Every page links to the same `css/style.css` and `js/main.js`, so a style or script change in one place updates the whole site.

## Customization

### Colors & fonts
All design tokens live at the top of `css/style.css`:

```css
:root{
  --bg: #0B0B0B;
  --accent: #2F6FED;      /* primary brand color */
  --accent-dim: #1E4FAE;
  --accent-tint: #101B33;
  --font-display: 'Archivo', sans-serif;
  --font-body: 'Inter', sans-serif;
  ...
}
```
Change `--accent` and its two variants to re-theme the entire site in one edit.

### Text content
Every page is plain HTML — open the file and edit the text directly. There's no CMS or templating; headings, prices, testimonials, and blog copy all live inline in each `.html` file.

### Images
Images are organized by purpose under `images/`. To swap one out, replace the file (keep the same filename) or update the `src` path in the relevant HTML file. Recommended specs:
- Hero background: ~2000px wide, landscape
- Coach portrait: portrait orientation, at least 1200px tall
- Transformation/blog photos: ~1600px on the long edge

Images are already compressed for web (JPEG, quality ~82–85). If you add new images, compress them similarly before uploading (e.g. with [Squoosh](https://squoosh.app) or `magick convert -quality 82`).

### Navigation & footer
The header and footer markup is repeated on every page (no shared include system, since this is plain static HTML). To change a nav link or footer column, update it — it currently needs to be changed on all 10 pages. If you outgrow this, consider migrating to a static site generator (11ty, Astro, Hugo) or a templating build step.

## Features

- **Fully responsive** — mobile menu, stacking grids, and fluid typography down to ~360px wide
- **Scroll-triggered animations** — fade-up reveals, staggered card entrances, animated stat counters, respecting `prefers-reduced-motion`
- **Interactive components**: testimonial carousel, FAQ accordion, results filter, form validation (contact + booking), mobile nav drawer
- **No external JS dependencies** — everything in `js/main.js` is vanilla JavaScript

## Forms

The contact and booking forms perform **client-side validation only** (required fields, email format) and show a success state — they don't actually send data anywhere yet. To make them functional, connect the `<form>` elements to a backend endpoint, form service (Formspree, Netlify Forms, etc.), or your own API, and update the JS in `js/main.js` (`form[data-validate]` submit handler) accordingly.

## Known limitations

- Header/footer are duplicated per page rather than shared via includes — fine for a 10-page site, but worth revisiting if the site grows significantly
- No CMS — all content is hand-edited HTML
- Placeholder links: social icons, "Privacy policy," and "Terms" in the footer point to `#` and need real URLs
- Phone number and studio address are placeholders — update in `contact.html`, `booking.html`, and the shared footer across all pages
