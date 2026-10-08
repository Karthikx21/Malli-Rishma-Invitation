const cp = require('child_process');
const ffmpegPath = require('ffmpeg-static');

// Extract frames at 6.0, 6.5, 7.0, 7.5, 8.0 seconds
const times = [4.5, 5.0, 5.5, 6.0, 6.5, 7.0];
times.forEach((t) => {
  try {
    cp.execSync(`"${ffmpegPath}" -y -ss ${t} -i "scratch_new_intro.mp4" -vframes 1 -q:v 2 "scratch/card_${t}s.jpg"`);
    console.log(`Extracted frame at ${t}s`);
  } catch (e) {
    console.error(e.message);
  }
});

