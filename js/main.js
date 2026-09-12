// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  if(item.classList.contains('open')) a.style.maxHeight = a.scrollHeight + 'px';
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-a').style.maxHeight = 0;
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ---------- Testimonial slider (home page only) ----------
const track = document.getElementById('testimonialTrack');
if(track){
  const slides = track.children.length;
  const dotsWrap = document.getElementById('tDots');
  let current = 0;
  for(let i=0;i<slides;i++){
    const d = document.createElement('div');
    d.className = 'tdot' + (i===0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  }
  function update(){
    track.style.transform = `translateX(-${current * 100}%)`;
    [...dotsWrap.children].forEach((d,i) => d.classList.toggle('active', i===current));
  }
  function goTo(i){ current = (i + slides) % slides; update(); }
  document.getElementById('tPrev').addEventListener('click', () => goTo(current-1));
  document.getElementById('tNext').addEventListener('click', () => goTo(current+1));
  let autoplay = setInterval(() => goTo(current+1), 6000);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.parentElement.addEventListener('mouseleave', () => {
    clearInterval(autoplay);
    autoplay = setInterval(() => goTo(current+1), 6000);
  });
}

// ---------- Scroll reveal (with staggered grid children) ----------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, {threshold:0.12});
revealEls.forEach(el => {
  if(prefersReducedMotion){ el.classList.add('in'); } else { io.observe(el); }
});

// ---------- Animated stat counters ----------
const statNums = document.querySelectorAll('.stat-num');
function animateCount(el){
  const raw = el.textContent.trim();
  const match = raw.match(/^([\D]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if(!match){ return; }
  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];
  const target = parseFloat(numStr.replace(/,/g, ''));
  const hasComma = numStr.includes(',');
  const duration = 1400;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    const display = target % 1 === 0 ? Math.round(value) : value.toFixed(1);
    el.textContent = prefix + (hasComma ? Number(display).toLocaleString() : display) + suffix;
    if(progress < 1){ requestAnimationFrame(tick); }
  }
  if(prefersReducedMotion){
    el.textContent = raw;
  } else {
    requestAnimationFrame(tick);
  }
}
if(statNums.length){
  const statIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        animateCount(e.target);
        statIo.unobserve(e.target);
      }
    });
  }, {threshold:0.4});
  statNums.forEach(el => statIo.observe(el));
}

// ---------- Nav scroll shadow ----------
const siteHeader = document.querySelector('header');
if(siteHeader){
  const toggleHeaderShadow = () => siteHeader.classList.toggle('scrolled', window.scrollY > 12);
  toggleHeaderShadow();
  window.addEventListener('scroll', toggleHeaderShadow, {passive:true});
}

// ---------- Booking CTA demo behavior ----------
document.querySelectorAll('a[href="#book"], .final-cta .btn-primary').forEach(btn => {
  // smooth scroll already handled by CSS scroll-behavior
});

// ---------- Generic form validation (contact + booking) ----------
document.querySelectorAll('form[data-validate]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const wrap = field.closest('.form-field');
      let fieldValid = field.value.trim().length > 0;
      if(field.type === 'email' && fieldValid){
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      }
      if(wrap){
        wrap.classList.toggle('error', !fieldValid);
      }
      if(!fieldValid) valid = false;
    });
    if(valid){
      form.classList.add('submitted');
      const success = form.parentElement.querySelector('.form-success');
      if(success) success.classList.add('show');
      form.reset();
    }
  });
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      const wrap = field.closest('.form-field');
      if(wrap) wrap.classList.remove('error');
    });
  });
});

// ---------- Results filter (results.html) ----------
const filterBtns = document.querySelectorAll('.filter-btn');
if(filterBtns.length){
  const cards = document.querySelectorAll('[data-category]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });
}
