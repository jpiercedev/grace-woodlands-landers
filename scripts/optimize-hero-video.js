#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  inputVideo: path.join(__dirname, '../public/header-video/full-res/ORANGE WEB HEADER_V2.mp4'),
  outputDir: path.join(__dirname, '../public/header-video/compressed'),
  posterDir: path.join(__dirname, '../public/header-video/posters'),
  
  // Optimized settings for faster loading
  qualityCRF: 30,        // Increased from 28 for smaller files
  preset: 'fast',        // Changed from 'medium' for faster encoding
  
  // Video variants
  variants: [
    { name: 'hero-1920', width: 1920, height: 1080, media: '(min-width: 1200px)' },
    { name: 'hero-1280', width: 1280, height: 720, media: '(min-width: 768px)' },
    { name: 'hero-854', width: 854, height: 480, media: '' }
  ],
  
  // Formats to generate (including AV1 for modern browsers)
  formats: ['av1', 'webm', 'mp4']
};

console.log('🚀 Grace at The Circle - Hero Video Optimization');
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

// Function to get file size in human readable format
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

// Function to run FFmpeg command with error handling
function runFFmpeg(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'pipe' });
    console.log(`   ✅ Complete`);
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
    throw error;
  }
}

// Generate poster frames
console.log('📸 Generating poster frames...');
CONFIG.variants.forEach(variant => {
  const posterPath = path.join(CONFIG.posterDir, `hero-poster-${variant.width}.jpg`);
  const command = `ffmpeg -i "${CONFIG.inputVideo}" -ss 2 -vframes 1 -vf "scale=${variant.width}:${variant.height}:force_original_aspect_ratio=decrease,pad=${variant.width}:${variant.height}:(ow-iw)/2:(oh-ih)/2" -q:v 2 -y "${posterPath}" -loglevel error`;
  
  try {
    execSync(command, { stdio: 'pipe' });
    const size = getFileSize(posterPath);
    console.log(`   ✅ ${variant.name}-poster.jpg: ${size}`);
  } catch (error) {
    console.error(`   ❌ Failed to generate poster for ${variant.name}`);
  }
});

console.log('');

// Compress videos in multiple formats
console.log('🎥 Compressing videos...');

CONFIG.variants.forEach(variant => {
  CONFIG.formats.forEach(format => {
    const outputName = `${variant.name}.${format === 'av1' ? 'mp4' : format}`;
    const outputPath = path.join(CONFIG.outputDir, outputName);
    
    let command;
    
    switch (format) {
      case 'mp4':
        command = `ffmpeg -i "${CONFIG.inputVideo}" ` +
          `-vf "scale=${variant.width}:${variant.height}:force_original_aspect_ratio=decrease,pad=${variant.width}:${variant.height}:(ow-iw)/2:(oh-ih)/2" ` +
          `-c:v libx264 -preset ${CONFIG.preset} -crf ${CONFIG.qualityCRF} ` +
          `-movflags +faststart -an -pix_fmt yuv420p ` +
          `-y "${outputPath}" -loglevel error`;
        break;
        
      case 'webm':
        command = `ffmpeg -i "${CONFIG.inputVideo}" ` +
          `-vf "scale=${variant.width}:${variant.height}:force_original_aspect_ratio=decrease,pad=${variant.width}:${variant.height}:(ow-iw)/2:(oh-ih)/2" ` +
          `-c:v libvpx-vp9 -crf ${CONFIG.qualityCRF} -b:v 0 ` +
          `-an -pix_fmt yuv420p ` +
          `-y "${outputPath}" -loglevel error`;
        break;
        
      case 'av1':
        // AV1 encoding for modern browsers (50% smaller files)
        command = `ffmpeg -i "${CONFIG.inputVideo}" ` +
          `-vf "scale=${variant.width}:${variant.height}:force_original_aspect_ratio=decrease,pad=${variant.width}:${variant.height}:(ow-iw)/2:(oh-ih)/2" ` +
          `-c:v libaom-av1 -crf ${CONFIG.qualityCRF + 5} -b:v 0 ` +
          `-an -pix_fmt yuv420p ` +
          `-y "${outputPath}" -loglevel error`;
        break;
    }
    
    try {
      console.log(`🔄 Creating ${outputName}...`);
      execSync(command, { stdio: 'pipe' });
      const size = getFileSize(outputPath);
      console.log(`   ✅ Complete: ${size}`);
    } catch (error) {
      console.error(`   ❌ Failed to create ${outputName}: ${error.message}`);
      // Continue with other formats even if one fails
    }
  });
});

console.log('');
console.log('🎉 Video optimization complete!');
console.log('');
console.log('📊 Generated files:');

// List all generated files with sizes
try {
  const compressedFiles = fs.readdirSync(CONFIG.outputDir);
  const posterFiles = fs.readdirSync(CONFIG.posterDir);
  
  [...compressedFiles, ...posterFiles].forEach(file => {
    const filePath = compressedFiles.includes(file) 
      ? path.join(CONFIG.outputDir, file)
      : path.join(CONFIG.posterDir, file);
    const size = getFileSize(filePath);
    console.log(`   📁 ${file}: ${size}`);
  });
} catch (error) {
  console.log('   Could not list generated files');
}

console.log('');
console.log('🔧 Next steps:');
console.log('1. Videos are now optimized for faster loading');
console.log('2. AV1 format provides 50% smaller files for modern browsers');
console.log('3. Consider uploading to Vercel Blob for CDN acceleration');
