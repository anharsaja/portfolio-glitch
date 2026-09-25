export default function Contact({ onOpen }) {
  return (
    <section className="sec sec--alt" id="contact">
      <div className="wrap">
        <header className="sec__head reveal">
          <span className="sec__num">04</span>
          <h2 className="sec__title glitch" data-text="CONTACT">
            CONTACT
          </h2>
          <p className="sec__sub">Punya ide, project, atau sekadar mau ngobrol? Kirim sinyal.</p>
        </header>

        <div className="contact__box reveal">
          <p className="contact__line glitch glitch--lg" data-text="MARI NGOBROL">
            MARI NGOBROL
          </p>
          <p className="contact__note">
            Tidak perlu isi formulir panjang. Pencet tombol di bawah, pilih kanal yang paling
            nyaman buat kamu.
          </p>
          <button className="btn btn--primary" onClick={onOpen}>
            CONTACT ME
          </button>
        </div>
      </div>
    </section>
  )
}
