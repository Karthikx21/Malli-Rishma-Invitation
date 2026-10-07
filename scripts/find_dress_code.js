const fs = require('fs');
const html = fs.readFileSync('Malli_Rishma_Invitation.html', 'utf8');
const idx = html.indexOf('classic coat suit');
console.log(html.substring(idx - 400, idx + 800));
