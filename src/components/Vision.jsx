import { vision } from '../data.js'

export default function Vision() {
  return (
    <section className="sec" id="vision">
      <div className="wrap">
        <header className="sec__head reveal">
          <span className="sec__num">03</span>
          <h2 className="sec__title glitch" data-text="VISI & MISI">
            VISI &amp; MISI
          </h2>
          <p className="sec__sub">Dua baris yang bikin tetap duduk di depan layar.</p>
        </header>

        <blockquote className="manifesto reveal">
          <p className="manifesto__label">VISI</p>
          <p className="manifesto__main glitch glitch--lg" data-text={vision.main}>
            {vision.main}
          </p>
          <p className="manifesto__sub glitch" data-text={`« ${vision.sub} »`}>
            « {vision.sub} »
          </p>
        </blockquote>
      </div>
    </section>
  )
}
