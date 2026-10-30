// Draws the business card faces on a 2D canvas. Used both as the 3D card's
// textures and for the printable PNG, so the two always match.
import { qrcode } from 'qrcode-generator';

// Card layout units: a 3.5 x 2 in card at 300 DPI.
export const CARD_W = 1050;
export const CARD_H = 600;
export const DPI = 300;

const INK = '#1a1a1a';
const ACCENT = '#fd9745';
const ACCENT_TEXT = '#b85a12'; // darker orange, readable as small text on white
const PAPER = '#fffdf8';

const DISPLAY = '"Space Grotesk", Inter, system-ui, sans-serif';
const BODY = 'Inter, system-ui, sans-serif';

/** Wait (briefly) for the site fonts so the canvas doesn't draw in a fallback font. */
export async function loadAssets(logoUrl) {
  const fonts = Promise.all([
    document.fonts.load(`700 72px ${DISPLAY}`),
    document.fonts.load(`600 20px ${DISPLAY}`),
    document.fonts.load(`400 24px ${BODY}`),
    document.fonts.load(`500 26px ${BODY}`),
    document.fonts.load(`600 28px ${BODY}`)
  ]).catch(() => {});
  const timeout = new Promise((r) => setTimeout(r, 1500));

  const logo = new Image();
  logo.src = logoUrl;
  const logoReady = logo.decode().then(() => logo, () => null);

  const [, img] = await Promise.all([Promise.race([fonts, timeout]), logoReady]);
  return { logo: img };
}

function escapeVCard(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1');
}

/** vCard text that the QR code on the back encodes. */
export function buildVCard(card) {
  const parts = card.name.trim().split(/\s+/);
  const family = parts.length > 1 ? parts.pop() : '';
  const given = parts.join(' ');
  const [city = '', region = ''] = card.location.split(',').map((s) => s.trim());
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCard(family)};${escapeVCard(given)};;;`,
    `FN:${escapeVCard(card.name)}`,
    `TITLE:${escapeVCard(card.title)}`,
    `TEL;TYPE=CELL:${card.phone.replace(/[^\d+]/g, '')}`,
    `EMAIL:${card.email}`,
    `URL:${card.website}`,
    `ADR;TYPE=HOME:;;;${escapeVCard(city)};${escapeVCard(region)};;`,
    'END:VCARD'
  ].join('\r\n');
}

/** QR code as a tiny canvas, one pixel per module. Cached per text. */
let qrCache = { text: '', canvas: null };
function qrBitmap(text) {
  if (qrCache.text === text) return qrCache.canvas;
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = n;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(n, n);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const i = (r * n + c) * 4;
      const v = qr.isDark(r, c) ? 0 : 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  qrCache = { text, canvas };
  return canvas;
}

/** Shrinks the font until the text fits in maxWidth. */
function fitText(ctx, text, weight, size, family, maxWidth) {
  let s = size;
  ctx.font = `${weight} ${s}px ${family}`;
  while (s > 10 && ctx.measureText(text).width > maxWidth) {
    s -= 1;
    ctx.font = `${weight} ${s}px ${family}`;
  }
  return s;
}

function spaced(ctx, px) {
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${px}px`;
}

/**
 * Front of the card, drawn in CARD_W x CARD_H units at the current transform.
 * `bleed` extends the background past the trim edge for printing.
 */
