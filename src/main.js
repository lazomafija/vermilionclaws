import './styles/main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SwordHero3D } from './components/SwordHero3D.js';
import { SoundController } from './components/SoundController.js';
import { CursorEffects } from './components/CursorEffects.js';
import { CartDrawer } from './components/CartDrawer.js';
import { initLenis } from './components/LenisScroll.js';
import { PRODUCTS, TIERS, SIZING_GUIDE, RITUAL_STEPS, TESTIMONIALS } from './data/products.js';

gsap.registerPlugin(ScrollTrigger);

/* ─── Smooth Scroll Engine ──────────────────────── */
const lenis = initLenis();

/* ─── Core Services ──────────────────────────────── */
const sound = new SoundController();
const cursor = new CursorEffects();
const cart = new CartDrawer({ soundController: sound, lenisController: lenis, onCartUpdated: () => {} });
let sword3D = null;

/* ─── Prefers Reduced Motion ──────────────────── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Sound Toggle ───────────────────────────────── */
const soundBtn = document.getElementById('sound-toggle-btn');
if (soundBtn) {
  soundBtn.addEventListener('click', () => {
    const muted = sound.toggleMute();
    soundBtn.classList.toggle('active', !muted);
    soundBtn.querySelector('.sound-label').textContent = muted ? 'ZVUK' : 'TIHO';
  });
}

/* ─── Navigation Scroll Effect ──────────────────── */
const nav = document.querySelector('.site-nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── Mobile Menu ─────────────────────────────── */
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (mobileToggle && mobileNav) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    mobileToggle.setAttribute('aria-expanded', isOpen.toString());
  });
}

/* ─── Cart Button ───────────────────────────────── */
const cartNavBtn = document.getElementById('nav-cart-btn');
if (cartNavBtn) {
  cartNavBtn.addEventListener('click', () => {
    sound.playClick();
    cart.open();
  });
}

/* ─── GSAP Scroll Reveal (IntersectionObserver fallback) ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

/* ════════════════════════════════════════════════
   CINEMATIC HERO INTRO SEQUENCE
   ════════════════════════════════════════════════ */
function initHeroCinematic() {
  if (prefersReducedMotion) {
    // Show final states immediately
    gsap.set(['.hero-eyebrow', '.hero-title', '.hero-subtitle-script', '.hero-description', '.hero-actions', '.hero-stats'], {
      opacity: 1, y: 0, x: 0
    });
    return;
  }

  // Hide everything first
  gsap.set('.hero-eyebrow', { opacity: 0, y: 30 });
  gsap.set('.hero-title .title-line', { y: '110%', opacity: 0 });
  gsap.set('.hero-subtitle-script', { opacity: 0, y: 20 });
  gsap.set('.hero-description', { opacity: 0, y: 24 });
  gsap.set('.hero-actions', { opacity: 0, y: 20 });
  gsap.set('.hero-stats .stat-item', { opacity: 0, y: 20 });
  gsap.set('.hero-badge-ring', { scale: 0, opacity: 0 });

  const tl = gsap.timeline({ delay: 0.4 });

  // 1. Eyebrow line sweeps in
  tl.to('.hero-eyebrow', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out'
  })

  // 2. Title lines cascade up
  .to('.hero-title .title-line', {
    y: '0%',
    opacity: 1,
    duration: 1.1,
    stagger: 0.12,
    ease: 'power4.out'
  }, '-=0.5')

  // 3. Script subtitle
  .to('.hero-subtitle-script', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out'
  }, '-=0.6')

  // 4. Description
  .to('.hero-description', {
    opacity: 1,
    y: 0,
    duration: 0.85,
    ease: 'power3.out'
  }, '-=0.5')

  // 5. CTAs
  .to('.hero-actions', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.4')

  // 6. Stats cascade
  .to('.hero-stats .stat-item', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out'
  }, '-=0.3')

  // 7. Badge ring
  .to('.hero-badge-ring', {
    scale: 1,
    opacity: 1,
    duration: 1.2,
    ease: 'elastic.out(1, 0.5)'
  }, '-=0.8');
}

