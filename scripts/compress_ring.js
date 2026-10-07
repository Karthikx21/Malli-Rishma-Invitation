const fs = require('fs');
const cp = require('child_process');
const ffmpeg = require('ffmpeg-static');

if (!fs.existsSync('public/videos')) {
  fs.mkdirSync('public/videos', { recursive: true });
}

console.log('Inspecting ring.MOV...');
try {
  const info = cp.execSync(`"${ffmpeg}" -i "public/ring.MOV"`, { stdio: 'pipe' }).toString();
  console.log(info);
} catch (e) {
  console.log(e.stderr ? e.stderr.toString() : e.message);
}

// Compress to ring-loop.mp4: target under 2 MB (e.g. 1.2 - 1.6 MB), 720p or 1080p, no audio (-an), crf 28, faststart
console.log('Creating ring-loop.mp4...');
const mp4Cmd = `"${ffmpeg}" -y -i "public/ring.MOV" -vf "scale='min(1080,iw)':-2" -c:v libx264 -crf 28 -preset medium -pix_fmt yuv420p -an -movflags +faststart "public/videos/ring-loop.mp4"`;
cp.execSync(mp4Cmd, { stdio: 'inherit' });

console.log('Creating ring-loop.webm...');
const webmCmd = `"${ffmpeg}" -y -i "public/ring.MOV" -vf "scale='min(1080,iw)':-2" -c:v libvpx-vp9 -b:v 800k -crf 34 -an "public/videos/ring-loop.webm"`;
cp.execSync(webmCmd, { stdio: 'inherit' });

console.log('Creating ring-poster.webp...');
const posterCmd = `"${ffmpeg}" -y -ss 00:00:01 -i "public/ring.MOV" -vframes 1 -vf "scale='min(1080,iw)':-2" "public/videos/ring-poster.webp"`;
cp.execSync(posterCmd, { stdio: 'inherit' });

const mp4Size = fs.statSync('public/videos/ring-loop.mp4').size;
const webmSize = fs.statSync('public/videos/ring-loop.webm').size;
const posterSize = fs.statSync('public/videos/ring-poster.webp').size;

console.log(`ring-loop.mp4 size: ${(mp4Size / 1024 / 1024).toFixed(2)} MB (${mp4Size} bytes)`);
console.log(`ring-loop.webm size: ${(webmSize / 1024 / 1024).toFixed(2)} MB (${webmSize} bytes)`);
console.log(`ring-poster.webp size: ${(posterSize / 1024).toFixed(1)} KB`);
