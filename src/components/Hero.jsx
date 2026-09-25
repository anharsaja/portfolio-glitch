import GlitchPhoto from './GlitchPhoto.jsx'
import useScramble from '../hooks/useScramble.js'
import { profile } from '../data.js'

export default function Hero({ onContact }) {
  const role = useScramble(profile.roles)

  return (
    <section className="hero" id="hero">
      <div className="hero__bg" aria-hidden="true" />

      <div className="wrap hero__inner">
        <div className="hero__text">
          <p className="kicker">SYSTEM ONLINE — {profile.location}</p>

          <h1 className="hero__title glitch glitch--xl" data-text={profile.name}>
            {profile.name}
          </h1>

          <p className="hero__role">
            &gt; {role}
            <span className="caret">_</span>
          </p>

          <p className="hero__desc">{profile.tagline}</p>

          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">
              LIHAT PROJECT
            </a>
            <button className="btn" onClick={onContact}>
              CONTACT ME
            </button>
          </div>

          <ul className="hero__stats">
            {profile.stats.map((s) => (
              <li key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <GlitchPhoto
          src={profile.photo}
          mask={profile.photoMask}
          alt={`Foto ${profile.name}`}
          tag="AVAILABLE"
        />
      </div>

      <a className="scrollcue" href="#projects">
        <i />
        SCROLL
      </a>
    </section>
  )
}