/* ════════════════════════════════════════════════
   SCROLL-TRIGGERED SECTION ANIMATIONS
   ════════════════════════════════════════════════ */
function initScrollAnimations() {
  if (prefersReducedMotion) return;

  // Marquee strip parallax
  gsap.to('.marquee-inner', {
    x: '-50%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.marquee-strip',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Hero 3D column subtle parallax
  gsap.to('.hero-3d-col', {
    y: -80,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    }
  });

  // Section headings — word by word reveal
  document.querySelectorAll('.section-title').forEach(el => {
    const words = el.textContent.split(' ');
    el.innerHTML = words.map(w =>
      `<span class="word-wrap"><span class="word-inner">${w}</span></span>`
    ).join(' ');

    gsap.fromTo(el.querySelectorAll('.word-inner'),
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.85,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Section tags reveal
  gsap.utils.toArray('.section-tag').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  // Section subtitles
  gsap.utils.toArray('.section-subtitle').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' }
      }
    );
  });

  // Ritual steps — stagger in
  gsap.utils.toArray('.ritual-card').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 50, rotateX: 15 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.85,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // Testimonials — stagger in with scale
  gsap.utils.toArray('.testimonial-card').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.9,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
      }
    );
  });

  // Product cards — stagger in with tilt-in
  gsap.utils.toArray('.product-grid:not(.carousel-stage) .product-card').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.75,
        delay: (i % 3) * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  // FAQ items
  gsap.utils.toArray('.faq-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.7,
        delay: i * 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  // Measurement visual frame reveal
  const measureFrame = document.querySelector('.measurement-visual-frame');
  if (measureFrame) {
    gsap.fromTo(measureFrame,
      { opacity: 0, y: 45, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: measureFrame, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  }

  // Measurement step cards — stagger in
  gsap.utils.toArray('.measure-step-card').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 35 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  // Horizontal pinned scroller for collections (if exists)
  const hScroll = document.querySelector('.h-scroll-track');
  if (hScroll) {
    const totalWidth = hScroll.scrollWidth - window.innerWidth;
    gsap.to(hScroll, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: '.h-scroll-section',
        start: 'top top',
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
  }

  // Divider line sweep
  gsap.utils.toArray('.ornament-divider').forEach(el => {
    gsap.fromTo(el,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1, opacity: 1,
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // Sizing table fade-in
  gsap.fromTo('.sizing-table-wrap',
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.sizing-table-wrap', start: 'top 85%', toggleActions: 'play none none none' }
    }
  );
}

/* ════════════════════════════════════════════════
   MAGNETIC CTA BUTTONS
   ════════════════════════════════════════════════ */
function initMagneticButtons() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.btn-primary, .btn-ghost, .btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.3;
      const dy = (e.clientY - cy) * 0.3;
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

/* ════════════════════════════════════════════════
   PRODUCT GRID RENDERING
   ════════════════════════════════════════════════ */
let visibleProducts = PRODUCTS;
let activeProductIndex = 0;

function positionCarousel(animate = true) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.product-card')];
  const count = cards.length;
  cards.forEach((card, index) => {
    let offset = index - activeProductIndex;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    const distance = Math.abs(offset);
    card.classList.toggle('is-active', offset === 0);
    card.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
    card.inert = offset !== 0;
    card.style.zIndex = String(10 - distance);

    const isMobile = window.matchMedia('(max-width: 700px)').matches;
    const x = isMobile ? offset * 66 : offset * 72;
    const rotation = offset === 0 ? 0 : (offset < 0 ? 1 : -1) * Math.min(distance * 7, 16);
    const scale = offset === 0 ? 1 : distance === 1 ? 0.78 : 0.62;
    const opacity = offset === 0 ? 1 : distance === 1 ? 0.72 : distance === 2 ? 0.26 : 0;
    const transform = { xPercent: x, y: offset === 0 ? 0 : 18 + distance * 8, rotateY: rotation, scale, opacity };
    if (animate && !prefersReducedMotion) {
      gsap.to(card, { ...transform, duration: 0.8, ease: 'power4.out', overwrite: true, transformPerspective: 1500 });
    } else {
      gsap.set(card, { ...transform, transformPerspective: 1500 });
    }
  });

  const current = grid.closest('.collection-carousel')?.querySelector('.carousel-current');
  const total = grid.closest('.collection-carousel')?.querySelector('.carousel-total');
  const progress = grid.closest('.collection-carousel')?.querySelector('.carousel-progress > span');
  if (current) current.textContent = String(activeProductIndex + 1).padStart(2, '0');
  if (total) total.textContent = String(count).padStart(2, '0');
  if (progress) progress.style.width = `${count ? ((activeProductIndex + 1) / count) * 100 : 0}%`;
}

function stepCarousel(step) {
  if (!visibleProducts.length) return;
  activeProductIndex = (activeProductIndex + step + visibleProducts.length) % visibleProducts.length;
  positionCarousel();
  sound.playClick();
}

function renderProducts(filter = 'all') {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  visibleProducts = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.tier === filter);
  activeProductIndex = 0;
  grid.innerHTML = '';

  visibleProducts.forEach((product, index) => {
    const card = document.createElement('article');
    card.className = 'product-card interactive-card';
    card.dataset.productId = product.id;
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `${product.title}, ${index + 1} od ${visibleProducts.length}`);
    card.innerHTML = `
      <div class="product-card-image-wrap">
        <img src="${product.image}" alt="${product.title}" loading="lazy" />
        <div class="product-card-overlay" aria-hidden="true"></div>
        <div class="product-badge">${product.badge}</div>
        <div class="product-tier-label">${product.tierLabel}</div>
        <span class="image-caption">RUČNO OBLIKOVANO · BEOGRAD</span>
      </div>
      <div class="product-card-body">
        <div class="product-card-kicker">${product.subtitle}</div>
        <h3 class="product-card-title">${product.title}</h3>
        <p class="product-card-desc">${product.description}</p>
        <div class="product-card-specs">
          <span class="spec-tag">${product.shape}</span>
          <span class="spec-tag">${product.length}</span>
          <span class="spec-tag">${product.finish.split('&')[0].trim()}</span>
        </div>
      </div>
      <div class="product-card-footer">
        <div class="product-price-group">
          <span class="product-price-rsd">${product.price.toLocaleString('sr-RS')} RSD</span>
          <span class="product-price-eur">≈ ${product.priceEur} EUR</span>
        </div>
        <button class="product-add-btn" data-product-id="${product.id}" aria-label="Dodaj ${product.title} u korpu">
          <span>Dodaj u korpu</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
    `;
    card.addEventListener('click', (event) => {
      if (grid.dataset.suppressClick === 'true') return;
      if (event.target.closest('button')) return;
      const nextIndex = visibleProducts.findIndex(item => item.id === product.id);
      if (nextIndex !== activeProductIndex) {
        activeProductIndex = nextIndex;
        positionCarousel();
      }
    });
    grid.appendChild(card);
  });

  grid.querySelectorAll('.product-add-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const product = visibleProducts.find(item => item.id === btn.dataset.productId);
      if (product) {
        cart.addItem(product);
        pulseCartButton();
        if (!prefersReducedMotion) gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(3)' });
      }
    });
  });

  positionCarousel(false);
}

