import React from 'react'

export default function FAB(){
  const phone = '+918121028100'
  const waNumber = '918121028100'
  const message = `Hello! I'm interested in booking The Quail. Could you please share availability and pricing?` 
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
  const telHref = `tel:${phone}`

  return (
    <div className="fab">
      <a className="fab__btn fab__btn--wa" href={waHref} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.8 11.8 0 0 0 12.02 0C5.5 0 .21 5.29.21 11.81c0 2.08.55 4.06 1.6 5.83L0 24l6.52-1.68a11.74 11.74 0 0 0 5.5 1.4h.01c6.52 0 11.81-5.29 11.81-11.81 0-3.15-1.23-6.12-3.32-8.21ZM12.03 21.3h-.01a9.46 9.46 0 0 1-4.83-1.32l-.35-.2-3.86 1 1.03-3.76-.23-.39a9.46 9.46 0 1 1 8.27 4.67Zm5.47-7.08c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17-.35.22-.65.07c-.3-.15-1.25-.46-2.39-1.46-.88-.78-1.47-1.74-1.65-2.04-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.08 2.89 1.24 3.09c.15.2 2.13 3.25 5.16 4.55.72.31 1.28.49 1.72.62.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.03-1.41.25-.7.25-1.3.17-1.41-.07-.12-.27-.2-.57-.35Z"/>
        </svg>
      </a>
      <a className="fab__btn fab__btn--phone" href={telHref} aria-label="Call us">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.56 0 1 .44 1 1V22c0 .56-.44 1-1 1C10.4 23 1 13.6 1 2c0-.56.44-1 1-1h3.5c.56 0 1 .44 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"/>
        </svg>
      </a>
    </div>
  )
}
