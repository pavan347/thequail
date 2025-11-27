import React, { useState, useEffect, useCallback } from 'react'

const ALL_IMAGES = [
  '/assets/images/1.avif',
  '/assets/images/2.avif',
  '/assets/images/3.avif',
  '/assets/images/4.avif',
  '/assets/images/5.avif',
  '/assets/images/6.avif',
  '/assets/images/7.avif',
  '/assets/images/8.avif',
  '/assets/images/9.avif',
  '/assets/images/10.avif',
  '/assets/images/11.avif',
  '/assets/images/12.avif',
  '/assets/images/13.avif',
  '/assets/images/14.avif',
  '/assets/images/15.avif',
  '/assets/images/16.avif',
  '/assets/images/17.avif',
  '/assets/images/18.avif',
  '/assets/images/19.avif',
  '/assets/images/20.avif',
  '/assets/images/21.avif',
  '/assets/images/22.avif',
  '/assets/images/23.avif',
  '/assets/images/24.avif',
  '/assets/images/25.avif',
]

const INITIAL_LOAD = 6

export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const visibleImages = ALL_IMAGES.slice(0, visibleCount)
  const hasMore = visibleCount < ALL_IMAGES.length

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, ALL_IMAGES.length))
  }

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % ALL_IMAGES.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + ALL_IMAGES.length) % ALL_IMAGES.length)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, goToNext, goToPrev])

  // Touch swipe handling
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50
    if (distance > minSwipeDistance) goToNext()
    if (distance < -minSwipeDistance) goToPrev()
    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section__title">Photo Gallery</h2>
        <p className="gallery__subtitle">Explore our luxury farmhouse and beautiful surroundings</p>
        
        <div className="gallery__grid">
          {visibleImages.map((src, index) => (
            <div 
              key={src} 
              className={`gallery__item gallery__item--${(index % 7) + 1}`}
              onClick={() => openLightbox(index)}
            >
              <img 
                src={src} 
                alt={`The Quail farmhouse photo ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
              <div className="gallery__overlay">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="gallery__load-more">
            <button className="btn btn--primary" onClick={loadMore}>
              Load More Photos
            </button>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div 
          className="lightbox" 
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <button 
            className="lightbox__nav lightbox__nav--prev" 
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            aria-label="Previous image"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={ALL_IMAGES[currentIndex]} 
              alt={`The Quail farmhouse photo ${currentIndex + 1}`}
            />
            <div className="lightbox__counter">
              {currentIndex + 1} / {ALL_IMAGES.length}
            </div>
          </div>

          <button 
            className="lightbox__nav lightbox__nav--next" 
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            aria-label="Next image"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
