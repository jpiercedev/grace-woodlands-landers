import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceImage = join(__dirname, '../public/images/raw/cropped-ICON-Grace-Woodlands-Blue-1-192x192.png');
const publicDir = join(__dirname, '../public');

async function generateFavicons() {
  console.log('🎨 Generating favicons from Grace Woodlands icon...\n');

  try {
    // Generate favicon.ico (32x32)
    console.log('Creating favicon.ico (32x32)...');
    await sharp(sourceImage)
      .resize(32, 32)
      .toFile(join(publicDir, 'favicon.ico'));
    console.log('✅ favicon.ico created');

    // Generate icon-192.png
    console.log('Creating icon-192.png...');
    await sharp(sourceImage)
      .resize(192, 192)
      .toFile(join(publicDir, 'icon-192.png'));
    console.log('✅ icon-192.png created');

    // Generate icon-512.png
    console.log('Creating icon-512.png...');
    await sharp(sourceImage)
      .resize(512, 512)
      .toFile(join(publicDir, 'icon-512.png'));
    console.log('✅ icon-512.png created');

    // Generate apple-touch-icon.png (180x180)
    console.log('Creating apple-touch-icon.png (180x180)...');
    await sharp(sourceImage)
      .resize(180, 180)
      .toFile(join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png created');

    console.log('\n🎉 All favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

