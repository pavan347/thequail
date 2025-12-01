import React, { useEffect, useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import DateRangePicker from './DateRangePicker.jsx'
import Modal from './Modal.jsx'

// In Vite, env variables must be prefixed with VITE_ and accessed via import.meta.env
const {
  VITE_EMAILJS_PUBLIC_KEY: EMAILJS_PUBLIC_KEY,
  VITE_EMAILJS_SERVICE_ID: EMAILJS_SERVICE_ID,
  VITE_EMAILJS_TEMPLATE_ID: EMAILJS_TEMPLATE_ID,
} = import.meta.env

// Pricing configuration
const BASE_GUESTS = 4
const WEEKEND_BASE_PRICE = 13000 // Friday, Saturday, Sunday
const WEEKDAY_BASE_PRICE = 11000 // Monday, Tuesday, Wednesday, Thursday
const ADDITIONAL_GUEST_PRICE = 500
const GST_RATE = 0.18 // 18%

function isWeekendDay(date) {
  const day = date.getDay()
  return day === 5 || day === 6 || day === 0 // Friday=5, Saturday=6, Sunday=0
}

function calculatePricing(checkinDate, checkoutDate, guestCount) {
  if (!checkinDate || !checkoutDate || !guestCount) {
    return { subtotal: 0, gst: 0, total: 0, breakdown: [] }
  }

  const guests = Number(guestCount)
  const breakdown = []
  let subtotal = 0

  // Calculate for each night
  const currentDate = new Date(checkinDate)
  const endDate = new Date(checkoutDate)
  
  while (currentDate < endDate) {
    const isWeekend = isWeekendDay(currentDate)
    const basePrice = isWeekend ? WEEKEND_BASE_PRICE : WEEKDAY_BASE_PRICE
    const dayType = isWeekend ? 'Weekend' : 'Weekday'
    
    // Calculate guest pricing
    let nightPrice = basePrice
    if (guests > BASE_GUESTS) {
      const additionalGuests = guests - BASE_GUESTS
      nightPrice += additionalGuests * ADDITIONAL_GUEST_PRICE
    }
    
    subtotal += nightPrice
    
    breakdown.push({
      date: new Date(currentDate),
      type: dayType,
      price: nightPrice,
      isWeekend
    })
    
    currentDate.setDate(currentDate.getDate() + 1)
  }

  const gst = subtotal * GST_RATE
  const total = subtotal + gst

  return { subtotal, gst, total, breakdown }
}

export default function BookingForm() {
  const today = useMemo(() => {
    const d = new Date(); d.setHours(0,0,0,0); return d
  }, [])
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.matchMedia('(max-width: 820px)').matches : false)
  const [step, setStep] = useState('dates') // 'dates' | 'details'
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [guests, setGuests] = useState('')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [notes, setNotes] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const inDate = checkin ? new Date(checkin) : null
  const outDate = checkout ? new Date(checkout) : null
  const nights = calcNights(inDate, outDate)
  const pricing = useMemo(() => 
    calculatePricing(inDate, outDate, guests),
    [inDate, outDate, guests]
  )

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  useEffect(() => {
    const mm = window.matchMedia('(max-width: 820px)')
    const handler = (e) => setIsMobile(e.matches)
    if (mm.addEventListener) { mm.addEventListener('change', handler) } else { mm.addListener(handler) }
    setIsMobile(mm.matches)
    return () => { if (mm.removeEventListener) { mm.removeEventListener('change', handler) } else { mm.removeListener(handler) } }
  }, [])

  useEffect(() => {
    if (inDate) {
      const minOut = new Date(inDate)
      minOut.setDate(minOut.getDate() + 1)
      if (outDate && outDate <= inDate) setCheckout(toInputDate(minOut))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkin])

  const canProceedDates = !!checkin && !!checkout && !!inDate && !!outDate && outDate > inDate

  const goNext = () => {
    if (!canProceedDates) return alert('Please choose a valid date range (check-out after check-in).')
    setStep('details')
  }
  const goBack = () => setStep('dates')

  const submit = async (e) => {
    e.preventDefault()
    if (!name || !phone || !email || !guests || !checkin || !checkout) {
      alert('Please fill in all required fields.')
      return
    }
    if (!inDate || !outDate || outDate <= inDate) {
      alert('Please choose a valid date range (check-out after check-in).')
      return
    }
    // open confirmation modal instead of sending immediately
    setShowConfirm(true)
  }

  const confirmAndSend = async () => {
    setShowConfirm(false)
    // proceed to send

    const message = `Booking Request - The Quail%0D%0A%0D%0A` +
      `Name: ${encodeURIComponent(name)}%0D%0A` +
      `Phone: ${encodeURIComponent(phone)}%0D%0A` +
      `Email: ${encodeURIComponent(email)}%0D%0A` +
      `Guests: ${encodeURIComponent(String(guests))}%0D%0A` +
      `Check-in: ${encodeURIComponent(checkin)}%0D%0A` +
      `Check-out: ${encodeURIComponent(checkout)}%0D%0A` +
      `Nights: ${encodeURIComponent(String(nights))}%0D%0A` +
      `Subtotal: ${encodeURIComponent(formatINR(pricing.subtotal))}%0D%0A` +
      `GST (18%%): ${encodeURIComponent(formatINR(pricing.gst))}%0D%0A` +
      `Total Amount: ${encodeURIComponent(formatINR(pricing.total))}%0D%0A` +
      (notes ? `Notes: ${encodeURIComponent(notes)}%0D%0A` : '') +
      `%0D%0AThis booking was submitted from thequail.in`

    let emailSent = false

    try {
      if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          name, phone, email, guests, checkin, checkout, nights, 
          subtotal: formatINR(pricing.subtotal),
          gst: formatINR(pricing.gst),
          total: formatINR(pricing.total),
          notes,
          to_email: 'pavankumargarapati04@gmail.com'
        })
        emailSent = true
      }
    } catch (err) {
      console.warn('EmailJS error:', err)
    }

    if (!emailSent) {
      // const mailto = `mailto:gktechspheres@gmail.com?subject=${encodeURIComponent('Booking Request – The Quail')}&body=${message}`
      // window.open(mailto, '_blank')
      const waText =
        `Booking Request - The Quail\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n` +
        `Guests: ${guests}\n` +
        `Check-in: ${checkin}\n` +
        `Check-out: ${checkout}\n` +
        `Nights: ${nights}\n` +
        `Subtotal: ${formatINR(pricing.subtotal)}\n` +
        `GST (18%): ${formatINR(pricing.gst)}\n` +
        `Total Amount: ${formatINR(pricing.total)}\n` +
        (notes ? `Notes: ${notes}\n` : '') +
        `\nSent from thequail.in`
      const waUrl = `https://wa.me/918121028100?text=${encodeURIComponent(waText)}`
      window.open(waUrl, '_blank')

    }

    alert('Thanks! We have received your details. We’ll confirm availability shortly.')
    setName(''); setPhone(''); setEmail(''); setGuests(''); setCheckin(''); setCheckout(''); setNotes('')
    setStep('dates')
  }

  return (
    <section id="booking" className="booking">
      <div className="container booking__inner">
        <div className="booking__card">
          <h2 className="section__title">
            Reserve your dates 
            <p className='booked__dates'>{step === 'dates' ? "" : inDate && outDate ? ` ${inDate.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})} → ${outDate.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}` : ''}</p>
          </h2>
          
          <form className="form" onSubmit={submit} noValidate>
            {step === 'dates' ? (
              <>
                <div className="form__row form__row--stack">
                  <div className="form__field">
                    <label>Select your stay dates</label>
                    <DateRangePicker
                      value={{ checkin, checkout }}
                      onChange={({checkin:ci, checkout:co}) => { setCheckin(ci||''); setCheckout(co||'') }}
                      bookedDates={BOOKED_DATES}
                      today={today}
                      initialMonth={inDate || today}
                      showTwoMonths={!isMobile}
                    />
                  </div>
                </div>
                <div className="form__summary">
                  <div className="summary__item">
                    <span>Nights</span>
                    <strong>{nights}</strong>
                  </div>
                  <div className="summary__item">
                    <span>Selected</span>
                    <strong>{checkin || '—'} → {checkout || '—'}</strong>
                  </div>
                </div>
                <div className="form__actions">
                  <button type="button" className="btn btn--primary" onClick={goNext}>Next</button>
                  <p className="form__disclaimer">Choose your dates to continue.</p>
                </div>
              </>
            ) : (
              <>
                <div className="form__row">
                  <div className="form__field">
                    <label htmlFor="name">Full name</label>
                    <input id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" required />
                  </div>
                  <div className="form__field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="form__row">
                  <div className="form__field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Your phone number" required />
                  </div>
                  <div className="form__field">
                    <label htmlFor="guests">Guests</label>
                    <select id="guests" value={guests} onChange={(e)=>setGuests(e.target.value)} required>
                      <option value="" disabled>Select</option>
                      {Array.from({length:15}, (_,i)=>i+1).map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form__row form__row--stack">
                  <div className="form__field">
                    <label htmlFor="notes">Notes (optional)</label>
                    <textarea id="notes" rows={3} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Any special requests" />
                  </div>
                </div>
                <div className="form__summary">
                  <div className="summary__item">
                    <span>Nights</span>
                    <strong>{nights}</strong>
                  </div>
                  <div className="summary__item">
                    <span>Guests</span>
                    <strong>{Number(guests || 0)}</strong>
                  </div>
                  <div className="summary__item">
                    <span>Subtotal</span>
                    <strong>{formatINR(pricing.subtotal)}</strong>
                  </div>
                  <div className="summary__item">
                    <span>GST (18%)</span>
                    <strong>{formatINR(pricing.gst)}</strong>
                  </div>
                  <div className="summary__item summary__item--total">
                    <span>Total Amount</span>
                    <strong>{formatINR(pricing.total)}</strong>
                  </div>
                </div>
                {pricing.breakdown.length > 0 && (
                  <div className="pricing__breakdown">
                    <details>
                      <summary>View pricing breakdown</summary>
                      <div className="breakdown__list">
                        {pricing.breakdown.map((day, idx) => (
                          <div key={idx} className="breakdown__item">
                            <span className="breakdown__date">
                              {day.date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                            <span className={`breakdown__type ${day.isWeekend ? 'breakdown__type--weekend' : ''}`}>
                              {day.type}
                            </span>
                            <span className="breakdown__price">{formatINR(day.price)}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                )}
                <div className="form__actions">
                  <button type="button" className="btn btn--ghost" onClick={goBack}>Back</button>
                  <button type="submit" className="btn btn--primary">Submit booking</button>
                  <p className="form__disclaimer">We’ll send your request via email and WhatsApp. A team member will confirm availability shortly.</p>
                </div>
              </>
            )}
          </form>
          <Modal
            open={showConfirm}
            onClose={() => setShowConfirm(false)}
            title="Confirm your booking"
            actions={(
              <>
                <button className="btn btn--ghost" onClick={()=>setShowConfirm(false)}>Edit</button>
                <button className="btn btn--primary" onClick={confirmAndSend}>Confirm & Send</button>
              </>
            )}
          >
            <div className="confirm__grid">
              <div><strong>Check-in:</strong> {checkin}</div>
              <div><strong>Check-out:</strong> {checkout}</div>
              <div><strong>Nights:</strong> {nights}</div>
              <div><strong>Name:</strong> {name}</div>
              <div><strong>Email:</strong> {email}</div>
              <div><strong>Phone:</strong> {phone}</div>
              <div><strong>Guests:</strong> {guests}</div>
              <div><strong>Subtotal:</strong> {formatINR(pricing.subtotal)}</div>
              <div><strong>GST (18%):</strong> {formatINR(pricing.gst)}</div>
              <div className="confirm__total"><strong>Total Amount:</strong> <span className="total-amount">{formatINR(pricing.total)}</span></div>
              {notes && <div className="confirm__notes"><strong>Notes:</strong> {notes}</div>}
            </div>
          </Modal>
        </div>
      </div>
    </section>
  )
}

function toInputDate(d){
  if (!(d instanceof Date)) return ''
  const y=d.getFullYear(); const m=String(d.getMonth()+1).padStart(2,'0'); const day=String(d.getDate()).padStart(2,'0')
  return `${y}-${m}-${day}`
}
function calcNights(inDate, outDate){
  if (!(inDate instanceof Date) || !(outDate instanceof Date)) return 0
  const ms = outDate.getTime() - inDate.getTime()
  return Math.max(0, Math.round(ms / 86400000))
}
function formatINR(amount){
  try{ return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(amount) }catch{ return `₹${amount}` }
}

// Editable list of fully booked dates (YYYY-MM-DD). Update as needed.
export const BOOKED_DATES = [
  // Example pre-booked dates
  '2025-10-31',
  '2025-11-27',
  '2025-11-29',
  '2025-11-28',
]
