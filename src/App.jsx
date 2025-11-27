import React from 'react'
import Navbar from './components/Navbar.jsx'
import HeroSlider from './components/HeroSlider.jsx'
import BookingForm from './components/BookingForm.jsx'
import Ratings from './components/Ratings.jsx'
import Features from './components/Features.jsx'
import Gallery from './components/Gallery.jsx'
import Policies from './components/Policies.jsx'
import Partners from './components/Partners.jsx'
import AddressInfo from './components/AddressInfo.jsx'
import LocationMap from './components/LocationMap.jsx'
import Footer from './components/Footer.jsx'
import FAB from './components/FAB.jsx'

export default function App() {
  return (
    <>
      <Navbar />
  <main id="main">
        <HeroSlider />
        <BookingForm />
        <Ratings />
        <Features />
        <Gallery />
        <Policies />
        <Partners />
        <LocationMap />
        <AddressInfo />
      </main>
      <Footer />
      <FAB />
    </>
  )
}
