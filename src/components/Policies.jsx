import React from 'react'

export default function Policies(){
  return (
    <section id="policies" className="policies">
      <div className="container policies__inner">
        <div className="policy">
          <div className="policy__title">Check‑in</div>
          <div className="policy__value">11:00 AM</div>
        </div>
        <div className="policy">
          <div className="policy__title">Check‑out</div>
          <div className="policy__value">10:00 AM</div>
        </div>
        <div className="policy">
          <div className="policy__title">House Rules</div>
          <div className="policy__value">Primary guest 18+ • Smoking not allowed indoors</div>
        </div>
        <div className="policy">
          <div className="policy__title">Accepted IDs</div>
          <div className="policy__value">Passport, Aadhaar, Driving License, Govt. ID</div>
        </div>
      </div>
    </section>
  )
}
