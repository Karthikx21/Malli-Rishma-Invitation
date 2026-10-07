const fs = require('fs');

const html = fs.readFileSync('Malli_Rishma_Invitation.html', 'utf8');

// Look for sections or scripts
console.log('HTML size:', html.length);

// Let's search for interesting strings
const keywords = [
  'OK Kanmani', 'Tara', 'Ganapathy', 'audio', 'loop', 'Jenneys', 'Kumaran', 
  'Lakshmi', 'dress', 'coat', 'gown', 'picture perfect', 'traits', 'Tamil'
];

keywords.forEach(kw => {
  let idx = 0;
  let count = 0;
  while ((idx = html.indexOf(kw, idx)) !== -1) {
    count++;
    if (count <= 3) {
      console.log(`[${kw}] found at ${idx}:`, html.substring(Math.max(0, idx - 80), Math.min(html.length, idx + 150)).replace(/\s+/g, ' '));
    }
    idx += kw.length;
  }
  console.log(`Total occurrences of "${kw}":`, count);
});
