import React from 'react'

export default function LocationMap() {
  return (
    <section id="location" className="location">
      <div className="container">
        <h2 className="section__title">Find us</h2>
        <div className="map__wrap">
          <iframe 
          title="The Quail Location"
          id="mapFrame"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.50608512857!2d78.1469707!3d17.387484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbe98d15c54c51%3A0xe8cbcbc5b0d50a5e!2sThe%20Quail!5e0!3m2!1sen!2sin!4v1761619828420!5m2!1sen!2sin" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="map__cta">
          <a className="btn btn--ghost" target="_blank" rel="noopener" href="https://maps.app.goo.gl/kcB3z2bHDAcGZYA98">Open in Google Maps</a>
        </div>
      </div>
    </section>
  )
}
