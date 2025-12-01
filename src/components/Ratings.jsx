import React from 'react'

export default function Ratings() {
  return (
    <section className="ratings">
      <div className="container ratings__inner">
        <div className="ratings__card">
          <div className="ratings__item">
            <img className="ratings__logo" src="/assets/images/goibibologonew.png" alt="Goibibo" />
            <div className="ratings__score"><span className="star">★</span> 4.3 / 5</div>
            <div className="ratings__meta">157 ratings</div>
          </div>
          <div className="ratings__divider" />
          <div className="ratings__item">
            <img className="ratings__logo" src="/assets/images/makemytiplogonew.png" alt="MakeMyTrip" />
            <div className="ratings__score"><span className="star">★</span> 4.7 / 5</div>
            <div className="ratings__meta">Excellent • 15 ratings</div>
          </div>
          <div className="ratings__divider" />
          <div className="ratings__item">
            <img className="ratings__logo" src="/assets/images/airbnblogonew.png" alt="Airbnb" />
            <div className="ratings__score"><span className="star">★</span> 4.84 / 5</div>
            <div className="ratings__meta">Based on 141 reviews</div>
          </div>
          <div className="ratings__divider" />
          <div className="ratings__item ratings__item--google">
            <svg className="ratings__logo ratings__logo--google" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <div className="ratings__score"><span className="star">★</span> 4.8 / 5</div>
            <div className="ratings__meta">102 reviews</div>
          </div>
        </div>
      </div>
    </section>
  )
}
