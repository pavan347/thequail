import React, { useEffect, useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close on route/hash change and on escape
  useEffect(()=>{
    const onHash = () => setOpen(false)
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('hashchange', onHash)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('keydown', onKey) }
  },[])

  const links = [
    { href: '#booking', label: 'Booking' },
    { href: '#features', label: 'Amenities' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <header className="nav">
      <div className="container nav__inner">
        <div className="brand">
          <a href="#">
            <span className="brand__mark">The</span>
          <span className="brand__name">Quail</span>
          </a>
        </div>
        <nav className="nav__links">
          {links.map(l => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open ? 'true' : 'false'}
          aria-controls="mobile-menu"
          onClick={()=>setOpen(v=>!v)}
        >
          <span className="nav__bar"/>
          <span className="nav__bar"/>
          <span className="nav__bar"/>
        </button>
      </div>
      <div id="mobile-menu" className={`nav__mobile ${open ? 'nav__mobile--open' : ''}`}>
        <div className="container nav__mobile-inner">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={()=>setOpen(false)}>{l.label}</a>
          ))}
        </div>
      </div>
    </header>
  )
}
