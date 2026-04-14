import { useSearchParams, Link } from 'react-router-dom'
import { ExternalLink, Quote, Image, FileText, MessageSquare, Palette } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { cn } from '../lib/utils'
import { usePageTitle } from '../lib/usePageTitle'
import { FEED, type NoteItem, type NoteType } from '../data/notes'

const TYPE_META: Record<NoteType, { icon: typeof Quote; label: string }> = {
  art: { icon: Palette, label: 'art' },
  thought: { icon: MessageSquare, label: 'thought' },
  article: { icon: FileText, label: 'article' },
  quote: { icon: Quote, label: 'quote' },
  link: { icon: ExternalLink, label: 'link' },
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
            className="w-full rounded-lg object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={item.title ?? item.content}
            className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center"
          >
            <Icon aria-hidden="true" className="h-8 w-8 text-muted-foreground/30" />
          </div>
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
        {item.content && (
          <p className="text-sm text-muted-foreground">{item.content}</p>
        )}
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
            className="w-full rounded-lg"
          />
        ) : (
          <div
            role="img"
            aria-label={item.content}
            className={cn(
              'w-full aspect-[4/3] rounded-lg flex items-end p-4',
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
        <blockquote className="text-base leading-relaxed text-foreground font-medium mb-2 pl-4 border-l-2 border-foreground/20">
          &ldquo;{item.content}&rdquo;
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
        <div className="flex items-center gap-1.5 mb-2">
          <Icon aria-hidden="true" className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{meta.label}</span>
          <span className="text-xs text-muted-foreground ml-auto">{formatDate(item.date)}</span>
        </div>
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
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-1.5">
          <Icon aria-hidden="true" className="h-3 w-3 text-muted-foreground shrink-0" />
          <span className="text-xs text-muted-foreground">{meta.label}</span>
        </div>
        <span className="text-xs text-muted-foreground">{formatDate(item.date)}</span>
      </div>
      <h3 className="text-sm font-medium text-foreground group-hover:underline underline-offset-2 mb-1.5 leading-snug">
        {item.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-2">
        {item.content}
      </p>
      {item.source && (
        <span className="text-xs text-muted-foreground font-mono">{item.source}</span>
      )}
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
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
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
            'text-xs px-2.5 py-1 rounded-full border transition-colors',
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
              'text-xs px-2.5 py-1 rounded-full border transition-colors',
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
