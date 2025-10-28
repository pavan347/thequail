import React, { useMemo, useState } from 'react'

function startOfMonth(d){ const x=new Date(d.getFullYear(), d.getMonth(), 1); x.setHours(0,0,0,0); return x }
function endOfMonth(d){ return new Date(d.getFullYear(), d.getMonth()+1, 0) }
function addMonths(d, n){ return new Date(d.getFullYear(), d.getMonth()+n, 1) }
function toKey(d){ const y=d.getFullYear(); const m=String(d.getMonth()+1).padStart(2,'0'); const day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}` }
function sameDay(a,b){ return a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate() }
function isBefore(a,b){ return a.getTime() < b.getTime() }
function inRange(d, a, b){ if(!a||!b) return false; const t=d.getTime(); return a.getTime() < t && t < b.getTime() }

export default function DateRangePicker({
  value, onChange,
  bookedDates = [], today = new Date(),
  initialMonth = new Date(),
  showTwoMonths = false,
}){
  const bookedSet = useMemo(()=> new Set(bookedDates), [bookedDates])
  const now = useMemo(()=>{ const x=new Date(today); x.setHours(0,0,0,0); return x }, [today])

  const [baseMonth, setBaseMonth] = useState(() => startOfMonth(initialMonth))
  const [monthA, monthB] = useMemo(()=>{
    const a = startOfMonth(baseMonth)
    const b = startOfMonth(addMonths(a, 1))
    return [a,b]
  }, [baseMonth])

  const { checkin, checkout } = value
  const inDate = checkin ? new Date(checkin) : null
  const outDate = checkout ? new Date(checkout) : null

  const renderMonth = (month) => {
    const start = startOfMonth(month)
    const end = endOfMonth(month)
    const firstDay = new Date(start)
    const weekday = firstDay.getDay() // 0 Sun - 6 Sat
    const days = end.getDate()
    const cells = []
    for(let i=0;i<weekday;i++){ cells.push(null) }
    for(let d=1; d<=days; d++){
      cells.push(new Date(month.getFullYear(), month.getMonth(), d))
    }
    const weeks = []
    for(let i=0; i<cells.length; i+=7){ weeks.push(cells.slice(i,i+7)) }

    const disabledReason = (day) => {
      if (!day) return 'empty'
      const key = toKey(day)
      if (isBefore(day, now)) return 'past'
      if (bookedSet.has(key)) return 'booked'
      return ''
    }

    const onPick = (day) => {
      if (!day) return
      const reason = disabledReason(day)
      if (reason==='past' || reason==='booked') return
      // Selection logic
      // If nothing selected yet, or a full range already selected, start fresh from this day
      if (!inDate || (inDate && outDate)){
        onChange({ checkin: toKey(day), checkout: '' })
        return
      }
      // Only check-in selected currently
      if (sameDay(day, inDate)){
        // Toggle off the current selection
        onChange({ checkin: '', checkout: '' })
        return
      }
      if (isBefore(day, inDate)){
        // User clicked an earlier date -> treat as changing the check-in
        onChange({ checkin: toKey(day), checkout: '' })
        return
      }
      // Ensure there are no booked dates between inDate(exclusive) and day(inclusive end)
      const tmp = new Date(inDate)
      tmp.setDate(tmp.getDate()+1)
      let cur = new Date(tmp)
      let blocked = false
      while (cur.getTime() <= day.getTime()){
        if (bookedSet.has(toKey(cur))){ blocked = true; break }
        cur.setDate(cur.getDate()+1)
      }
      if (blocked){
        alert('The selected range contains booked dates. Please choose different dates.')
        return
      }
      onChange({ checkin: toKey(inDate), checkout: toKey(day) })
    }

    return (
      <div className="cal">
        <div className="cal__header">
          <div className="cal__title">{start.toLocaleString(undefined,{ month:'long', year:'numeric'})}</div>
        </div>
        <div className="cal__weekdays">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(w => <div key={w} className="cal__wd">{w}</div>)}
        </div>
        <div className="cal__grid">
          {weeks.map((week, wi) => (
            <div className="cal__row" key={wi}>
              {week.map((day, di) => {
                if (!day) return <div key={`e-${wi}-${di}`} className="cal__cell cal__cell--empty" />
                const key = toKey(day)
                const reason = disabledReason(day)
                const isStart = inDate && sameDay(day, inDate)
                const isEnd = outDate && sameDay(day, outDate)
                const inRng = inRange(day, inDate||now, outDate||now)
                const cls = [
                  'cal__cell',
                  reason && `cal__cell--${reason}`,
                  inRng && 'cal__cell--inrange',
                  isStart && 'cal__cell--start',
                  isEnd && 'cal__cell--end',
                ].filter(Boolean).join(' ')
                return (
                  <button type="button" key={key} className={cls} onClick={() => onPick(day)}>
                    <span className="cal__num">{day.getDate()}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const formatMY = (d) => d.toLocaleString(undefined,{ month:'long', year:'numeric'})
  const label = showTwoMonths ? `${formatMY(monthA)} — ${formatMY(monthB)}` : formatMY(monthA)

  return (
    <div className={`drp ${showTwoMonths ? 'drp--two' : 'drp--one'}`}>
      <div className="drp__nav">
        <button type="button" className="drp__btn" onClick={() => setBaseMonth(addMonths(baseMonth, -1))} aria-label="Previous month">&#10094;</button>
        <div className="drp__label">{label}</div>
        <button type="button" className="drp__btn" onClick={() => setBaseMonth(addMonths(baseMonth, 1))} aria-label="Next month">&#10095;</button>
      </div>
      {renderMonth(monthA)}
      {showTwoMonths && renderMonth(monthB)}
    </div>
  )
}
