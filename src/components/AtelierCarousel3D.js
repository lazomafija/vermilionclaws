import { gsap } from 'gsap';

export const ATELIER_ITEMS = [
  {
    id: 'sovereign-noir',
    title: 'SOVEREIGN NOIR',
    serbianTitle: 'Krvavi Relikvijar',
    tier: 'relic',
    tierLabel: 'Nivo II — Relikvijar',
    price: 5000,
    priceEur: 42,
    shape: 'Stiletto',
    length: 'Dugi (Long)',
    finish: 'Mat somot sa srebrnim filigranom',
    description: 'Besprijekorna barokna filigranska čipka izlivena u srebrnom reljefu, mat crna baršunasta baza sa usađenim rubinima boje zgrušane krvi i delikatnim srebrnim paukovim mrežama.',
    features: [
      '100% ručno vajani 3D detalji',
      'Originalni Swarovski rubin kristali',
      'Ojačani gel vrhovi otporni na lomljenje',
      'Kompletan pripremni set za aplikaciju'
    ],
    image: '/images/nail_sovereign_noir.jpg',
    badge: 'Najprodavaniji'
  },
  {
    id: 'crimson-nocturne',
    title: 'CRIMSON NOCTURNE',
    serbianTitle: 'Astralni Nokturno',
    tier: 'couture',
    tierLabel: 'Nivo III — Couture',
    price: 5000,
    priceEur: 42,
    shape: 'Badem (Almond)',
    length: 'Ekstremni (Claws)',
    finish: 'Rastopljeni stakleni sjaj & tečni hrom',
    description: 'Hipotetički ombré preliv iz najdubljeg opsidijana u zvaničnu Pantone 19-1664 True Red boju. Skulpturalni 3D tečni hrom u formi trnja i kapi koje izgledaju sveže i mokro.',
    features: [
      'Pantone 19-1664 True Red pigmentacija',
      '3D skulpturalni tečni hrom bez ljuštenja',
      'Ekstremna čvrstoća za posebne prilike',
      'Luksuzna crna somotska kutija sa voskom'
    ],
    image: '/images/nail_crimson_nocturne.jpg',
    badge: 'Limitirana Serija'
  },
  {
    id: 'gothic-cathedral',
    title: 'GOTHIC CATHEDRAL',
    serbianTitle: 'Gotska Katedrala',
    tier: 'relic',
    tierLabel: 'Nivo II — Relikvijar',
    price: 5900,
    priceEur: 50,
    shape: 'Kovčeg (Coffin)',
    length: 'Srednji (Medium)',
    finish: 'Smoked Glass & crkveni vitraž',
    description: 'Inspirisano vitražima i rozetama srednjovekovnih katedrala. Poluprozirna dimljena baza sa tamnocrvenim konturama i oštrim metalnim bordurama.',
    features: [
      'Poluprozirni "stained-glass" vitraž efekat',
      'Mikro-metalne bordure u nijansi tamnog čelika',
      'Udobna dužina pogodna za svakodnevno nošenje',
      'Vodootporno vezivanje do 4 nedelje'
    ],
    image: '/images/nail_gothic_cathedral.jpg',
    badge: 'Umetnički Izbor'
  },
  {
    id: 'demonic-blade',
    title: 'DEMONIC BLADE',
    serbianTitle: 'Demonsko Sečivo',
    tier: 'couture',
    tierLabel: 'Nivo III — Couture',
    price: 9800,
    priceEur: 83,
    shape: 'Stiletto',
    length: 'Dugi (Long)',
    finish: 'Damaskus čelik & reljefni mač',
    description: 'Krunski dragulj Vermilion Claws ateljea. Centralni nokti nose ručno izliveni reljef demonskog mača sa zlatnim balčakom i pulsirajućim krvavim sečivom.',
    features: [
      '3D metalni reljef inspirisan ceremonialnim mačem',
      'Efekat brušenog Damaskus čelika',
      'Pozlaćeni antikni akcenti',
      'Potpisano sertifikatom autentičnosti'
    ],
    image: '/images/nail_demonic_blade.jpg',
    badge: 'Potpis Brenda'
  },
  {
    id: 'vampiric-velvet',
    title: 'VAMPIRIC VELVET',
    serbianTitle: 'Mesečev Trag',
    tier: 'minimal',
    tierLabel: 'Nivo I — Minimal',
    price: 3200,
    priceEur: 27,
    shape: 'Stiletto',
    length: 'Srednji (Medium)',
    finish: 'Mat somot & tečno sečivo',
    description: 'Sofisticirana jednostavnost za one koji vole suptilnu opasnost. Mat bordo-crni somot sa diskretnim potezom tečnog sečiva i jednom rubinskom kapi.',
    features: [
      'Ultra-meki mat baršunasti dodir',
      'Diskretan hromirani detalj sečiva',
      'Idealno za formalne i večernje događaje',
      'Jednostavna aplikacija za 5 minuta'
    ],
    image: '/images/nail_vampiric_velvet.jpg',
    badge: 'Gotski Minimalizam'
  },
  {
    id: 'obsidian-relic',
    title: 'OBSIDIAN RELIC',
    serbianTitle: 'Opalni Mozaik',
    tier: 'minimal',
    tierLabel: 'Nivo I — Minimal',
    price: 2800,
    priceEur: 24,
    shape: 'Kovčeg (Coffin)',
    length: 'Srednji (Medium)',
    finish: 'Tekstura sirovog opsidijana',
    description: 'Fasetirane ivice sirovog vulkanskog stakla sa tamno-sivim prelivima i zvezdanim mikro-pigmentima koji svetle pod noćnim osvetljenjem.',
    features: [
      'Teksturirani mat & fasetirani premaz',
      'Izuzetna otpornost na habanje i grebanje',
      'Usklađeno sa bilo kojim stilom odeće',
      'Višekratna upotreba (do 5 puta)'
    ],
    image: '/images/nail_obsidian_relic.jpg',
    badge: 'Klasična Tama'
  },
  {
    id: 'sumski-bestijarijum',
    title: 'SYLVAN BESTIARY',
    serbianTitle: 'Šumski Bestijarijum',
    tier: 'minimal',
    tierLabel: 'Nivo I — Minimal',
    price: 4000,
    priceEur: 34,
    shape: 'Badem (Almond)',
    length: 'Srednji (Medium)',
    finish: '3D reljefni detalji & ručno oslikani šumski motivi',
    description: 'Organski mikrokosmos začarane šume. Svaki nokat nosi poseban unikat — reljefne pečurke, bubamara sa kapima rose, smaragdna krila insekata, nar i krila monarh leptira.',
    features: [
      '100% ručno oslikani šumski motivi',
      '3D reljefne pečurke, bubamara i kapi rose',
      'Detalji krila monarh leptira i vilinog konjica'
    ],
    image: '/images/atelier/sumski-bestijarijum.png',
    badge: 'Ručni Rad'
  },
  {
    id: 'blood-reliquary',
    title: 'BLOOD RELIQUARY',
    serbianTitle: 'Krvavi Relikvijar',
    tier: 'couture',
    tierLabel: 'Nivo III — Couture',
    price: 9400,
    priceEur: 80,
    shape: 'Kovčeg (Coffin)',
    length: 'Dugi (Long)',
    finish: 'Gotski reljefni krst & rubinski vosak',
    description: 'Kombinacija crnih gotskih krstova od tečnog metala, krvavo crvenog jaspisa i baroknog kaligrafskog mikro-ispisa.',
    features: [
      'Ručno vajani gotski krstovi u metalu',
      'Tamno rubinski ombré vosak efekat',
      'Kovčeg oblik ojačan titanijumskim gelom'
    ],
    image: '/images/atelier/bdb803c7-71a2-4eb6-a627-46d8a10f1228.jpeg',
    badge: 'Kolekcionarski Primerak'
  },
  {
    id: 'celestial-eclipse',
    title: 'CELESTIAL ECLIPSE',
    serbianTitle: 'Zlatno Pomračenje',
    tier: 'relic',
    tierLabel: 'Nivo II — Relikvijar',
    price: 7600,
    priceEur: 64,
    shape: 'Badem (Almond)',
    length: 'Srednji (Medium)',
    finish: 'Barokno 24K zlato & biseri tame',
    description: 'Kraljevski solarni i lunarni simboli u pozlaćenom reljefu sa usađenim crnim oniksom i biserima na mističnoj podlozi.',
    features: [
      '24K pozlaćeni solarni i lunarni reljefi',
      'Prirodni mini rečni biseri i oniks',
      'Zaobljeni badem oblik za visoku eleganciju'
    ],
    image: '/images/atelier/IMG_0568.jpeg',
    badge: 'Barokna Raskoš'
  },
  {
    id: 'smaragdni-sprajt',
    title: 'EMERALD SPRITE',
    serbianTitle: 'Smaragdni Sprajt',
    tier: 'couture',
    tierLabel: 'Nivo III — Couture',
    price: 4000,
    priceEur: 34,
    shape: 'Stiletto',
    length: 'Dugi (Long)',
    finish: 'Roze cat-eye sa 3D reljefnim skulpturama',
    description: 'Blistava roze cat-eye baza u kombinaciji sa reljefnim 3D zelenim sprajtovima, školjkastim talasima, nežnim biserima i sjajnim zvezdanim motivima.',
    features: [
      'Ručno vajani 3D sprajtovi u mint zelenoj boji',
      'Roze cat-eye magnetni sjaj i biseri',
      'Izduženi stiletto oblik sa zvezdanim cirkonima'
    ],
    image: '/images/smaragdni-sprajt.png',
    badge: '3D Skulptura'
  },
  {
    id: 'glazirani-biser',
    title: 'GLAZED PEARL',
    serbianTitle: 'Glazirani Biser',
    tier: 'minimal',
    tierLabel: 'Nivo I — Minimal',
    price: 2500,
    priceEur: 21,
    shape: 'Badem (Almond)',
    length: 'Srednji (Medium)',
    finish: 'Biserni glaze premaz visokog sjaja',
    description: 'Suptilna čistoća i vanvremenska elegancija. Mlečno bela podloga obogaćena nežnim sedefastim hromom.',
    features: [
      'Visokosjajni sedefasti glazed chrome finiš',
      'Univerzalna mlečno-bela nijansa',
      'Klasičan bademasti oblik udoban za svaki dan'
    ],
    image: '/images/glazirani-biser.png',
    badge: 'Klasični Minimal'
  }
];

