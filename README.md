# The Quail — Farmhouse Landing Page

A clean, responsive landing page for The Quail, a farmhouse booking website.

## What’s included
- `index.html` — Semantic layout with hero, booking form, sections, and footer
- `styles.css` — Modern dark theme with brand accent, responsive grid/flex
- `script.js` — Mobile nav, smooth scroll, booking defaults/validation
- `assets/icons` — Simple inline SVG icons
- `assets/images` — Put your photos here (`hero.jpg`, interiors, gallery)

## Quick start
Open `index.html` directly in your browser. For best results, serve via a local server to avoid CORS limits on fonts and iframes.

### Optional local server (PowerShell)
```powershell
# Python 3
python -m http.server 8000
# or Node.js
npx serve -l 8000 .
```
Then visit http://localhost:8000

## Customize
- Logo & name: header/footer `The Quail` text and `assets/icons/quail-feather.svg`
- Contact: update mailto/tel links in the Contact section
- Map: replace the OpenStreetMap iframe URL with your coordinates
- Images: add your photos under `assets/images/` and update src paths
- Colors: tweak CSS variables at the top of `styles.css`

## Booking integration
The booking form currently shows a confirmation alert. Hook it to your backend or a service:
- Submit to a server endpoint
- Integrate with a booking platform via their embed/script

## Accessibility
- Skip link, labeled nav/menu, focus rings on inputs
- Sufficient color contrast in dark theme

## License
You’re free to use and modify this template for your project.
