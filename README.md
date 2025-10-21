# The Quail — Coming Soon Page

An elegant, luxurious "coming soon" page for The Quail farmhouse booking website.

## What's included
- `index.html` — Refined coming soon layout with social links
- `styles.css` — Luxurious design with gold accents and elegant typography
- `script.js` — Smooth page transitions
- `assets/icons/quail-feather.svg` — Brand logo
- `assets/images/` — Your farmhouse photos used in background

## Features
- ✨ Elegant serif typography (Cormorant Garamond & Montserrat)
- 🎨 Sophisticated gold color scheme with subtle animations
- � Rotating farmhouse background images
- 🌟 Subtle glow and shimmer effects
- 📱 Fully responsive luxury design
- 🔗 Social media links (Instagram, Facebook, Twitter)

## Quick start
Simply open `index.html` in your browser, or serve it locally:

### Local server (PowerShell)
```powershell
# Python 3
python -m http.server 8000

# or Node.js
npx serve -l 8000 .
```

Then visit http://localhost:8000

## Customize

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --bg: #0a0a0a;           /* Background */
  --text: #f5f5f0;         /* Text color */
  --gold: #d4af37;         /* Primary gold accent */
  --gold-light: #f0d878;   /* Light gold */
  --gold-dark: #b8941f;    /* Dark gold */
  --muted: #c8c5bc;        /* Secondary text */
}
```

### Background Images
The page rotates through your farmhouse images. To customize, edit the animation in `styles.css`:
```css
@keyframes backgroundSlide {
  0%, 100% { 
    background: url('assets/images/1.jpeg') center/cover no-repeat;
  }
  33% { 
    background: url('assets/images/5.avif') center/cover no-repeat;
  }
  66% { 
    background: url('assets/images/8.avif') center/cover no-repeat;
  }
}
```

### Typography
The page uses two elegant Google Fonts:
- **Cormorant Garamond** (serif) for headings - classic, refined
- **Montserrat** (sans-serif) for body text - modern, clean

### Social Links
Update the `href` attributes in `index.html`:
```html
<a href="https://instagram.com/yourhandle" ...>
<a href="https://facebook.com/yourpage" ...>
<a href="https://twitter.com/yourhandle" ...>
```

## File structure
```
thequail/
├── index.html          # Coming soon page
├── styles.css          # Styles with animations
├── script.js           # Countdown & form logic
├── README.md           # This file
└── assets/
    └── icons/
        └── quail-feather.svg
```

## Browser Support
Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Next Steps
When you're ready to launch the full website:
1. Switch to the main branch
2. Replace `index.html` with the full landing page
3. Update navigation and booking system

## License
Free to use and modify for your project.
