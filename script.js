/* Nuessence Clinic — Minimal JS
   Only: scroll animation for count-up numbers
   No heavy frameworks or dependencies */

(function () {
  'use strict';

  /* ── Intersection Observer: fade-in sections ── */
  if ('IntersectionObserver' in window) {
    const items = document.querySelectorAll(
      '.benefit-item, .testimonial-card, .why-item, .step, .ba-card'
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      io.observe(el);
    });
  }

  /* ── Count-up animation for statistics ── */
  function animateCount(el, target, duration) {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      el.textContent = isDecimal
        ? '★ ' + current.toFixed(1)
        : Math.round(current) + (el.dataset.suffix || '');

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    const nums = document.querySelectorAll('.count-item__num');

    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const raw = el.textContent.trim();

            if (raw.startsWith('★')) {
              animateCount(el, 4.9, 1400);
            } else if (raw.includes('+')) {
              const num = parseInt(raw, 10);
              el.dataset.suffix = '+';
              animateCount(el, num, 1600);
            }

            countIO.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    nums.forEach((el) => countIO.observe(el));
  }
})();