function initProductCarousel() {
  const carousel = document.querySelector('.collection-carousel');
  const grid = document.getElementById('product-grid');
  if (!carousel || !grid) return;
  carousel.querySelector('.carousel-arrow-prev')?.addEventListener('click', () => stepCarousel(-1));
  carousel.querySelector('.carousel-arrow-next')?.addEventListener('click', () => stepCarousel(1));
  grid.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      stepCarousel(event.key === 'ArrowRight' ? 1 : -1);
    }
  });

  let pointerStart = null;
  grid.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
    pointerStart = { x: event.clientX, y: event.clientY };
  });
  grid.addEventListener('pointerup', (event) => {
    if (!pointerStart) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      grid.dataset.suppressClick = 'true';
      stepCarousel(dx < 0 ? 1 : -1);
      window.setTimeout(() => { delete grid.dataset.suppressClick; }, 350);
    }
    pointerStart = null;
  });
  grid.addEventListener('pointercancel', () => { pointerStart = null; });
  window.addEventListener('resize', () => positionCarousel(false), { passive: true });
}

function pulseCartButton() {
  const cartBtn = document.getElementById('nav-cart-btn');
  const badge = document.getElementById('nav-cart-count');
  if (!cartBtn || prefersReducedMotion) return;

  gsap.killTweensOf([cartBtn, badge]);
  const pulse = gsap.timeline();
  pulse.fromTo(cartBtn,
    { scale: 0.92, rotateX: -8, rotateY: 10, boxShadow: '0 0 0 rgba(191, 25, 50, 0)' },
    {
      scale: 1.07,
      rotateX: 0,
      rotateY: 0,
      boxShadow: '0 0 18px rgba(191, 25, 50, 0.24)',
      duration: 0.32,
      ease: 'power3.out',
      transformPerspective: 640
    }
  ).to(cartBtn, {
    scale: 1,
    boxShadow: '0 0 0 rgba(191, 25, 50, 0)',
    duration: 0.42,
    ease: 'power2.out'
  });

  if (badge) {
    pulse.fromTo(badge,
      { scale: 0.55, y: -3, opacity: 0.55 },
      { scale: 1, y: 0, opacity: 1, duration: 0.3, ease: 'back.out(2)' },
      0.04
    );
  }
}

