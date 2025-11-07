#!/usr/bin/env node

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Image Compression Script for Grace at the Circle
 * 
 * Automatically compresses and optimizes images for web use
 * Maintains aspect ratios and creates responsive versions
 */

const CONFIG = {
  // Input and output directories
  inputDir: path.join(__dirname, '../public/images/raw'),
  outputDir: path.join(__dirname, '../public/images'),
  
  // Compression settings
  quality: {
    jpeg: 85,
    webp: 80,
    png: 90
  },
  
  // Size variants to generate
  sizes: {
    thumbnail: 300,
    small: 600,
    medium: 1200,
    large: 1920
  },
  
  // File type settings
  formats: ['webp', 'jpeg'], // Generate both WebP and JPEG
  
  // Directories to organize by content type
  categories: {
    team: ['headshot', 'portrait', 'staff', 'pastor', 'leader', 'steve', 'becky', 'riggle'],
    church: ['building', 'sanctuary', 'exterior', 'interior'],
    events: ['event', 'ministry', 'service', 'gathering'],
    general: ['hero', 'background', 'misc']
  }
};

/**
 * Ensure directory exists
 */
async function ensureDir(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

/**
 * Categorize image based on filename
 */
function categorizeImage(filename) {
  const lowerName = filename.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CONFIG.categories)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }
  
  return 'general';
}

/**
 * Generate image variants for different sizes and formats
 */
async function generateVariants(inputPath, outputDir, baseName, category) {
  const results = [];
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`📸 Processing: ${baseName}`);
    console.log(`   Original: ${metadata.width}x${metadata.height} (${metadata.format})`);
    
    // Generate size variants
    for (const [sizeName, maxWidth] of Object.entries(CONFIG.sizes)) {
      // Skip if original is smaller than target size
      if (metadata.width <= maxWidth && sizeName !== 'thumbnail') {
        continue;
      }
      
      const width = Math.min(maxWidth, metadata.width);
      const height = Math.round((width / metadata.width) * metadata.height);
      
      // Generate each format
      for (const format of CONFIG.formats) {
        const outputName = sizeName === 'medium' 
          ? `${baseName}.${format}` 
          : `${baseName}-${sizeName}.${format}`;
        
        const outputPath = path.join(outputDir, outputName);
        
        let processor = image.clone().resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true
        });
        
        // Apply format-specific settings
        if (format === 'jpeg') {
          processor = processor.jpeg({ 
            quality: CONFIG.quality.jpeg,
            progressive: true 
          });
        } else if (format === 'webp') {
          processor = processor.webp({ 
            quality: CONFIG.quality.webp,
            effort: 6 
          });
        } else if (format === 'png') {
          processor = processor.png({ 
            quality: CONFIG.quality.png,
            compressionLevel: 9 
          });
        }
        
        await processor.toFile(outputPath);
        
        const stats = await fs.stat(outputPath);
        const sizeKB = Math.round(stats.size / 1024);
        
        results.push({
          size: sizeName,
          format,
          path: outputPath,
          dimensions: `${width}x${height}`,
          fileSize: `${sizeKB}KB`
        });
        
        console.log(`   ✅ ${sizeName} ${format}: ${width}x${height} (${sizeKB}KB)`);
      }
    }
    
    return results;
    
  } catch (error) {
    console.error(`❌ Error processing ${baseName}:`, error.message);
    return [];
  }
}

/**
 * Process a single image file
 */
async function processImage(inputPath, filename) {
  const category = categorizeImage(filename);
  const baseName = path.parse(filename).name;
  const outputDir = path.join(CONFIG.outputDir, category);
  
  // Ensure output directory exists
  await ensureDir(outputDir);
  
  // Generate variants
  const results = await generateVariants(inputPath, outputDir, baseName, category);
  
  return {
    original: filename,
    category,
    variants: results
  };
}

/**
 * Main compression function
 */
async function compressImages() {
  console.log('🚀 Starting image compression...\n');
  
  // Ensure directories exist
  await ensureDir(CONFIG.inputDir);
  await ensureDir(CONFIG.outputDir);
  
  try {
    // Read input directory
    const files = await fs.readdir(CONFIG.inputDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp|tiff|bmp|avif)$/i.test(file)
    );
    
    if (imageFiles.length === 0) {
      console.log('📂 No images found in input directory');
      console.log(`   Place images in: ${CONFIG.inputDir}`);
      return;
    }
    
    console.log(`📊 Found ${imageFiles.length} images to process\n`);
    
    const results = [];
    
    // Process each image
    for (const filename of imageFiles) {
      const inputPath = path.join(CONFIG.inputDir, filename);
      const result = await processImage(inputPath, filename);
      results.push(result);
      console.log(''); // Add spacing between files
    }
    
    // Summary
    console.log('✨ Compression complete!\n');
    console.log('📋 Summary:');
    
    const categoryStats = {};
    let totalVariants = 0;
    
    results.forEach(result => {
      if (!categoryStats[result.category]) {
        categoryStats[result.category] = 0;
      }
      categoryStats[result.category] += result.variants.length;
      totalVariants += result.variants.length;
    });
    
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} variants`);
    });
    
    console.log(`   Total: ${totalVariants} optimized images generated`);
    console.log(`\n📁 Images organized in: ${CONFIG.outputDir}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  compressImages();
}

export { compressImages, processImage };
