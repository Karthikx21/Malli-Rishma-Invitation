const fs = require('fs');

const html = fs.readFileSync('Malli_Rishma_Invitation.html', 'utf8');

const sectionMatches = html.match(/<!--\s*\d+\.[\s\S]*?-->\s*<section[\s\S]*?<\/section>/gi) || html.match(/<section[\s\S]*?<\/section>/gi) || [];

console.log('Sections found:', sectionMatches.length);

sectionMatches.forEach((sec, i) => {
  const comment = sec.match(/<!--([\s\S]*?)-->/)?.[1] || '';
  const text = sec.replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
                  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                  .replace(/<[^>]+>/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim();
  console.log(`\n================== SECTION ${i + 1} (${comment.trim()}) ==================`);
  console.log(text);
});
