import React, { useEffect, useMemo, useRef, useState } from 'react'

const GALLERY_IMAGES = [
  '/assets/images/1.avif',
  '/assets/images/4.avif',
  '/assets/images/5.avif',
  '/assets/images/8.avif',
  '/assets/images/11.avif',
  '/assets/images/15.avif',
  '/assets/images/16.avif',
  '/assets/images/17.avif',
  '/assets/images/18.avif',
  '/assets/images/19.avif',
  '/assets/images/20.avif',
  '/assets/images/21.avif',
  '/assets/images/23.avif',
  '/assets/images/25.avif',
]

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
  const images = useMemo(() => GALLERY_IMAGES, [])

  const setActive = (i) => setIndex(((i % images.length) + images.length) % images.length)
  const next = () => setActive(index + 1)
  const prev = () => setActive(index - 1)

  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 5000)
    return () => timerRef.current && clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  return (
    <section id="" className="hero">
      <div className="container hero__inner">
        <div className="slider" aria-label="Farmhouse image gallery">
          <div className="slider__track">
            {images.map((src, i) => (
              <div key={src} className={`slide ${i === index ? 'slide--active' : ''}`}>
                <img
                  src={src}
                  alt={`The Quail farmhouse photo ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchpriority={i === 0 ? 'high' : 'auto'}
                />
              </div>
            ))}
          </div>
          <button className="slider__btn slider__btn--prev" onClick={() => setActive(index - 1)} aria-label="Previous image">&#10094;</button>
          <button className="slider__btn slider__btn--next" onClick={() => setActive(index + 1)} aria-label="Next image">&#10095;</button>
          <div className="slider__dots" aria-hidden="true">
            {images.map((_, i) => (
              <div key={i} className={`dot ${i === index ? 'dot--active' : ''}`} onClick={() => setActive(i)} />
            ))}
          </div>
        </div>
        <div className="hero__overlay">
          <h1 className="hero__title">A Private Luxury Farmhouse Escape</h1>
          <p className="hero__subtitle">Unwind at The Quail – where time slows and moments shine</p>
          <a className="btn btn--primary" href="#booking">Book your stay</a>
        </div>
      </div>
    </section>
  )
}
