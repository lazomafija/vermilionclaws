import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

export class CartDrawer {
  constructor(options = {}) {
    this.options = Object.assign({
      soundController: null,
      lenisController: null,
      onCartUpdated: null
    }, options);

    this.items = [];
    this.currency = 'RSD'; // 'RSD' or 'EUR'
    this.eurRate = 117.5;
    this.isOpen = false;

    this.drawerEl = null;
    this.badgeEl = null;
    this.checkoutModalEl = null;

    this.init();
  }

  init() {
    this.createDrawerDOM();
    this.createCheckoutModalDOM();
    this.bindEvents();
    this.updateUI();
  }

  createDrawerDOM() {
    // Backdrop
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'cart-backdrop';
    this.backdrop.id = 'cart-backdrop';

    // Drawer
    this.drawerEl = document.createElement('aside');
    this.drawerEl.className = 'cart-drawer';
    this.drawerEl.id = 'cart-drawer';
    this.drawerEl.innerHTML = `
      <div class="cart-header">
        <div class="cart-title-wrap">
          <svg class="cart-sword-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2L13.5 8L15 9.5L13.5 11L12 17L10.5 11L9 9.5L10.5 8L12 2Z" />
          </svg>
          <h3>Tvoja Korpa</h3>
          <span class="cart-count-badge" id="cart-drawer-count">0</span>
        </div>
        <button class="cart-close-btn" id="cart-close-btn" aria-label="Zatvori korpu">
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Free Shipping Progress -->
      <div class="shipping-progress-box">
        <div class="shipping-text" id="shipping-progress-text">
          Dodajte još <strong>5.000 RSD</strong> za besplatnu dostavu u Srbiji
        </div>
        <div class="shipping-track">
          <div class="shipping-fill" id="shipping-fill" style="width: 0%"></div>
        </div>
      </div>

      <!-- Items List -->
      <div class="cart-items" id="cart-items-list">
        <div class="cart-empty-state">
          <div class="empty-icon">⚜️</div>
          <p>Tvoja korpa je prazna.</p>
          <span>Odaberi remek-delo iz naših kolekcija ili kreiraj set po meri.</span>
        </div>
      </div>

      <!-- Footer / Totals -->
      <div class="cart-footer">
        <div class="cart-summary-row">
          <span>Međuzbir:</span>
          <strong id="cart-subtotal-price">0 RSD</strong>
        </div>
        <div class="cart-summary-row shipping-row">
          <span>Dostava (Post Express):</span>
          <span id="cart-shipping-cost">380 RSD</span>
        </div>
        <div class="cart-total-divider"></div>
        <div class="cart-summary-row total-row">
          <span>Ukupno za uplatu:</span>
          <strong id="cart-total-price">0 RSD</strong>
        </div>
        <button class="btn-primary checkout-btn" id="cart-checkout-btn" disabled>
          <span>Završi Porudžbinu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p class="cart-guarantee-note">
          🔒 Sigurna kupovina • Ručna izrada u Srbiji • Isporuka 3-5 radnih dana
        </p>
      </div>
    `;

    document.body.appendChild(this.backdrop);
    document.body.appendChild(this.drawerEl);
  }

