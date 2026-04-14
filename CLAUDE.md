# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check and build for production (tsc -b && vite build)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

There are no tests configured in this project.

## Architecture

This is Robyn Verner's personal portfolio site, a minimal, technical portfolio aimed at design system roles, leading with an accessible component showcase and CSS craft work. The portfolio narrative should be: "I care deeply about the craft — semantics, accessibility, and the medium itself."  

It's a React 19 + TypeScript + Vite SPA using Tailwind CSS v4.

**Routing:** `BrowserRouter` + `ThemeProvider` wrap the app in [src/main.tsx](src/main.tsx). Routes: `/` (Home), `/notes` (Notes), `/notes/:slug` (NoteDetail), `/built-with` (BuiltWith), `/contact` (Contact). The old `/note/:id` route redirects to Home for backwards compatibility.

**Layout:** Single-column centered layout (`max-w-2xl mx-auto`) with a sticky top `Nav` defined in [src/components/Nav.tsx](src/components/Nav.tsx). No sidebar.

**Pages:**
- [src/components/Home.tsx](src/components/Home.tsx) — bio, social links, and a hardcoded `PROJECTS` array rendered as a list
- [src/components/Notes.tsx](src/components/Notes.tsx) — renders the `FEED` from [src/data/notes.ts](src/data/notes.ts) as cards
- [src/components/NoteDetail.tsx](src/components/NoteDetail.tsx) — detail view for notes with a `slug`; renders `body` as Markdown via `react-markdown`
- [src/components/BuiltWith.tsx](src/components/BuiltWith.tsx) — a hardcoded Markdown string rendered via `react-markdown`
- [src/components/Contact.tsx](src/components/Contact.tsx) — contact page

**Notes data:** All feed content lives in [src/data/notes.ts](src/data/notes.ts) as a `FEED: NoteItem[]` array. `NoteType` is `art | article | link | photo | quote | thought`. Notes with a `slug` field get a detail page at `/notes/:slug` with a full `body` (Markdown). `imageSrc` and `videoSrc` reference files in `/public`.

**Theming:** `ThemeProvider` in [src/contexts/ThemeContext.tsx](src/contexts/ThemeContext.tsx) manages `light | dark` theme, persisting to `localStorage` and setting `data-theme` on `<html>`. All color tokens are CSS custom properties in [src/index.css](src/index.css) scoped to `[data-theme]` blocks. `Nav` includes a `ThemeDropdown` to switch themes. Adding a new theme requires one CSS block in `index.css` and one entry in the `THEMES` array in `ThemeContext.tsx`.

**Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`. Uses CSS custom property-based design tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-muted`, etc.) following shadcn/ui conventions. The `cn()` utility in [src/lib/utils.ts](src/lib/utils.ts) merges classes with `clsx` + `tailwind-merge`.

**Page titles:** The `usePageTitle` hook in [src/lib/usePageTitle.ts](src/lib/usePageTitle.ts) sets `document.title` to `"<title> — Robyn Verner"` and resets on unmount. Every page component calls this.

**Dependencies of note:**
- `react-markdown` — renders Markdown content in `BuiltWith` and `NoteDetail`
- `date-fns` — formats note dates in the Notes feed
- `lucide-react` — icons throughout
- `react-router-dom` v7 — client-side routing
