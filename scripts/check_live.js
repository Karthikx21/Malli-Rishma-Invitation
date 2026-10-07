const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const ids = ['hero', 'couple', 'soundtrack', 'countdown', 'celebration', 'dress-code', 'venues', 'rsvp'];
    ids.forEach(id => {
      const found = data.includes(`id="${id}"`);
      console.log(`${id.padEnd(15)} : ${found ? 'FOUND' : 'MISSING'}`);
    });
  });
});