  createCheckoutModalDOM() {
    this.checkoutModalEl = document.createElement('div');
    this.checkoutModalEl.className = 'checkout-modal-wrap';
    this.checkoutModalEl.id = 'checkout-modal';
    this.checkoutModalEl.innerHTML = `
      <div class="checkout-modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-tag">VERMILION CLAWS • ATELJE</span>
            <h3>Potvrda Porudžbine</h3>
          </div>
          <button class="modal-close-btn" id="checkout-modal-close">&times;</button>
        </div>
        <form class="checkout-form" id="checkout-order-form">
          <div class="form-row">
            <div class="form-group">
              <label>Ime i Prezime *</label>
              <input type="text" id="cust-name" required placeholder="npr. Elena Petrović" />
            </div>
            <div class="form-group">
              <label>Broj Telefona (za kurira) *</label>
              <input type="tel" id="cust-phone" required placeholder="06x xxx xxxx" />
            </div>
          </div>
          <div class="form-group">
            <label>Adresa i Broj stana *</label>
            <input type="text" id="cust-address" required placeholder="npr. Knez Mihailova 12 / stan 4" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Grad / Mesto *</label>
              <input type="text" id="cust-city" required placeholder="npr. Beograd" />
            </div>
            <div class="form-group">
              <label>Poštanski Broj</label>
              <input type="text" id="cust-zip" placeholder="npr. 11000" />
            </div>
          </div>
          <div class="form-group">
            <label>Način Plaćanja</label>
            <div class="payment-options">
              <label class="payment-radio selected">
                <input type="radio" name="payment-method" value="cod" checked />
                <span class="radio-label">Plaćanje pouzećem (kuriru pri preuzimanju)</span>
              </label>
              <label class="payment-radio">
                <input type="radio" name="payment-method" value="bank" />
                <span class="radio-label">Uplata na račun (e-banking sa pozivom na broj)</span>
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>Napomena / Dimenzije noktiju (opciono)</label>
            <textarea id="cust-notes" rows="2" placeholder="Ukoliko imate posebne mere u mm ili specifičan zahtev za dužinu, upišite ovde..."></textarea>
          </div>

          <div class="checkout-order-summary" id="checkout-modal-summary"></div>
          <p class="checkout-order-error" id="checkout-order-error" role="alert" hidden></p>

          <button type="submit" class="btn-primary submit-order-btn">
            <span>Zapečati Krvni Pakt (Naruči)</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 9.5L12 17L9 9.5L12 2Z" />
            </svg>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(this.checkoutModalEl);
  }

  bindEvents() {
    // Close drawer
    this.drawerEl.querySelector('#cart-close-btn').addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', () => this.close());

    // Open checkout modal
    this.drawerEl.querySelector('#cart-checkout-btn').addEventListener('click', () => {
      if (this.items.length === 0) return;
      if (this.options.soundController) this.options.soundController.playClick();
      this.close();
      this.openCheckoutModal();
    });

    // Close checkout modal
    this.checkoutModalEl.querySelector('#checkout-modal-close').addEventListener('click', () => {
      this.closeCheckoutModal();
    });

    // Submit checkout
    this.checkoutModalEl.querySelector('#checkout-order-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.processOrder();
    });
  }

  addItem(product, customSpecs = null) {
    if (this.options.soundController) {
      this.options.soundController.playClick();
    }

    const itemKey = customSpecs
      ? `${product.id}-${customSpecs.shape}-${customSpecs.length}-${customSpecs.size}`
      : `${product.id}-${product.shape}-${product.length}-M`;

    const existing = this.items.find(item => item.key === itemKey);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        key: itemKey,
        id: product.id,
        title: product.title,
        price: product.price,
        priceEur: product.priceEur,
        image: product.image,
        shape: customSpecs ? customSpecs.shape : product.shape,
        length: customSpecs ? customSpecs.length : product.length,
        size: customSpecs ? customSpecs.size : 'M (Standard)',
        finish: customSpecs ? customSpecs.finish : product.finish,
        quantity: 1
      });
    }

    this.updateUI();
    this.open();

    if (this.options.onCartUpdated) {
      this.options.onCartUpdated(this.items);
    }
  }

  updateQuantity(itemKey, delta) {
    const item = this.items.find(i => i.key === itemKey);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.items = this.items.filter(i => i.key !== itemKey);
    }

    if (this.options.soundController) {
      this.options.soundController.playClick();
    }

    this.updateUI();
    if (this.options.onCartUpdated) {
      this.options.onCartUpdated(this.items);
    }
  }

  open() {
    this.isOpen = true;
    this.drawerEl.classList.add('active');
    this.backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.options.lenisController?.stop();
  }

  close() {
    this.isOpen = false;
    this.drawerEl.classList.remove('active');
    this.backdrop.classList.remove('active');
    const checkoutOpen = this.checkoutModalEl.classList.contains('active');
    document.body.style.overflow = checkoutOpen ? 'hidden' : '';
    if (!checkoutOpen) this.options.lenisController?.start();
  }

  openCheckoutModal() {
    this.checkoutModalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.options.lenisController?.stop();

    // Render summary
    const summaryBox = this.checkoutModalEl.querySelector('#checkout-modal-summary');
    const subtotal = this.getSubtotal();
    const isFreeShip = subtotal >= 5000;
    const shipping = isFreeShip ? 0 : 380;
    const total = subtotal + shipping;

    summaryBox.innerHTML = `
      <div class="summary-line">
        <span>Ukupno artikala:</span>
        <strong>${this.getTotalCount()} kom.</strong>
      </div>
      <div class="summary-line">
        <span>Dostava:</span>
        <span>${isFreeShip ? '<span class="free-badge">Besplatna</span>' : '380 RSD'}</span>
      </div>
      <div class="summary-line total-highlight">
        <span>Ukupno za plaćanje:</span>
        <strong class="price-val">${total.toLocaleString('sr-RS')} RSD</strong>
      </div>
    `;
  }

  closeCheckoutModal() {
    this.checkoutModalEl.classList.remove('active');
    const cartOpen = this.isOpen;
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    if (!cartOpen) this.options.lenisController?.start();
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateUI() {
    const count = this.getTotalCount();
    const subtotal = this.getSubtotal();

    // Update badges
    const drawerCountEl = this.drawerEl.querySelector('#cart-drawer-count');
    if (drawerCountEl) drawerCountEl.textContent = count;

    const navBadgeEl = document.getElementById('nav-cart-count');
    if (navBadgeEl) {
      navBadgeEl.textContent = count;
      navBadgeEl.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    // Shipping progress
    const threshold = 5000;
    const remaining = Math.max(0, threshold - subtotal);
    const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

    const shipTextEl = this.drawerEl.querySelector('#shipping-progress-text');
    const shipFillEl = this.drawerEl.querySelector('#shipping-fill');
    const shipCostEl = this.drawerEl.querySelector('#cart-shipping-cost');

    if (subtotal >= threshold) {
      shipTextEl.innerHTML = '✨ <strong>Čestitamo!</strong> Ostvarili ste BESPLATNU dostavu.';
      shipFillEl.style.width = '100%';
      shipFillEl.style.backgroundColor = '#BF1932';
      shipCostEl.innerHTML = '<span class="free-badge">Besplatno</span>';
    } else {
      shipTextEl.innerHTML = `Dodajte još <strong>${remaining.toLocaleString('sr-RS')} RSD</strong> za besplatnu dostavu`;
      shipFillEl.style.width = `${progressPercent}%`;
      shipCostEl.textContent = '380 RSD';
    }

    // Totals
    const shipping = subtotal >= threshold || subtotal === 0 ? 0 : 380;
    const total = subtotal + shipping;

    this.drawerEl.querySelector('#cart-subtotal-price').textContent = `${subtotal.toLocaleString('sr-RS')} RSD`;
    this.drawerEl.querySelector('#cart-total-price').textContent = `${total.toLocaleString('sr-RS')} RSD`;

    // Checkout button state
    const checkoutBtn = this.drawerEl.querySelector('#cart-checkout-btn');
    checkoutBtn.disabled = this.items.length === 0;

    // Items list
    const itemsListEl = this.drawerEl.querySelector('#cart-items-list');

    if (this.items.length === 0) {
      itemsListEl.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-icon">⚜️</div>
          <p>Tvoja korpa je prazna.</p>
          <span>Odaberi remek-delo iz naših kolekcija ili kreiraj set po meri.</span>
        </div>
      `;
    } else {
      itemsListEl.innerHTML = this.items.map(item => `
          <img src="${item.image}" alt="${item.title}" class="cart-item-thumb" />
          <div class="cart-item-info">
            <h4>${item.title}</h4>
            <div class="cart-item-specs">
              <span>${item.shape}</span> • <span>${item.length}</span> • <span>Veličina: ${item.size}</span>
            </div>
            <div class="cart-item-price-wrap">
              <strong class="item-price">${(item.price * item.quantity).toLocaleString('sr-RS')} RSD</strong>
              <div class="cart-qty-control">
                <button class="qty-btn minus-btn" data-key="${item.key}">−</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn plus-btn" data-key="${item.key}">+</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      // Wire up quantity buttons
      itemsListEl.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', () => this.updateQuantity(btn.dataset.key, -1));
      });
      itemsListEl.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', () => this.updateQuantity(btn.dataset.key, 1));
      });
    }
  }

  async processOrder() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const city = document.getElementById('cust-city').value;
    const zip = document.getElementById('cust-zip')?.value || '';
    const notes = document.getElementById('cust-notes')?.value || '';
    const paymentMethodEl = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethod = paymentMethodEl && paymentMethodEl.value === 'cod' ? 'Pouzećem kuriru' : 'Uplata na račun';

    const subtotal = this.getSubtotal();
    const isFreeShip = subtotal >= 5000;
    const shipping = isFreeShip ? 0 : 380;
    const total = subtotal + shipping;
    const orderNumber = 'VC-' + Math.floor(100000 + Math.random() * 900000);
    const itemsSummary = this.items.map((item, index) =>
      `${index + 1}. ${item.title}\n   Oblik: ${item.shape} | Dužina: ${item.length} | Veličina: ${item.size}\n   Završnica: ${item.finish}\n   Količina: ${item.quantity} × ${item.price.toLocaleString('sr-RS')} RSD = ${(item.price * item.quantity).toLocaleString('sr-RS')} RSD`
    ).join('\n\n');

    const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
    const itemsHtml = this.items.map((item, index) => {
      let imgUrl = item.image || '';
      if (imgUrl && !imgUrl.startsWith('http://') && !imgUrl.startsWith('https://')) {
        try {
          imgUrl = new URL(imgUrl, baseUrl).href;
        } catch {
          // fallback
        }
      }

      return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:12px;background:#141416;border:1px solid #2a151b;border-radius:6px;overflow:hidden;">
          <tr>
            ${imgUrl ? `
            <td width="72" style="padding:8px;vertical-align:middle;text-align:center;background:#0d0d10;">
              <img src="${imgUrl}" alt="${item.title}" width="60" height="76" style="display:block;border-radius:4px;object-fit:cover;border:1px solid #3d1b24;" />
            </td>` : ''}
            <td style="padding:10px 14px;vertical-align:middle;color:#ddd;font-size:13px;line-height:1.5;">
              <div style="font-size:15px;font-weight:bold;color:#f2f2f2;margin-bottom:4px;">${index + 1}. ${item.title}</div>
              <div style="color:#aaa;font-size:12px;margin-bottom:2px;">Oblik: <strong style="color:#ddd;">${item.shape}</strong> · Dužina: <strong style="color:#ddd;">${item.length}</strong> · Veličina: <strong style="color:#ddd;">${item.size}</strong></div>
              <div style="color:#aaa;font-size:12px;margin-bottom:4px;">Završnica: <strong style="color:#ddd;">${item.finish}</strong></div>
              <div style="color:#bf1932;font-weight:bold;font-size:13px;">${item.quantity} × ${item.price.toLocaleString('sr-RS')} RSD = ${(item.price * item.quantity).toLocaleString('sr-RS')} RSD</div>
            </td>
          </tr>
        </table>
      `;
    }).join('');

