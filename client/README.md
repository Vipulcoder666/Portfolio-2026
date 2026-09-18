# Vipul.dev — Portfolio 2026

Modern, high-performance portfolio for Vipul Shrivastav built with React 19, Vite, GSAP (ScrollTrigger & SplitText), Framer Motion, Lenis smooth scrolling, and CSS Modules with custom design tokens.

## Media Optimization Note

Project images are located in `public/assets/images/`.
To generate optimized WebP and AVIF assets alongside the JPG fallbacks for production:

```bash
# Using cwebp / avifenc or sharp-cli:
npx sharp-cli -i public/assets/images/*.jpg -o public/assets/images/ -f webp -q 85
npx sharp-cli -i public/assets/images/*.jpg -o public/assets/images/ -f avif -q 80
```

`<picture>` tags in `src/components/sections/Work.jsx` automatically serve AVIF / WebP when available with JPG fallback.

## Development & Verification

- Dev Server: `npm run dev`
- Linting: `npx oxlint` (zero warnings configured)
- Production Build: `npm run build`
