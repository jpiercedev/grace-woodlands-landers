#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for faster optimization
const CONFIG = {
  inputVideo: path.join(__dirname, '../public/header-video/full-res/ORANGE WEB HEADER_V2.mp4'),
  outputDir: path.join(__dirname, '../public/header-video/compressed'),
  posterDir: path.join(__dirname, '../public/header-video/posters'),
  
  // Optimized settings for faster loading (more aggressive compression)
  qualityCRF: 32,        // Higher CRF for smaller files
  preset: 'fast',        // Fast encoding
  
  // Focus on most important variants
  variants: [
    { name: 'hero-1920', width: 1920, height: 1080 },
    { name: 'hero-1280', width: 1280, height: 720 },
    { name: 'hero-854', width: 854, height: 480 }
  ]
};

console.log('⚡ Grace at The Circle - Fast Hero Video Optimization');
console.log('📁 Input:', CONFIG.inputVideo);
console.log('📁 Output:', CONFIG.outputDir);
console.log('');

// Create output directories
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}
if (!fs.existsSync(CONFIG.posterDir)) {
  fs.mkdirSync(CONFIG.posterDir, { recursive: true });
}

// Check if input video exists
if (!fs.existsSync(CONFIG.inputVideo)) {
  console.error('❌ Input video not found:', CONFIG.inputVideo);
  process.exit(1);
}

// Function to get file size
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const bytes = stats.size;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  } catch (error) {
    return 'Unknown';
  }
}

// Generate optimized videos (WebM and MP4 only for speed)
console.log('🎥 Compressing videos (WebM + MP4)...');

CONFIG.variants.forEach(variant => {
  // WebM VP9 (best compression)
  const webmPath = path.join(CONFIG.outputDir, `${variant.name}.webm`);
  const webmCommand = `ffmpeg -i "${CONFIG.inputVideo}" ` +
    `-vf "scale=${variant.width}:${variant.height}:force_original_aspect_ratio=decrease,pad=${variant.width}:${variant.height}:(ow-iw)/2:(oh-ih)/2" ` +
    `-c:v libvpx-vp9 -crf ${CONFIG.qualityCRF} -b:v 0 -speed 2 ` +
    `-an -pix_fmt yuv420p ` +
    `-y "${webmPath}" -loglevel error`;

  console.log(`🔄 Creating ${variant.name}.webm...`);
  try {
    execSync(webmCommand, { stdio: 'pipe' });
    const size = getFileSize(webmPath);
    console.log(`   ✅ Complete: ${size}`);
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
  }

  // MP4 H.264 (compatibility)
  const mp4Path = path.join(CONFIG.outputDir, `${variant.name}.mp4`);
  const mp4Command = `ffmpeg -i "${CONFIG.inputVideo}" ` +
    `-vf "scale=${variant.width}:${variant.height}:force_original_aspect_ratio=decrease,pad=${variant.width}:${variant.height}:(ow-iw)/2:(oh-ih)/2" ` +
    `-c:v libx264 -preset ${CONFIG.preset} -crf ${CONFIG.qualityCRF} ` +
    `-movflags +faststart -an -pix_fmt yuv420p ` +
    `-y "${mp4Path}" -loglevel error`;

  console.log(`🔄 Creating ${variant.name}.mp4...`);
  try {
    execSync(mp4Command, { stdio: 'pipe' });
    const size = getFileSize(mp4Path);
    console.log(`   ✅ Complete: ${size}`);
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
  }
});

console.log('');
console.log('⚡ Fast optimization complete!');
console.log('');
console.log('📊 File sizes:');

// List generated files
try {
  const files = fs.readdirSync(CONFIG.outputDir);
  files.forEach(file => {
    const filePath = path.join(CONFIG.outputDir, file);
    const size = getFileSize(filePath);
    console.log(`   📁 ${file}: ${size}`);
  });
} catch (error) {
  console.log('   Could not list files');
}

console.log('');
console.log('🚀 Performance improvements:');
console.log('✅ Changed preload="metadata" to preload="auto"');
console.log('✅ Increased compression (CRF 32) for smaller files');
console.log('✅ Added format prioritization (WebM first, MP4 fallback)');
console.log('✅ Ready for CDN upload with upload-hero-videos script');
