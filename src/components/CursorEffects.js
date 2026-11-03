export class CursorEffects {
  constructor() {
    this.dot = null;
    this.ring = null;
    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.isHovering = false;
    this.isClicking = false;
    this.init();
  }

  init() {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    this.dot = document.createElement('div');
    this.dot.className = 'gothic-cursor-dot';

    this.ring = document.createElement('div');
    this.ring.className = 'gothic-cursor-ring';

    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);

    window.addEventListener('mousemove', (e) => {
      this.target.x = e.clientX;
      this.target.y = e.clientY;
      this.dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    window.addEventListener('mousedown', () => {
      this.isClicking = true;
      this.ring.classList.add('clicking');
    });

    window.addEventListener('mouseup', () => {
      this.isClicking = false;
      this.ring.classList.remove('clicking');
    });

    // Delegate hover states
    document.addEventListener('mouseover', (e) => {
      const interactive = e.target.closest('button, a, input, select, .interactive-card, #sword-canvas, .tier-tab, .ritual-card');
      if (interactive) {
        this.ring.classList.add('hovering');
        if (e.target.closest('#sword-canvas')) {
          this.ring.classList.add('sword-hover');
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const interactive = e.target.closest('button, a, input, select, .interactive-card, #sword-canvas, .tier-tab, .ritual-card');
      if (interactive) {
        this.ring.classList.remove('hovering', 'sword-hover');
      }
    });

    // Render loop for smooth trailing ring
    const render = () => {
      this.pos.x += (this.target.x - this.pos.x) * 0.16;
      this.pos.y += (this.target.y - this.pos.y) * 0.16;
      this.ring.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }
}
