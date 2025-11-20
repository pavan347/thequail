import React from 'react'

export default function AddressInfo(){
  return (
    <section id="address" className="address">
      <div className="container address__grid">
        <div className="address__card">
          <h3 className="card__title">Address</h3>
          <p>Yenkapally Rd, Shankarpalle, Telangana 501203, India</p>
          <p className="muted">Nearest City Area: Chevella (≈35 km from Gachibowli ORR)</p>
          <p className="muted">Distance from City Centre: ≈18.4 km (as per MakeMyTrip)</p>
        </div>
        <div className="address__card">
          <h3 className="card__title">Nearby Landmarks</h3>
          <ul className="card__list">
            <li className="card__item"><span className="dot"/>Shankarpalli Railway Station (≈10.2 km)</li>
            <li className="card__item"><span className="dot"/>Wild Waters Theme Park (≈11.3 km)</li>
            <li className="card__item"><span className="dot"/>Minutes from Pragati Resorts</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
