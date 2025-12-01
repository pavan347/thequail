import React from 'react'

function Icon({ name }){
  const props = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true }
  switch(name){
    case 'pool': return (<svg {...props}><path d="M3 18c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1v2c-2 0-2-1-4-1s-2 1-4 1-2-1-4-1-2 1-4 1v-2zM5 6h2l2 4h8a2 2 0 0 1 0 4"/></svg>)
    case 'garden': return (<svg {...props}><path d="M5 20h14M12 20V8m0 0c0-3-2-4-2-4s-2 1-2 4 4 6 4 6 4-3 4-6-2-4-2-4-2 1-2 4z"/></svg>)
    case 'party': return (<svg {...props}><path d="M3 21l8-8M3 21l6-2-4-4-2 6zm9-9l9-9M9 7l8 8"/></svg>)
    case 'scenic': return (<svg {...props}><path d="M3 18l6-6 4 4 4-4 4 4v4H3zM7 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/></svg>)
    case 'kitchen': return (<svg {...props}><path d="M4 3h16v4H4zM6 7v14h4V7M14 7v10h4V7"/></svg>)
    case 'caretaker': return (<svg {...props}><path d="M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm-6 18v-2a6 6 0 0 1 12 0v2H6z"/></svg>)
    case 'parking': return (<svg {...props}><path d="M6 20V4h7a4 4 0 1 1 0 8H10v8H6zm4-10h3a2 2 0 1 0 0-4h-3v4z"/></svg>)
    case 'power': return (<svg {...props}><path d="M12 2v8M7 3a9 9 0 1 0 10 0"/></svg>)
    case 'wifi': return (<svg {...props}><path d="M2 8c5.5-4.5 14.5-4.5 20 0M5 12c3.5-3 10.5-3 14 0M8 16c2-1.5 6-1.5 8 0M12 20h.01"/></svg>)
    case 'workspace': return (<svg {...props}><path d="M4 4h16v8H4zM2 20h20M8 12v8M16 12v8"/></svg>)
    case 'bbq': return (<svg {...props}><path d="M4 10h16M6 10l2 6m8-6-2 6M8 16h8M12 4a3 3 0 0 0-3 3v1h6V7a3 3 0 0 0-3-3z"/></svg>)
    case 'bonfire': return (<svg {...props}><path d="M12 3s-4 3-2 6 2 4 2 4 0-1 2-4-2-6-2-6zm-6 15 12 3m0-3-12 3"/></svg>)
    default: return (<svg {...props}><circle cx="12" cy="12" r="2"/></svg>)
  }
}

const data = [
  {
    title: 'Outdoor',
    items: [
      { label: 'Plunge Pool', highlight: true, icon: 'pool' },
      { label: 'Lawn / Garden', icon: 'garden' },
      { label: 'Outdoor party space', icon: 'party' },
      { label: 'Scenic location', icon: 'scenic' },
    ],
  },
  {
    title: 'Interior',
    items: [
      { label: 'Fully equipped kitchen', icon: 'kitchen' },
      { label: 'Caretaker on-site', icon: 'caretaker' },
      { label: 'Private Parking', icon: 'parking' },
      
    ],
  },
  {
    title: 'Services',
    items: [
      { label: 'Unlimited high-speed Wi‑Fi', icon: 'wifi' },
      { label: 'Dedicated workspace', icon: 'workspace' },
      { label: 'Power backup', icon: 'power' },
      { label: 'Games – Badminton,Chess,Carroms', icon: 'party' },
      { label: 'Books', icon: 'party' },
      { label: 'Smart TV', icon: 'party' },
    ],
  },
  {
    title: 'Optional Services',
    items: [
      { label: 'BBQ facility', note: '₹800 extra', icon: 'bbq' },
      { label: 'Bonfire', note: '₹800 extra', icon: 'bonfire' },
    ],
  },
]

export default function Features(){
  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section__title">Amenities</h2>
        <div className="features__grid">
          {data.map((cat) => (
            <div key={cat.title} className="card">
              <div className="card__head">
                <h3 className="card__title">{cat.title}</h3>
              </div>
              <ul className="card__list">
                {cat.items.map((it, i) => (
                  <li key={i} className={`card__item ${it.highlight ? 'card__item--highlight' : ''}`}>
                    <span className="icon"><Icon name={it.icon} /></span>
                    <span>{it.label}</span>
                    {it.note && <span className="note">{it.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
