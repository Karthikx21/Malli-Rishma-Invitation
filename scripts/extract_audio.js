const fs = require('fs');

const html = fs.readFileSync('Malli_Rishma_Invitation.html', 'utf8');

if (!fs.existsSync('public/audio')) {
  fs.mkdirSync('public/audio', { recursive: true });
}

const himMatch = html.match(/id="him"[^>]*src="data:audio\/mpeg;base64,([^"]+)"/);
const herMatch = html.match(/id="her"[^>]*src="data:audio\/mpeg;base64,([^"]+)"/);
const bgmMatch = html.match(/id="bgm"[^>]*src="data:audio\/mpeg;base64,([^"]+)"/);

if (himMatch) {
  fs.writeFileSync('public/audio/him.mp3', Buffer.from(himMatch[1], 'base64'));
  console.log('Saved him.mp3:', fs.statSync('public/audio/him.mp3').size, 'bytes');
} else {
  console.log('him audio not found');
}

if (herMatch) {
  fs.writeFileSync('public/audio/her.mp3', Buffer.from(herMatch[1], 'base64'));
  console.log('Saved her.mp3:', fs.statSync('public/audio/her.mp3').size, 'bytes');
} else {
  console.log('her audio not found');
}

if (bgmMatch) {
  fs.writeFileSync('public/audio/bgm.mp3', Buffer.from(bgmMatch[1], 'base64'));
  console.log('Saved bgm.mp3:', fs.statSync('public/audio/bgm.mp3').size, 'bytes');
}