    const templateParams = {
      broj_porudzbine: orderNumber,
      ime_kupca: name,
      telefon: phone,
      adresa: address,
      grad: city,
      postanski_broj: zip || 'Nije unet',
      nacin_placanja: paymentMethod,
      detalji_korpe: itemsSummary,
      detalji_korpe_html: itemsHtml,
      ukupno_artikala: this.getTotalCount(),
      dostava: shipping === 0 ? 'Besplatna' : `${shipping.toLocaleString('sr-RS')} RSD`,
      ukupna_cena: `${total.toLocaleString('sr-RS')} RSD`,
      napomena: notes || 'Nema napomene'
    };

    const submitButton = this.checkoutModalEl.querySelector('.submit-order-btn');
    const errorMessage = this.checkoutModalEl.querySelector('#checkout-order-error');
    submitButton.disabled = true;
    submitButton.querySelector('span').textContent = 'Šaljem porudžbinu...';
    errorMessage.hidden = true;
    errorMessage.textContent = '';

    try {
      const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env;
      if (!VITE_EMAILJS_SERVICE_ID || !VITE_EMAILJS_TEMPLATE_ID || !VITE_EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS nije podešen. Unesite Service ID, Template ID i Public Key u .env.local, pa restartujte sajt.');
      }

      await emailjs.send(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: VITE_EMAILJS_PUBLIC_KEY }
      );
    } catch (error) {
      console.error('EmailJS slanje porudžbine nije uspelo:', error);
      errorMessage.textContent = error.message.startsWith('EmailJS nije podešen')
        ? error.message
        : 'Mejl nije poslat. Proverite EmailJS podešavanja i pokušajte ponovo.';
      errorMessage.hidden = false;
      submitButton.disabled = false;
      submitButton.querySelector('span').textContent = 'Zapečati Krvni Pakt (Naruči)';
      return;
    }

    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#BF1932', '#dcdde3', '#1c1d22', '#c5a059']
    });

    if (this.options.soundController) {
      this.options.soundController.playBladeSheen();
    }

    // Replace modal content with success confirmation
    const card = this.checkoutModalEl.querySelector('.checkout-modal-card');

    const formattedOrderText =