export class AtelierCarousel3D {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.track = this.container.querySelector('#atelier-carousel-track');
    this.prevBtn = this.container.querySelector('#carousel-btn-prev');
    this.nextBtn = this.container.querySelector('#carousel-btn-next');
    this.pagination = this.container.querySelector('#carousel-pagination');
    this.canvas = document.getElementById('atelier-embers-canvas');
    this.modal = document.getElementById('atelier-modal');

    this.options = Object.assign({
      items: ATELIER_ITEMS,
      startIndex: 1, // Index 1 is Crimson Nocturne (Center), 0 is Sovereign Noir (Left), 2 is Gothic Cathedral (Right)
      soundController: null,
      cartController: null
    }, options);

    this.items = this.options.items;
    this.currentIndex = this.options.startIndex;
    this.cards = [];
    this.dots = [];
    this.isAnimating = false;

    // Mouse / Touch Drag Tracking
    this.isDragging = false;
    this.startX = 0;
    this.currentTranslateX = 0;
    this.dragThreshold = 45;

    // 3D Gyro / Parallax tilt
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isHoveringTrack = false;
    this.rafId = null;

    // Canvas particle system
    this.particles = [];
    this.isCanvasActive = true;

    this.init();
  }

  init() {
    if (!this.track) return;

    this.renderCards();
    this.renderPagination();
    this.setupEvents();
    this.initEmbersCanvas();
    this.updateCarousel(false);
    this.startParallaxLoop();
  }

  renderCards() {
    this.track.innerHTML = '';
    this.cards = [];

    // Gothic filigree SVG markup
    const filigreeCornerSvg = `
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4C14 4 22 12 22 22C22 28 18 32 12 32C6 32 2 28 2 22C2 12 10 4 20 4C28 4 36 12 36 20C36 24 34 28 30 28C26 28 24 24 24 20" 
              stroke="url(#filigree-grad)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
        <circle cx="8" cy="8" r="1.6" fill="#bf1932"/>
        <defs>
          <linearGradient id="filigree-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#dce0f0"/>
            <stop offset="50%" stop-color="#8a92a5"/>
            <stop offset="100%" stop-color="#3d151d"/>
          </linearGradient>
        </defs>
      </svg>
    `;

    this.items.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'atelier-card';
      card.dataset.index = index;
      card.dataset.id = item.id;
      card.setAttribute('role', 'group');
      card.setAttribute('aria-roledescription', 'slide');
      card.setAttribute('aria-label', `${item.title} — ${item.tierLabel}`);

      card.innerHTML = `
        <div class="card-inner">
          
          <!-- Outer Gothic Ornate Frame (EXACT COPY OF REFERENCE) -->
          <div class="card-gothic-frame" aria-hidden="true">
            <div class="frame-border-outer"></div>
            <div class="frame-border-inner"></div>

            <!-- Top Arched Gothic Crest / Finial -->
            <div class="frame-crest-top">
              <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 2L35 11L46 13L38 17L30 14L22 17L14 13L25 11L30 2Z" fill="#1b1c24" stroke="rgba(191,25,50,0.4)" stroke-width="0.8" />
                <path d="M30 4L33 11L40 12L34 15L30 13L26 15L20 12L27 11L30 4Z" fill="url(#crest-grad)" />
                <circle cx="30" cy="9" r="1.5" fill="#bf1932" />
                <defs>
                  <linearGradient id="crest-grad" x1="20" y1="2" x2="40" y2="18" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#dce0f0"/>
                    <stop offset="100%" stop-color="#2a2d3a"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <!-- 4 Gothic Filigree Corner Ornaments -->
            <div class="frame-filigree filigree-tl">${filigreeCornerSvg}</div>
            <div class="frame-filigree filigree-tr">${filigreeCornerSvg}</div>
            <div class="frame-filigree filigree-bl">${filigreeCornerSvg}</div>
            <div class="frame-filigree filigree-br">${filigreeCornerSvg}</div>
          </div>

          <!-- Image Display Window -->
          <div class="card-image-box">
            <img src="${item.image}" alt="${item.title} — ${item.serbianTitle}" class="card-img" loading="eager" />
            <div class="card-shadow-vignette" aria-hidden="true"></div>
            <div class="card-specular-glare" aria-hidden="true"></div>
          </div>

          <!-- Bottom Gothic Nameplate Plaque (EXACT COPY OF REFERENCE) -->
          <div class="card-nameplate">
            <div class="nameplate-inner">
              <h3 class="nameplate-title">${item.title}</h3>
              <div class="nameplate-ornament" aria-hidden="true">
                <span class="nameplate-line"></span>
                <span class="nameplate-star">✦</span>
                <span class="nameplate-line"></span>
              </div>
            </div>
          </div>

        </div>
      `;

      // Direct click on card
      card.addEventListener('click', (e) => {
        const clickedIndex = parseInt(card.dataset.index, 10);
        let offset = clickedIndex - this.currentIndex;
        const total = this.items.length;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        if (offset === 0) {
          // Click on active card opens luxury Quick View inspection modal!
          this.openModal(item);
        } else {
          // Click on left/right card smoothly rotates to it!
          this.goTo(clickedIndex);
        }
      });

      this.track.appendChild(card);
      this.cards.push(card);
    });
  }

  renderPagination() {
    if (!this.pagination) return;
    this.pagination.innerHTML = '';
    this.dots = [];

    // Render 3 primary indicator dots (or up to items length)
    // To match reference image, show pagination dots
    const dotCount = Math.min(this.items.length, 5);
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-page-dot';
      dot.setAttribute('type', 'button');
      dot.setAttribute('aria-label', `Prebaci na unikat ${i + 1}`);
      dot.dataset.dotIndex = i;

      dot.addEventListener('click', () => {
        this.goTo(i);
      });

      this.pagination.appendChild(dot);
      this.dots.push(dot);
    }
  }

  updateCarousel(animate = true) {
    const total = this.items.length;
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024 && !isMobile;

    // Spacing offsets in pixels
    const offsetDistance = isMobile ? 220 : (isTablet ? 320 : 410);

    this.cards.forEach((card, index) => {
      let offset = index - this.currentIndex;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const distance = Math.abs(offset);
      const isActive = offset === 0;

      card.classList.toggle('is-active', isActive);
      card.setAttribute('aria-hidden', isActive ? 'false' : 'true');

      let x = 0;
      let y = 0;
      let z = 0;
      let rotateY = 0;
      let rotateZ = 0;
      let scale = 1;
      let opacity = 1;
      let zIndex = 1;

      if (offset === 0) {
        // Center card: forward, straight, elevated
        x = 0;
        y = isMobile ? -6 : -10;
        z = 30;
        rotateY = 0;
        rotateZ = 0;
        scale = isMobile ? 1.02 : 1.06;
        opacity = 1;
        zIndex = 20;
      } else if (offset === -1) {
        // Left card: angled inward in 3D perspective
        x = -offsetDistance;
        y = 0;
        z = -70;
        rotateY = 24; // Angled toward viewer center
        rotateZ = -0.8;
        scale = isMobile ? 0.84 : 0.88;
        opacity = 0.88;
        zIndex = 10;
      } else if (offset === 1) {
        // Right card: angled inward in 3D perspective
        x = offsetDistance;
        y = 0;
        z = -70;
        rotateY = -24; // Angled toward viewer center
        rotateZ = 0.8;
        scale = isMobile ? 0.84 : 0.88;
        opacity = 0.88;
        zIndex = 10;
      } else if (distance === 2) {
        // Just outside the visible triad
        x = (offset < 0 ? -1 : 1) * (offsetDistance * 1.6);
        y = 10;
        z = -220;
        rotateY = (offset < 0 ? 1 : -1) * 35;
        scale = 0.68;
        opacity = 0;
        zIndex = 2;
      } else {
        // Hidden background orbit
        x = (offset < 0 ? -1 : 1) * (offsetDistance * 2);
        y = 20;
        z = -380;
        rotateY = (offset < 0 ? 1 : -1) * 45;
        scale = 0.5;
        opacity = 0;
        zIndex = 0;
      }

      card.style.zIndex = zIndex;

      const transformVars = {
        x: x,
        y: y,
        z: z,
        rotateY: rotateY,
        rotateZ: rotateZ,
        scale: scale,
        opacity: opacity,
        transformPerspective: 1400,
        overwrite: 'auto'
      };

      if (animate) {
        gsap.to(card, {
          ...transformVars,
          duration: 0.85,
          ease: 'power3.out'
        });
      } else {
        gsap.set(card, transformVars);
      }
    });

    // Update pagination indicators
    this.updatePagination();
  }

  updatePagination() {
    if (!this.dots.length) return;
    const activeDotIndex = this.currentIndex % this.dots.length;
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === activeDotIndex);
      dot.setAttribute('aria-selected', index === activeDotIndex ? 'true' : 'false');
    });
  }

  goTo(targetIndex) {
    if (this.isAnimating) return;
    const total = this.items.length;
    this.currentIndex = ((targetIndex % total) + total) % total;

    // Play subtle audio cue
    if (this.options.soundController) {
      this.options.soundController.playClick();
    }

    this.updateCarousel(true);
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  setupEvents() {
    // Arrow button controls
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'Escape') this.closeModal();
    });

    // Mouse / Touch Drag Tracking
    const trackEl = this.container;

    const onPointerDown = (e) => {
      // Don't drag if clicking buttons
      if (e.target.closest('.atelier-nav-btn') || e.target.closest('.carousel-page-dot')) return;
      this.isDragging = true;
      this.startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      this.currentTranslateX = 0;
    };

    const onPointerMove = (e) => {
      if (!this.isDragging) {
        // Track mouse position for 3D gyro parallax tilt
        const rect = this.track.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
          this.isHoveringTrack = true;
          this.mouse.targetX = ((clientX - rect.left) / rect.width - 0.5) * 2;
          this.mouse.targetY = ((clientY - rect.top) / rect.height - 0.5) * 2;
        } else {
          this.isHoveringTrack = false;
          this.mouse.targetX = 0;
          this.mouse.targetY = 0;
        }
        return;
      }

      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      this.currentTranslateX = clientX - this.startX;
    };

    const onPointerUp = () => {
      if (!this.isDragging) return;
      this.isDragging = false;

      if (this.currentTranslateX < -this.dragThreshold) {
        this.next();
      } else if (this.currentTranslateX > this.dragThreshold) {
        this.prev();
      }
      this.currentTranslateX = 0;
    };

    trackEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);

    trackEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Mouse wheel horizontal spin
    let wheelCooldown = false;
    trackEl.addEventListener('wheel', (e) => {
      if (wheelCooldown) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 35) {
        wheelCooldown = true;
        if (delta > 0) this.next();
        else this.prev();
        setTimeout(() => { wheelCooldown = false; }, 400);
      }
    }, { passive: true });

    // Window Resize Handler
    window.addEventListener('resize', () => {
      this.updateCarousel(false);
    }, { passive: true });
  }

  /* ── 3D Gyroscopic Cursor Parallax Loop ── */
  startParallaxLoop() {
    const loop = () => {
      // Smooth interpolation (lerp)
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

      const activeCard = this.cards[this.currentIndex];
      if (activeCard && this.isHoveringTrack) {
        const tiltY = -this.mouse.x * 7;
        const tiltX = this.mouse.y * 6;
        gsap.set(activeCard, {
          rotateY: tiltY,
          rotateX: tiltX,
          overwrite: 'auto'
        });

        // Specular glare effect moving across card
        const glare = activeCard.querySelector('.card-specular-glare');
        if (glare) {
          const posX = (this.mouse.x + 1) * 50;
          const posY = (this.mouse.y + 1) * 50;
          glare.style.background = `radial-gradient(circle at ${posX}% ${posY}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`;
        }
      }

      this.rafId = requestAnimationFrame(loop);
    };
    loop();
  }

  /* ── High-Performance Canvas Blood-Red Ember Sparks ── */
  initEmbersCanvas() {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      this.canvas.width = this.canvas.clientWidth || window.innerWidth;
      this.canvas.height = this.canvas.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particleCount = 45;
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2.2 + 0.6,
        speedY: -(Math.random() * 0.45 + 0.2),
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.7 + 0.2,
        alphaSpeed: (Math.random() - 0.5) * 0.015,
        color: Math.random() > 0.3 ? '#bf1932' : (Math.random() > 0.5 ? '#ff3355' : '#e0e4f0')
      });
    }

    const render = () => {
      if (!this.isCanvasActive) return;

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.1 || p.alpha >= 0.85) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.y < 0) {
          p.y = this.canvas.height + 10;
          p.x = Math.random() * this.canvas.width;
        }
        if (p.x < 0) p.x = this.canvas.width;
        if (p.x > this.canvas.width) p.x = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.color === '#e0e4f0' ? 4 : 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(render);
    };

    // Pause rendering when offscreen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isCanvasActive = entry.isIntersecting;
        if (entry.isIntersecting) render();
      });
    }, { threshold: 0.1 });
    observer.observe(this.canvas);
  }

  /* ── Interactive Quick View Modal (Atelier Inspection) ── */
  openModal(item) {
    if (!this.modal) return;

    const imgEl = this.modal.querySelector('#modal-img');
    const badgeEl = this.modal.querySelector('#modal-badge');
    const titleEl = this.modal.querySelector('#modal-title');
    const priceRsdEl = this.modal.querySelector('#modal-price-rsd');
    const priceEurEl = this.modal.querySelector('#modal-price-eur');
    const descEl = this.modal.querySelector('#modal-desc');
    const shapeEl = this.modal.querySelector('#modal-shape');
    const lengthEl = this.modal.querySelector('#modal-length');
    const finishEl = this.modal.querySelector('#modal-finish');
    const addBtn = this.modal.querySelector('#modal-btn-add');
    const customBtn = this.modal.querySelector('#modal-btn-custom');

    if (imgEl) imgEl.src = item.image;
    if (badgeEl) badgeEl.textContent = item.tierLabel;
    if (titleEl) titleEl.textContent = item.serbianTitle ? `${item.serbianTitle} (${item.title})` : item.title;
    if (priceRsdEl) priceRsdEl.textContent = `${item.price.toLocaleString('sr-RS')} RSD`;
    if (priceEurEl) priceEurEl.textContent = `· ${item.priceEur} €`;
    if (descEl) descEl.textContent = item.description;
    if (shapeEl) shapeEl.textContent = item.shape;
    if (lengthEl) lengthEl.textContent = item.length;
    if (finishEl) finishEl.textContent = item.finish;

    if (addBtn) {
      addBtn.onclick = () => {
        if (this.options.cartController) {
          this.options.cartController.addItem(item.id);
        }
        if (this.options.soundController) {
          this.options.soundController.playSwordClash();
        }
        this.closeModal();
      };
    }

    if (customBtn) {
      customBtn.onclick = () => {
        this.closeModal();
        const customizerSection = document.getElementById('set-po-meri');
        if (customizerSection) {
          customizerSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    const closeBtn = this.modal.querySelector('#modal-close-btn');
    if (closeBtn) closeBtn.onclick = () => this.closeModal();

    this.modal.onclick = (e) => {
      if (e.target === this.modal) this.closeModal();
    };

    this.modal.classList.add('is-open');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (this.options.soundController) {
      const s = this.options.soundController;
      if (typeof s.playBladeSheen === 'function') s.playBladeSheen();
      else if (typeof s.playClick === 'function') s.playClick();
    }
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('is-open');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
