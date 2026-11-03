import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const src = 'public/images/customizer-nails-source.jpg';
const img = sharp(src).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const pixels = new Uint8Array(data);

function idx(x, y) {
  return (y * width + x) * channels;
}

function isChecker(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 158 && sat < 0.14;
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = idx(x, y);
    if (isChecker(pixels[i], pixels[i + 1], pixels[i + 2])) {
      pixels[i + 3] = 0;
    }
  }
}

// Despeckle: if a transparent pixel has many opaque neighbors, restore it
const copy = Uint8Array.from(pixels);
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const i = idx(x, y);
    if (copy[i + 3] !== 0) continue;
    let opaque = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        if (copy[idx(x + dx, y + dy) + 3] > 40) opaque++;
      }
    }
    if (opaque >= 6) {
      pixels[i + 3] = 255;
    }
  }
}

// Erode leftover checker crumbs: transparent-majority neighborhood
const copy2 = Uint8Array.from(pixels);
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const i = idx(x, y);
    if (copy2[i + 3] === 0) continue;
    let trans = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (copy2[idx(x + dx, y + dy) + 3] < 20) trans++;
      }
    }
    if (trans >= 6 && isChecker(copy2[i], copy2[i + 1], copy2[i + 2])) {
      pixels[i + 3] = 0;
    }
  }
}

await sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } })
  .png()
  .toFile('public/images/customizer-nails.png');

// Find column occupancy to locate 5 nails
const colHits = new Array(width).fill(0);
for (let x = 0; x < width; x++) {
  let hits = 0;
  for (let y = 0; y < height; y++) {
    if (pixels[idx(x, y) + 3] > 40) hits++;
  }
  colHits[x] = hits;
}

const regions = [];
let inRegion = false;
let start = 0;
for (let x = 0; x < width; x++) {
  const on = colHits[x] > 8;
  if (on && !inRegion) {
    inRegion = true;
    start = x;
  } else if (!on && inRegion) {
    inRegion = false;
    regions.push([start, x - 1]);
  }
}
if (inRegion) regions.push([start, width - 1]);

const nails = [];
for (const [x0, x1] of regions) {
  let y0 = height;
  let y1 = 0;
  for (let x = x0; x <= x1; x++) {
    for (let y = 0; y < height; y++) {
      if (pixels[idx(x, y) + 3] > 40) {
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  nails.push({ x0, x1, y0, y1, w: x1 - x0 + 1, h: y1 - y0 + 1 });
}

writeFileSync('public/images/customizer-nails-meta.json', JSON.stringify({ width, height, nails }, null, 2));
console.log({ width, height, nailCount: nails.length, nails });
