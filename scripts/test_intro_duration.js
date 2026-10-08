const cp = require('child_process');
const ffmpegPath = require('ffmpeg-static');

function probe(f) {
  try {
    return cp.execSync(`"${ffmpegPath}" -i "${f}" 2>&1`).toString();
  } catch(e) {
    return e.stdout ? e.stdout.toString() : '';
  }
}
console.log('Image 1:', probe('scratch/ok_kanmani_1.jpg').match(/(\d{3,5})x(\d{3,5})/)?.[0]);
console.log('Image 2:', probe('scratch/ok_kanmani_2.png').match(/(\d{3,5})x(\d{3,5})/)?.[0]);