export function drawFront(ctx, card, assets, bleed = 0) {
  ctx.save();
  ctx.fillStyle = PAPER;
  ctx.fillRect(-bleed, -bleed, CARD_W + bleed * 2, CARD_H + bleed * 2);

  // Bottom band: black rule + orange stripe, like the site's buttons
  ctx.fillStyle = ACCENT;
  ctx.fillRect(-bleed, 560, CARD_W + bleed * 2, 40 + bleed);
  ctx.fillStyle = INK;
  ctx.fillRect(-bleed, 554, CARD_W + bleed * 2, 6);

  if (assets.logo) {
    const h = 120;
    const w = (assets.logo.naturalWidth / assets.logo.naturalHeight) * h;
    ctx.drawImage(assets.logo, CARD_W - 70 - w, 64, w, h);
  }

  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';

  // Name with the site's orange period
  const nameSize = fitText(ctx, card.name + '.', 700, 72, DISPLAY, 760);
  ctx.font = `700 ${nameSize}px ${DISPLAY}`;
  spaced(ctx, -1);
  ctx.fillStyle = INK;
  ctx.fillText(card.name, 70, 140);
  ctx.fillStyle = ACCENT;
  ctx.fillText('.', 70 + ctx.measureText(card.name).width, 140);
  spaced(ctx, 0);

  ctx.fillStyle = INK;
  fitText(ctx, card.title, 600, 28, BODY, 760);
  ctx.fillText(card.title, 72, 190);

  if (card.role) {
    ctx.fillStyle = '#555';
    fitText(ctx, card.role, 400, 24, BODY, 760);
    ctx.fillText(card.role, 72, 226);
  }

  const rows = [
    ['Phone', card.phone],
    ['Email', card.email],
    ['Web', card.website.replace(/^https?:\/\//, '')],
    ['Based', card.location]
  ];
  rows.forEach(([label, value], i) => {
    const y = 346 + i * 46;
    ctx.fillStyle = ACCENT_TEXT;
    ctx.font = `600 18px ${DISPLAY}`;
    spaced(ctx, 2);
    ctx.fillText(label.toUpperCase(), 72, y);
    spaced(ctx, 0);
    ctx.fillStyle = INK;
    fitText(ctx, value, 500, 26, BODY, CARD_W - 190 - 70);
    ctx.fillText(value, 190, y);
  });

  ctx.restore();
}

/** Back of the card: name and a QR code that saves the contact. */
export function drawBack(ctx, card, bleed = 0) {
  ctx.save();
  ctx.fillStyle = INK;
  ctx.fillRect(-bleed, -bleed, CARD_W + bleed * 2, CARD_H + bleed * 2);
  ctx.fillStyle = ACCENT;
  ctx.fillRect(-bleed, 560, CARD_W + bleed * 2, 40 + bleed);

  // QR on a white tile with an offset orange shadow
  const box = 380;
  const bx = CARD_W - 70 - box;
  const by = (560 - box) / 2;
  ctx.fillStyle = ACCENT;
  ctx.beginPath();
  ctx.roundRect(bx + 10, by + 10, box, box, 16);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(bx, by, box, box, 16);
  ctx.fill();

  const qrImage = qrBitmap(buildVCard(card));
  const count = qrImage.width;
  const cell = Math.floor((box - 56) / count);
  const qrSize = cell * count;
  const qx = bx + Math.round((box - qrSize) / 2);
  const qy = by + Math.round((box - qrSize) / 2);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(qrImage, qx, qy, qrSize, qrSize);
  ctx.imageSmoothingEnabled = true;

  const textMax = bx - 70 - 50;
  ctx.textAlign = 'left';
  ctx.fillStyle = ACCENT;
  ctx.font = `600 18px ${DISPLAY}`;
  spaced(ctx, 3);
  ctx.fillText('SCAN TO SAVE CONTACT', 72, 236);
  spaced(ctx, 0);

  const nameSize = fitText(ctx, card.name + '.', 700, 64, DISPLAY, textMax);
  ctx.font = `700 ${nameSize}px ${DISPLAY}`;
  spaced(ctx, -1);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(card.name, 70, 306);
  ctx.fillStyle = ACCENT;
  ctx.fillText('.', 70 + ctx.measureText(card.name).width, 306);
  spaced(ctx, 0);

  ctx.fillStyle = '#c9c9c9';
  const site = card.website.replace(/^https?:\/\//, '');
  fitText(ctx, site, 500, 26, BODY, textMax);
  ctx.fillText(site, 72, 352);

  ctx.restore();
}

/** Draws one face onto a new canvas `scale` times the layout size. */
export function renderFace(side, card, assets, scale = 2) {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_W * scale;
  canvas.height = CARD_H * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  if (side === 'front') drawFront(ctx, card, assets);
  else drawBack(ctx, card);
  return canvas;
}

// ---- Printable PNG ----

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (const b of bytes) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** Adds a pHYs chunk so print dialogs size the image at the right DPI. */
async function withDpi(blob, dpi) {
  const png = new Uint8Array(await blob.arrayBuffer());
  const ppm = Math.round(dpi / 0.0254);
  const chunk = new Uint8Array(21);
  const view = new DataView(chunk.buffer);
  view.setUint32(0, 9);
  chunk.set([0x70, 0x48, 0x59, 0x73], 4); // "pHYs"
  view.setUint32(8, ppm);
  view.setUint32(12, ppm);
  chunk[16] = 1; // unit: metre
  view.setUint32(17, crc32(chunk.subarray(4, 17)));
  const ihdrEnd = 8 + 25; // signature + IHDR chunk
  const out = new Uint8Array(png.length + chunk.length);
  out.set(png.subarray(0, ihdrEnd), 0);
  out.set(chunk, ihdrEnd);
  out.set(png.subarray(ihdrEnd), ihdrEnd + chunk.length);
  return new Blob([out], { type: 'image/png' });
}

/**
 * Print sheet at 300 DPI: front above back, each with 1/8 in bleed and crop
 * marks at the trim lines.
 */
export async function exportPrintPng(card, assets) {
  const bleed = DPI / 8;
  const margin = DPI / 4; // room for crop marks outside the bleed
  const cellW = CARD_W + 2 * (bleed + margin);
  const cellH = CARD_H + 2 * (bleed + margin);

  const canvas = document.createElement('canvas');
  canvas.width = cellW;
  canvas.height = cellH * 2;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  [0, 1].forEach((i) => {
    const ox = bleed + margin;
    const oy = i * cellH + bleed + margin;
    ctx.save();
    ctx.translate(ox, oy);
    ctx.beginPath();
    ctx.rect(-bleed, -bleed, CARD_W + 2 * bleed, CARD_H + 2 * bleed);
    ctx.clip();
    if (i === 0) drawFront(ctx, card, assets, bleed);
    else drawBack(ctx, card, bleed);
    ctx.restore();

    // Crop marks: short lines in the margin lined up with the trim edges
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    const gap = bleed + 6;
    const len = margin - 12;
    for (const x of [ox, ox + CARD_W]) {
      for (const [y0, dir] of [[oy - gap, -1], [oy + CARD_H + gap, 1]]) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, y0);
        ctx.lineTo(x + 0.5, y0 + dir * len);
        ctx.stroke();
      }
    }
    for (const y of [oy, oy + CARD_H]) {
      for (const [x0, dir] of [[ox - gap, -1], [ox + CARD_W + gap, 1]]) {
        ctx.beginPath();
        ctx.moveTo(x0, y + 0.5);
        ctx.lineTo(x0 + dir * len, y + 0.5);
        ctx.stroke();
      }
    }
  });

  const blob = await new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('PNG export failed'))), 'image/png')
  );
  return withDpi(blob, DPI);
}
