import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class SwordHero3D {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.options = Object.assign({
      modelUrl: '/models/sword.glb',
      onLoaded: null,
      onGlowTriggered: null,
      soundController: null
    }, options);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.swordGroup = null;
    this.bladeMesh = null;
    this.edgeGlowMeshes = [];
    this.pointLights = [];
    this.crimsonEdgeLight = null;

    // Animation state
    this.isLoaded = false;
    this.isGlowActive = false;
    this.introProgress = 0; // 0 to 1
    this.introComplete = false;
    this.glowIntensity = 0; // 0 to 1
    this.glowSweepProgress = 0; // 0 to 1 along blade
    this.time = 0;

    // Mouse & Touch interaction
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.dragRotation = { x: 0, y: 0 };
    this.dragVelocity = { x: 0, y: 0 };

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 7.5);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.id = 'sword-canvas';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.pointerEvents = 'auto';
    this.renderer.domElement.style.cursor = 'grab';

    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting setup - Dramatic dark gothic luxury
    this.setupLights();

    // 5. Load textures & model
    this.loadAssets();

    // 6. Event listeners
    this.bindEvents();

    // 7. Start render loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupLights() {
    // Deep atmospheric ambient light
    const ambientLight = new THREE.AmbientLight(0x1a1b24, 1.2);
    this.scene.add(ambientLight);

    // Cool key light highlighting the steel blade bevel
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 5, 5);
    this.scene.add(keyLight);

    // Warm antique bronze fill light from below-left
    const fillLight = new THREE.DirectionalLight(0xd4a055, 1.6);
    fillLight.position.set(-4, -2, 3);
    this.scene.add(fillLight);

    // Pure Pantone 19-1664 True Red rim backlight (#BF1932)
    const rimLight = new THREE.DirectionalLight(0xBF1932, 4.0);
    rimLight.position.set(0, 3, -4);
    this.scene.add(rimLight);

    // Dynamic crimson point light at the blade
    this.crimsonEdgeLight = new THREE.PointLight(0xBF1932, 0, 10);
    this.crimsonEdgeLight.position.set(0, -1, 0.5);
    this.scene.add(this.crimsonEdgeLight);

    // Blade glint point light
    this.bladeGlintLight = new THREE.PointLight(0xffffff, 0, 5);
    this.bladeGlintLight.position.set(0, -1.8, 0.6);
    this.scene.add(this.bladeGlintLight);
  }

  loadAssets() {
    const textureLoader = new THREE.TextureLoader();

    // Load textures
    const lameTexture = textureLoader.load('/textures/lame.jpg');
    lameTexture.wrapS = THREE.RepeatWrapping;
    lameTexture.wrapT = THREE.RepeatWrapping;
    lameTexture.repeat.set(1, 4);

    const gardeTexture = textureLoader.load('/textures/garde.jpg');
    gardeTexture.wrapS = THREE.RepeatWrapping;
    gardeTexture.wrapT = THREE.RepeatWrapping;

    const handleTexture = textureLoader.load('/textures/tex poignee.jpg');
    handleTexture.wrapS = THREE.RepeatWrapping;
    handleTexture.wrapT = THREE.RepeatWrapping;
    handleTexture.repeat.set(2, 2);

    const handleBump = textureLoader.load('/textures/tex poignee bump.jpg');
    handleBump.wrapS = THREE.RepeatWrapping;
    handleBump.wrapT = THREE.RepeatWrapping;
    handleBump.repeat.set(2, 2);

    // Materials
    this.materials = {
      blade: new THREE.MeshStandardMaterial({
        map: lameTexture,
        metalness: 0.98,
        roughness: 0.15,
        color: 0xe0e2eb,
        envMapIntensity: 2.0
      }),
      ornament: new THREE.MeshStandardMaterial({
        map: gardeTexture,
        metalness: 0.88,
        roughness: 0.32,
        color: 0xc49646
      }),
      handle: new THREE.MeshStandardMaterial({
        map: handleTexture,
        bumpMap: handleBump,
        bumpScale: 0.04,
        metalness: 0.1,
        roughness: 0.75,
        color: 0x18181a
      }),
      wire: new THREE.MeshStandardMaterial({
        metalness: 0.95,
        roughness: 0.2,
        color: 0xb0853b
      }),
      // Emissive edge blade glow material
      edgeGlow: new THREE.MeshBasicMaterial({
        color: 0xBF1932,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      }),
      edgeCore: new THREE.MeshBasicMaterial({
        color: 0xff4d6d,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      })
    };

    // Load GLTF Model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      this.options.modelUrl,
      (gltf) => {
        this.onModelLoaded(gltf);
      },
      (xhr) => {
        const percent = Math.round((xhr.loaded / (xhr.total || 6322316)) * 100);
        if (this.options.onProgress) {
          this.options.onProgress(percent);
        }
      },
      (error) => {
        console.error('Error loading sword model:', error);
      }
    );
  }

  onModelLoaded(gltf) {
    this.swordGroup = new THREE.Group();
    const model = gltf.scene;

    // Traverse and assign appropriate materials based on mesh names
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const name = child.name.toLowerCase();
        if (name.includes('mesh')) {
          // Blade
          child.material = this.materials.blade;
          this.bladeMesh = child;
        } else if (name.includes('cylinder') || name.includes('solid2')) {
          // Handle grip
          child.material = this.materials.handle;
        } else if (name.includes('helix') || name.includes('torus')) {
          // Wire guard loops
          child.material = this.materials.wire;
        } else {
          // Crossguard, quillons, pommel head
          child.material = this.materials.ornament;
        }
      }
    });

    // Free downloaded sword is authored along +Z. Origin sits near the handle;
    // the blade tip is ~17 units away — that gap is the "circle vs point" offset.
    // Stand it up (tip down) before measuring, then scale a wrapper so the
    // offset is included in the scale instead of left as a huge world shift.
    model.rotation.x = Math.PI / 2;
    model.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const pivot = new THREE.Group();
    pivot.add(model);

    // Center on X/Z; snap the tip (lowest Y) onto the pivot origin.
    model.position.set(-center.x, -box.min.y, -center.z);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 5.2 / maxDim;
    pivot.scale.setScalar(scale);

    this.swordGroup.add(pivot);

    // Shift the group so the sword is framed in the camera while the
    // pivot (and idle spin) stays at the tip.
    this.restY = -(size.y * scale) * 0.42;

    // Create glowing edge line overlays on both sides of the blade
    this.createBladeEdgeGlow(size, scale);

    // Initial orientation: vertical with slight gothic angle
    this.swordGroup.rotation.x = 0.15;
    this.swordGroup.rotation.y = -0.4;
    this.swordGroup.rotation.z = -0.12;

    // Position in hero
    this.swordGroup.position.set(0.6, this.restY, 0);

    this.scene.add(this.swordGroup);
    this.isLoaded = true;

    if (this.options.onLoaded) {
      this.options.onLoaded();
    }

    // Trigger entrance animation
    this.triggerIntroSequence();
  }

  createBladeEdgeGlow(originalSize, scale) {
    // No separate mesh overlays — glow is applied directly via
    // emissive material on the blade and point lights only.
    // This prevents floating lines / ring artefacts beside the sword.
    this.tipFlare = null;
  }

  triggerIntroSequence() {
    const startTime = performance.now();
    const duration = 2400; // 2.4 seconds entrance and swivel

    // Start with sword slightly pulled back and tilted
    const restY = this.restY ?? 0.1;
    this.swordGroup.position.z = -1.8;
    this.swordGroup.position.y = restY + 0.4;
    this.swordGroup.rotation.y = -1.8;
    this.swordGroup.rotation.x = 0.45;

    const stepIntro = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic-out easing
      const t = 1 - Math.pow(1 - progress, 3);
      this.introProgress = t;

      // Position transition to hero resting point
      this.swordGroup.position.z = -1.8 * (1 - t);
      this.swordGroup.position.y = restY + 0.4 * (1 - t);
      this.swordGroup.rotation.y = -1.8 * (1 - t) + 0.2;
      this.swordGroup.rotation.x = 0.45 * (1 - t) + 0.1;

      if (progress < 1) {
        requestAnimationFrame(stepIntro);
      } else {
        this.introComplete = true;
        // Trigger the sword edge glow at the end of the animation!
        this.triggerEdgeGlow();
      }
    };

    requestAnimationFrame(stepIntro);
  }

  triggerEdgeGlow() {
    this.isGlowActive = true;
    const glowStartTime = performance.now();
    const glowDuration = 1800; // 1.8s flare and ignite

    if (this.options.soundController) {
      this.options.soundController.playBladeSheen();
    }

    if (this.options.onGlowTriggered) {
      this.options.onGlowTriggered();
    }

    const animateGlow = (now) => {
      const elapsed = now - glowStartTime;
      const progress = Math.min(elapsed / glowDuration, 1);

      // Energy sweep — only point lights and blade emissive, no mesh overlays
      if (progress < 0.4) {
        // Flare flash
        const p = progress / 0.4;
        this.glowIntensity = p * 1.5;
        this.crimsonEdgeLight.intensity = p * 8.0;
        this.bladeGlintLight.intensity = p * 5.0;
      } else if (progress < 0.8) {
        // Settle into steady pulse
        const p = (progress - 0.4) / 0.4;
        this.glowIntensity = 1.5 - p * 0.6; // settles around 0.9
        this.crimsonEdgeLight.intensity = 8.0 - p * 3.5;
        this.bladeGlintLight.intensity = 5.0 - p * 4.5;
      } else {
        // Sustained breathing glow
        this.glowIntensity = 0.85;
      }

      if (progress < 1) {
        requestAnimationFrame(animateGlow);
      }
    };

    requestAnimationFrame(animateGlow);
  }

  boostGlow() {
    // Allows user to re-ignite the demonic edge glow on click
    this.triggerEdgeGlow();
  }

  bindEvents() {
    // Mouse move for responsive 3D swivel
    window.addEventListener('mousemove', (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      this.mouse.targetX = (e.clientX - halfW) / halfW;
      this.mouse.targetY = (e.clientY - halfH) / halfH;
    });

    // Touch & Drag to inspect sword
    const el = this.renderer.domElement;

    const onPointerDown = (e) => {
      this.isDragging = true;
      el.style.cursor = 'grabbing';
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.dragStart.x = clientX;
      this.dragStart.y = clientY;
    };

    const onPointerMove = (e) => {
      if (!this.isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - this.dragStart.x;
      const deltaY = clientY - this.dragStart.y;

      this.dragRotation.y += deltaX * 0.008;
      this.dragRotation.x += deltaY * 0.006;

      this.dragVelocity.x = deltaX * 0.008;
      this.dragVelocity.y = deltaY * 0.006;

      this.dragStart.x = clientX;
      this.dragStart.y = clientY;
    };

    const onPointerUp = () => {
      this.isDragging = false;
      el.style.cursor = 'grab';
    };

    el.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    el.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Window resize
    window.addEventListener('resize', () => {
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  animate(now) {
    requestAnimationFrame(this.animate);

    this.time = now * 0.001;

    if (!this.isLoaded || !this.swordGroup) {
      return;
    }

    // Smooth interpolation of mouse tracking (swivel)
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Apply drag inertia with damping
    if (!this.isDragging) {
      this.dragVelocity.x *= 0.92;
      this.dragVelocity.y *= 0.92;
      this.dragRotation.y += this.dragVelocity.x;
      this.dragRotation.x += this.dragVelocity.y;
    }

    if (this.introComplete) {
      // Hypnotic zero-gravity floating motion (bobbing & swivel)
      const bobbing = Math.sin(this.time * 1.2) * 0.08;
      const rocking = Math.cos(this.time * 0.9) * 0.05;

      // Base idle rotation plus user drag and mouse swivel
      const baseRotationY = (this.time * 0.25) + this.dragRotation.y + (this.mouse.x * 0.4);
      const baseRotationX = 0.12 + (this.mouse.y * 0.25) + this.dragRotation.x;
      const baseRotationZ = -0.1 + rocking + (this.mouse.x * -0.15);

      this.swordGroup.rotation.y = baseRotationY;
      this.swordGroup.rotation.x = baseRotationX;
      this.swordGroup.rotation.z = baseRotationZ;
      this.swordGroup.position.y = (this.restY ?? 0.1) + bobbing;

      // Update pulsating glow — only via point lights + blade emissive
      if (this.isGlowActive) {
        const pulse = 0.75 + Math.sin(this.time * 3.5) * 0.2;
        const currentGlow = this.glowIntensity * pulse;

        if (this.crimsonEdgeLight) {
          this.crimsonEdgeLight.intensity = currentGlow * 5.5;
          this.crimsonEdgeLight.position.y = -1.0 + Math.sin(this.time * 2.0) * 0.6;
        }

        if (this.bladeGlintLight) {
          this.bladeGlintLight.intensity = currentGlow * 1.5;
        }

        // Blade material emissive pulse — sword itself glows red
        if (this.bladeMesh) {
          const emissiveColor = new THREE.Color(0xBF1932);
          this.bladeMesh.material.emissive = emissiveColor;
          this.bladeMesh.material.emissiveIntensity = currentGlow * 0.45;
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
