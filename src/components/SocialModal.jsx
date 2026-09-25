import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon.jsx'
import { socials } from '../data.js'

export default function SocialModal({ open, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    if (!open) return

    lastFocus.current = document.activeElement
    document.body.classList.add('is-locked')
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 60)

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      const items = panelRef.current.querySelectorAll('a[href], button')
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('is-locked')
      if (lastFocus.current instanceof HTMLElement) lastFocus.current.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className="modal__backdrop" onClick={onClose} />

      <div className="modal__panel" ref={panelRef}>
        <div className="modal__head">
          <div>
            <p className="modal__sub">// CONNECTION ESTABLISHED</p>
            <h2 className="modal__title glitch" id="modalTitle" data-text="GET IN TOUCH">
              GET IN TOUCH
            </h2>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close" ref={closeRef}>
            ×
          </button>
        </div>

        {socials.map((s, i) => (
          <a
            className="social"
            key={s.id}
            href={s.url}
            target={s.url.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer noopener"
            style={{ animationDelay: `${120 + i * 65}ms` }}
          >
            <span className="social__ico">
              <Icon name={s.id} />
            </span>
            <span className="social__txt">
              <b>{s.label}</b>
              <span>{s.handle}</span>
            </span>
            <span className="social__go">↗</span>
          </a>
        ))}

        <div className="modal__foot">
          <span>PRESS ESC TO CLOSE</span>
          <span>REPLY &lt; 24 HRS</span>
        </div>
      </div>
    </div>,
    document.body
  )
}
