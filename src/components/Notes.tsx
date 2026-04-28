import { useSearchParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { ExternalLink, Link as LinkIcon, Quote, Image, FileText, MessageSquare, Palette } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { cn } from '../lib/utils'
import { usePageTitle } from '../lib/usePageTitle'
import { FEED, type NoteItem, type NoteType } from '../data/notes'

const TYPE_META: Record<NoteType, { icon: typeof Quote; label: string }> = {
  art: { icon: Palette, label: 'art' },
  thought: { icon: MessageSquare, label: 'thought' },
  article: { icon: FileText, label: 'article' },
  quote: { icon: Quote, label: 'quote' },
  link: { icon: LinkIcon, label: 'link' },
  photo: { icon: Image, label: 'photo' },
}

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'MMM d, yyyy')
  } catch {
    return dateStr
  }
}

function FeedCard({ item }: { item: NoteItem }) {
  const meta = TYPE_META[item.type]
  const Icon = meta.icon

  if (item.type === 'art') {
    return (
      <div className="space-y-2">
        {item.title && (
          <p className="text-sm font-medium text-foreground">{item.title}</p>
        )}
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title ?? item.content}
            className="w-full rounded-lg object-cover image-outline"
          />
        ) : (
          <div
            role="img"
            aria-label={item.title ?? item.content}
            className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center image-outline"
          >
            <Icon aria-hidden="true" className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}
        {item.content && (
          <p className="text-sm text-muted-foreground">{item.content}</p>
        )}
        <div className="flex items-center gap-1.5">
          <Icon aria-hidden="true" className="h-3 w-3 text-muted-foreground" />
          {item.medium ? (
            <span className="text-xs text-muted-foreground">{item.medium}</span>
          ) : (
            <span className="text-xs text-muted-foreground">{meta.label}</span>
          )}
          <span className="text-xs text-muted-foreground ml-auto">{formatDate(item.date)}</span>
        </div>
      </div>
    )
  }

  if (item.type === 'photo') {
    return (
      <div className="space-y-2">
        {item.title && (
          <p className="text-sm font-medium text-foreground">{item.title}</p>
        )}
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.content}
            className="w-full rounded-lg image-outline"
          />
        ) : (
          <div
            role="img"
            aria-label={item.content}
            className={cn(
              'w-full aspect-[4/3] rounded-lg flex items-end p-4 image-outline',
              item.color ?? 'bg-muted'
            )}
          >
            <span aria-hidden="true" className="text-xs font-medium text-white bg-black/60 px-2 py-1 rounded">
              {item.content}
            </span>
          </div>
        )}
        {item.content && (
          <p className="text-sm text-muted-foreground">{item.content}</p>
        )}
        <div className="flex items-center gap-1.5">
          <Icon aria-hidden="true" className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{formatDate(item.date)}</span>
        </div>
      </div>
    )
  }

  if (item.type === 'quote') {
    return (
      <div className="py-2">
        <blockquote className="feed-quote">
          {item.content}
        </blockquote>
        <div className="flex items-center gap-1.5 pl-4">
          <Icon aria-hidden="true" className="h-3 w-3 text-muted-foreground" />
          {item.author ? (
            <cite className="text-xs text-muted-foreground not-italic">— {item.author}</cite>
          ) : (
            <span className="text-xs text-muted-foreground">{meta.label}</span>
          )}
          <span className="text-xs text-muted-foreground ml-auto">{formatDate(item.date)}</span>
        </div>
      </div>
    )
  }

  if (item.type === 'thought') {
    const inner = (
      <>
        <p className={cn(
          'text-base leading-relaxed text-foreground mb-3',
          item.slug && 'group-hover:underline underline-offset-2 decoration-foreground/30'
        )}>
          {item.content}
        </p>
        <div className="flex items-center gap-1.5">
          <Icon aria-hidden="true" className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{meta.label}</span>
          <span className="text-xs text-muted-foreground ml-auto">{formatDate(item.date)}</span>
        </div>
      </>
    )

    if (item.slug) {
      return (
        <Link to={`/notes/${item.slug}`} className="group block py-1">
          {inner}
        </Link>
      )
    }

    return <div className="py-1">{inner}</div>
  }

  if (item.type === 'article') {
    const inner = (
      <>
        {item.title && (
          <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
        )}
        <p className="text-base leading-relaxed text-foreground">
          {item.content}
        </p>
        {item.slug && (
          <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-foreground/60 group-hover:text-foreground transition-colors">
            Read more <span aria-hidden="true">→</span>
          </span>
        )}
        <div className="flex items-center gap-1.5 mt-3">
          <Icon aria-hidden="true" className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{meta.label}</span>
          <span className="text-xs text-muted-foreground ml-auto">{formatDate(item.date)}</span>
        </div>
      </>
    )

    if (item.slug) {
      return (
        <Link to={`/notes/${item.slug}`} className="group block py-1">
          {inner}
        </Link>
      )
    }

    return <div className="py-1">{inner}</div>
  }

  // link, bookmark
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block py-1"
    >
      <h3 className="text-sm font-medium text-foreground mb-1.5 leading-snug">
        <span className="group-hover:underline underline-offset-2">{item.title}</span>
        <ExternalLink aria-hidden="true" className="inline-block h-3 w-3 ml-1 align-baseline text-muted-foreground" />
      </h3>
      <div className="text-sm text-muted-foreground leading-relaxed mb-2 space-y-3">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p>{children}</p>,
          }}
        >
          {item.content}
        </ReactMarkdown>
      </div>
      {item.source && (
        <span className="block text-xs text-muted-foreground font-mono mb-2">{item.source}</span>
      )}
      <div className="flex items-center gap-1.5">
        <Icon aria-hidden="true" className="h-3 w-3 text-muted-foreground shrink-0" />
        <span className="text-xs text-muted-foreground">{meta.label}</span>
        <span className="text-xs text-muted-foreground ml-auto">{formatDate(item.date)}</span>
      </div>
      <span className="sr-only">(opens in new tab)</span>
    </a>
  )
}

