# CIA — Content Intelligence Agency

Sales & marketing site for the Content Intelligence Agency, a Dutch AI lab that
structures video into real creative moments, ties each one to viewer
performance, and predicts the winning cut before a euro is spent testing on real
audiences.

A single-page static site in CIA light aesthetic (amber accent, Hanken
Grotesk + JetBrains Mono).

## Structure

```
index.html            # the page
colors_and_type.css   # design-system tokens (colors, type, spacing)
site.css              # page styles
assets/               # logo + product / still imagery
scripts/              # js scripts
```

## Running locally

The page loads CSS, images and the Lucide icon CDN with relative paths, so serve
the directory over HTTP rather than opening the file directly:

```bash
python -m http.server 5500
# then open http://localhost:5500
```
