const ffmpeg = require('ffmpeg-static');
const { spawnSync } = require('child_process');
const fs = require('fs');

const input = 'public/side a.mpeg';

// Target files:
const targets = [
  'public/audio/side-a-15s.mp3',
  'public/side-a-15s.mp3',
  'public/audio/side-a.mp3'
];

// Backup original full side-a if not already backed up
if (!fs.existsSync('public/audio/side-a-full.mp3')) {
  fs.copyFileSync(input, 'public/audio/side-a-full.mp3');
  console.log('Backed up full side-a to public/audio/side-a-full.mp3');
}

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
    console.log(`Successfully created ${target} (${fs.statSync(target).size} bytes)`);
  } else {
    console.error(`Error creating ${target}:`, res.stderr);
  }
});
