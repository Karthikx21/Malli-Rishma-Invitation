const cp = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');

console.log('Optimizing intro video to <= 3MB...');
const cmd = `"${ffmpegPath}" -y -i public/intro.mp4 -vf "scale=720:-2" -c:v libx264 -crf 27 -preset medium -pix_fmt yuv420p -an -movflags +faststart public/intro_opt.mp4`;
cp.execSync(cmd, { stdio: 'inherit' });

const size = fs.statSync('public/intro_opt.mp4').size;
console.log(`Generated size: ${(size / 1024 / 1024).toFixed(2)} MB (${size} bytes)`);

if (size <= 3 * 1024 * 1024) {
  fs.renameSync('public/intro_opt.mp4', 'public/intro.mp4');
  console.log('Successfully replaced public/intro.mp4 (under 3MB)!');
} else {
  console.log('Still over 3MB, adjust crf');
}
