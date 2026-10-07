const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const postersDir = path.join(__dirname, '..', 'public', 'posters');
if (!fs.existsSync(postersDir)) {
  fs.mkdirSync(postersDir, { recursive: true });
}

const posters = [
  { name: 'hero-9-16.webp', width: 1080, height: 1920, label: 'HERO POSTER · 9:16' },
  { name: 'hero-16-9.webp', width: 1920, height: 1080, label: 'HERO POSTER · 16:9' },
  { name: 'christian-chapel-9-16.webp', width: 1080, height: 1920, label: 'CHRISTIAN CHAPEL · 9:16' },
  { name: 'christian-chapel-16-9.webp', width: 1920, height: 1080, label: 'CHRISTIAN CHAPEL · 16:9' },
  { name: 'hindu-temple-9-16.webp', width: 1080, height: 1920, label: 'HINDU TEMPLE · 9:16' },
  { name: 'hindu-temple-16-9.webp', width: 1920, height: 1080, label: 'HINDU TEMPLE · 16:9' },
  { name: 'malli-portrait.webp', width: 1080, height: 1440, label: 'MALLI SUMANDHAR · 3:4' },
  { name: 'rishma-portrait.webp', width: 1080, height: 1440, label: 'RISHMA JOHN · 3:4' },
  { name: 'couple-cover.webp', width: 1920, height: 1080, label: 'COUPLE EDITORIAL · 16:9' },
];

async function generate() {
  for (const item of posters) {
    const svg = `
      <svg width="${item.width}" height="${item.height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4A0F20" />
            <stop offset="60%" stop-color="#2D0A14" />
            <stop offset="100%" stop-color="#1A0A0F" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <rect x="24" y="24" width="${item.width - 48}" height="${item.height - 48}" fill="none" stroke="#B8893E" stroke-width="2" stroke-opacity="0.35" />
        <text x="50%" y="50%" text-anchor="middle" fill="#F2DFB5" font-family="serif" font-size="${Math.round(item.width * 0.035)}px" letter-spacing="4" font-weight="300" opacity="0.85">${item.label}</text>
        <text x="50%" y="${item.height / 2 + 50}" text-anchor="middle" fill="#B8893E" font-family="sans-serif" font-size="${Math.round(item.width * 0.016)}px" letter-spacing="3" text-transform="uppercase" opacity="0.6">Rishma &amp; Malli · Editorial Poster</text>
      </svg>
    `;

    const outputPath = path.join(postersDir, item.name);
    await sharp(Buffer.from(svg))
      .webp({ quality: 85 })
      .toFile(outputPath);
    console.log(`Generated: ${item.name}`);
  }
}

generate().catch(console.error);
