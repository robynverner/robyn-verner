import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { FEED, type NoteItem } from '../src/data/notes.ts'

const BASE_URL = 'https://robynverner.com'
const FEED_URL = `${BASE_URL}/feed.xml`

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(dateStr: string): string {
  // dateStr is YYYY-MM-DD; treat as UTC noon to avoid timezone-shifting the date
  const d = new Date(`${dateStr}T12:00:00Z`)
  return d.toUTCString().replace('GMT', '+0000')
}

function itemTitle(note: NoteItem): string {
  if (note.title) return note.title
  const preview = note.content.length > 60
    ? note.content.slice(0, 60).trimEnd() + '…'
    : note.content
  return preview
}

function itemLink(note: NoteItem): string {
  return note.slug
    ? `${BASE_URL}/notes/${note.slug}`
    : `${BASE_URL}/notes`
}

function itemDescription(note: NoteItem): string {
  // For articles with a full body, include it; otherwise use content
  const text = note.body ?? note.content
  if (note.author) return `${text}\n\n— ${note.author}`
  return text
}

function renderItem(note: NoteItem): string {
  const title = escapeXml(itemTitle(note))
  const link = itemLink(note)
  const description = itemDescription(note)
  const pubDate = toRfc822(note.date)
  const guid = `${BASE_URL}/notes#${note.id}`

  return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`
}

// Sort newest-first (FEED may already be ordered, but make it explicit)
const sorted = [...FEED].sort((a, b) => b.date.localeCompare(a.date))

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Robyn Verner</title>
    <link>${BASE_URL}</link>
    <description>Notes, links, quotes, and other things worth sharing.</description>
    <language>en-us</language>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${sorted.map(renderItem).join('\n')}
  </channel>
</rss>
`

const outPath = resolve(import.meta.dirname, '../public/feed.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`RSS feed written to public/feed.xml (${sorted.length} items)`)
