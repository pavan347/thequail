# The Quail — Farmhouse Landing Page

A luxurious, modern landing page for The Quail farmhouse with a full-width image slider, booking form (dates, guests, contact), live tax estimate, Google Maps embed, and rich dark theme with gold accents.

## What’s included
- `index.html` — Vite entry + SEO/meta (canonical, OG/Twitter), preload for hero image, and JSON‑LD (LodgingBusiness)
- `src/` — React app source
	- `App.jsx` — Page composition (Navbar, HeroSlider, BookingForm, Ratings, Features, Policies, Partners, LocationMap, AddressInfo, Footer, FAB)
	- `components/` — All UI sections and helpers
	- `styles.css` — Posh dark theme (reflective black) with gold `#EFBF04` accents; responsive styles and a11y helpers
- `public/assets/images/` — Gallery and logo images (now .png files)
- `public/robots.txt`, `public/sitemap.xml` — Basic discoverability

## Run locally (React + Vite)

This branch uses React with Vite.

```powershell
# install deps
npm install

# start dev server
npm run dev

# build for production
npm run build

# preview the built site
npm run preview
```

## Booking behavior
- Dates: booking is by day (no time). Check‑out must be after check‑in; past dates are disabled.
- Guests: selecting the number of guests updates the tax estimate live.
- Tax: flat per‑guest constant `TAX_PER_GUEST_INR` (default ₹150) defined in `src/components/BookingForm.jsx`.
- Booked dates: update the `BOOKED_DATES` array (YYYY‑MM‑DD) in `src/components/BookingForm.jsx`.
- Submit: confirmation modal → sends via EmailJS (if configured) and opens WhatsApp with a prefilled message to +91 93925 76089. Falls back to `mailto:` if EmailJS isn’t configured.

## Optional: Client‑side email via EmailJS
If you prefer emails to be sent automatically from the page without opening an email app:
1. Create a free account at https://www.emailjs.com/ and set up a Service and a Template (include fields like name, phone, email, guests, checkin, checkout, nights, tax, notes).
2. Copy `.env.example` to `.env` and fill these variables:
	- `VITE_EMAILJS_PUBLIC_KEY`
	- `VITE_EMAILJS_SERVICE_ID`
	- `VITE_EMAILJS_TEMPLATE_ID`
3. No CDN is required in React. The app uses the npm package `@emailjs/browser` and falls back to `mailto:` if not configured or on error.
4. Environment variables in Vite must start with `VITE_`. They are read in `src/components/BookingForm.jsx` via `import.meta.env`.

## Map
We use a Google Maps search embed with the query `thequail.in` (no API key required). Update the iframe URL in `src/components/LocationMap.jsx` with your exact address or coordinates when available.

## Styling notes
- Theme uses a reflective black background with subtle gold gradients and glass borders.
- Accent color: `#EFBF04` (gold). You can tweak CSS variables at the top of `src/styles.css`.
- Fixed navbar, mobile menu, and floating WhatsApp/phone actions included by default.

## Images
- The slider now uses `.png` images located under `public/assets/images/`.
- Add/replace files there and update the `GALLERY_IMAGES` array in `src/components/HeroSlider.jsx` if filenames change.
- Images are referenced at `/assets/images/...` and are served directly from Vite’s `public/` folder.

## SEO
- Head tags: canonical, robots, theme‑color, Open Graph/Twitter card
- Structured data: JSON‑LD (`LodgingBusiness`) in `index.html`
- Discoverability: `public/robots.txt` + `public/sitemap.xml`
- Performance: first hero image preloaded; non‑initial slides lazy‑loaded
- Accessibility: skip‑to‑content link and semantic landmarks

## Accessibility
- Semantic landmarks, labeled controls, focus rings, high color contrast, and a visible‑on‑focus skip link.

## License
You’re free to use and modify this site for your project.
