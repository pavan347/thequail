(function() {
  // Set footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Smooth fade-in animation on load
  document.body.style.opacity = '0';
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.body.style.transition = 'opacity 1.5s ease-in-out';
      document.body.style.opacity = '1';
    }, 100);
  });
})();