/* ─── Tier Filter Tabs ─────────────────────────── */
function initTierTabs() {
  const tabs = document.querySelectorAll('.tier-tab');
  const indicator = document.querySelector('.tier-tab-indicator');

  function moveIndicator(tab) {
    if (!indicator || prefersReducedMotion) return;
    const tabRect = tab.getBoundingClientRect();
    const parentRect = tab.closest('.tier-tabs').getBoundingClientRect();
    gsap.to(indicator, {
      x: tabRect.left - parentRect.left,
      width: tabRect.width,
      duration: 0.4,
      ease: 'power3.out'
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      sound.playClick();
      moveIndicator(tab);
      renderProducts(tab.dataset.tier);
    });
  });

  // Init indicator position
  const activeTab = document.querySelector('.tier-tab.active');
  if (activeTab) setTimeout(() => moveIndicator(activeTab), 100);
}

/* ─── Customizer ─────────────────────────────── */
function initCustomizer() {
  const custConfig = {
    shape: 'Stiletto',
    length: 'Dugi (Long)',
    finish: 'Mat somot',
    size: 'M (Standard)',
    basePrice: 5900
  };

  const priceMap = {
    shape: { 'Stiletto': 0, 'Kovčeg (Coffin)': -400, 'Badem (Almond)': 200, 'Četvrtasti (Square)': -200 },
    length: { 'Kratki (Short)': -600, 'Srednji (Medium)': 0, 'Dugi (Long)': 600, 'Kandže (Extreme)': 1400 },
    finish: { 'Mat somot': 0, 'Visoki sjaj': 300, 'Krvavi hrom': 900, 'Tekstura opsidijana': 700 }
  };

  function calcPrice() {
    return custConfig.basePrice
      + (priceMap.shape[custConfig.shape] || 0)
      + (priceMap.length[custConfig.length] || 0)
      + (priceMap.finish[custConfig.finish] || 0);
  }

  function shapeKey(value) {
    if (value.includes('Kovčeg') || value.includes('Coffin')) return 'coffin';
    if (value.includes('Badem') || value.includes('Almond')) return 'almond';
    if (value.includes('Četvrtast') || value.includes('Square')) return 'square';
    return 'stiletto';
  }

  function lengthKey(value) {
    if (value.includes('Kratki')) return 'short';
    if (value.includes('Srednji')) return 'medium';
    if (value.includes('Kandže') || value.includes('Extreme')) return 'extreme';
    return 'long';
  }

  function finishKey(value) {
    if (value.includes('sjaj')) return 'gloss';
    if (value.includes('hrom')) return 'chrome';
    if (value.includes('opsidijan') || value.includes('Opsidijan')) return 'obsidian';
    return 'mat';
  }

  function sizeKey(value) {
    if (value === 'XS') return 'xs';
    if (value === 'S') return 's';
    if (value === 'L') return 'l';
    if (value.includes('Prilagođeno')) return 'custom';
    return 'm';
  }

  function renderNailPreview() {
    const container = document.getElementById('custom-nail-preview')
      || document.querySelector('.summary-preview-nails');
    if (!container) return;

    container.dataset.shape = shapeKey(custConfig.shape);
    container.dataset.length = lengthKey(custConfig.length);
    container.dataset.finish = finishKey(custConfig.finish);
    container.dataset.size = sizeKey(custConfig.size);

    if (prefersReducedMotion) return;
    const clips = container.querySelectorAll('.nail-clip');
    gsap.fromTo(clips, {
      scale: 0.94,
      opacity: 0.72
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.42,
      stagger: 0.035,
      ease: 'power3.out',
      overwrite: true
    });
  }

  function updateSummary() {
    const total = calcPrice();
    const priceEl = document.getElementById('cust-summary-price');
    if (priceEl) {
      // Animate price change
      if (!prefersReducedMotion) {
        gsap.fromTo(priceEl, { scale: 1.12, color: '#ff4d6d' }, { scale: 1, color: '#BF1932', duration: 0.4, ease: 'back.out(2)' });
      }
      priceEl.textContent = `${total.toLocaleString('sr-RS')} RSD`;
    }
    const specShape = document.getElementById('cust-spec-shape');
    const specLength = document.getElementById('cust-spec-length');
    const specFinish = document.getElementById('cust-spec-finish');
    const specSize = document.getElementById('cust-spec-size');
    if (specShape) specShape.textContent = custConfig.shape;
    if (specLength) specLength.textContent = custConfig.length;
    if (specFinish) specFinish.textContent = custConfig.finish;
    if (specSize) specSize.textContent = custConfig.size;
    renderNailPreview();
  }

  document.querySelectorAll('.option-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const group = pill.dataset.group;
      const value = pill.dataset.value;
      pill.closest('.option-pills').querySelectorAll('.option-pill').forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      if (group && value) {
        custConfig[group] = value;
        sound.playClick();
        updateSummary();
      }
    });
  });

  const addCustBtn = document.getElementById('add-custom-to-cart');
  if (addCustBtn) {
    addCustBtn.addEventListener('click', () => {
      const total = calcPrice();
      cart.addItem({
        id: 'custom-set',
        title: 'Custom Set po Meri',
        price: total,
        priceEur: Math.round(total / 117.5),
        image: '/images/customizer/nail-2.png',
        shape: custConfig.shape,
        length: custConfig.length,
        finish: custConfig.finish
      }, custConfig);
      pulseCartButton();
    });
  }

  updateSummary();
}

