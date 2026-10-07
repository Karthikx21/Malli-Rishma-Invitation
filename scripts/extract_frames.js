const cp = require('child_process');
const ffmpegPath = require('ffmpeg-static');

// Extract frames at 6.0, 6.5, 7.0, 7.5, 8.0 seconds
const times = [5.5, 6.0, 6.5, 7.0, 7.5, 7.9];
times.forEach((t, i) => {
  try {
    cp.execSync(`"${ffmpegPath}" -y -ss ${t} -i "public/intro.mp4" -vframes 1 -q:v 2 "scratch/intro_frame_${i}_${t}s.jpg"`);
    console.log(`Extracted frame at ${t}s`);
  } catch (e) {
    console.error(e.message);
  }
});
