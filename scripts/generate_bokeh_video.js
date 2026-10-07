const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const ffmpegPath = path.join(__dirname, '../node_modules/.pnpm/ffmpeg-static@5.3.0/node_modules/ffmpeg-static/ffmpeg.exe');

const width = 1280;
const height = 720;
const fps = 24;
const duration = 6; // 6 seconds seamless loop
const totalFrames = fps * duration;

console.log(`Generating ${totalFrames} frames of gentle drifting gold dust & bokeh haze...`);

// Define 75 particles with fixed random seeds for deterministic seamless loop
const particles = [];
for (let i = 0; i < 75; i++) {
  particles.push({
    x: Math.random() * width,
    baseY: Math.random() * height,
    speedY: (height / duration) * (0.3 + Math.random() * 0.7), // ensures integer or wrap
    radius: Math.random() < 0.8 ? 1.5 + Math.random() * 3.5 : 8 + Math.random() * 20, // mix of fine dust & soft bokeh orbs
    opacity: 0.15 + Math.random() * 0.55,
    freqX: 1 + Math.floor(Math.random() * 3), // cycles per 6s for seamless x loop
    ampX: 15 + Math.random() * 35,
    phaseX: Math.random() * Math.PI * 2,
    color: Math.random() < 0.6 ? [212, 163, 89] : (Math.random() < 0.5 ? [242, 223, 181] : [184, 137, 62]), // Gold, Champagne, Antique Gold
  });
}

// Background gradient base (deep burgundy velvet to ink)
const bgBuffer = Buffer.alloc(width * height * 4);
for (let y = 0; y < height; y++) {
  const normY = y / height;
  const r = Math.round(30 + normY * 18); // 30 -> 48
  const g = Math.round(7 + normY * 5);    // 7 -> 12
  const b = Math.round(15 + normY * 12);  // 15 -> 27
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    bgBuffer[idx] = r;
    bgBuffer[idx + 1] = g;
    bgBuffer[idx + 2] = b;
    bgBuffer[idx + 3] = 255;
  }
}

// Spawn ffmpeg child process accepting rawvideo RGBA
const outWebm = 'public/hero-ambient-loop.webm';
const outMp4 = 'public/hero-ambient-loop.mp4';

const ffmpegArgs = [
  '-y',
  '-f', 'rawvideo',
  '-pix_fmt', 'rgba',
  '-s', `${width}x${height}`,
  '-r', `${fps}`,
  '-i', '-',
  '-c:v', 'libx264',
  '-crf', '24',
  '-preset', 'medium',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  '-an',
  outMp4
];

console.log('Spawning ffmpeg encoder...');
const ffmpeg = cp.spawn(ffmpegPath, ffmpegArgs, { stdio: ['pipe', 'inherit', 'inherit'] });

const frameBuffer = Buffer.alloc(width * height * 4);

for (let frame = 0; frame < totalFrames; frame++) {
  const t = frame / fps;
  const progress = frame / totalFrames; // 0 to 1

  // Copy base background
  bgBuffer.copy(frameBuffer);

  // Render each particle onto frameBuffer
  for (let p = 0; p < particles.length; p++) {
    const pt = particles[p];

    // Compute seamless looping y
    // (baseY - t * speedY) wrapped seamlessly into [0, height)
    let curY = (pt.baseY - progress * height) % height;
    if (curY < 0) curY += height;

    // Compute seamless looping x with full sine wave cycles
    const curX = (pt.x + Math.sin(progress * Math.PI * 2 * pt.freqX + pt.phaseX) * pt.ampX + width) % width;

    // Subtle gentle pulsation
    const pulse = 0.8 + 0.2 * Math.sin(progress * Math.PI * 2 * 2 + pt.phaseX);
    const alpha = pt.opacity * pulse;
    const rInt = Math.ceil(pt.radius);

    const minX = Math.max(0, Math.floor(curX - rInt * 2));
    const maxX = Math.min(width - 1, Math.ceil(curX + rInt * 2));
    const minY = Math.max(0, Math.floor(curY - rInt * 2));
    const maxY = Math.min(height - 1, Math.ceil(curY + rInt * 2));

    const [pr, pg, pb] = pt.color;

    for (let py = minY; py <= maxY; py++) {
      const dy = py - curY;
      for (let px = minX; px <= maxX; px++) {
        const dx = px - curX;
        const distSq = dx * dx + dy * dy;
        const radSq = pt.radius * pt.radius;

        if (distSq < radSq * 4) {
          // Soft radial falloff
          const factor = Math.exp(-distSq / (radSq * 1.5)) * alpha;
          if (factor > 0.01) {
            const idx = (py * width + px) * 4;
            frameBuffer[idx] = Math.min(255, Math.round(frameBuffer[idx] + pr * factor));
            frameBuffer[idx + 1] = Math.min(255, Math.round(frameBuffer[idx + 1] + pg * factor));
            frameBuffer[idx + 2] = Math.min(255, Math.round(frameBuffer[idx + 2] + pb * factor));
          }
        }
      }
    }
  }

  ffmpeg.stdin.write(frameBuffer);
}

ffmpeg.stdin.end();

ffmpeg.on('close', (code) => {
  if (code === 0) {
    const size = fs.statSync(outMp4).size;
    console.log(`Successfully generated ${outMp4} (${(size / 1024).toFixed(1)} KB)!`);

    // Also generate WebM version for browser compatibility
    try {
      console.log('Generating WebM version...');
      const webmCmd = `"${ffmpegPath}" -y -i "${outMp4}" -c:v libvpx-vp9 -b:v 500k -crf 32 -an "${outWebm}"`;
      cp.execSync(webmCmd, { stdio: 'inherit' });
      console.log(`Successfully generated ${outWebm} (${(fs.statSync(outWebm).size / 1024).toFixed(1)} KB)!`);
    } catch (e) {
      console.log('WebM generation note:', e.message);
    }
  } else {
    console.error('ffmpeg failed with code', code);
  }
});
