import React, { useEffect, useState } from 'react'

  const links = [
    { href: '#booking', label: 'Booking' },
    { href: '#features', label: 'Amenities' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ]

export default function Footer() {
  const [year, setYear] = useState('')
  useEffect(()=>{ setYear(String(new Date().getFullYear())) },[])
  return (
    <footer id="contact" className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="brand">
            <span className="brand__mark">The</span>
            <span className="brand__name">Quail</span>
          </div>
          <p className="footer__tag">A luxury farmhouse for your most memorable gatherings.</p>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <h3>Contact</h3>
            <ul>
              <li>Email: <a href="mailto:gktechspheres@gmail.com">gktechspheres@gmail.com</a></li>
              <li>WhatsApp: <a target="_blank" rel="noopener" href="https://wa.me/919392576089">+91 93925 76089</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3>Quick links</h3>
            <ul>
                {links.map(l => (
                    <li key={l.href}><a href={l.href}>{l.label}</a></li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© <span>{year}</span> The Quail All rights reserved. Website Developed by <a href="https://gktechspheres.app" target="_blank" rel="noopener">Gk Tech Sphere's</a>.</p>
        </div>
      </div>
    </footer>
  )
}
