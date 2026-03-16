#!/usr/bin/env node
/**
 * Compresses raw promo photos to web-optimized webp files.
 * Input:  public/images/raw/promo_photos/
 * Output: public/images/promo/
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public/images/raw/promo_photos');
const OUTPUT_DIR = path.join(__dirname, '../public/images/promo');

const files = [
  { input: '0F8A4089-Enhanced-NR.JPG',  output: 'promo-01.webp' },
  { input: '0F8A4230-Enhanced-NR.JPG',  output: 'promo-02.webp' },
  { input: '0F8A4588-Enhanced-NR.JPG',  output: 'promo-03.webp' },
  { input: '0F8A4662-Enhanced-NR.JPG',  output: 'promo-04.webp' },
  { input: '0F8A8091-2.jpeg',            output: 'promo-05.webp' },
  { input: '0F8A8176.JPG',              output: 'promo-06.webp' },
  { input: '0F8A8241.JPG',              output: 'promo-07.webp' },
  { input: '0F8A8636.jpg',              output: 'promo-08.webp' },
  { input: '0F8A8876.jpeg',             output: 'promo-09.webp' },
  { input: '0F8A8935-crop.jpeg',        output: 'promo-10.webp' },
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function compress() {
  console.log(`Compressing ${files.length} promo photos to webp...\n`);
  for (const file of files) {
    const inputPath  = path.join(INPUT_DIR,  file.input);
    const outputPath = path.join(OUTPUT_DIR, file.output);

    const meta = await sharp(inputPath).metadata();
    const info = await sharp(inputPath)
      .resize({ width: 1400, height: 1000, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath);

    const inSize  = fs.statSync(inputPath).size;
    const outSize = fs.statSync(outputPath).size;
    const pct     = ((1 - outSize / inSize) * 100).toFixed(1);

    console.log(
      `✓  ${file.output}  ` +
      `${meta.width}x${meta.height} → ${info.width}x${info.height}  ` +
      `${(inSize/1024/1024).toFixed(1)}MB → ${(outSize/1024).toFixed(0)}KB  (-${pct}%)`
    );
  }
  console.log('\n✅  Done! All photos compressed.');
}

compress().catch(err => { console.error(err); process.exit(1); });

