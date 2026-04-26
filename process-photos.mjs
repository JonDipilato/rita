import sharp from 'sharp';

async function process() {
  await sharp('/mnt/c/Users/jon-d/Pictures/Screenshots/rita and jesus.jpg')
    .rotate(-2.5, { background: '#ffffff' })
    .extract({ left: 108, top: 190, width: 370, height: 740 })
    .webp({ quality: 88 })
    .toFile('public/rita-portrait.webp');
  console.log('rita-portrait.webp done');

  await sharp('/mnt/c/Users/jon-d/Pictures/Screenshots/before after 2.jpg')
    .extract({ left: 0, top: 195, width: 577, height: 860 })
    .webp({ quality: 88 })
    .toFile('public/before-after-lourdes.webp');
  console.log('before-after-lourdes.webp done');

  await sharp('/mnt/c/Users/jon-d/Pictures/Screenshots/rita before and after.jpg')
    .extract({ left: 0, top: 185, width: 577, height: 855 })
    .webp({ quality: 88 })
    .toFile('public/before-after-st-patrick.webp');
  console.log('before-after-st-patrick.webp done');
}

process().catch(console.error);