const ALL_TYPES = Object.keys(TYPE_META) as NoteType[]

export function Notes() {
  usePageTitle('Notes')
  const [searchParams, setSearchParams] = useSearchParams()
  const activeType = (searchParams.get('type') as NoteType | null) ?? null

  const presentTypes = ALL_TYPES.filter((t) => FEED.some((n) => n.type === t))
  const filtered = activeType ? FEED.filter((n) => n.type === activeType) : FEED

  function setFilter(type: NoteType | null) {
    if (type === null) {
      setSearchParams({})
    } else {
      setSearchParams({ type })
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 fade-up-stagger">
      <div className="mb-10">
        <h1 className="font-serif italic text-4xl leading-[1.05] tracking-[-0.02em] text-foreground mb-2">
          Notes
        </h1>
        <p className="text-sm text-muted-foreground">
          Quotes I keep coming back to. Articles worth reading. Places I have been.
          Things I want to remember.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by type">
        <button
          onClick={() => setFilter(null)}
          className={cn(
            'tap-scale relative font-mono text-[11px] tracking-[0.04em] px-2.5 py-0.5 rounded-full border',
            'after:absolute after:inset-x-0 after:top-1/2 after:h-10 after:-translate-y-1/2 after:content-[""]',
            activeType === null
              ? 'bg-foreground text-background border-foreground'
              : 'bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground'
          )}
        >
          All
        </button>
        {presentTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type === activeType ? null : type)}
            aria-pressed={type === activeType}
            className={cn(
              'tap-scale relative font-mono text-[11px] tracking-[0.04em] px-2.5 py-0.5 rounded-full border',
              'after:absolute after:inset-x-0 after:top-1/2 after:h-10 after:-translate-y-1/2 after:content-[""]',
              type === activeType
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground'
            )}
          >
            {TYPE_META[type].label}
          </button>
        ))}
      </div>

      <div className="space-y-10 divide-y divide-border">
        {filtered.map((item) => (
          <div key={item.id} className="pt-8 first:pt-0">
            <FeedCard item={item} />
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Updated sporadically. No newsletter. No algorithm.
        </p>
      </div>
    </div>
  )
}
