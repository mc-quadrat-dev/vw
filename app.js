// --- Inline SVG data ---
const rawArrowSvg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.78 16.78"><path fill="black" d="M16.43,15.47l-2.04,1.05c-.19.1-.41,0-.5-.2L8.49,3.78c-.06-.12-.11-.24-.22-.24s-.17.12-.22.25l-5.19,12.66c-.09.21-.31.3-.5.21l-2.05-1c-.19-.1-.28-.35-.2-.56L6.1.45c.14-.31.27-.37.5-.37l3.28-.03c.22,0,.36.06.5.36l6.24,14.51c.09.21,0,.45-.18.55"/></svg>`;

const rawStarSvg = `<?xml version="1.0" encoding="UTF-8"?><svg id="Ebene_2" data-name="Ebene 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.8 59.8"><defs><style>.cls-1 {fill: #ffffff;}</style></defs><g id="_Radiale_Wiederholung_" data-name="&amp;lt;Radiale Wiederholung&amp;gt;"><path class="cls-1" d="M40.75,57.42l-2.69,1.26c-.25.12-.54,0-.66-.24l-7.09-15.06c-.07-.15-.15-.29-.3-.29s-.22.15-.29.3l-6.87,15.2c-.11.25-.41.36-.66.25l-2.7-1.21c-.26-.11-.37-.42-.26-.67l7.93-17.58c.18-.37.36-.44.66-.44l4.32-.03c.29,0,.48.07.66.43l8.19,17.44c.12.25,0,.54-.24.66Z"/></g><g id="_Radiale_Wiederholung_-2" data-name="&amp;lt;Radiale Wiederholung&amp;gt;"><path class="cls-1" d="M7.08,48.72l-2.03-2.17c-.19-.2-.18-.52.02-.7l12.13-11.4c.12-.12.23-.23.19-.37s-.21-.16-.37-.19L.45,32.05c-.27-.03-.47-.28-.44-.55l.31-2.94c.03-.28.28-.48.56-.45l19.17,2.11c.41.06.53.21.63.49l1.37,4.1c.09.28.08.47-.21.76l-14.05,13.17c-.2.19-.51.18-.7-.02Z"/></g><g id="_Radiale_Wiederholung_-3" data-name="&amp;lt;Radiale Wiederholung&amp;gt;"><path class="cls-1" d="M4.95,14.02l1.44-2.6c.13-.24.44-.33.68-.2l14.59,8.02c.15.07.29.15.41.06s.09-.25.06-.41l-3.38-16.34c-.06-.27.12-.53.39-.59l2.89-.61c.27-.06.54.12.6.39l3.92,18.89c.07.4-.03.57-.27.75l-3.48,2.57c-.24.17-.43.22-.79.04L5.14,14.69c-.24-.13-.33-.43-.19-.67Z"/></g><g id="_Radiale_Wiederholung_-4" data-name="&amp;lt;Radiale Wiederholung&amp;gt;"><path class="cls-1" d="M37.3,1.26l2.92.57c.27.05.45.31.39.58l-3.12,16.35c-.03.16-.05.32.07.41s.26,0,.41-.07l14.5-8.26c.24-.14.54-.05.68.19l1.47,2.56c.14.24.06.55-.19.69l-16.75,9.57c-.36.19-.55.14-.79-.03l-3.52-2.51c-.24-.17-.34-.34-.28-.74l3.62-18.92c.05-.27.31-.44.58-.39Z"/></g><g id="_Radiale_Wiederholung_-5" data-name="&amp;lt;Radiale Wiederholung&amp;gt;"><path class="cls-1" d="M59.42,28.08l.36,2.95c.03.27-.16.52-.43.56l-16.51,2.09c-.16.03-.32.05-.37.19s.07.25.19.37l12.34,11.23c.2.19.22.5.03.71l-1.98,2.19c-.19.21-.51.22-.72.04l-14.27-12.98c-.29-.29-.31-.48-.22-.76l1.3-4.12c.09-.28.21-.43.62-.5l19.11-2.4c.27-.03.52.16.55.43Z"/></g></svg>`;

const ARROW_URI = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(rawArrowSvg);
const STAR_URI  = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(rawStarSvg);

document.documentElement.style.setProperty('--arrow-url', `url("${ARROW_URI}")`);

const starImgNode = new Image(); starImgNode.src = STAR_URI;

document.getElementById('main-star').innerHTML = `<img src="${STAR_URI}" draggable="false">`;
document.getElementById('ed-star').innerHTML = `<img src="${STAR_URI}" draggable="false">`;

// --- BASE CONFIG ---
const BASE_ARROW_SIZE = 24;
const BASE_GAP = BASE_ARROW_SIZE;
const BASE_CELL = BASE_ARROW_SIZE + BASE_GAP;
const BASE_STAR_SIZE = BASE_ARROW_SIZE * 4;
const MAX_INF_CELLS = 16;
const DEF_ROT = 90;
const FIXED_FORCE = 10;
const DEFAULT_SCALE = 2; // Default scale step

