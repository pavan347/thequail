import React from 'react'

export default function Partners(){
  return (
    <section id="partners" className="partners">
      <div className="container">
        <h2 className="section__title">Booking Partners</h2>
        <div className="partners__row">
          <div className="partner" aria-label="MakeMyTrip">
            <img className="partner__logo" src="/assets/images/makemytiplogonew.png" alt="MakeMyTrip" />
          </div>
          <div className="partner" aria-label="Airbnb">
            <img className="partner__logo" src="/assets/images/airbnblogonew.png" alt="Airbnb" />
          </div>
          <div className="partner" aria-label="Goibibo">
            <img className="partner__logo" src="/assets/images/goibibologonew.png" alt="Goibibo" />
          </div>
        </div>
      </div>
    </section>
  )
}
