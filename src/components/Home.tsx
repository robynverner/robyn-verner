import { ExternalLink, ArrowUpRight, Code, BriefcaseBusiness, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle'

const PROJECTS = [
  {
    name: 'rss-reader',
    description:
      'A simple RSS reader built with React and TypeScript. No ads, no suggested, no attention hijacking. Just your feeds, in a clean and minimal interface.',
    tags: ['React', 'TypeScript', 'CSS', 'Vercel', 'Vite', 'Claude Code'],
    url: 'https://github.com/robynverner/rss-reader',
  },
  {
    name: 'robyn-verner',
    description:
      'This site. Personal portfolio and notes built with React and Tailwind. Minimalistic by design.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Claude Code'],
    url: 'https://github.com/robynverner/robyn-verner',
  },
]

export function Home() {
  usePageTitle('Home')

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Header */}
      <section className="mb-16">
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-3">
          Robyn Verner
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
          Beauty isn't decoration — it's information. I'm a senior frontend engineer specializing in design systems. Currently experimenting with AI to build things better and faster. I despise ads and love a clean, content-first site. Let's make the web cool again.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/robynverner"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in new tab)"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Code className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/robyn-verner-12664055/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in new tab)"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
          <Link
            to="/contact"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border mb-12" aria-hidden="true" />

      {/* Projects */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          Projects
        </h2>
        <div className="space-y-0 divide-y divide-border">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between py-5 hover:bg-muted/30 -mx-3 px-3 rounded-md transition-colors border-l-2 border-transparent hover:border-foreground/25"
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-sm font-medium text-foreground">
                    {project.name}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-sm font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ExternalLink
                aria-hidden="true"
                className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <span className="sr-only">{project.name} on GitHub (opens in new tab)</span>
            </a>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-border space-y-3">
        <p className="text-xs text-muted-foreground">
          <strong>Currently</strong>: listening to <a
            href="https://www.youtube.com/watch?v=clX0sY-gfvk"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Dan Carlin's Hardcore History - Mania for Subjugation II
          </a>
          . Always open to podcast recommendations!
        </p>
      </div>
    </div>
  )
}
