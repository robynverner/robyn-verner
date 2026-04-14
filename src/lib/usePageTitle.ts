import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} — Robyn Verner` : 'Robyn Verner'
    return () => {
      document.title = 'Robyn Verner'
    }
  }, [title])
}
