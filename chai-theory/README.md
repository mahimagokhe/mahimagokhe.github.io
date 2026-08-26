Chai Theory — Scroll Site

Files:
- index.html — single-page prototype
- styles.css — visual system and layout
- main.js — GSAP + Lenis interactions (module)

Assets (expected paths):
- /assets/video/hero-chai-pour.mp4
- /assets/video/filter-coffee-pour.mp4
- /assets/video/exploded-thali.mp4
- /assets/video/exploded-samosa.mp4
- /assets/video/sweets-macro.mp4
- /assets/video/lassi-matcha-pour.mp4
- /assets/video/finale-table-spread.mp4
- /assets/images/*

Notes:
- Missing videos/images are handled gracefully with placeholders so layout remains intact.
- Open chai-theory/index.html from a local server for best results (videos may not autoplay from file://).

Quick test (from project root):
python -m http.server 8000
then open http://localhost:8000/chai-theory/

Reel capture helper:
- Open the page with `?reel=1` to run the automated controlled scroll sequence that times the exploded-thali payoff for recording.
- Example: `http://localhost:8000/chai-theory/?reel=1`

Capture tips:
- Use Chrome or Edge, 1920x1080 viewport, record at 30 or 60 fps.
- Use the automated sequence for consistent beats; tweak timings in `main.js` under `runReelPlayback()` if needed.
