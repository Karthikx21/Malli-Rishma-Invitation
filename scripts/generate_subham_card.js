const sharp = require('sharp');

async function createSubhamCard() {
  // SVG overlay for subham-card.jpg
  // Center of frame aperture is cx = 341, cy = 495
  const svg = `
  <svg width="682" height="1024" viewBox="0 0 682 1024" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF5DC"/>
        <stop offset="25%" stop-color="#F3DE9C"/>
        <stop offset="65%" stop-color="#D4AF37"/>
        <stop offset="100%" stop-color="#AA771C"/>
      </linearGradient>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0"/>
        <stop offset="50%" stop-color="#F3DE9C" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
      </linearGradient>
      <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur1" />
        <feGaussianBlur stdDeviation="3" result="blur2" />
        <feMerge>
          <feMergeNode in="blur1" />
          <feMergeNode in="blur2" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    <!-- Sacred Star Motif at Top of Aperture -->
    <path d="M 341 405 Q 341 417 353 417 Q 341 417 341 429 Q 341 417 329 417 Q 341 417 341 405 Z" fill="#F3DE9C" opacity="0.9" filter="url(#softGlow)"/>
    <circle cx="341" cy="417" r="1.5" fill="#FFFFFF"/>

    <!-- Sacred Tamil: சுபம் -->
    <text x="341" y="488" 
      font-family="'Noto Serif Tamil', 'Nirmala UI', 'Latha', 'Vijaya', serif" 
      font-size="62" 
      font-weight="700" 
      letter-spacing="5" 
      text-anchor="middle" 
      fill="url(#goldGrad)" 
      filter="url(#softGlow)">சுபம்</text>

    <!-- Hairline Ornament -->
    <line x1="280" y1="508" x2="402" y2="508" stroke="url(#lineGrad)" stroke-width="1"/>
    <circle cx="341" cy="508" r="2" fill="#F3DE9C"/>

    <!-- English: SUBHAM -->
    <text x="341" y="528" 
      font-family="'Cinzel', 'Times New Roman', Georgia, serif" 
      font-size="12" 
      font-weight="600" 
      letter-spacing="9" 
      text-anchor="middle" 
      fill="#E6CA85" 
      opacity="0.95">SUBHAM</text>

    <!-- Blessing Line: என்றும் மங்கலம் பொங்கட்டும் -->
    <text x="341" y="555" 
      font-family="'Noto Serif Tamil', 'Nirmala UI', serif" 
      font-size="11" 
      letter-spacing="1.5" 
      text-anchor="middle" 
      fill="#F5EFE0" 
      opacity="0.8">என்றும் மங்கலம் பொங்கட்டும்</text>
  </svg>
  `;

  await sharp('public/editorial/subham-gold-frame.jpg')
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toFile('public/editorial/subham-card.jpg');

  console.log('Successfully generated public/editorial/subham-card.jpg with quality 92');
}

createSubhamCard().catch(console.error);