`⚔️ VERMILION CLAWS — PORUDŽBINA #${orderNumber}
👤 Ime: ${name}
📞 Telefon: ${phone}
  📍 Adresa: ${address}, ${city} ${zip}
💳 Plaćanje: ${paymentMethod}
🛒 Artikli:
${itemsSummary}
📦 Dostava: ${isFreeShip ? 'Besplatna' : '380 RSD'}
💰 Ukupno: ${total.toLocaleString('sr-RS')} RSD` +
(notes ? `\n📝 Napomena: ${notes}` : '');

    const waLink = `https://wa.me/?text=${encodeURIComponent(formattedOrderText)}`;

    card.innerHTML = `
      <div class="order-success-box">
        <div class="success-seal">⚜️</div>
        <span class="modal-tag">KRVNI PAKT JE SKLOPLJEN</span>
        <h2>Hvala vam, ${name}!</h2>
        <p class="order-id">Broj vaše porudžbine: <strong>#${orderNumber}</strong></p>
        <p class="success-desc">
          Vaš set prelazi u fazu ručne izrade i sterilizacije u ateljeu Vermilion Claws. 
          Kontaktiraćemo vas na broj <strong>${phone}</strong> pre slanja Post Express-om za ${city}.
        </p>

        <div class="order-dispatch-actions" style="display:flex; flex-direction:column; gap:0.75rem; margin:1.5rem 0;">
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-primary wa-order-btn" style="background:#25D366; border-color:#25D366; text-decoration:none; justify-content:center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
            <span>Pošalji potvrdu na WhatsApp</span>
          </a>

          <button type="button" class="btn-ghost ig-copy-btn" id="ig-copy-btn" style="font-size:0.75rem; justify-content:center;">
            <span>📋 Kopiraj detalje porudžbine za Instagram DM</span>
          </button>
          <span id="ig-copy-hint" style="font-size:0.75rem; color:var(--c-mist); text-align:center; min-height:1rem;"></span>
        </div>

        <div class="success-actions">
          <button class="btn-primary" id="success-close-btn">
            <span>Povratak u Atelje</span>
          </button>
        </div>
      </div>
    `;

    // Copy to clipboard handler
    const copyBtn = card.querySelector('#ig-copy-btn');
    const copyHint = card.querySelector('#ig-copy-hint');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(formattedOrderText).then(() => {
          copyHint.textContent = '✓ Kopirano u privremenu memoriju! Možete zalepiti u DM.';
          copyHint.style.color = '#BF1932';
        }).catch(() => {
          copyHint.textContent = 'Označite i kopirajte detalje ručno.';
        });
      });
    }

    card.querySelector('#success-close-btn').addEventListener('click', () => {
      this.items = [];
      this.updateUI();
      this.closeCheckoutModal();
      window.location.reload();
    });
  }
}