const ARROW_PATH_D = 'M16.43,15.47l-2.04,1.05c-.19.1-.41,0-.5-.2L8.49,3.78c-.06-.12-.11-.24-.22-.24s-.17.12-.22.25l-5.19,12.66c-.09.21-.31.3-.5.21l-2.05-1c-.19-.1-.28-.35-.2-.56L6.1.45c.14-.31.27-.37.5-.37l3.28-.03c.22,0,.36.06.5.36l6.24,14.51c.09.21,0,.45-.18.55';
const STAR_PATHS = [
  'M40.75,57.42l-2.69,1.26c-.25.12-.54,0-.66-.24l-7.09-15.06c-.07-.15-.15-.29-.3-.29s-.22.15-.29.3l-6.87,15.2c-.11.25-.41.36-.66.25l-2.7-1.21c-.26-.11-.37-.42-.26-.67l7.93-17.58c.18-.37.36-.44.66-.44l4.32-.03c.29,0,.48.07.66.43l8.19,17.44c.12.25,0,.54-.24.66Z',
  'M7.08,48.72l-2.03-2.17c-.19-.2-.18-.52.02-.7l12.13-11.4c.12-.12.23-.23.19-.37s-.21-.16-.37-.19L.45,32.05c-.27-.03-.47-.28-.44-.55l.31-2.94c.03-.28.28-.48.56-.45l19.17,2.11c.41.06.53.21.63.49l1.37,4.1c.09.28.08.47-.21.76l-14.05,13.17c-.2.19-.51.18-.7-.02Z',
  'M4.95,14.02l1.44-2.6c.13-.24.44-.33.68-.2l14.59,8.02c.15.07.29.15.41.06s.09-.25.06-.41l-3.38-16.34c-.06-.27.12-.53.39-.59l2.89-.61c.27-.06.54.12.6.39l3.92,18.89c.07.4-.03.57-.27.75l-3.48,2.57c-.24.17-.43.22-.79.04L5.14,14.69c-.24-.13-.33-.43-.19-.67Z',
  'M37.3,1.26l2.92.57c.27.05.45.31.39.58l-3.12,16.35c-.03.16-.05.32.07.41s.26,0,.41-.07l14.5-8.26c.24-.14.54-.05.68.19l1.47,2.56c.14.24.06.55-.19.69l-16.75,9.57c-.36.19-.55.14-.79-.03l-3.52-2.51c-.24-.17-.34-.34-.28-.74l3.62-18.92c.05-.27.31-.44.58-.39Z',
  'M59.42,28.08l.36,2.95c.03.27-.16.52-.43.56l-16.51,2.09c-.16.03-.32.05-.37.19s.07.25.19.37l12.34,11.23c.2.19.22.5.03.71l-1.98,2.19c-.19.21-.51.22-.72.04l-14.27-12.98c-.29-.29-.31-.48-.22-.76l1.3-4.12c.09-.28.21-.43.62-.5l19.11-2.4c.27-.03.52.16.55.43Z'
];

// --- STATE ---
let pages = []; 
let activePageIdx = 0;
let mainArrowScale = (DEFAULT_SCALE + 1) * 0.5;
let mainStarScale = (DEFAULT_SCALE + 1) * 0.5;
let mainScaleLocked = true;

// --- Helpers ---
function calcExcHalf(starSize) { return starSize / 2; }

function isInExclusion(cx, cy, starX, starY, excHalf) {
  return Math.abs(cx - starX) <= excHalf && Math.abs(cy - starY) <= excHalf;
}

function snapToGrid(pos, arrowSize, cell, offset = 0) {
  const off = offset % cell;
  const anchor = arrowSize / 2 + off;
  return Math.round((pos - anchor) / cell) * cell + anchor;
}

