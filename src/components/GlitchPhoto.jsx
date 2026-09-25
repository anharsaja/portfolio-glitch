import { useEffect, useState } from 'react'

/**
 * Foto wajah tanpa latar dengan efek glitch: siluet warna yang bergeser,
 * potongan badan yang meloncat, scanline dan berkas cahaya yang hanya jatuh
 * di dalam siluet — bukan di kotak persegi.
 *
 * Warna diambil dari file JPEG, bentuk siluetnya dari kanal alpha file mask.
 * Keduanya dihasilkan oleh `node scripts/cutout.mjs`.
 */
export default function GlitchPhoto({ src, mask, alt = 'Profile photo', tag = 'ONLINE' }) {
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (!src) return setOk(false)
    const img = new Image()
    img.onload = () => setOk(true)
    img.onerror = () => setOk(false)
    img.src = src
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return (
    <div
      className="photo"
      style={ok ? { '--img': `url(${src})`, '--mask': `url(${mask || src})` } : undefined}
      role="img"
      aria-label={alt}
    >
      {ok ? (
        <>
          <div className="photo__aura" />
          <div className="photo__ghost photo__ghost--m" />
          <div className="photo__ghost photo__ghost--c" />
          <div className="photo__glow">
            <div className="photo__subject" />
          </div>
          <div className="photo__slice photo__slice--a" />
          <div className="photo__slice photo__slice--b" />
          <div className="photo__scan" />
          <div className="photo__sweep" />
          <div className="photo__frag" />
          <span className="photo__tag">{tag}</span>
        </>
      ) : (
        <div className="photo__ph">
          <b>[ ! ]</b>
          PHOTO NOT FOUND
          <br />
          check the file in <span style={{ color: 'var(--cyan)' }}>public/image/</span>
        </div>
      )}
    </div>
  )
}
