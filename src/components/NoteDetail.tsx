import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { format, parseISO } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import { FEED } from '../data/notes'
import { usePageTitle } from '../lib/usePageTitle'

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'MMMM d, yyyy')
  } catch {
    return dateStr
  }
}

export function NoteDetail() {
  const { slug } = useParams<{ slug: string }>()
  const note = FEED.find((n) => n.slug === slug)

  usePageTitle(note ? note.content.split('.')[0].substring(0, 60) : 'Note')

  if (!note) {
    return <Navigate to="/notes" replace />
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 fade-up-stagger">
      <Link
        to="/notes"
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out mb-12"
      >
        <ArrowLeft
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
        />
        Notes
      </Link>

      <article>
        <header className="mb-10 prose">
          <p className="text-xs text-muted-foreground mb-3 tabular-nums">{formatDate(note.date)}</p>
          <h1>{note.content}</h1>
        </header>

        {note.body && (
          <div className="prose">
            <ReactMarkdown>{note.body}</ReactMarkdown>
          </div>
        )}
      </article>
    </div>
  )
}
