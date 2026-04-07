import sharp from 'sharp';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const IMG_DIR = 'public/img';

// Define max dimensions and quality for each image
// width/height = max dimension (keeps aspect ratio, never upscales)
const targets = [
  // Logos: massively oversized for their display size
  { file: 'Logo.webp',       width: 300,  quality: 85 }, // displayed max ~104px in navbar
  { file: 'logo_white.webp', width: 900,  quality: 85 }, // displayed max ~640px wide in hero

  // About section photo
  { file: 'Tito.webp',       width: 1300, height: 1300, quality: 82 },

  // Video poster images (displayed max ~1300x730 on desktop)
  { file: 'immo1.webp',      width: 1400, quality: 78 },
  { file: 'immo2.webp',      width: 1400, quality: 78 },
  { file: 'immo3.webp',      width: 1400, quality: 78 },
  { file: 'sc1.webp',        width: 1400, quality: 78 },
  { file: 'sc2.webp',        width: 1400, quality: 78 },
  { file: 'sc3.webp',        width: 1400, quality: 78 },
  { file: 'av1.webp',        width: 1400, quality: 78 },
  { file: 'av2.webp',        width: 1400, quality: 78 },
  { file: 'av3.webp',        width: 1400, quality: 78 },
  { file: 'live1.webp',      width: 1400, quality: 78 },
  { file: 'live2.webp',      width: 1400, quality: 78 },
  { file: 'live3.webp',      width: 1400, quality: 78 },
  { file: 'fp.webp',         width: 1400, quality: 78 },
];

let totalBefore = 0;
let totalAfter = 0;

for (const { file, width, height, quality } of targets) {
  const path = join(IMG_DIR, file);
  try {
    const input = await readFile(path);
    const meta = await sharp(input).metadata();
    const sizeBefore = input.length;

    // Only resize if image is larger than target
    let pipeline = sharp(input);
    if (meta.width > width || (height && meta.height > height)) {
      pipeline = pipeline.resize({
        width,
        height,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    const output = await pipeline.webp({ quality }).toBuffer();
    const sizeAfter = output.length;

    // Only write if we actually made it smaller
    if (sizeAfter < sizeBefore) {
      await writeFile(path, output);
      const saved = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
      console.log(
        `✓ ${file.padEnd(20)} ${(sizeBefore / 1024).toFixed(0).padStart(6)} KB → ${(sizeAfter / 1024).toFixed(0).padStart(6)} KB  (-${saved}%)`
      );
    } else {
      console.log(`  ${file.padEnd(20)} already optimal, skipped`);
    }

    totalBefore += sizeBefore;
    totalAfter += Math.min(sizeAfter, sizeBefore);
  } catch (e) {
    console.error(`✗ ${file}: ${e.message}`);
  }
}

const saved = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);
console.log(`\nTotal: ${(totalBefore / 1024).toFixed(0)} KB → ${(totalAfter / 1024).toFixed(0)} KB  (-${saved}%)`);
