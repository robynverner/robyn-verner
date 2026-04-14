# robyn-verner

Personal portfolio and notes. Built to be minimal, fast, and content-first. No ads, no tracking, no noise.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- react-router-dom v7

## Dev

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check and build
npm run preview   # Preview production build
```

## Structure

Content lives in [`src/data/notes.ts`](src/data/notes.ts). Add a note by appending to the `FEED` array — no CMS, no database.

Themes are CSS custom properties in [`src/index.css`](src/index.css). Adding one requires a single `[data-theme]` block and an entry in [`src/contexts/ThemeContext.tsx`](src/contexts/ThemeContext.tsx).
