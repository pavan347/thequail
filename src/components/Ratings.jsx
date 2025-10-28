import React from 'react'

export default function Ratings() {
  return (
    <section className="ratings">
      <div className="container ratings__inner">
        <div className="ratings__card">
             <div className="ratings__item">
            <div className="ratings__brand">Google</div>
            <div className="ratings__score"><span className="star">★</span> 4.8 / 5</div>
            <div className="ratings__meta">Excellent • 101 ratings</div>
          </div>
          <div className="ratings__divider" />
          <div className="ratings__item">
            <div className="ratings__brand">MakeMyTrip</div>
            <div className="ratings__score"><span className="star">★</span> 4.7 / 5</div>
            <div className="ratings__meta">Excellent • 15 ratings</div>
          </div>
          <div className="ratings__divider" />
          <div className="ratings__item">
            <div className="ratings__brand">Airbnb</div>
            <div className="ratings__score"><span className="star">★</span> 4.84 / 5</div>
            <div className="ratings__meta">Based on 141 reviews</div>
          </div>
        </div>
      </div>
    </section>
  )
}
