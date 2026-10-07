const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processImages() {
  console.log('Processing real editorial images into posters...');

  // 1. Hero
  await sharp('public/editorial-poster-bg.jpg')
    .resize(720, 1280, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile('public/posters/hero-9-16.webp');

  await sharp('public/editorial-poster-bg.jpg')
    .resize(1280, 720, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile('public/posters/hero-16-9.webp');

  // 2. Christian Chapel
  await sharp('public/day1-chapel-bg.jpg')
    .resize(720, 1280, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile('public/posters/christian-chapel-9-16.webp');

  await sharp('public/day1-chapel-bg.jpg')
    .resize(1280, 720, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile('public/posters/christian-chapel-16-9.webp');

  // 3. Hindu Temple
  await sharp('public/day2-temple-bg.jpg')
    .resize(720, 1280, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile('public/posters/hindu-temple-9-16.webp');

  await sharp('public/day2-temple-bg.jpg')
    .resize(1280, 720, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile('public/posters/hindu-temple-16-9.webp');

  // 4. Couple Cover
  await sharp('public/editorial-poster-bg.jpg')
    .resize(900, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile('public/posters/couple-cover.webp');

  console.log('All real poster WebPs successfully generated!');
}

processImages().catch(console.error);
