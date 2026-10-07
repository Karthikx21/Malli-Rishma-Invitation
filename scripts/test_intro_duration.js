const fs = require('fs');
const cp = require('child_process');
const ffmpegPath = require('ffmpeg-static');

try {
  const result = cp.execSync(`"${ffmpegPath}" -i "public/intro.mp4" 2>&1`).toString();
  console.log(result);
} catch (e) {
  console.log(e.stdout ? e.stdout.toString() : e.message);
}
