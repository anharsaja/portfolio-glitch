import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import './styles/glitch.css'

// Selalu mulai dari paling atas saat halaman dibuka/di-refresh:
// matikan pemulihan posisi scroll browser dan buang #hash sisa klik menu.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (location.hash) history.replaceState(null, '', location.pathname + location.search)
const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
toTop()
window.addEventListener('load', toTop, { once: true })

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