/* ─── FAQ Accordion ──────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('open');
        q.setAttribute('aria-expanded', 'false');
        const answer = q.nextElementSibling;
        if (answer && !prefersReducedMotion) {
          gsap.to(answer, { height: 0, duration: 0.3, ease: 'power2.inOut', onComplete: () => answer.classList.remove('open') });
        } else if (answer) {
          answer.classList.remove('open');
        }
      });
      if (!isOpen) {
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        const answer = btn.nextElementSibling;
        if (answer) {
          answer.classList.add('open');
          if (!prefersReducedMotion) {
            gsap.fromTo(answer, { height: 0 }, { height: 'auto', duration: 0.4, ease: 'power3.out' });
          }
        }
        sound.playClick();
      }
    });
  });
}

/* ─── Personal Contact Panel ─────────────────── */
function initPersonalContact() {
  const toggle = document.getElementById('personal-contact-toggle');
  const panel = document.getElementById('personal-contact-panel');
  const close = document.getElementById('personal-contact-close');
  if (!toggle || !panel) return;

  const setOpen = (isOpen) => {
    panel.classList.toggle('open', isOpen);
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    panel.setAttribute('aria-hidden', String(!isOpen));
  };

  toggle.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  close?.addEventListener('click', () => setOpen(false));
  document.addEventListener('click', (event) => {
    if (panel.classList.contains('open') && !event.target.closest('.personal-contact')) {
      setOpen(false);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}

/* ─── Animated Counter ──────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1.8;

  if (prefersReducedMotion) {
    el.textContent = target + (el.dataset.suffix || '');
    return;
  }

  gsap.to({ val: 0 }, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate: function() {
      el.textContent = Math.round(this.targets()[0].val) + (el.dataset.suffix || '');
    }
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-value[data-target]').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

/* ─── Sizing Guide Render ──────────────────── */
function renderSizingGuide() {
  const tableBody = document.getElementById('sizing-table-body');
  if (!tableBody) return;
  SIZING_GUIDE.sizes.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.name}</td><td>${row.thumb}</td><td>${row.index}</td><td>${row.middle}</td><td>${row.ring}</td><td>${row.pinky}</td>`;
    tableBody.appendChild(tr);
  });
}

/* ─── Render Ritual Steps ──────────────────── */
function renderRitual() {
  const grid = document.getElementById('ritual-grid');
  if (!grid) return;

  RITUAL_STEPS.forEach((step, i) => {
    const card = document.createElement('div');
    card.className = 'ritual-card';
    card.innerHTML = `
      <div class="ritual-step-icon" aria-hidden="true">${step.icon || '⚔'}</div>
      <span class="ritual-step-number">${step.step}</span>
      <h3 class="ritual-card-title">${step.title}</h3>
      <p class="ritual-card-desc">${step.description}</p>
    `;
    grid.appendChild(card);
  });
}

/* ─── Render Testimonials ──────────────────── */
function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  TESTIMONIALS.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testimonial-stars" aria-label="5 od 5 zvezdica">★ ★ ★ ★ ★</div>
      <blockquote class="testimonial-quote">"${t.quote}"</blockquote>
      <div class="testimonial-author-row">
        <div class="testimonial-avatar" aria-hidden="true">${t.author.charAt(0)}</div>
        <div>
          <div class="testimonial-author-name">${t.author}, ${t.city}</div>
          <div class="testimonial-meta">Set: ${t.set}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ─── Nav smooth scroll (via Lenis) ─────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.5 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Close mobile nav if open
      mobileNav?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

/* ─── 3D Sword Hero ────────────────────────── */
const heroContainer = document.getElementById('hero-3d-container');
const loaderBar = document.getElementById('sword-loader-bar');
const loaderWrap = document.getElementById('sword-loader');
const glowHint = document.getElementById('glow-hint');

if (heroContainer) {
  sword3D = new SwordHero3D(heroContainer, {
    modelUrl: '/models/sword.glb',
    soundController: sound,
    onProgress: (pct) => {
      if (loaderBar) {
        gsap.to(loaderBar, { width: `${pct}%`, duration: 0.3, ease: 'power1.out' });
      }
    },
    onLoaded: () => {
      if (loaderWrap) {
        gsap.to(loaderWrap, {
          opacity: 0, duration: 0.6, onComplete: () => {
            loaderWrap.classList.add('hidden');
            loaderWrap.remove();
          }
        });
      }
    },
    onGlowTriggered: () => {
      if (glowHint) {
        setTimeout(() => {
          glowHint.classList.add('visible');
          gsap.fromTo(glowHint, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
        }, 2800);
      }
    }
  });

  heroContainer.addEventListener('click', () => {
    if (sword3D?.introComplete) sword3D.boostGlow();
  });
}

/* ─── Initialize Everything ─────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Render dynamic content first
  renderProducts('all');
  renderRitual();
  renderTestimonials();
  renderSizingGuide();

  // UI init
  initProductCarousel();
  initTierTabs();
  initCustomizer();
  initFAQ();
  initPersonalContact();

  // GSAP scroll animations & buttons
  initScrollAnimations();
  initMagneticButtons();

  // Synchronize Hero Cinematic with Higgsfield Loader reveal
  let heroStarted = false;
  const triggerHeroEntrance = () => {
    if (heroStarted) return;
    heroStarted = true;
    initHeroCinematic();
  };

  window.addEventListener('loader:revealed', triggerHeroEntrance, { once: true });
  setTimeout(triggerHeroEntrance, 2400); // Safety fallback

  // Refresh ScrollTrigger after fonts/media loaded
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});
