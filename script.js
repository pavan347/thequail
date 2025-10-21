(function(){
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if(navToggle && navList){
    navToggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Year in footer
  const yearEl = $('#year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Booking defaults & validation
  const checkin = $('#checkin');
  const checkout = $('#checkout');
  const form = $('#booking');
  const today = new Date();
  const toISO = d => d.toISOString().slice(0,10);
  if(checkin && checkout){
    const minIn = new Date(today);
    minIn.setDate(minIn.getDate()+1); // earliest tomorrow
    checkin.min = toISO(minIn);

    const minOut = new Date(minIn);
    minOut.setDate(minOut.getDate()+2); // 2 nights default
    checkin.value = toISO(minIn);
    checkout.min = toISO(new Date(minIn.getTime()+24*60*60*1000));
    checkout.value = toISO(minOut);

    checkin.addEventListener('change', () => {
      const inDate = new Date(checkin.value);
      const nextDay = new Date(inDate);
      nextDay.setDate(inDate.getDate()+1);
      checkout.min = toISO(nextDay);
      if(new Date(checkout.value) <= inDate){
        const suggested = new Date(inDate);
        suggested.setDate(inDate.getDate()+2);
        checkout.value = toISO(suggested);
      }
    });
  }

  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        checkin: checkin?.value,
        checkout: checkout?.value,
        guests: document.getElementById('guests')?.value
      };
      // Placeholder: show a friendly toast
      alert(`Thanks! We'll check availability for ${data.guests} guest(s) from ${data.checkin} to ${data.checkout}.`);
    });
  }

  // Smooth scroll for internal links
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if(id && id.length>1){
        const el = document.querySelector(id);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    });
  });
})();
