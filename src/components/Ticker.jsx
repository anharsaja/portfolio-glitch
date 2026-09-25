import { ticker } from '../data.js'

// logo yang warna aslinya terlalu gelap untuk latar hitam (mis. Next.js) pakai warna teks
function brandColor(hex) {
  const n = parseInt(hex, 16)
  const lum = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)
  return lum < 60 ? 'var(--ink)' : `#${hex}`
}

export default function Ticker() {
  // digandakan supaya animasi marquee-nya menyambung mulus
  const items = [...ticker, ...ticker]

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {items.map((t, i) => {
          // item boleh berupa teks biasa atau { label, icon }
          const { label, icon } = typeof t === 'string' ? { label: t } : t
          return (
            <span key={`${label}-${i}`} style={icon ? { '--brand': brandColor(icon.hex) } : undefined}>
              {icon && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d={icon.path} />
                </svg>
              )}
              {label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
