import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/utils'
import { THEMES, useTheme } from '../contexts/ThemeContext'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Notes', to: '/notes' },
  { label: 'Built With', to: '/built-with' },
]

function ThemeDropdown() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const currentLabel = THEMES.find((t) => t.value === theme)?.label ?? theme

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Theme: ${currentLabel}. Change theme`}
        className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground transition-colors"
      >
        {currentLabel}
        <ChevronDown
          aria-hidden="true"
          className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Theme"
          className="absolute right-0 top-full mt-1 min-w-[100px] rounded-md border border-border bg-card shadow-md z-50 py-1"
        >
          {THEMES.map((t) => (
            <button
              key={t.value}
              role="option"
              aria-selected={t.value === theme}
              onClick={() => {
                setTheme(t.value)
                setOpen(false)
              }}
              className={cn(
                'w-full text-left px-3 py-1.5 text-sm transition-colors',
                t.value === theme
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function Nav() {
  const location = useLocation()

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <header className="w-full border-b border-border bg-background/95 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-foreground hover:opacity-70 transition-opacity"
        >
          robyn verner<span className="cursor-blink ml-px" aria-hidden="true">_</span>
        </Link>
        <div className="flex items-center gap-1">
          <nav aria-label="Main" className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive(link.to) ? 'page' : undefined}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-md transition-colors',
                  isActive(link.to)
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="w-px h-4 bg-border mx-1" aria-hidden="true" />
          <ThemeDropdown />
        </div>
      </div>
    </header>
  )
}
