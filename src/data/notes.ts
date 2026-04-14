/**
 * Art — drawings, photos as art, or videos I've made
 * Articles— longer thoughts, written by me
 * Links — non-article things worth bookmarking publicly
 * Photos — a moment, a place, something that caught your eye
 * Quotes — standalone, no explanation needed
 * Thoughts — short observations, not full essays, more like a dispatches format
 */
export type NoteType = 'art' | 'article' | 'link' | 'photo' | 'quote' | 'thought'

export interface NoteItem {
  id: string
  type: NoteType
  date: string
  content: string
  author?: string
  title?: string
  url?: string
  source?: string
  color?: string
  /** If present, thought links to /notes/:slug. In print, a "slug" was 
  a line of metal type used to label a story. When the web borrowed it, it came to mean the URL-safe
  version of a title: lowercase, spaces replaced with hyphens, no special characters. */
  slug?: string
  /** Full markdown body for thought detail pages */
  body?: string
  /** Path to image file in /public for photo and art entries */
  imageSrc?: string
  /** Medium descriptor for art entries, e.g. "pencil", "digital", "film" */
  medium?: string
}

export const FEED: NoteItem[] = [
  {
    id: 'note-11',
    type: 'quote',
    date: '2026-04-14',
    content: "How can the rest of us achieve such enviable freedom from clutter? The answer is to clear our heads of clutter. Clear thinking becomes clear writing; one can’t exist without the other.",
    author: 'William Zinsser, On Writing Well',
  },
  {
    id: 'note-10',
    type: 'link',
    date: '2026-04-03',
    title: "Unhook Chrome extension: Hide reels from YouTube for good (and more)",
    content: "Finally! This extension allows you to get a cleaner interface to focus on the content. :)",
    url: 'https://chromewebstore.google.com/detail/unhook-remove-youtube-rec/khncfooichmfjbepaaaebmommgaepoid',
  },
  {
    id: 'note-09',
    type: 'article',
    date: '2026-04-02',
    content: "Reading notes: Travels with Charley in Search of America — John Steinbeck",
    slug: 'travels-with-charley',
    body: `*Picked up after a Tim Ferriss episode. Cracked it open during a strong case of wanderlust.*

Steinbeck loads his poodle Charley into a truck camper named Rocinante and drives across America. That’s mostly it. And somehow it’s enough.

He’s funny and sharp and a little curmudgeonly, and it suits the road perfectly. His sense of humor and curiosity remind me of Richard Feynman, in a way. 

Here are some quotes I loved.

- His description of turkeys: “[…] the only indication I know of that turkeys have any intelligence at all. To know them is not to admire them, for they are vain and hysterical. They gather in vulnerable groups and then panic at rumors.”
- People get tied down to their lives and don’t allow themselves to travel or be free. He saw the value in exploration and freedom, so he prioritized it and made it happen. “And then I saw what I was to see so many times on the journey—a look of longing. ‘Lord! I wish I could go.’”
- Truth about health and spirit: “I began to formulate a new law describing the relationship of protection to despondency. A sad soul can kill you quicker, far quicker, than a germ.”
- How bland food is outside of cities (and a hilarious callout to smut novels). “If this people has so atrophied its taste buds as to find tasteless food not only acceptable but desirable, what of the emotional life of the nation? Do they find their emotional fare so bland that it must be spiced with sex and sadism through the medium of the paperback?”
- His love of the outdoors and nature, and if you’ve ever hunted you know this is true. “But there’s one nice thing about hunting. Even with no birds, you’d rather go than not.”

His observations are the kind of thing you read and immediately recognize in yourself and everyone around you. Loved it. It kept me smiling.`,
  },
  {
    id: 'note-08',
    type: 'quote',
    date: '2026-03-23',
    content: "Profound Idea: Articulation has nothing to do with sounding smart, but with sounding authentic.",
    author: 'Craig Perry',
  },
  {
    id: 'note-07',
    type: 'quote',
    date: '2026-03-20',
    content: "When people say they “don’t find anything interesting,” I wonder if they’ve actually looked around. Everything is interesting.",
    author: 'Dan Koe',
  },
  {
    id: 'note-06',
    type: 'art',
    date: '2026-03-17',
    content: "A digital drawing of a Deinonychus antirrhopus (\"terrible claw\") skull.",
    title: 'Deinonychus antirrhopus - Terrible Claw',
    imageSrc: '/deinonychus-terrible-claw.png',
    medium: 'Procreate, iPad Pro, Apple Pencil'
  },
  {
    id: 'note-05',
    type: 'quote',
    date: '2026-03-15',
    content: "Creativity is a very open, relaxed state where you see connections, patterns, and possibilities that aren’t immediately obvious.",
    author: 'Dan Koe',
  },
  {
    id: 'note-04',
    type: 'quote',
    date: '2026-03-14',
    content: "Some connections cannot survive once you stop doing all the emotional labor.",
    author: 'Becoming Olivia',
  },
  {
    id: 'note-03',
    type: 'photo',
    date: '2026-03-13',
    title: 'First bike.',
    content: 'Baby Grom go vroom.',
    imageSrc: '/grom.png',
  },
  {
    id: 'note-02',
    type: 'quote',
    date: '2026-03-10',
    content: `The men I know who are genuinely magnetic to women, to opportunity, to other men worth knowing all share almost nothing in terms of routine. They share everything in terms of how fully they’ve committed to their own lives. The missing variable isn’t discipline. It’s texture. Depth. The accumulated weight of a life that has actually gone somewhere, risked something, chosen something. In short: they’re interesting. And interesting, it turns out, is the variable that runs everything else. […] What no course will teach you, because there’s no product to attach to it, is that the foundation isn’t a better morning. It’s a more interesting life. One with actual stakes. Real choices made. Things pursued not because they were sensible but because they mattered to you specifically, for reasons that are yours.`,
    author: 'Hayes Carrera'
  },
  {
    id: 'note-01',
    type: 'link',
    date: '2026-03-06',
    title: "Connecting Interests for a Clearer \"Why\"",
    content:
      "I’ve struggled with balancing hobbies and interests for years. I came across this article that helps you create a bigger \“why\”, a clearer view of the life you’re building and how all these interests are building to it. Here’s my statement: \"I am building a life where beauty, mastery, and physical presence converge — where my body is a refined instrument, my home and style are curated expressions of my inner world, and I create digital experiences that bring that same sense of beauty and coherence to other people.\"",
    url: 'https://ideas.profoundideas.com/p/this-is-how-you-can-properly-manage',
    source: 'substack.com',
  },
]
