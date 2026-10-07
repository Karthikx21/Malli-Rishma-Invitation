const cp = require('child_process');
const ffmpegPath = require('ffmpeg-static');
console.log('ffmpeg path:', ffmpegPath);
try {
  const version = cp.execSync(`"${ffmpegPath}" -version`).toString();
  console.log('Version header:', version.split('\n')[0]);
} catch (e) {
  console.error('Error running ffmpeg:', e.message);
}
