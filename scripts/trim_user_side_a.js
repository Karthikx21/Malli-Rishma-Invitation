const ffmpeg = require('ffmpeg-static');
const { spawnSync } = require('child_process');
const fs = require('fs');

const input = 'public/SIDE A song.mpeg';

if (!fs.existsSync(input)) {
  console.error('File not found:', input);
  process.exit(1);
}

const targets = [
  'public/audio/side-a-15s.mp3',
  'public/side-a-15s.mp3',
  'public/audio/side-a.mp3'
];

targets.forEach(target => {
  const res = spawnSync(ffmpeg, [
    '-y',
    '-ss', '0',
    '-t', '15',
    '-i', input,
    '-af', 'afade=t=in:ss=0:d=0.2,afade=t=out:st=13.5:d=1.5',
    '-c:a', 'libmp3lame',
    '-b:a', '320k',
    target
  ], { encoding: 'utf-8' });

  if (res.status === 0) {
    console.log(`Successfully generated ${target} from "${input}" (${fs.statSync(target).size} bytes)`);
  } else {
    console.error(`Error generating ${target}:`, res.stderr);
  }
});