// --- Procedural Grain ---
function generateGrainImage(w, h) {
  const cvs = document.createElement('canvas');
  cvs.width = w; cvs.height = h;
  const ctx = cvs.getContext('2d');
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  for (let y = 0; y < h; y++) {
    const t = y / h;
    let factor = 0;
    if (t < 0.1) factor = 1.0;
    else factor = Math.max(0, 1 - ((t - 0.1) / 0.25));
    const density = 0.65 * Math.pow(factor, 1.8) + 0.001;
    for (let x = 0; x < w; x++) {
      if (Math.random() < density) {
        const i = (y * w + x) * 4;
        d[i] = 220; d[i+1] = 50; d[i+2] = 138; d[i+3] = 255;
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  ctx.fillStyle = 'rgba(220,50,138,1)';
  for (let i = 0; i < w * h * 0.001; i++) {
    const x = Math.random() * w | 0;
    const y = (h * (0.3 + Math.random() * 0.7)) | 0;
    ctx.fillRect(x, y, 1, 1);
  }
  return cvs.toDataURL('image/png');
}

// --- Engine ---
class ArrowEngine {
  constructor(container, innerGlow, star, isEditor) {
    this.container = container;
    this.innerGlow = innerGlow;
    this.star = star;
    this.isEditor = isEditor;
    this.arrows = [];
    this.width = 0; this.height = 0;
    this.starX = 0; this.starY = 0;
    this.offsetX = 0; this.offsetY = 0;
    this.arrowScale = 1; this.starScale = 1;
    this.arrowSize = BASE_ARROW_SIZE;
    this.cell = BASE_CELL;
    this.starSize = BASE_STAR_SIZE;
    this.maxInf = MAX_INF_CELLS * BASE_CELL;
    this.dragging = false;

    this.onDown = this.onDown.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onUp = this.onUp.bind(this);

    this.container.addEventListener('mousedown', this.onDown);
    this.container.addEventListener('mousemove', this.onMove);
    window.addEventListener('mouseup', this.onUp);
    this.container.addEventListener('touchstart', this.onDown, { passive: false });
    this.container.addEventListener('touchmove', this.onMove, { passive: false });
    window.addEventListener('touchend', this.onUp);
    this.introMode = false;
  }

  animateIntro() {
    if (!this.introMode) return;
    this.update();
    if (performance.now() - this.introStart < 2000) {
      requestAnimationFrame(() => this.animateIntro());
    } else {
      this.introMode = false;
      this.update();
    }
  }

  init(width, height, starX, starY, arrowScale, starScale, offsetX, offsetY) {
    this.width = width; this.height = height;
    this.arrowScale = arrowScale; this.starScale = starScale;
    this.offsetX = offsetX || 0; this.offsetY = offsetY || 0;

    this.arrowSize = BASE_ARROW_SIZE * arrowScale;
    const gap = BASE_GAP * arrowScale;
    this.cell = this.arrowSize + gap;
    this.starSize = BASE_STAR_SIZE * starScale;
    this.maxInf = MAX_INF_CELLS * this.cell;

    this.starX = snapToGrid(starX, this.arrowSize, this.cell, this.offsetX);
    this.starY = snapToGrid(starY, this.arrowSize, this.cell, this.offsetY);

    if (this.isEditor) {
      this.container.style.width = width + 'px';
      this.container.style.height = height + 'px';
      this.resizePanel();
    } else {
      this.container.style.width = '100vw';
      this.container.style.height = '100vh';
    }

    this.star.style.width = this.starSize + 'px';
    this.star.style.height = this.starSize + 'px';
    if (this.innerGlow) {
      this.innerGlow.style.width = (this.starSize * 2) + 'px';
      this.innerGlow.style.height = (this.starSize * 2) + 'px';
    }

    this.arrows.forEach(a => a.el.remove());
    this.arrows = [];
    const frag = document.createDocumentFragment();
    const start = -this.cell;
    const safeWidth = Math.max(width, document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const safeHeight = Math.max(height, document.documentElement.clientHeight || 0, window.innerHeight || 0);

    const offX = this.offsetX % this.cell;
    const offY = this.offsetY % this.cell;

    for (let y = start; y < safeHeight + this.cell; y += this.cell) {
      for (let x = start; x < safeWidth + this.cell; x += this.cell) {
        const px = x + offX;
        const py = y + offY;
        const d = document.createElement('div');
        d.className = 'arrow';
        d.style.width = this.arrowSize + 'px';
        d.style.height = this.arrowSize + 'px';
        d.style.left = px + 'px';
        d.style.top = py + 'px';
        frag.appendChild(d);
        this.arrows.push({ el: d, cx: px + this.arrowSize/2, cy: py + this.arrowSize/2 });
      }
    }
    this.container.appendChild(frag);
    this.update();
  }

  update() {
    this.star.style.left = this.starX + 'px';
    this.star.style.top = this.starY + 'px';
    if (this.innerGlow) {
      this.innerGlow.style.left = this.starX + 'px';
      this.innerGlow.style.top = this.starY + 'px';
    }

    this.container.style.background = `
      linear-gradient(to top, rgba(0, 30, 80, 1) 0%, rgba(0, 64, 197, 0) 50%),
      radial-gradient(circle farthest-corner at ${this.starX}px ${this.starY}px, #001e50 0%, #0040c5 100%)
    `;

    const excHalf = calcExcHalf(this.starSize);
    const maxDist = Math.max(
      Math.sqrt(this.starX*this.starX + this.starY*this.starY),
      Math.sqrt((this.width-this.starX)**2 + this.starY**2),
      Math.sqrt(this.starX**2 + (this.height-this.starY)**2),
      Math.sqrt((this.width-this.starX)**2 + (this.height-this.starY)**2)
    );

    let t1 = 1, t2 = 1;
    if (this.introMode) {
      const tIntro = Math.min(1, (performance.now() - this.introStart) / 2000);
      t1 = Math.min(1, tIntro * 2);
      t2 = Math.max(0, tIntro * 2 - 1);
      this.star.style.opacity = t2;
      this.star.style.transform = `translate(-50%, -50%) scale(${0.5 + 0.5 * t2})`;
      if (this.innerGlow) this.innerGlow.style.opacity = t2;
    } else {
      this.star.style.opacity = 1;
      this.star.style.transform = 'translate(-50%, -50%)';
      if (this.innerGlow) this.innerGlow.style.opacity = 1;
    }

    for (let i = 0; i < this.arrows.length; i++) {
      const a = this.arrows[i];
      const inExc = isInExclusion(a.cx, a.cy, this.starX, this.starY, excHalf);

      const dx = this.starX - a.cx, dy = this.starY - a.cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angleToStar = Math.atan2(dx, -dy) * (180 / Math.PI);
      let influence = 1;
      if (FIXED_FORCE < 10) {
        const effRadius = this.maxInf * (FIXED_FORCE / 5);
        const t = Math.max(0, 1 - dist / effRadius);
        influence = t * t;
      }
      let delta = angleToStar - DEF_ROT;
      while (delta > 180) delta -= 360;
      while (delta < -180) delta += 360;
      const tC = Math.min(1, dist / (maxDist || 1));
      
      const targetRot = DEF_ROT + delta * influence;
      const targetOp = 0.35 + 0.65 * influence;
      const cg = Math.round(64 - tC * 34);
      const cb = Math.round(197 - tC * 117);

      let curRot = targetRot;
      let curOp = targetOp;
      let curCg = cg, curCb = cb;

      if (this.introMode) {
        const curtainX = t1 * (this.width + this.cell * 2);
        const curtainOp = Math.max(0, Math.min(1, (curtainX - a.cx + this.cell) / this.cell));
        
        curRot = DEF_ROT + (targetRot - DEF_ROT) * t2;
        
        const baseOp = 0.5;
        curOp = curtainOp * (baseOp + (targetOp - baseOp) * t2);

        const neutralCg = 64; 
        const neutralCb = 197;
        curCg = Math.round(neutralCg + (cg - neutralCg) * t2);
        curCb = Math.round(neutralCb + (cb - neutralCb) * t2);

        if (inExc) {
            curRot = DEF_ROT;
            curOp = curtainOp * baseOp * (1 - t2);
            if (curOp <= 0) {
              a.el.style.display = 'none';
              continue;
            }
            a.el.style.display = '';
        } else {
            if (curOp <= 0) {
              a.el.style.display = 'none';
              continue;
            }
            a.el.style.display = '';
        }
      } else {
        if (inExc) {
          a.el.style.display = 'none'; continue;
        }
        a.el.style.display = '';
      }

      a.el.style.transform = `rotate(${curRot}deg)`;
      a.el.style.opacity = curOp;
      a.el.style.color = `rgb(0,${curCg},${curCb})`;
    }

    if (this.isEditor) {
      pages[activePageIdx].starX = this.starX;
      pages[activePageIdx].starY = this.starY;
    }
  }

  getPos(e) {
    if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  onDown(e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') e.preventDefault();
    const { x, y } = this.getPos(e);
    const rect = this.container.getBoundingClientRect();
    const scaleX = rect.width / this.width;
    const scaleY = rect.height / this.height;
    const lx = (x - rect.left) / scaleX;
    const ly = (y - rect.top) / scaleY;
    const dx = lx - this.starX, dy = ly - this.starY;
    const r = this.starSize * 0.7;
    if (dx * dx + dy * dy < r * r) {
      this.dragging = true;
      this.star.classList.add('dragging');
    }
  }

  onMove(e) {
    const { x, y } = this.getPos(e);
    const rect = this.container.getBoundingClientRect();
    const scaleX = rect.width / this.width;
    const scaleY = rect.height / this.height;
    const lx = (x - rect.left) / scaleX;
    const ly = (y - rect.top) / scaleY;
    if (this.dragging) {
      e.preventDefault();
      this.starX = lx; this.starY = ly;
      requestAnimationFrame(() => this.update());
    } else {
      const dx = lx - this.starX, dy = ly - this.starY;
      this.container.style.cursor = dx*dx + dy*dy < (this.starSize*0.7)**2 ? 'grab' : 'default';
    }
  }

  onUp() {
    if (this.dragging) {
      this.dragging = false;
      this.star.classList.remove('dragging');
      this.starX = snapToGrid(this.starX, this.arrowSize, this.cell, this.offsetX);
      this.starY = snapToGrid(this.starY, this.arrowSize, this.cell, this.offsetY);
      this.update();
    }
  }

  resizePanel() {
    if (!this.isEditor) return;
    const pw = window.innerWidth - 80;
    const ph = window.innerHeight - 160;
    const scale = Math.min(pw / this.width, ph / this.height, 1);
    const wrapper = document.getElementById('editor-wrapper');
    if (scale < 1) {
      this.container.style.transform = `scale(${scale})`;
      this.container.style.transformOrigin = 'top left';
      wrapper.style.width = (this.width * scale) + 'px';
      wrapper.style.height = (this.height * scale) + 'px';
    } else {
      this.container.style.transform = 'none';
      wrapper.style.width = this.width + 'px';
      wrapper.style.height = this.height + 'px';
    }
  }
}

// --- Init engines ---
const mainEngine = new ArrowEngine(
  document.getElementById('main-view'),
  document.getElementById('main-inner-glow'),
  document.getElementById('main-star'),
  false
);

let mainInitialized = false;

function rebuildMain() {
  const w = window.innerWidth, h = window.innerHeight;
  const sx = mainInitialized ? mainEngine.starX : w * 0.72;
  const sy = mainInitialized ? mainEngine.starY : h * 0.35;
  const isFirstLoad = !mainInitialized;
  mainInitialized = true;
  if (isFirstLoad) {
    mainEngine.introMode = true;
    mainEngine.introStart = performance.now();
  }
  mainEngine.init(w, h, sx, sy, mainArrowScale, mainStarScale);
  if (isFirstLoad) {
    mainEngine.animateIntro();
  }
}

const editorEngine = new ArrowEngine(
  document.getElementById('editor-panel'),
  document.getElementById('ed-inner-glow'),
  document.getElementById('ed-star'),
  true
);

// --- MAIN SCALE CONTROLS ---
const mainScaleSlider = document.getElementById('main-scale-slider');
const mainScaleValue = document.getElementById('main-scale-value');
const mainArrowScaleSlider = document.getElementById('main-arrow-scale-slider');
const mainArrowScaleValue = document.getElementById('main-arrow-scale-value');
const mainStarScaleSlider = document.getElementById('main-star-scale-slider');
const mainStarScaleValue = document.getElementById('main-star-scale-value');
const mainScaleSingle = document.getElementById('main-scale-single');
const mainScaleDual = document.getElementById('main-scale-dual');
const mainLockBtn = document.getElementById('main-lock-btn');

mainScaleSlider.addEventListener('input', () => {
  const v = parseInt(mainScaleSlider.value);
  mainScaleValue.textContent = v;
  mainArrowScale = mainStarScale = (v + 1) * 0.5;
  mainArrowScaleSlider.value = mainStarScaleSlider.value = v;
  mainArrowScaleValue.textContent = mainStarScaleValue.textContent = v;
  rebuildMain();
});
mainArrowScaleSlider.addEventListener('input', () => {
  const v = parseInt(mainArrowScaleSlider.value);
  mainArrowScaleValue.textContent = v;
  mainArrowScale = (v + 1) * 0.5;
  rebuildMain();
});
mainStarScaleSlider.addEventListener('input', () => {
  const v = parseInt(mainStarScaleSlider.value);
  mainStarScaleValue.textContent = v;
  mainStarScale = (v + 1) * 0.5;
  rebuildMain();
});

const ICON_LOCK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
const ICON_UNLOCK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>';

mainLockBtn.addEventListener('click', () => {
  mainScaleLocked = !mainScaleLocked;
  mainLockBtn.innerHTML = mainScaleLocked ? ICON_LOCK : ICON_UNLOCK;
  mainLockBtn.classList.toggle('locked', mainScaleLocked);
  if (mainScaleLocked) {
    mainStarScale = mainArrowScale;
    const v = Math.round(mainArrowScale * 2 - 1);
    mainScaleSlider.value = v; mainScaleValue.textContent = v;
    mainScaleSingle.style.display = ''; mainScaleDual.style.display = 'none';
    rebuildMain();
  } else {
    mainScaleSingle.style.display = 'none'; mainScaleDual.style.display = '';
  }
});

// --- EDITOR SCALE CONTROLS ---
const edScaleSlider = document.getElementById('ed-scale-slider');
const edScaleValue = document.getElementById('ed-scale-value');
const edArrowScaleSlider = document.getElementById('ed-arrow-scale-slider');
const edArrowScaleValue = document.getElementById('ed-arrow-scale-value');
const edStarScaleSlider = document.getElementById('ed-star-scale-slider');
const edStarScaleValue = document.getElementById('ed-star-scale-value');
const edScaleSingle = document.getElementById('ed-scale-single');
const edScaleDual = document.getElementById('ed-scale-dual');
const edLockBtn = document.getElementById('ed-lock-btn');

function applyEditorScale() {
  const p = pages[activePageIdx];
  if (!p) return;
  editorEngine.init(p.w, p.h, p.starX, p.starY, p.arrowScale, p.starScale, p.offsetX, p.offsetY);
}

edScaleSlider.addEventListener('input', () => {
  const v = parseInt(edScaleSlider.value);
  edScaleValue.textContent = v;
  const p = pages[activePageIdx];
  p.arrowScale = p.starScale = (v + 1) * 0.5;
  edArrowScaleSlider.value = edStarScaleSlider.value = v;
  edArrowScaleValue.textContent = edStarScaleValue.textContent = v;
  applyEditorScale();
});
edArrowScaleSlider.addEventListener('input', () => {
  const v = parseInt(edArrowScaleSlider.value);
  edArrowScaleValue.textContent = v;
  pages[activePageIdx].arrowScale = (v + 1) * 0.5;
  applyEditorScale();
});
edStarScaleSlider.addEventListener('input', () => {
  const v = parseInt(edStarScaleSlider.value);
  edStarScaleValue.textContent = v;
  pages[activePageIdx].starScale = (v + 1) * 0.5;
  applyEditorScale();
});
edLockBtn.addEventListener('click', () => {
  const p = pages[activePageIdx];
  p.scaleLocked = !p.scaleLocked;
  edLockBtn.innerHTML = p.scaleLocked ? ICON_LOCK : ICON_UNLOCK;
  edLockBtn.classList.toggle('locked', p.scaleLocked);
  if (p.scaleLocked) {
    p.starScale = p.arrowScale;
    const v = Math.round(p.arrowScale * 2 - 1);
    edScaleSlider.value = v; edScaleValue.textContent = v;
    edScaleSingle.style.display = ''; edScaleDual.style.display = 'none';
    applyEditorScale();
  } else {
    edScaleSingle.style.display = 'none'; edScaleDual.style.display = '';
  }
});

function syncEditorScaleUI() {
  const p = pages[activePageIdx];
  if (!p) return;
  const aV = Math.round(p.arrowScale * 2 - 1);
  const sV = Math.round(p.starScale * 2 - 1);
  edArrowScaleSlider.value = aV; edArrowScaleValue.textContent = aV;
  edStarScaleSlider.value = sV; edStarScaleValue.textContent = sV;
  edLockBtn.innerHTML = p.scaleLocked ? ICON_LOCK : ICON_UNLOCK;
  edLockBtn.classList.toggle('locked', p.scaleLocked);
  if (p.scaleLocked) {
    edScaleSlider.value = aV; edScaleValue.textContent = aV;
    edScaleSingle.style.display = ''; edScaleDual.style.display = 'none';
  } else {
    edScaleSingle.style.display = 'none'; edScaleDual.style.display = '';
  }
}

// --- RESIZE ---
let mainResizeTimer;
window.addEventListener('resize', () => {
  if (document.getElementById('main-view').style.display !== 'none') {
    rebuildMain();
    clearTimeout(mainResizeTimer);
    mainResizeTimer = setTimeout(() => {
      document.getElementById('main-grain').style.backgroundImage = `url(${generateGrainImage(window.innerWidth, window.innerHeight)})`;
    }, 150);
  } else {
    editorEngine.resizePanel();
  }
});

window.addEventListener('load', () => {
  if (document.getElementById('main-view').style.display !== 'none') {
    rebuildMain();
    document.getElementById('main-grain').style.backgroundImage = `url(${generateGrainImage(window.innerWidth, window.innerHeight)})`;
  }
});

rebuildMain();
document.getElementById('main-grain').style.backgroundImage = `url(${generateGrainImage(window.innerWidth, window.innerHeight)})`;

// --- DIALOG ---
let addMode = false;
const mOverlay = document.getElementById('modal-overlay');
const fW = document.getElementById('fmt-width');
const fH = document.getElementById('fmt-height');
const defScale = (DEFAULT_SCALE + 1) * 0.5;

document.getElementById('btn-open-layout-modal').addEventListener('click', () => {
  addMode = false; mOverlay.classList.add('visible');
});
document.getElementById('btn-add-page').addEventListener('click', () => {
  addMode = true; mOverlay.classList.add('visible');
});
document.getElementById('btn-modal-cancel').addEventListener('click', () => mOverlay.classList.remove('visible'));
document.getElementById('btn-modal-confirm').addEventListener('click', () => {
  const w = parseInt(fW.value), h = parseInt(fH.value);
  if (!w || !h || w < 100 || h < 100) return alert('Bitte gültige Werte eingeben (min 100)');
  const newPage = { w, h, starX: w * 0.5, starY: h * 0.5, arrowScale: defScale, starScale: defScale, scaleLocked: true, offsetX: 0, offsetY: 0 };
  mOverlay.classList.remove('visible');
  if (addMode) {
    pages.push(newPage); activePageIdx = pages.length - 1; renderEditorPage();
  } else {
    pages = [newPage]; activePageIdx = 0; openEditor();
  }
});

document.querySelectorAll('.format-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    fW.value = btn.getAttribute('data-w');
    fH.value = btn.getAttribute('data-h');
  });
});

// --- EDITOR NAV ---
const edMain = document.getElementById('main-view');
const edControls = document.getElementById('main-controls');
const edView = document.getElementById('editor-view');

function openEditor() {
  edMain.style.display = 'none'; edControls.style.display = 'none';
  edView.classList.add('visible'); renderEditorPage();
}
document.getElementById('btn-leave-editor').addEventListener('click', () => {
  edView.classList.remove('visible'); edMain.style.display = 'block'; edControls.style.display = 'flex';
});
document.getElementById('btn-prev-page').addEventListener('click', () => {
  if (activePageIdx > 0) { activePageIdx--; renderEditorPage(); }
});
document.getElementById('btn-next-page').addEventListener('click', () => {
  if (activePageIdx < pages.length - 1) { activePageIdx++; renderEditorPage(); }
});

// --- DELETE PAGE ---
document.getElementById('btn-delete-page').addEventListener('click', () => {
  if (pages.length <= 1) return;
  pages.splice(activePageIdx, 1);
  if (activePageIdx >= pages.length) activePageIdx = pages.length - 1;
  renderEditorPage();
});

// --- MOVE CANVAS (grid offset) ---
const btnMove = document.getElementById('btn-move-canvas');
let movingCanvas = false;
let moveStartX, moveStartY, initOffX, initOffY, initStarX, initStarY;

btnMove.addEventListener('mousedown', (e) => {
  e.preventDefault();
  movingCanvas = true;
  moveStartX = e.clientX; moveStartY = e.clientY;
  const p = pages[activePageIdx];
  initOffX = p.offsetX || 0; initOffY = p.offsetY || 0;
  initStarX = p.starX; initStarY = p.starY;
  document.body.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
  if (!movingCanvas) return;
  const scale = editorEngine.container.getBoundingClientRect().width / editorEngine.width;
  const dx = (e.clientX - moveStartX) / scale;
  const dy = (e.clientY - moveStartY) / scale;
  const p = pages[activePageIdx];
  p.offsetX = initOffX + dx;
  p.offsetY = initOffY + dy;
  p.starX = initStarX + dx;
  p.starY = initStarY + dy;
  // Quick update without full rebuild
  editorEngine.starX = p.starX;
  editorEngine.starY = p.starY;
  editorEngine.offsetX = p.offsetX;
  editorEngine.offsetY = p.offsetY;
  // Need full rebuild for offset to take effect on arrow positions
  editorEngine.init(p.w, p.h, p.starX, p.starY, p.arrowScale, p.starScale, p.offsetX, p.offsetY);
});

window.addEventListener('mouseup', () => {
  if (movingCanvas) {
    movingCanvas = false;
    document.body.style.cursor = '';
  }
});

// --- RENDER PAGE ---
const pagText = document.getElementById('pagination-text');
const edTitle = document.getElementById('editor-title-text');

function renderEditorPage() {
  const p = pages[activePageIdx];
  edTitle.textContent = `Layout (${p.w} × ${p.h} px)`;
  pagText.textContent = `Seite ${activePageIdx + 1} von ${pages.length}`;
  syncEditorScaleUI();
  document.getElementById('ed-grain').style.backgroundImage = `url(${generateGrainImage(p.w, p.h)})`;
  editorEngine.init(p.w, p.h, p.starX, p.starY, p.arrowScale, p.starScale, p.offsetX, p.offsetY);
  // Show/hide delete button
  document.getElementById('btn-delete-page').style.display = pages.length > 1 ? 'flex' : 'none';
}

// --- EXPORT helpers ---
function computeExportArrows(p) {
  const arrowSize = BASE_ARROW_SIZE * p.arrowScale;
  const gap = BASE_GAP * p.arrowScale;
  const cell = arrowSize + gap;
  const starSize = BASE_STAR_SIZE * p.starScale;
  const maxInf = MAX_INF_CELLS * cell;
  const offX = p.offsetX || 0;
  const offY = p.offsetY || 0;
  const sX = snapToGrid(p.starX, arrowSize, cell, offX);
  const sY = snapToGrid(p.starY, arrowSize, cell, offY);
  const excHalf = calcExcHalf(starSize);

  const farthestCorner = Math.max(
    Math.sqrt(sX*sX + sY*sY),
    Math.sqrt((p.w-sX)**2 + sY**2),
    Math.sqrt(sX**2 + (p.h-sY)**2),
    Math.sqrt((p.w-sX)**2 + (p.h-sY)**2)
  );

  const list = [];
  const start = -cell;
  for (let y = start; y < p.h + cell; y += cell) {
    for (let x = start; x < p.w + cell; x += cell) {
      const cx = x + offX + arrowSize / 2, cy = y + offY + arrowSize / 2;
      if (isInExclusion(cx, cy, sX, sY, excHalf)) continue;
      const dx = sX - cx, dy = sY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angleToStar = Math.atan2(dx, -dy) * (180 / Math.PI);
      let influence = 1;
      if (FIXED_FORCE < 10) {
        const effRadius = maxInf * (FIXED_FORCE / 5);
        const t = Math.max(0, 1 - dist / effRadius);
        influence = t * t;
      }
      let delta = angleToStar - DEF_ROT;
      while (delta > 180) delta -= 360;
      while (delta < -180) delta += 360;
      const tC = Math.min(1, dist / (farthestCorner || 1));
      const color = `rgb(0,${Math.round(64 - tC * 34)},${Math.round(197 - tC * 117)})`;
      list.push({ cx, cy, rot: DEF_ROT + delta * influence, op: 0.35 + 0.65 * influence, arrowSize, color });
    }
  }
  return { list, arrowSize, starSize, maxInf, sX, sY };
}

// --- PNG EXPORT ---
document.getElementById('btn-download').addEventListener('click', () => {
  const p = pages[activePageIdx];
  const { list, arrowSize, starSize, sX, sY } = computeExportArrows(p);
  const cvs = document.createElement('canvas');
  cvs.width = p.w; cvs.height = p.h;
  const ctx = cvs.getContext('2d');

  ctx.fillStyle = '#0a1a4a'; ctx.fillRect(0, 0, p.w, p.h);
  const farthestCorner = Math.sqrt(Math.max(sX*sX, (p.w-sX)*(p.w-sX)) + Math.max(sY*sY, (p.h-sY)*(p.h-sY)));
  const bgGrad = ctx.createRadialGradient(sX, sY, 0, sX, sY, farthestCorner);
  bgGrad.addColorStop(0, '#001e50'); bgGrad.addColorStop(1, '#0040c5');
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, p.w, p.h);

  const botGrad = ctx.createLinearGradient(0, p.h, 0, p.h * 0.5);
  botGrad.addColorStop(0, 'rgba(0,30,80,1)'); botGrad.addColorStop(1, 'rgba(0,64,197,0)');
  ctx.fillStyle = botGrad; ctx.fillRect(0, 0, p.w, p.h);

  // Grain
  const imgData = ctx.getImageData(0, 0, p.w, p.h);
  const d = imgData.data;
  for (let y = 0; y < p.h; y++) {
    const t = y / p.h;
    let factor = t < 0.1 ? 1.0 : Math.max(0, 1 - ((t - 0.1) / 0.25));
    const density = 0.65 * Math.pow(factor, 1.8) + 0.001;
    for (let x = 0; x < p.w; x++) {
      if (Math.random() < density) {
        const i = (y * p.w + x) * 4;
        d[i] = 220; d[i+1] = 50; d[i+2] = 138; d[i+3] = 255;
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  ctx.fillStyle = 'rgba(220,50,138,1)';
  for (let i = 0; i < p.w * p.h * 0.001; i++) {
    const x = Math.random() * p.w | 0;
    const y = (p.h * (0.3 + Math.random() * 0.7)) | 0;
    ctx.fillRect(x, y, 1, 1);
  }

  const arrowPath = new Path2D(ARROW_PATH_D);
  const arrowScaleFactor = arrowSize / 16.78;
  list.forEach(a => {
    ctx.save();
    ctx.translate(a.cx, a.cy);
    ctx.rotate(a.rot * Math.PI / 180);
    ctx.globalAlpha = a.op;
    ctx.translate(-a.arrowSize/2, -a.arrowSize/2);
    ctx.scale(arrowScaleFactor, arrowScaleFactor);
    ctx.fillStyle = a.color;
    ctx.fill(arrowPath);
    ctx.restore();
  });

  const innerGrad = ctx.createRadialGradient(sX, sY, 0, sX, sY, starSize);
  innerGrad.addColorStop(0, 'rgba(0, 64, 197, 0.44)');
  innerGrad.addColorStop(1, 'rgba(0, 64, 197, 0)');
  ctx.fillStyle = innerGrad;
  ctx.fillRect(sX - starSize, sY - starSize, starSize * 2, starSize * 2);

  ctx.save(); ctx.globalAlpha = 1;
  ctx.translate(sX, sY);
  ctx.drawImage(starImgNode, -starSize/2, -starSize/2, starSize, starSize);
  ctx.restore();

  try {
    const link = document.createElement('a');
    link.download = `layout_seite${activePageIdx+1}_${p.w}x${p.h}.png`;
    link.href = cvs.toDataURL('image/png');
    link.click();
  } catch (e) { alert('Fehler beim PNG Export.'); console.error(e); }
});

// --- SVG EXPORT ---
document.getElementById('btn-download-svg').addEventListener('click', () => {
  const p = pages[activePageIdx];
  const { list, arrowSize, starSize, sX, sY } = computeExportArrows(p);
  const scaleF = (arrowSize / 16.78).toFixed(6);
  const halfOrig = (16.78 / 2).toFixed(4);

  let s = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  s += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${p.w} ${p.h}" width="${p.w}" height="${p.h}">\n`;
  s += `<defs>\n`;
  s += `  <radialGradient id="bg_rad" cx="${sX}" cy="${sY}" r="100%" gradientUnits="userSpaceOnUse">\n`;
  s += `    <stop offset="0%" stop-color="#001e50"/>\n    <stop offset="100%" stop-color="#0040c5"/>\n`;
  s += `  </radialGradient>\n`;
  s += `  <linearGradient id="bg_lin" x1="0" y1="1" x2="0" y2="0">\n`;
  s += `    <stop offset="0%" stop-color="#001e50" stop-opacity="1"/>\n`;
  s += `    <stop offset="50%" stop-color="#0040c5" stop-opacity="0"/>\n`;
  s += `    <stop offset="100%" stop-color="#0040c5" stop-opacity="0"/>\n`;
  s += `  </linearGradient>\n`;
  s += `  <radialGradient id="inner_glow" cx="${sX}" cy="${sY}" r="${starSize}" gradientUnits="userSpaceOnUse">\n`;
  s += `    <stop offset="0%" stop-color="#0040c5" stop-opacity="0.44"/>\n`;
  s += `    <stop offset="100%" stop-color="#0040c5" stop-opacity="0"/>\n`;
  s += `  </radialGradient>\n`;
  s += `</defs>\n`;
  s += `<rect width="${p.w}" height="${p.h}" fill="url(#bg_rad)"/>\n`;
  s += `<rect width="${p.w}" height="${p.h}" fill="url(#bg_lin)"/>\n`;
  s += `<image xlink:href="${generateGrainImage(p.w, p.h)}" width="${p.w}" height="${p.h}" preserveAspectRatio="none" />\n`;
  s += `<g id="arrows">\n`;
  list.forEach(a => {
    s += `  <g transform="translate(${a.cx.toFixed(2)},${a.cy.toFixed(2)}) rotate(${a.rot.toFixed(2)}) scale(${scaleF}) translate(-${halfOrig},-${halfOrig})" opacity="${a.op.toFixed(3)}">\n`;
    s += `    <path fill="${a.color}" d="${ARROW_PATH_D}"/>\n  </g>\n`;
  });
  s += `</g>\n`;
  s += `<circle cx="${sX}" cy="${sY}" r="${starSize}" fill="url(#inner_glow)"/>\n`;
  const starScale = (starSize / 59.8).toFixed(6);
  const starOX = (sX - starSize / 2).toFixed(2);
  const starOY = (sY - starSize / 2).toFixed(2);
  s += `<g transform="translate(${starOX},${starOY}) scale(${starScale})">\n`;
  STAR_PATHS.forEach(d => { s += `  <path fill="#ffffff" d="${d}"/>\n`; });
  s += `</g>\n</svg>`;

  const blob = new Blob([s], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `layout_seite${activePageIdx+1}_${p.w}x${p.h}.svg`;
  link.href = url; link.click();
  URL.revokeObjectURL(url);
});
