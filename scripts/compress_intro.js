const fs = require('fs');
const https = require('https');
const cp = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const videoUrl = 'https://res.cloudinary.com/drvvekzzm/video/upload/v1791453046/Wedding_invitation_opening_film_1080p_20261008151626_nrg1qy.mp4';
const rawPath = 'scratch_raw_intro.mp4';
const outputPath = 'public/intro.mp4';

console.log('Downloading raw intro video...');
const file = fs.createWriteStream(rawPath);

https.get(videoUrl, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      const rawSize = fs.statSync(rawPath).size;
      console.log(`Downloaded raw video (${(rawSize / 1024 / 1024).toFixed(2)} MB). Now compressing with ffmpeg...`);

      // Target <= 3MB (approx 2.5MB for safety)
      // Using H.264 crf 28, preset slower/medium, scale to 720p or 1080p with moderate bitrate
      // Let's test crf 27, preset veryfast/medium, audio AAC 96k (or no audio if muted)
      try {
        const cmd = `"${ffmpegPath}" -y -i "${rawPath}" -c:v libx264 -crf 27 -preset medium -pix_fmt yuv420p -an -movflags +faststart "${outputPath}"`;
        console.log('Running:', cmd);
        cp.execSync(cmd, { stdio: 'inherit' });
        
        const finalSize = fs.statSync(outputPath).size;
        console.log(`Success! Compressed video size: ${(finalSize / 1024 / 1024).toFixed(2)} MB (${finalSize} bytes)`);

        // Also let's extract a 4-second smoke loop for condition 6 ("Only one smoke WebM layer is mounted at a time") if helpful
        const smokeOutput = 'public/smoke-loop.webm';
        try {
          console.log('Generating smoke transition loop WebM...');
          // Take 4 seconds from where smoke billows
          const smokeCmd = `"${ffmpegPath}" -y -ss 00:00:03 -i "${rawPath}" -t 4 -c:v libvpx-vp9 -b:v 400k -crf 35 -an "${smokeOutput}"`;
          cp.execSync(smokeCmd, { stdio: 'inherit' });
          console.log(`Generated ${smokeOutput} (${(fs.statSync(smokeOutput).size / 1024).toFixed(1)} KB)`);
        } catch (err) {
          console.log('Smoke extraction error:', err.message);
        }

        // Clean up raw temp file
        if (fs.existsSync(rawPath)) {
          fs.unlinkSync(rawPath);
        }
      } catch (err) {
        console.error('Compression failed:', err);
      }
    });
  });
}).on('error', (err) => {
  console.error('Download failed:', err);
});
