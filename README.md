# CIA — Content Intelligence Agency

Sales & marketing site for the Content Intelligence Agency, a Dutch AI lab that
structures video into real creative moments, ties each one to viewer
performance, and predicts the winning cut before a euro is spent testing on real
audiences.

A single-page static site in the CIA dark aesthetic (amber accent, Hanken
Grotesk + JetBrains Mono).

## Structure

```
site/
  index.html            # the page
  colors_and_type.css   # design-system tokens (colors, type, spacing)
  site.css              # page styles
  assets/               # logo + product / still imagery
```

## Running locally

The page loads CSS, images and the Lucide icon CDN with relative paths, so serve
the `site/` directory over HTTP rather than opening the file directly:

```bash
python -m http.server 5500 --directory site
# then open http://localhost:5500
```

## Notes

- The cost-row figures in the problem section (70% / €Ms / 1×) are illustrative
  placeholders — swap in real numbers when available.
