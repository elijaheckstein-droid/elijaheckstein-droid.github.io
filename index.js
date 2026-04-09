document.getElementById('year').textContent = new Date().getFullYear();

function openSellModal() {
  document.getElementById('sell-overlay').classList.add('open');
}
function closeSellModal(e) {
  if (e.target === document.getElementById('sell-overlay')) {
    document.getElementById('sell-overlay').classList.remove('open');
  }
}

function openPhone() {
  document.getElementById('phone-overlay').classList.add('open');
}
function closePhone(e) {
  if (e.target === document.getElementById('phone-overlay')) {
    document.getElementById('phone-overlay').classList.remove('open');
  }
}

function toggleMenu() {
  var nav = document.getElementById('mobile-nav');
  var btn = document.getElementById('hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

(function () {
  const cards = Array.from(document.querySelectorAll('.poke-card'));
  const dotsWrap = document.getElementById('carousel-dots');
  const total = cards.length;
  let current = 0;

  cards.forEach(function (_, i) {
    const d = document.createElement('div');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(d);
  });

  function posFor(index) {
    const diff = ((index - current) % total + total) % total;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === total - 1) return 'left';
    if (diff <= total / 2) return 'far-right';
    return 'far-left';
  }

  function render() {
    cards.forEach(function (card, i) {
      card.setAttribute('data-pos', posFor(i));
    });
    document.querySelectorAll('.carousel-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = ((index % total) + total) % total;
    render();
  }

  document.getElementById('prev-btn').addEventListener('click', function () { goTo(current - 1); });
  document.getElementById('next-btn').addEventListener('click', function () { goTo(current + 1); });

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      const pos = card.getAttribute('data-pos');
      if (pos === 'left') goTo(current - 1);
      if (pos === 'right') goTo(current + 1);
    });
  });

  let touchStartX = 0;
  const wrap = document.querySelector('.carousel-wrap');
  wrap.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend', function (e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
  });

  render();
})();

// Reviews carousel
(function () {
  var carousel = document.getElementById('reviews-carousel');
  var track = document.getElementById('reviews-track');
  var cards = Array.from(track.querySelectorAll('.review-card'));
  var dotsWrap = document.getElementById('reviews-dots');
  var total = cards.length;
  var current = 0;
  var gap = 16;

  function visibleCount() {
    return window.innerWidth <= 720 ? 1 : 3;
  }

  function setCardWidths() {
    var visible = visibleCount();
    var containerWidth = carousel.offsetWidth;
    var cardWidth = (containerWidth - gap * (visible - 1)) / visible;
    cards.forEach(function (card) {
      card.style.width = cardWidth + 'px';
    });
  }

  function maxIndex() {
    return Math.max(0, total - visibleCount());
  }

  cards.forEach(function (_, i) {
    var d = document.createElement('div');
    d.className = 'reviews-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(d);
  });

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    var cardWidth = cards[0].offsetWidth + gap;
    track.style.transform = 'translateX(-' + (current * cardWidth) + 'px)';
    document.querySelectorAll('.reviews-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
    document.getElementById('reviews-prev').disabled = current === 0;
    document.getElementById('reviews-next').disabled = current >= maxIndex();
  }

  document.getElementById('reviews-prev').addEventListener('click', function () { goTo(current - 1); });
  document.getElementById('reviews-next').addEventListener('click', function () { goTo(current + 1); });

  var touchStartX = 0;
  track.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
  });

  window.addEventListener('resize', function () {
    setCardWidths();
    goTo(Math.min(current, maxIndex()));
  });

  setCardWidths();
  goTo(0);
})();
