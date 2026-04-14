import { useState } from 'react'
import { usePageTitle } from '../lib/usePageTitle'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function Contact() {
  usePageTitle('Contact')

  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const data = {
      access_key: import.meta.env.VITE_WEB3FORMS_KEY,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) {
        setState('success')
        form.reset()
      } else {
        setErrorMessage(json.message ?? 'Something went wrong. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMessage('Could not send your message. Please check your connection and try again.')
      setState('error')
    }
  }

  const inputClass =
    'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/40 transition-colors'
  const labelClass = 'block text-sm font-medium text-foreground mb-1.5'

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <section className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-3">
          Contact
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Have a question or want to work together? Send me a message and I'll get back to you.
        </p>
      </section>

      {state === 'success' ? (
        <div role="status" className="rounded-md border border-border bg-muted/40 px-5 py-6">
          <p className="text-sm font-medium text-foreground mb-1">Message sent.</p>
          <p className="text-sm text-muted-foreground">Thanks for reaching out — I'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="name" className={labelClass}>Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={state === 'submitting'}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={state === 'submitting'}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              disabled={state === 'submitting'}
              className={`${inputClass} resize-y`}
            />
          </div>

          {state === 'error' && (
            <p role="alert" className="text-sm text-red-500">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={state === 'submitting'}
            className="text-sm px-4 py-2 rounded-md bg-foreground text-background font-medium hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {state === 'submitting' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </div>
  )
}
