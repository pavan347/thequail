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
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef(null)
  const audioRef = useRef(null)
  const images = useMemo(() => GALLERY_IMAGES, [])

  const setActive = (i) => setIndex(((i % images.length) + images.length) % images.length)
  const next = () => setActive(index + 1)
  const prev = () => setActive(index - 1)

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 5000)
    return () => timerRef.current && clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  return (
    <section id="" className="hero">
      <audio ref={audioRef} loop>
        <source src="/assets/Spring-Flowers.mp3" type="audio/mpeg" />
      </audio>
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
          <button className="slider__music-btn" onClick={toggleMusic} aria-label={isPlaying ? "Pause music" : "Play music"}>
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
          <div className="slider__dots" aria-hidden="true">
            {images.map((_, i) => (
              <div key={i} className={`dot ${i === index ? 'dot--active' : ''}`} onClick={() => setActive(i)} />
            ))}
          </div>
        </div>
        <div className="hero__overlay">
          <h1 className="hero__title">Embrace the Rustic Charm</h1>
          <p className="hero__subtitle">Country Comfort Timeless Tranquility</p>
          <a className="btn btn--primary" href="#booking">Book your stay</a>
        </div>
      </div>
    </section>
  )
}
