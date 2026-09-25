export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__inner">
        <span>© {new Date().getFullYear()} — dibangun sambil ngopi.</span>
        <span>
          STATUS: <b>AVAILABLE</b> · BUILD 1.0.0
        </span>
      </div>
    </footer>
  )
}
