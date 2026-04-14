import Markdown from 'react-markdown'
import { usePageTitle } from '../lib/usePageTitle'

const CONTENT = `
# Built With

How this site works — the stack, the decisions, and what drove them.

---

## Stack

**[React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)** — the core.
Vite's dev server is fast enough that there's no friction between idea and seeing it in the browser.
TypeScript keeps the data layer honest; the note feed is a typed array, so adding a malformed entry fails at build time, not at runtime.

**[Tailwind CSS v4](https://tailwindcss.com/)** — v4 replaces \`tailwind.config.js\` with a \`@theme\` block directly in CSS.
Design tokens are CSS custom properties, which means they're composable and inspectable in DevTools without any build step.
Theming is just \`[data-theme]\` attribute selectors in \`index.css\` — no JavaScript required to apply a theme, and adding a new one is a single CSS block.

**[React Router v7](https://reactrouter.com/)** — client-side routing for four routes: \`/\` (home), \`/notes\` (feed),
\`/notes/:slug\` (article detail), \`/built-with\` (this page). The slug-based routing means note URLs are human-readable and stable.

**[react-markdown](https://github.com/remarkjs/react-markdown)** — renders Markdown in the notes feed and article bodies.
Article bodies are stored as template literals in the data file, which keeps everything in one place without needing a CMS or filesystem reads.

**[date-fns](https://date-fns.org/)** — formats note dates in the feed. One import, one function call, no moment.js.

**[lucide-react](https://lucide.dev/)** — icons. Consistent stroke weight, tree-shakeable, no icon font.

---

## Architecture

All content lives in [\`src/data/notes.ts\`](https://github.com/robynverner/robyn-verner/blob/main/src/data/notes.ts) as a typed array.
No database, no CMS, no API calls. Publishing something new means adding an object to the array and pushing.
Fast, predictable, no moving parts.

Notes have a \`type\` field — \`art\`, \`article\`, \`link\`, \`photo\`, \`quote\`, or \`thought\` — which controls how the card renders in the feed.
Only notes with a \`slug\` get a detail page; the rest are feed-only.

Theming is handled by a \`ThemeProvider\` context that reads from \`localStorage\` on mount and sets \`data-theme\` on \`<html>\`.
The CSS does the rest. No class toggling, no inline styles.

Color tokens follow [shadcn/ui](https://ui.shadcn.com/) naming conventions
(\`bg-background\`, \`text-foreground\`, \`text-muted-foreground\`, etc.) so the mental model is consistent
even though this site doesn't use shadcn components directly.
The \`cn()\` utility from \`clsx\` + \`tailwind-merge\` handles conditional class composition without conflicts.

---

## Design decisions

**One column, centered, \`max-w-2xl\`.** I looked at a lot of personal sites before starting.
The ones I kept returning to were the simplest. No hero images, no sidebars, no parallax.
I'm inspired by sites catalogued on [Dead Simple Sites](https://deadsimplesites.com/) — minimal, off-beat, to the point.
The content does the work.

**Monospace for code and technical labels.** JetBrains Mono for anything that signals "this is a technical artifact" —
repo names, tech tags, inline code. It creates visual hierarchy without reaching for color or weight changes.

**Prose styles by hand.** I wrote the article body styles myself instead of pulling in \`@tailwindcss/typography\`.
The plugin is useful in larger projects, but here it would have been more CSS to fight than CSS to write.
Knowing exactly what every rule does is worth more than saving ten minutes.

---

## Source

Open source on [GitHub](https://github.com/robynverner/robyn-verner).
`

export function BuiltWith() {
  usePageTitle('Built With')

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <article className="prose">
        <Markdown
          components={{
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
            ),
          }}
        >
          {CONTENT}
        </Markdown>
      </article>
    </div>
  )
}
